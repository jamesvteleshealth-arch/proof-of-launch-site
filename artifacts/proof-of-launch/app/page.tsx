import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/sections/HeroSection";
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
    </main>
  );
}
