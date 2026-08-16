import { Code2, Palette, Wand2 } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const SERVICES = [
  {
    name: "Brand",
    Icon: Palette,
    description: "Identity systems built to hold up across every surface.",
    gradient: "from-pink-500/10",
  },
  {
    name: "Web",
    Icon: Code2,
    description: "Fast, animated, accessible sites — like this one.",
    gradient: "from-blue-500/10",
  },
  {
    name: "Motion",
    Icon: Wand2,
    description: "GSAP-driven interaction design, from micro to macro.",
    gradient: "from-purple-500/10",
  },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
        Services
      </h2>
      <BentoGrid className="mt-6 auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-3">
        {SERVICES.map(({ name, Icon, description, gradient }) => (
          <BentoCard
            key={name}
            name={name}
            Icon={Icon}
            description={description}
            href="#"
            cta="Learn more"
            className="col-span-1"
            background={
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent`}
              />
            }
          />
        ))}
      </BentoGrid>
    </section>
  );
}
