import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { HeroSection } from "@/components/sections/HeroSection";
import { TracksSection } from "@/components/sections/TracksSection";
import content from "@/content/content.json";

export default function HomePage() {
  return (
    <main>
      <Nav
        logo={content.nav.logo}
        links={content.nav.links}
        cta={content.nav.cta}
      />
      <HeroSection hero={content.hero} />
      <Marquee
        items={content.marquee.items}
        animationSpeed={content.marquee.animationSpeed}
      />
      <TracksSection tracksSection={content.tracksSection} />
    </main>
  );
}
