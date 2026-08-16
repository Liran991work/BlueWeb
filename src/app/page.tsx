import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { RouteTransition } from "@/components/route-transition";
import { ScrollFeatures } from "@/components/scroll-features";
import { TextReveal } from "@/components/ui/text-reveal";

export default function Home() {
  return (
    <RouteTransition>
      <main className="bg-black text-white">
        <Hero />
        <LogoMarquee />
        <ScrollFeatures />
        <TextReveal>
          Smooth scroll, scroll-triggered motion, and reusable UI: this is the
          baseline every BlueWeb build starts from.
        </TextReveal>
        <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/40">
          Built with GSAP, Lenis, and MagicUI.
        </footer>
      </main>
    </RouteTransition>
  );
}
