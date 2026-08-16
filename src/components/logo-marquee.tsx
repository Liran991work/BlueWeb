import { Marquee } from "@/components/ui/marquee";

const ITEMS = ["GSAP", "Lenis", "MagicUI", "Next.js", "Tailwind", "shadcn/ui"];

export function LogoMarquee() {
  return (
    <div className="border-y border-white/10 bg-white/[0.02] py-8">
      <Marquee pauseOnHover className="[--duration:25s]">
        {ITEMS.map((item) => (
          <span
            key={item}
            className="mx-6 text-2xl font-semibold text-white/30"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
