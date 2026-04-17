import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export type TierColor = "teal" | "violet" | "amber";

type Badge = { label: string; color: TierColor };

type TierCardProps = {
  number: string;
  name: string;
  forWhom?: string;
  subtitle?: string;
  priceDisplay: string;
  priceNote?: string;
  features: string[];
  turnaround?: string;
  timeline?: string;
  priceAnchor?: string;
  includedQa?: { label: string; value: number };
  color: TierColor;
  featured?: boolean;
  badge?: Badge;
  delay?: number;
};

const PALETTE: Record<
  TierColor,
  {
    border: string;
    text: string;
    bullet: string;
    ring: string;
    chipBg: string;
    chipText: string;
  }
> = {
  teal: {
    border: "before:bg-teal",
    text: "text-teal",
    bullet: "text-teal",
    ring: "ring-teal/60",
    chipBg: "bg-teal",
    chipText: "text-navy-900",
  },
  violet: {
    border: "before:bg-violet",
    text: "text-violet",
    bullet: "text-violet",
    ring: "ring-violet/60",
    chipBg: "bg-violet",
    chipText: "text-ink",
  },
  amber: {
    border: "before:bg-amber",
    text: "text-amber",
    bullet: "text-amber",
    ring: "ring-amber/60",
    chipBg: "bg-amber",
    chipText: "text-navy-900",
  },
};

export function TierCard({
  number,
  name,
  forWhom,
  subtitle,
  priceDisplay,
  priceNote,
  features,
  turnaround,
  timeline,
  priceAnchor,
  includedQa,
  color,
  featured = false,
  badge,
  delay = 0,
}: TierCardProps) {
  const palette = PALETTE[color];
  const badgePalette = badge ? PALETTE[badge.color] : null;

  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-md border bg-navy-800/60 p-6 md:p-7",
        "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:content-['']",
        palette.border,
        featured
          ? cn("border-transparent ring-1", palette.ring)
          : "border-border-visible",
      )}
    >
      {badge && badgePalette && (
        <span
          className={cn(
            "absolute right-4 top-4 rounded-sm px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-eyebrow",
            badgePalette.chipBg,
            badgePalette.chipText,
          )}
        >
          {badge.label}
        </span>
      )}

      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted-2">
        {number}
      </p>

      <h3 className="mt-2 font-display text-[24px] font-bold uppercase leading-tight tracking-tight text-ink md:text-[26px]">
        {name}
      </h3>

      {forWhom && (
        <p className="mt-1 text-[12px] italic text-muted-2">{forWhom}</p>
      )}
      {subtitle && (
        <p className="mt-1 text-[12px] italic text-muted-2">{subtitle}</p>
      )}

      <div className="mt-5 border-y border-border-subtle py-4">
        <p
          className={cn(
            "font-display text-[36px] font-black leading-none tracking-tightest md:text-[40px]",
            palette.text,
          )}
        >
          {priceDisplay}
        </p>
        {priceNote && (
          <p className="mt-2 font-mono text-[9px] uppercase tracking-eyebrow text-muted">
            {priceNote}
          </p>
        )}
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[12.5px] leading-snug text-ink/85"
          >
            <span
              aria-hidden="true"
              className={cn("mt-[5px] text-[9px]", palette.bullet)}
            >
              ◆
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {includedQa && (
        <p className="mt-5 rounded-sm border border-border-subtle bg-navy-900/60 px-3 py-2 font-mono text-[10px] uppercase tracking-eyebrow text-muted-2">
          QA bundled · {includedQa.label} (${includedQa.value.toLocaleString()})
        </p>
      )}

      {priceAnchor && (
        <p className="mt-4 text-[11px] italic leading-snug text-muted">
          {priceAnchor}
        </p>
      )}

      {(turnaround || timeline) && (
        <p className="mt-5 border-t border-border-subtle pt-4 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
          {turnaround ?? timeline}
        </p>
      )}
    </Reveal>
  );
}
