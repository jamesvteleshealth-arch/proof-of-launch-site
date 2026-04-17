import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { HeroSection } from "@/components/sections/HeroSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { LaunchOpsSection } from "@/components/sections/LaunchOpsSection";
import { StudioSection } from "@/components/sections/StudioSection";
import { DevicesSection } from "@/components/sections/DevicesSection";
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
      <PortfolioSection portfolio={content.portfolio} />
      <LaunchOpsSection launchOpsSection={content.launchOpsSection} />
      <StudioSection studioSection={content.studioSection} />
      <DevicesSection devicesSection={content.devicesSection} />
    </main>
  );
}
