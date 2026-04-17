import { Reveal } from "@/components/Reveal";
import { TierCard, type TierColor } from "@/components/TierCard";

type Tier = {
  id: string;
  number: string;
  name: string;
  forWhom: string;
  priceDisplay: string;
  priceNote: string;
  featured: boolean;
  badge?: { label: string; color: string };
  features: string[];
  turnaround: string;
  priceAnchor?: string;
};

type AddOn = {
  id: string;
  name: string;
  icon: string;
  description: string;
  priceDisplay: string;
  turnaround: string;
};

type FullCycle = {
  name: string;
  icon: string;
  description: string;
  priceDisplay: string;
  turnaround: string;
};

type LaunchOpsSectionProps = {
  launchOpsSection: {
    eyebrow: string;
    headline: string;
    subhead: string;
    tiers: Tier[];
    addOns: AddOn[];
    fullCycle: FullCycle;
  };
};

export function LaunchOpsSection({ launchOpsSection }: LaunchOpsSectionProps) {
  const { eyebrow, headline, subhead, tiers, addOns, fullCycle } =
    launchOpsSection;

  return (
    <section
      id="launchops"
      className="relative border-b border-border-subtle py-24 md:py-32"
      aria-labelledby="launchops-headline"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-teal">
              // {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="launchops-headline"
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

        <div className="mt-14 -mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:overflow-visible md:px-0">
          <div className="flex gap-5 md:grid md:grid-cols-2 lg:grid-cols-5">
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                className="w-[280px] flex-shrink-0 snap-start md:w-auto"
              >
                <TierCard
                  number={tier.number}
                  name={tier.name}
                  forWhom={tier.forWhom}
                  priceDisplay={tier.priceDisplay}
                  priceNote={tier.priceNote}
                  features={tier.features}
                  turnaround={tier.turnaround}
                  priceAnchor={tier.priceAnchor}
                  color="teal"
                  featured={tier.featured}
                  badge={
                    tier.badge
                      ? {
                          label: tier.badge.label,
                          color: tier.badge.color as TierColor,
                        }
                      : undefined
                  }
                  delay={i * 60}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {addOns.map((addon, i) => (
            <Reveal
              key={addon.id}
              delay={i * 80}
              className="flex flex-col gap-4 rounded-md border border-border-visible bg-navy-800/40 p-6 md:flex-row md:items-center md:gap-6"
            >
              <span aria-hidden="true" className="text-3xl leading-none">
                {addon.icon}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
                    {addon.name}
                  </h3>
                  <span className="font-display text-2xl font-black text-amber">
                    {addon.priceDisplay}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                    {addon.turnaround}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-2">
                  {addon.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col gap-5 rounded-md border border-border-visible bg-navy-800/40 p-8 md:flex-row md:items-start md:gap-7 md:p-10">
            <span aria-hidden="true" className="text-4xl leading-none">
              {fullCycle.icon}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
                  {fullCycle.name}
                </h3>
                <span className="font-display text-2xl font-black text-teal md:text-3xl">
                  {fullCycle.priceDisplay}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                  {fullCycle.turnaround}
                </span>
              </div>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted-2">
                {fullCycle.description}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
