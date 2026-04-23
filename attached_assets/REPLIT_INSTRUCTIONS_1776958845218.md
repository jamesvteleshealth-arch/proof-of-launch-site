# Replit Implementation Spec — AI Chat Widget (v1.0)

**Goal:** Add a floating AI chat widget to proofoflaunch.com, grounded in our knowledge base, routing serious prospects to the contact form.

**Model:** Claude Sonnet 4.5 via Anthropic API
**Position:** Bottom-right floating bubble (standard pattern)
**Handoff:** Contact form on the same page

---

## OVERVIEW OF THE CHANGES

You'll add:

1. **One new dependency:** `@anthropic-ai/sdk`
2. **Four new files** in the Next.js app:
   - `app/api/chat/route.ts` — server-side API that calls Claude
   - `lib/chat/system-prompt.ts` — behavioral instructions for the AI
   - `lib/chat/knowledge-base.ts` — factual source of truth
   - `components/ChatWidget.tsx` — client-side React widget
3. **Possibly one more file:** `lib/cn.ts` (only if one doesn't already exist — see Step 3.5)
4. **One line added to `app/layout.tsx`** to mount the widget on every page
5. **One new environment variable in Vercel:** `ANTHROPIC_API_KEY`

No existing files get modified except `app/layout.tsx` (one import + one component mount). No existing components change. No existing routes affected.

---

## STEP 1 — INSTALL DEPENDENCY

```
pnpm add @anthropic-ai/sdk
```

Verify `@anthropic-ai/sdk` appears in `artifacts/proof-of-launch/package.json` dependencies.

---

## STEP 2 — CREATE FILES

The four files below should be created exactly as specified. File paths are relative to `artifacts/proof-of-launch/`.

### FILE 1: `app/api/chat/route.ts`

This is the server-side API endpoint the chat widget calls. It validates input, rate-limits per IP, and streams a response from Claude.

\`\`\`typescript
// app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { KNOWLEDGE_BASE } from "@/lib/chat/knowledge-base";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- Simple in-memory rate limit (per IP, per 15 minutes) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_MESSAGES = 30;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_MESSAGES - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX_MESSAGES) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_MESSAGES - entry.count };
}

let lastCleanup = Date.now();
function lazyCleanup() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function validateMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  if (raw.length === 0) return null;
  if (raw.length > 40) return null;

  const validated: ChatMessage[] = [];
  for (const msg of raw) {
    if (!msg || typeof msg !== "object") return null;
    const m = msg as Record<string, unknown>;
    if (m.role !== "user" && m.role !== "assistant") return null;
    if (typeof m.content !== "string") return null;
    if (m.content.length === 0 || m.content.length > 4000) return null;
    validated.push({ role: m.role, content: m.content });
  }

  if (validated[0].role !== "user") return null;
  if (validated[validated.length - 1].role !== "user") return null;

  return validated;
}

export async function POST(req: NextRequest) {
  lazyCleanup();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[chat] ANTHROPIC_API_KEY not configured");
    return new Response(
      JSON.stringify({ error: "Chat is temporarily unavailable. Please use the contact form below." }),
      { status: 503, headers: { "content-type": "application/json" } }
    );
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({
        error: "You've sent a lot of messages in a short time. Take a break, or reach James directly via the contact form below.",
      }),
      { status: 429, headers: { "content-type": "application/json" } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  const messages = validateMessages(rawMessages);
  if (!messages) {
    return new Response(JSON.stringify({ error: "Invalid message format." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });
  const systemContent = \`\${SYSTEM_PROMPT}\\n\\n---\\n\\n# KNOWLEDGE BASE\\n\\n\${KNOWLEDGE_BASE}\`;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.stream({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 1024,
          system: systemContent,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        controller.close();
      } catch (err) {
        console.error("[chat] Anthropic API error:", err);
        const errorMessage =
          "Something went wrong on our end. Please use the contact form below — James will respond within one business day.";
        controller.enqueue(encoder.encode(\`\\n\\n\${errorMessage}\`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-ratelimit-remaining": String(rateLimit.remaining),
    },
  });
}
\`\`\`

### FILE 2: `lib/chat/system-prompt.ts`

The behavioral guide for the AI — personality, rules, boundaries.

**[Content provided separately in `lib__chat__system-prompt.ts` — copy its content into this file exactly as given.]**

### FILE 3: `lib/chat/knowledge-base.ts`

The factual source of truth about Proof of Launch.

**[Content provided separately in `lib__chat__knowledge-base.ts` — copy its content into this file exactly as given.]**

### FILE 4: `components/ChatWidget.tsx`

The floating chat widget React component.

**[Content provided separately in `components__ChatWidget.tsx` — copy its content into this file exactly as given.]**

---

## STEP 3 — MOUNT THE WIDGET IN LAYOUT

Open `app/layout.tsx`. Add these two lines:

1. At the top of the imports section, add:

\`\`\`typescript
import { ChatWidget } from "@/components/ChatWidget";
\`\`\`

2. Inside the main layout JSX, add the `<ChatWidget />` component just before the closing `</body>` tag. For example:

\`\`\`tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={\`\${inter.className}\`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
\`\`\`

Do not modify any other part of `layout.tsx`. Do not change existing imports, metadata, or providers. Just add the one import and mount the component.

---

## STEP 3.5 — VERIFY cn UTILITY EXISTS

The `ChatWidget.tsx` imports `cn` from `@/lib/cn` for conditional class name composition:

```ts
import { cn } from "@/lib/cn";
```

**Check if `lib/cn.ts` (or similar like `lib/utils.ts`) already exists in the codebase.** Most Next.js/Tailwind projects have this utility. Common locations:
- `lib/cn.ts`
- `lib/utils.ts` (shadcn/ui default)
- `src/lib/cn.ts`

If it exists:
- Update the `ChatWidget.tsx` import to match the existing path (e.g. `import { cn } from "@/lib/utils"`)

If it does NOT exist, create `lib/cn.ts` with this content:

```ts
// lib/cn.ts — small utility to merge Tailwind class names with conditional logic
type ClassValue = string | number | boolean | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input && input !== 0) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else if (typeof input === "string" || typeof input === "number") {
      out.push(String(input));
    }
  }
  return out.join(" ");
}
```

This is a minimal dependency-free version. If the project already uses `clsx` or `tailwind-merge`, prefer those — just match whatever the existing convention is.

---

## STEP 4 — VERIFY STYLING

The ChatWidget uses Tailwind classes that should match existing site colors:

- `bg-navy-950`, `bg-navy-900`, `bg-navy-800`, `bg-navy-700` — dark backgrounds
- `bg-teal-500`, `bg-teal-400`, `text-teal-400`, `text-teal-300` — teal accents
- `text-white`, `text-slate-100`, `text-slate-400`, `text-slate-500` — text

**If any of these class names don't exist in the current Tailwind config**, check `tailwind.config.ts` to confirm the navy and teal color palette is defined. If the existing site uses different names for these same colors (e.g. `bg-brand-dark` instead of `bg-navy-950`), adjust the ChatWidget classes to match the existing naming convention.

Verify the widget visually matches the existing site's aesthetic before declaring complete.

---

## STEP 5 — VERIFY BUILD

Run, in order:

\`\`\`
rm -rf .next
pnpm exec tsc --noEmit
pnpm exec next build
\`\`\`

All three must pass cleanly:
- TypeScript: no output (success)
- Next.js build: ✓ Compiled successfully, 4 static routes + 1 dynamic route (`/api/chat`)
- First-load JS on the homepage should not dramatically increase (chat widget is client-only and small)

**Do NOT attempt a test send locally.** The `ANTHROPIC_API_KEY` is not set in the Replit environment — per our security practice, production secrets live only in Vercel. Verify at the build level; functional testing happens after push via the Vercel preview deployment.

---

## STEP 6 — COMMIT

Commit message: `Add AI chat widget with Claude Sonnet 4.5, grounded in knowledge base`

---

## WHAT I (JAMES) DO AFTER REPLIT COMMITS

1. **Add `ANTHROPIC_API_KEY` to Vercel** (not something Replit does):
   - Go to [console.anthropic.com](https://console.anthropic.com), sign up or sign in
   - Add billing (required for API usage — $5 credit on signup typically)
   - Navigate to API Keys → Create Key → name it `proof-of-launch-production`
   - Copy the `sk-ant-...` key immediately
   - In Vercel → `proof-of-launch` project → Settings → Environment Variables
   - Add: Key = `ANTHROPIC_API_KEY`, Value = paste the sk-ant-... key, Environments = Production + Preview
   - Save

2. **Push from Git pane** — triggers Vercel auto-deploy

3. **Once deploy is green**, test the chat widget:
   - Open proofoflaunch.com
   - Click the chat bubble in bottom-right
   - Ask: "What's your pricing?"
   - Confirm Claude responds with accurate tier information
   - Ask: "I built my app on Lovable, what should I do?"
   - Confirm Claude recommends Production Setup or Launch Ready with reasoning
   - Click "Talk to James →" in the chat header — should scroll to contact form

4. **Monitor for the first few days**:
   - Check Vercel function logs for any errors
   - Check Anthropic dashboard for usage / cost patterns
   - If conversations reveal the chat answering poorly, update `lib/chat/knowledge-base.ts` or `lib/chat/system-prompt.ts` and redeploy

---

## FUTURE ITERATIONS (NOT FOR V1)

These are NOT in scope for this build. Noting them so they're not missed later:

- **Conversation persistence** — currently each session starts fresh; no chat history across page loads
- **Conversation export** — currently no way to email conversation context to James when prospect submits the form
- **Analytics** — no tracking of what questions are asked or conversion rate
- **Language support** — English only
- **Calendly integration** — currently handoff only to contact form; add Calendly option once those events exist
- **Voice/audio** — text only

These are v2+ improvements. Ship the minimum working version first.

---

## SUMMARY

- 4 new files created
- 1 existing file modified (`app/layout.tsx` — two-line addition)
- 1 new dependency (`@anthropic-ai/sdk`)
- 1 new environment variable (`ANTHROPIC_API_KEY`, set in Vercel only)
- No existing functionality affected
- Build verification required before commit
- Testing happens after Vercel deploy

Ship it.
