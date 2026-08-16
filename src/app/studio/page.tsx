import { LogoMarquee } from "@/components/logo-marquee";
import { RouteTransition } from "@/components/route-transition";
import { ServicesGrid } from "@/components/studio/services-grid";
import { StudioCta } from "@/components/studio/studio-cta";
import { StudioHero } from "@/components/studio/studio-hero";
import { WorkGrid } from "@/components/studio/work-grid";

const CLIENTS = ["Nova", "Arc", "Lumen", "Fieldnote", "Halo", "Kepler"];

export default function StudioPage() {
  return (
    <RouteTransition>
      <main className="bg-black text-white">
        <StudioHero />
        <LogoMarquee items={CLIENTS} />
        <ServicesGrid />
        <WorkGrid />
        <StudioCta />
        <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/40">
          BlueWeb Studio: a fictional page proving the component library
          works together.
        </footer>
      </main>
    </RouteTransition>
  );
}
