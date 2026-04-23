// app/api/chat/route.ts
//
// Chat API route — handles conversations with Claude, grounded in the knowledge base.
// Streaming response for better UX. Rate-limited per IP.
//
// Environment variables required:
//   ANTHROPIC_API_KEY — set in Vercel, never committed
//
// Returns: ReadableStream of text chunks (Server-Sent Events style via streaming fetch)

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { KNOWLEDGE_BASE } from "@/lib/chat/knowledge-base";
import { SYSTEM_PROMPT } from "@/lib/chat/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- Simple in-memory rate limit (per IP, per 15 minutes) ---
// NOTE: For a low-traffic marketing site this is fine. For higher traffic,
// migrate to Vercel KV or Upstash Redis. See docs/scaling-notes.md.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_MESSAGES = 30; // 30 messages per 15 min per IP

function getClientIp(req: NextRequest): string {
  // Vercel sets x-forwarded-for; fall back to remote if missing
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

// Periodic cleanup so the Map doesn't grow forever in long-running server processes
// Runs every ~5 min of activity (lazy, only when a request triggers it)
let lastCleanup = Date.now();
function lazyCleanup() {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

// --- Message validation ---

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function validateMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw)) return null;
  if (raw.length === 0) return null;
  if (raw.length > 40) return null; // cap conversation history

  const validated: ChatMessage[] = [];
  for (const msg of raw) {
    if (!msg || typeof msg !== "object") return null;
    const m = msg as Record<string, unknown>;
    if (m.role !== "user" && m.role !== "assistant") return null;
    if (typeof m.content !== "string") return null;
    if (m.content.length === 0 || m.content.length > 4000) return null;
    validated.push({ role: m.role, content: m.content });
  }

  // First message must be user, last must be user (we're about to respond)
  if (validated[0].role !== "user") return null;
  if (validated[validated.length - 1].role !== "user") return null;

  return validated;
}

// --- Main handler ---

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
        error:
          "You've sent a lot of messages in a short time. Take a break, or reach James directly via the contact form below.",
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

  // Build the system prompt from static instructions + knowledge base
  const systemContent = `${SYSTEM_PROMPT}\n\n---\n\n# KNOWLEDGE BASE\n\n${KNOWLEDGE_BASE}`;

  // Stream the response back to the client
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
        controller.enqueue(encoder.encode(`\n\n${errorMessage}`));
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
