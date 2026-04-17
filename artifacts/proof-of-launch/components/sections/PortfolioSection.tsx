import { Reveal } from "@/components/Reveal";
import {
  PortfolioCard,
  type PortfolioColor,
} from "@/components/PortfolioCard";

type PortfolioCardData = {
  id: string;
  vertical: string;
  color: string;
  name: string;
  description: string;
  stat: string;
  statLabel: string;
  bullets: string[];
  note: string;
};

type PortfolioSectionProps = {
  portfolio: {
    eyebrow: string;
    headline: string;
    subhead: string;
    cards: PortfolioCardData[];
    closer: { icon: string; title: string; text: string };
  };
};

export function PortfolioSection({ portfolio }: PortfolioSectionProps) {
  const { eyebrow, headline, subhead, cards, closer } = portfolio;

  return (
    <section
      id="portfolio"
      className="relative border-b border-border-subtle py-24 md:py-32"
      aria-labelledby="portfolio-headline"
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
              id="portfolio-headline"
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

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <PortfolioCard
              key={card.id}
              vertical={card.vertical}
              color={card.color as PortfolioColor}
              name={card.name}
              description={card.description}
              stat={card.stat}
              statLabel={card.statLabel}
              bullets={card.bullets}
              note={card.note}
              delay={i * 100}
            />
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col gap-5 rounded-md border border-border-visible bg-navy-800/40 p-8 md:flex-row md:items-start md:gap-7 md:p-10">
            <span
              aria-hidden="true"
              className="text-3xl leading-none md:text-4xl"
            >
              {closer.icon}
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
                {closer.title}
              </h3>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-2">
                {closer.text}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
