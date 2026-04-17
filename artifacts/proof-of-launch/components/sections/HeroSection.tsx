import { Reveal } from "@/components/Reveal";
import { JourneyCard } from "@/components/JourneyCard";
import { renderInlineMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/cn";

type HeadlineLine = {
  text: string;
  style: "solid-white" | "solid-teal" | "outline-only" | string;
};

type HeroProps = {
  hero: {
    eyebrow: string;
    headline: { lines: HeadlineLine[] };
    subhead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    journeyCard: {
      header: string;
      steps: Array<{
        num: string;
        color: string;
        colorHex?: string;
        title: string;
        description: string;
        tag: string;
      }>;
    };
  };
};

export function HeroSection({ hero }: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border-subtle pt-28 md:pt-36"
      aria-labelledby="hero-headline"
    >
      {/* Background overlays */}
      <div className="bg-page-overlay absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-teal/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-violet/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-24 md:px-8 md:pb-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
        <div className="flex flex-col">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-teal">
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-headline"
              className="mt-6 font-display text-[56px] font-black uppercase leading-[0.92] tracking-tightest sm:text-[80px] md:text-[104px] lg:text-[128px]"
            >
              {hero.headline.lines.map((line, i) => (
                <span key={i} className="block">
                  <span className={getHeadlineStyle(line.style)}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-2 md:text-lg">
              {renderInlineMarkdown(hero.subhead)}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={hero.primaryCta.href}
                className="bracket-clip inline-flex h-12 items-center bg-teal px-8 font-mono text-[12px] uppercase tracking-eyebrow text-navy-900 transition-colors hover:bg-teal-bright"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex h-12 items-center border-b border-muted px-1 font-mono text-[12px] uppercase tracking-eyebrow text-ink transition-colors hover:border-teal hover:text-teal"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:pt-12">
          <JourneyCard
            header={hero.journeyCard.header}
            steps={hero.journeyCard.steps}
          />
        </div>
      </div>
    </section>
  );
}

function getHeadlineStyle(style: string): string {
  switch (style) {
    case "solid-white":
      return cn("text-ink");
    case "solid-teal":
      return cn("text-teal");
    case "outline-only":
      return cn(
        "text-transparent [-webkit-text-stroke:1.5px_#EFF6FF] [text-stroke:1.5px_#EFF6FF]",
      );
    default:
      return "text-ink";
  }
}
