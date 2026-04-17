import { Reveal } from "@/components/Reveal";
import { TierCard } from "@/components/TierCard";
import { cn } from "@/lib/cn";

type Phase = {
  num: string;
  color: string;
  icon: string;
  name: string;
  description: string;
  includes: string;
};

type StudioTier = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  priceDisplay: string;
  priceNote: string;
  featured: boolean;
  badge?: string;
  features: string[];
  timeline: string;
  includedQa?: { label: string; value: number };
};

type Tool = { name: string; style: "default" | "highlight-teal" | "highlight-amber" };

type StudioSectionProps = {
  studioSection: {
    eyebrow: string;
    headline: string;
    subhead: string;
    phases: Phase[];
    tiers: StudioTier[];
    toolStack: { label: string; tools: Tool[] };
    philosophy: { eyebrow: string; headline: string; text: string };
  };
};

const PHASE_COLOR: Record<string, { text: string; border: string }> = {
  amber: { text: "text-amber", border: "border-amber/40" },
  violet: { text: "text-violet", border: "border-violet/40" },
  teal: { text: "text-teal", border: "border-teal/40" },
};

const TOOL_STYLE: Record<Tool["style"], string> = {
  default:
    "border-border-visible bg-navy-800/60 text-ink/80",
  "highlight-teal":
    "border-teal/60 bg-teal/10 text-teal",
  "highlight-amber":
    "border-amber/60 bg-amber/10 text-amber",
};

export function StudioSection({ studioSection }: StudioSectionProps) {
  const { eyebrow, headline, subhead, phases, tiers, toolStack, philosophy } =
    studioSection;

  return (
    <section
      id="studio"
      className="relative border-b border-border-subtle py-24 md:py-32"
      aria-labelledby="studio-headline"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-violet">
              // {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="studio-headline"
              className="mt-6 whitespace-pre-line font-display text-[44px] font-black uppercase leading-[0.95] tracking-tightest text-ink md:text-[72px]"
            >
              {headline}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-2 md:text-lg">
              {subhead}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {phases.map((phase, i) => {
            const palette = PHASE_COLOR[phase.color] ?? PHASE_COLOR.violet;
            return (
              <Reveal
                key={phase.num}
                delay={i * 80}
                className={cn(
                  "rounded-md border bg-navy-800/40 p-6 md:p-7",
                  palette.border,
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={cn(
                      "font-display text-3xl font-black tracking-tightest",
                      palette.text,
                    )}
                  >
                    {phase.num}
                  </span>
                  <span aria-hidden="true" className="text-2xl">
                    {phase.icon}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight text-ink">
                  {phase.name}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-2">
                  {phase.description}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                  {phase.includes}
                </p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <TierCard
              key={tier.id}
              number={tier.number}
              name={tier.name}
              subtitle={tier.subtitle}
              priceDisplay={tier.priceDisplay}
              priceNote={tier.priceNote}
              features={tier.features}
              timeline={tier.timeline}
              includedQa={tier.includedQa}
              color="violet"
              featured={tier.featured}
              badge={
                tier.badge
                  ? { label: tier.badge, color: "violet" }
                  : undefined
              }
              delay={i * 80}
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-3 rounded-md border border-border-visible bg-navy-800/40 p-5 md:p-6">
            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted-2">
              {toolStack.label}
            </span>
            {toolStack.tools.map((tool) => (
              <span
                key={tool.name}
                className={cn(
                  "rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-eyebrow",
                  TOOL_STYLE[tool.style],
                )}
              >
                {tool.name}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 rounded-md border border-l-[3px] border-border-visible border-l-teal bg-navy-800/40 p-8 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-teal">
              // {philosophy.eyebrow}
            </p>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink md:text-3xl">
              {philosophy.headline}
            </h3>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-2">
              {philosophy.text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
