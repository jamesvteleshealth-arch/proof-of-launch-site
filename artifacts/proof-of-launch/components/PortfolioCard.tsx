import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export type PortfolioColor = "teal" | "violet" | "amber";

type PortfolioCardProps = {
  vertical: string;
  color: PortfolioColor;
  name: string;
  description: string;
  stat: string;
  statLabel: string;
  bullets: string[];
  note: string;
  delay?: number;
};

const PALETTE: Record<
  PortfolioColor,
  {
    border: string;
    text: string;
    bullet: string;
    eyebrow: string;
  }
> = {
  teal: {
    border: "before:bg-teal",
    text: "text-teal",
    bullet: "text-teal",
    eyebrow: "text-teal",
  },
  violet: {
    border: "before:bg-violet",
    text: "text-violet",
    bullet: "text-violet",
    eyebrow: "text-violet",
  },
  amber: {
    border: "before:bg-amber",
    text: "text-amber",
    bullet: "text-amber",
    eyebrow: "text-amber",
  },
};

export function PortfolioCard({
  vertical,
  color,
  name,
  description,
  stat,
  statLabel,
  bullets,
  note,
  delay = 0,
}: PortfolioCardProps) {
  const palette = PALETTE[color];

  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-md border border-border-visible bg-navy-800/60 p-7 md:p-8",
        "before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:content-['']",
        palette.border,
      )}
    >
      <p
        className={cn(
          "font-mono text-[11px] uppercase tracking-eyebrow",
          palette.eyebrow,
        )}
      >
        {vertical}
      </p>

      <h3 className="mt-3 font-display text-[28px] font-bold uppercase leading-tight tracking-tight text-ink md:text-[32px]">
        {name}
      </h3>

      <p className="mt-4 text-[14px] leading-relaxed text-muted-2">
        {description}
      </p>

      <div className="mt-6 border-y border-border-subtle py-5">
        <p
          className={cn(
            "font-display text-[44px] font-black leading-none tracking-tightest md:text-[52px]",
            palette.text,
          )}
        >
          {stat}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
          {statLabel}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-[13px] leading-relaxed text-ink/85"
          >
            <span
              aria-hidden="true"
              className={cn("mt-[5px] text-[10px]", palette.bullet)}
            >
              ◆
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-border-subtle pt-4 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        {note}
      </p>
    </Reveal>
  );
}
