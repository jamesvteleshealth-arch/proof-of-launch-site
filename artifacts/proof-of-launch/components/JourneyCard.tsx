import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Step = {
  num: string;
  color: string;
  colorHex?: string;
  title: string;
  description: string;
  tag: string;
};

type JourneyCardProps = {
  header: string;
  steps: Step[];
};

const COLOR_MAP: Record<string, { text: string; ring: string; bg: string }> = {
  amber: {
    text: "text-amber",
    ring: "ring-amber/30",
    bg: "bg-amber/10",
  },
  violet: {
    text: "text-violet",
    ring: "ring-violet/30",
    bg: "bg-violet/10",
  },
  teal: {
    text: "text-teal",
    ring: "ring-teal/30",
    bg: "bg-teal/10",
  },
  green: {
    text: "text-green",
    ring: "ring-green/30",
    bg: "bg-green/10",
  },
};

export function JourneyCard({ header, steps }: JourneyCardProps) {
  return (
    <Reveal
      as="aside"
      className="relative w-full max-w-md rounded-md border border-border-visible bg-navy-800/70 p-5 shadow-2xl backdrop-blur-sm md:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber via-violet to-teal" />
      <p className="mb-4 font-mono text-[11px] uppercase tracking-eyebrow text-muted-2">
        {header}
      </p>
      <ol className="space-y-4">
        {steps.map((step) => {
          const palette = COLOR_MAP[step.color] ?? COLOR_MAP.teal;
          return (
            <li key={step.num} className="flex gap-4">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-medium ring-1",
                  palette.text,
                  palette.bg,
                  palette.ring,
                )}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <div className="flex-1">
                <p
                  className={cn(
                    "font-display text-base font-bold leading-tight tracking-tight",
                    palette.text,
                  )}
                >
                  {step.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-2">
                  {step.description}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                  {step.tag}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
