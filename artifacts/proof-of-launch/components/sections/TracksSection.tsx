import { Reveal } from "@/components/Reveal";
import { TrackCard, type TrackColor } from "@/components/TrackCard";

type Track = {
  id: string;
  number: string;
  name: string;
  color: string;
  icon: string;
  bgText: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
};

type TracksSectionProps = {
  tracksSection: {
    eyebrow: string;
    headline: string;
    subhead: string;
    tracks: Track[];
  };
};

export function TracksSection({ tracksSection }: TracksSectionProps) {
  const { eyebrow, headline, subhead, tracks } = tracksSection;

  return (
    <section
      id="tracks"
      className="relative border-b border-border-subtle py-24 md:py-32"
      aria-labelledby="tracks-headline"
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
              id="tracks-headline"
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

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {tracks.map((track, i) => (
            <TrackCard
              key={track.id}
              number={track.number}
              name={track.name}
              color={track.color as TrackColor}
              icon={track.icon}
              bgText={track.bgText}
              tagline={track.tagline}
              features={track.features}
              cta={track.cta}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
