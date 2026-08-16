import { Parallax } from "@/components/motion/parallax";
import { MagicCard } from "@/components/ui/magic-card";

const WORK = [
  { title: "Nova Finance", tag: "Fintech · Web App", emoji: "💠" },
  { title: "Arc Studio", tag: "Creative Agency · Brand", emoji: "🔺" },
  { title: "Lumen", tag: "Hardware · E-commerce", emoji: "🔆" },
  { title: "Fieldnote", tag: "SaaS · Product", emoji: "📝" },
];

export function WorkGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
        Selected Work
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {WORK.map((item) => (
          <MagicCard key={item.title} className="rounded-2xl p-0">
            <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-white/[0.03]">
              <Parallax speed={0.2} className="absolute inset-0">
                <div className="flex h-full items-center justify-center text-6xl">
                  {item.emoji}
                </div>
              </Parallax>
            </div>
            <div className="p-6">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-white/50">{item.tag}</p>
            </div>
          </MagicCard>
        ))}
      </div>
    </section>
  );
}
