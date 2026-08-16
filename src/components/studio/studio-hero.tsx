"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function StudioHero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".studio-eyebrow", { y: -16, opacity: 0, duration: 0.6 })
          .from(
            ".studio-word",
            { yPercent: 120, opacity: 0, stagger: 0.05, duration: 0.9 },
            "-=0.3",
          )
          .from(
            ".studio-sub",
            { y: 20, opacity: 0, duration: 0.7 },
            "-=0.5",
          )
          .from(
            ".studio-cta",
            { y: 20, opacity: 0, duration: 0.6 },
            "-=0.4",
          );
      });
    },
    { scope: container },
  );

  const headline = "We design digital products that move.".split(" ");

  return (
    <section
      ref={container}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <DotPattern
        glow
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
      />

      <div className="studio-eyebrow mb-6 text-sm tracking-[0.3em] text-white/40 uppercase">
        BlueWeb Studio
      </div>

      <h1 className="max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight md:text-7xl">
        <span className="inline-flex flex-wrap justify-center gap-x-4">
          {headline.map((word, i) => (
            <span key={i} className="overflow-hidden py-1">
              <span className="studio-word inline-block">{word}</span>
            </span>
          ))}
        </span>
      </h1>

      <p className="studio-sub mt-6 max-w-xl text-balance text-lg text-white/60">
        A fictional studio landing page, composed entirely from BlueWeb&apos;s
        component library — proof the pieces work together.
      </p>

      <div className="studio-cta mt-10">
        <MagneticButton>
          <RainbowButton>Start a project</RainbowButton>
        </MagneticButton>
      </div>
    </section>
  );
}
