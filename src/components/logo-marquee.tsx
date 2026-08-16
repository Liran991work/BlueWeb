import { Marquee } from "@/components/ui/marquee";

const DEFAULT_ITEMS = [
  "GSAP",
  "Lenis",
  "MagicUI",
  "Next.js",
  "Tailwind",
  "shadcn/ui",
];

export function LogoMarquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  return (
    <div className="border-y border-white/10 bg-white/[0.02] py-8">
      <Marquee pauseOnHover className="[--duration:25s]">
        {items.map((item) => (
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
