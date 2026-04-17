import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export type TrackColor = "violet" | "teal" | "amber";

type TrackCardProps = {
  number: string;
  name: string;
  color: TrackColor;
  icon: string;
  bgText: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  delay?: number;
};

const PALETTE: Record<
  TrackColor,
  {
    border: string;
    text: string;
    bullet: string;
    ghostText: string;
    ctaHover: string;
  }
> = {
  violet: {
    border: "before:bg-violet",
    text: "text-violet",
    bullet: "text-violet",
    ghostText: "text-violet/[0.04]",
    ctaHover: "hover:text-violet",
  },
  teal: {
    border: "before:bg-teal",
    text: "text-teal",
    bullet: "text-teal",
    ghostText: "text-teal/[0.04]",
    ctaHover: "hover:text-teal",
  },
  amber: {
    border: "before:bg-amber",
    text: "text-amber",
    bullet: "text-amber",
    ghostText: "text-amber/[0.04]",
    ctaHover: "hover:text-amber",
  },
};

export function TrackCard({
  number,
  name,
  color,
  icon,
  bgText,
  tagline,
  features,
  cta,
  delay = 0,
}: TrackCardProps) {
  const palette = PALETTE[color];

  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        "group relative overflow-hidden rounded-md border border-border-visible bg-navy-800/60 p-8 md:p-10",
        "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:content-['']",
        palette.border,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-12 -right-6 select-none font-display text-[180px] font-black uppercase leading-none tracking-tightest md:text-[240px]",
          palette.ghostText,
        )}
      >
        {bgText}
      </span>

      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted-2">
          {number}
        </p>
        <h3
          className={cn(
            "mt-3 flex items-center gap-3 font-display text-[44px] font-black uppercase leading-none tracking-tightest md:text-[56px]",
            palette.text,
          )}
        >
          <span aria-hidden="true" className="text-2xl md:text-3xl">
            {icon}
          </span>
          {name}
        </h3>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-2">
          {tagline}
        </p>

        <ul className="mt-8 space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-[14px] leading-relaxed text-ink/90"
            >
              <span
                aria-hidden="true"
                className={cn("mt-[6px] text-xs", palette.bullet)}
              >
                ◆
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={cta.href}
          className={cn(
            "mt-10 inline-flex items-center gap-2 border-b border-border-visible pb-1 font-mono text-[12px] uppercase tracking-eyebrow text-ink transition-colors",
            palette.ctaHover,
          )}
        >
          {cta.label}
        </a>
      </div>
    </Reveal>
  );
}
