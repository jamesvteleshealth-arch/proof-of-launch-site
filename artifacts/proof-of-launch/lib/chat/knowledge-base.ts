// lib/chat/knowledge-base.ts
//
// Source of truth for what the chat knows about Proof of Launch.
// Edit this file to update the chat's knowledge.
// Formatted as a single markdown-style string that gets injected into the system prompt.

export const KNOWLEDGE_BASE = `
## COMPANY IDENTITY

- Name: Proof of Launch
- Website: proofoflaunch.com
- Founder/CEO: James Villar
- Clinical Systems Lead: RN with HIMS background and Cerner/Epic integration experience (for serious healthtech engagements)
- Tagline: The proof is in the launch.
- Structure: US-based company with global delivery team
- Founder credential: US military veteran with background in IT infrastructure, cybersecurity, electronic warfare, and communications

## WHAT WE DO

Two tracks under one brand:

**LaunchOps (Track One) — The proving track.**
For teams with an app already built using AI tools (Lovable, Replit, Bolt, Cursor, v0) or built by someone else. We test on real devices, harden, deploy to production infrastructure, and give a written go/no-go verdict.

**Studio (Track Two) — The building track.**
For teams with an idea but nothing built yet. We validate, scope, build (AI-accelerated where it helps, engineer-owned where it matters). Every Studio build runs through LaunchOps QA before shipping.

## WHO WE SERVE

Three core verticals:

**Healthtech** — clinical workflow, patient-facing apps, telemedicine, remote monitoring, clinical trials, medication management, EHR-adjacent, chronic care management, behavioral health.

**Fintech** — payments, KYC/AML, lending, compliance-gated financial flows, audit trails, regulatory reporting.

**Retail** — multi-location retail operations, inventory, field ops, point-of-sale, offline-capable retail apps.

We also take LaunchOps work in broader markets (consumer apps, SaaS, sports/social) when the project is serious. Studio engagements stay focused on the three core verticals.

## WHAT WE DO NOT DO

- Studio builds outside healthtech/fintech/retail — routed to other studios
- Legal or regulatory advisory — we're not lawyers
- FDA submission preparation — we're not a regulatory consultancy
- Equity-in-lieu-of-payment deals
- Hourly billing — flat-priced only
- Projects with vague scope or budgets below our minimums

## LAUNCHOPS TIERS (FLAT, ONE-TIME UNLESS NOTED)

**Sanity Check — $499 — 24-hour turnaround**
Pre-submission gut check. 30 core test cases, bug report with P1-P4 severity, UX red flags, screenshots of failures, go/no-go verdict. For fast validation before shipping.

**Finish Line — $799 — 48-hour turnaround**
For half-built apps that need one feature completed or a bug fix sprint. One feature completion, engineer assigned, Sanity Check QA bundled, go/no-go verdict. For stalled Lovable or Replit builds with a specific gap.

**Production Setup — $1,299 — 3-day turnaround**
For vibe-coder founders whose app exists on a platform preview URL (Lovable, Replit, Bolt) but isn't hosted in production. Production deployment (AWS, Vercel, or Railway), custom domain + SSL, CDN, database separation, environment variables, monitoring + uptime alerts, automated backups, written production readiness verdict, full account handoff. For founders who built something great but don't know how to actually host it.

**Store Setup — $999 — 5-day turnaround**
For founders who need to publish to Apple App Store and/or Google Play Store. Apple Developer + Google Play Console account setup (in client's name — Apple/Google require accounts to be owned by the publishing entity, we operate with delegated admin access only). D-U-N-S registration if needed. Bundle ID and signing key strategy. Privacy declarations, content ratings, screenshots at required resolutions. TestFlight and Play Console internal testing. For founders ready to launch but overwhelmed by Apple/Google onboarding.

**Launch Ready — $1,499 — 5-day turnaround — MOST POPULAR**
Our default recommendation. 80+ case full test suite, basic physical device testing, domain/SSL/env migration, UX + store metadata audit, privacy policy check, release notes drafted, one retest cycle after fixes. For first real release in any vertical.

**Compliance Launch — $3,499 — 7-day turnaround**
For healthtech and fintech specifically. Everything in Launch Ready plus: full device matrix testing, HIPAA permissions audit, data encryption verification, security + auth edge cases, CI/CD + database migration, compliance summary memo. Context: HIPAA consultants alone charge $10K-$30K. We do app-level compliance for a fraction.

**Retainer — $3,900/month — ongoing**
For teams shipping weekly. Up to 4 QA cycles/month, 2 physical device regression passes, hotfix verification, infrastructure health monitoring, dedicated Slack channel, monthly QA summary, priority queue (same-day on hotfixes). For active development teams.

## LAUNCHOPS ADD-ONS

**Rejection Recovery — $699 — 48-hour turnaround**
For apps just rejected by App Store or Play Store. Fast audit against the cited guideline, fix recommendations, resubmission readiness.

**Real Device Audit — $899 — 48-hour turnaround**
For post-launch device-specific crashes that simulators missed. 3-device physical audit with bug report.

## STUDIO TIERS

**Starter Build — $2,999 — ~2 weeks** — Web app, internal tool, landing page. AI-accelerated.
**Growth Build — $6,999 — 4-6 weeks — MOST POPULAR** — Full web or mobile app.
**Venture Build — Custom Quote — 8-12 weeks** — Complex platforms, regulated industry, multi-role systems. Requires discovery call.

## KEY DIFFERENTIATORS

- Vertical specialization (healthtech, fintech, retail) with operator depth — we've shipped our own apps in each
- Clinical Systems Lead on the team (RN + HIMS + Cerner/Epic experience) — rare for a services studio
- Real device testing in regulated scenarios: clinical tablets in hospital environments, POS terminals at retail peak hours, offline-capable scanners
- AI-accelerated, engineer-owned. Human in the loop always — no code ships without human review
- Flat-priced engagements. No hourly, no surprises.
- Fast turnaround: 24 hours to 7 days for LaunchOps
- Written go/no-go verdicts, not vague opinions
- Veteran-owned. Military background in IT infrastructure, cybersecurity, communications
- US-based with global delivery team enabling 24-hour Tier 1 turnaround at our pricing

## HEALTHTECH DEPTH (REFERENCE WHEN RELEVANT)

Legitimate capability in:
- Chronic Care Management (CCM) platforms
- Telehealth and remote monitoring
- Behavioral health tools
- Advanced wound care imaging and classification
- Medical claims processing
- OpenEMR customizations
- Healthcare CRM
- DME order/delivery/compliance apps
- Clinical mobile field operations platforms
- Cerner and Epic integration work
- HIPAA-aware systems and cybersecurity

Clinical Systems Lead joins client calls alongside James for serious healthtech engagements.

## MARKET CONTEXT (FOR WHY-NOW QUESTIONS)

Three forces converged in 2024-2026:

1. **AI tools made app-building fast.** Vibe-coding platforms (Lovable, Replit, Bolt, v0, Cursor) reached $100M ARR milestones in months. 63% of users are non-developers.

2. **AI code is risky.** 45% of AI-generated code ships with security vulnerabilities (Georgetown CSET). Real incidents: Lovable shipped a CVE across 170 apps, Moltbook exposed 1.5M API keys, Base44 shipped an auth bypass.

3. **Apple cracked down.** March 2026, Apple blocked apps from Replit, Vibecode, and Anything under Guideline 2.5.2. App Store rejection rate hit 25%.

Result: thousands of founders with AI-built apps and no reliable path to production. Proof of Launch is how they get there.

## COMMON Q&A REFERENCE

**"What's your pricing?"** → Share the LaunchOps tier structure. Don't invent custom pricing.

**"Do you work with [AI tool]?"** → Yes for Lovable, Replit, Bolt, Cursor, v0. LaunchOps was built for these.

**"How fast can you start?"** → Once scope-of-work is signed and first payment received, we kick off within the tier's turnaround. Typically within 24-48 hours of contract.

**"Are you HIPAA compliant?"** → We build and deliver HIPAA-aware apps and conduct HIPAA permissions audits. We're not a HIPAA consulting firm — we don't replace counsel. We work alongside clients' existing compliance advisors.

**"Can I see your portfolio?"** → Three anonymized case studies on the site: clinical field app with 200+ daily users, multi-location retail operations tool, compliance workflow system. Under NDA so no names. Specifics available during a discovery call.

**"Do you work with enterprise?"** → $25K+ engagements go through James directly. Worth a discovery call.

**"Launch Ready vs Compliance Launch?"** → Launch Ready ($1,499) = standard launch readiness audit for any vertical. Compliance Launch ($3,499) = adds regulated-industry layer (HIPAA audit, full device matrix, security edge cases, compliance memo). If app touches PHI or audit-subject financial data, go Compliance Launch. Otherwise Launch Ready covers most.

**"What happens after I submit the contact form?"** → James responds within one business day with a next step — usually a tier recommendation with scope-of-work, or a discovery call if the project is complex. Discovery calls are always free.

**"Who does the work?"** → Global delivery team handles QA, DevOps, infrastructure. James oversees engagements. Clinical Systems Lead joins healthtech engagements. All engagements under NDA from day one.
`;
