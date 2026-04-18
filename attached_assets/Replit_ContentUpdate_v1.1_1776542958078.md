# PROOF OF LAUNCH — Content Update Spec (v1.1)

**Purpose:** Update content.json and related components to reflect repositioning and two new LaunchOps tiers.

**Scope:** Content-only changes to `content.json`. No structural, styling, or component changes.

**Verification:** Run `rm -rf .next && pnpm exec tsc --noEmit && pnpm exec next build` locally before committing. Confirm homepage preview renders all changed sections correctly.

---

## CHANGE 1 — Hero subhead

**Location:** `content.json` → `hero.subhead`

**Current value:**

```
"Proof of Launch is an AI-native product studio for **healthtech, fintech, and retail** — industries where launching wrong becomes a compliance event, not just a bad review. We build fast with AI. We prove every launch on real devices. **We ship our own apps this way first.**"
```

**New value:**

```
"Proof of Launch is an AI-native product studio for **healthtech, fintech, and retail** — the only industries we serve, because a bad launch in these verticals is a compliance event, not a bad review. We've shipped apps in each vertical ourselves. Now we ship them for you."
```

**Rationale:** Turns vertical specialization from a preference into a commitment ("the only industries we serve"), and connects portfolio to service offering ("now we ship them for you"). Keep existing markdown bold on "healthtech, fintech, and retail". No other styling changes.

---

## CHANGE 2 — Device Lab section headline and fleet label

**Location:** `content.json` → `devicesSection`

### 2a — Fleet label

**Current:**

```
"fleetLabel": "Our Device Fleet — Real Hardware, Real Conditions"
```

**New:**

```
"fleetLabel": "Our Device Fleet — Real Hardware. Real Conditions. Real Regulated Scenarios."
```

### 2b — Subhead

**Current:**

```
"subhead": "Touch target failures. Camera permission bugs after restart. Offline sync breaking on iOS PWA. Screens washed out in sunlight. These only appear on real hardware — and they're exactly the failures that become clinical incidents, compliance events, or lost retail sales. Our device lab tests every LaunchOps engagement on actual phones and tablets."
```

**New:**

```
"subhead": "Simulators don't fail the way real devices fail. We test on the specific hardware your users actually run — clinical tablets in hospital Wi-Fi conditions, POS terminals during retail peak hours, offline-capable scanners with spotty connectivity. These are the conditions your app has to survive. This is where launches actually break."
```

**Rationale:** Moves from generic "real devices vs simulators" (table stakes) to vertical-specific scenario framing (defensible differentiator). No structural changes — same section, same visual layout.

---

## CHANGE 3 — Add two new LaunchOps tiers

**Location:** `content.json` → `launchOpsSection.tiers`

**Action:** Insert TWO new tier objects into the `tiers` array. Order and positions:

1. Keep `sanity-check` (Tier 01) — position 1
2. Keep `finish-line` (Tier 02) — position 2
3. **INSERT `production-setup` (Tier 03)** — new, position 3
4. **INSERT `store-setup` (Tier 04)** — new, position 4
5. `launch-ready` — RENUMBER to Tier 05 — position 5
6. `compliance-launch` — RENUMBER to Tier 06 — position 6
7. `retainer` — RENUMBER to Tier 07 — position 7

**IMPORTANT:** Update the `"number"` field on existing tiers to reflect new positions (Launch Ready becomes "QA Tier 05", Compliance Launch becomes "QA Tier 06", Retainer becomes "QA Tier 07").

### New tier object — Production Setup

Insert between `finish-line` and `launch-ready`:

```json
{
  "id": "production-setup",
  "number": "QA Tier 03",
  "name": "Production Setup",
  "forWhom": "Built on Lovable/Replit? We'll host it for real.",
  "price": 1299,
  "priceDisplay": "$1,299",
  "priceNote": "FLAT · ONE TIME",
  "featured": false,
  "badge": { "label": "Vibe Coder", "color": "amber" },
  "features": [
    "Production deployment (AWS, Vercel, Railway — we configure)",
    "Custom domain + SSL certificates",
    "CDN + performance baseline",
    "Database separation + environment variables",
    "Monitoring, uptime alerts, error tracking",
    "Automated backups",
    "Written production readiness verdict",
    "Full account handoff with documentation"
  ],
  "turnaround": "⏱ 3-day turnaround"
}
```

### New tier object — Store Setup

Insert between `production-setup` and `launch-ready`:

```json
{
  "id": "store-setup",
  "number": "QA Tier 04",
  "name": "Store Setup",
  "forWhom": "From vibe-coded to App Store / Play Store",
  "price": 999,
  "priceDisplay": "$999",
  "priceNote": "FLAT · ONE TIME",
  "featured": false,
  "badge": { "label": "New", "color": "teal" },
  "features": [
    "Apple Developer Program setup (your name, your ownership)",
    "Google Play Console setup (your name, your ownership)",
    "D-U-N-S registration if business verification needed",
    "Bundle ID and signing key strategy",
    "Privacy declarations, data safety, content ratings",
    "Screenshots at all required device resolutions",
    "TestFlight and Play Console internal testing",
    "Delegated admin access + written handoff"
  ],
  "turnaround": "⏱ 5-day turnaround"
}
```

### Renumbering the remaining tiers

Update these three existing tiers' `"number"` fields:

- `launch-ready`: change `"number": "QA Tier 03"` → `"number": "QA Tier 05"`
- `compliance-launch`: change `"number": "QA Tier 04"` → `"number": "QA Tier 06"`
- `retainer`: change `"number": "QA Tier 05"` → `"number": "QA Tier 07"` (verify current number; adjust to +2 from wherever it is)

**No other changes** to those three existing tiers. Features, pricing, descriptions, badges all stay exactly as-is.

---

## CHANGE 4 — Update contact form situation options

**Location:** `content.json` → `contactSection.form.situationOptions`

**Why:** The new Production Setup and Store Setup tiers need routing paths on the contact form, so vibe-coder prospects self-identify.

**Current array (approximately):**

```
"I have an idea — need it built (Studio)",
"App is half-built — need help finishing (Studio or Finish Line)",
"App is built — need QA before launch (LaunchOps)",
"App was rejected by App Store / Play Store (Rejection Recovery)",
... (remaining options)
```

**Add TWO new options, inserted in LaunchOps-first order. The updated full array:**

```json
"situationOptions": [
  "App is built on Lovable/Replit/Bolt — need to host and publish it (LaunchOps Production + Store Setup)",
  "App is built — need QA before launch (LaunchOps Launch Ready)",
  "App is half-built — need help finishing (Finish Line)",
  "App was rejected by App Store / Play Store (Rejection Recovery)",
  "Healthtech or fintech app — need compliance review (Compliance Launch)",
  "I have an idea — need it built (Studio)",
  "Something else — let's talk"
]
```

Adjust existing options to match this structure; preserve any additional options already present (like "Something else").

---

## CHANGE 5 — Mobile scroll-snap verification

The LaunchOps tier grid uses horizontal scroll-snap on mobile. Adding two tiers (from 5 to 7 cards) should NOT require layout changes — the scroll-snap handles arbitrary card counts. But verify on mobile preview that all 7 cards render and snap correctly before pushing.

---

## What NOT to change

- Hero headline ("THE PROOF / IS IN / THE LAUNCH.") — no change
- Journey card (4 steps) — no change
- Tracks section — no change
- Portfolio section — no change
- Studio section tiers — no change
- Footer — no change
- Any styling, colors, typography, component structure

---

## Commit message

Suggest: `"Content v1.1: strengthen vertical positioning, add Production Setup and Store Setup tiers"`

---

## After push

Vercel will auto-deploy from the new commit. Expected build time: 2-4 minutes. All existing tests and type-checks should pass because these are pure content-object additions (no schema changes, no new component types).

If content.json parsing fails, it's almost certainly a JSON syntax error (trailing comma, missing quote). Run `cat content.json | python -m json.tool` locally to validate before commit.

---

## Summary of impact

After this update, the LaunchOps tier grid will have 7 tiers instead of 5, covering a more complete customer journey from vibe-coder-needs-hosting ($1,299) all the way up to enterprise retainer ($3,900/mo). The hero and Device Lab copy sharpens the vertical-specialization claim. Contact form routing correctly directs the new vibe-coder buyer persona to the right tier.

No structural changes. No new components. No design work. Content-only edits plus two new tier objects.
