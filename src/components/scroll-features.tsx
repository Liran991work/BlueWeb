"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "GSAP",
    body: "Timeline-driven animation for anything DOM, SVG, or canvas. This whole page's motion runs through it.",
  },
  {
    title: "Lenis",
    body: "Wraps native scroll for buttery inertia while staying accessible and compatible with sticky/fixed layout.",
  },
  {
    title: "MagicUI",
    body: "Copy-paste, shadcn-flavored components (buttons, text effects, backgrounds) for polish without the rebuild.",
  },
];

export function ScrollFeatures() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".feature-card", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="mx-auto grid max-w-5xl gap-6 px-6 py-32 md:grid-cols-2"
    >
      {FEATURES.map((f, i) => (
        <div
          key={f.title}
          className={`feature-card rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur ${
            i === 0 ? "md:col-span-2 md:p-10" : ""
          }`}
        >
          <h2 className={i === 0 ? "text-2xl font-semibold" : "text-xl font-semibold"}>
            {f.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/60">{f.body}</p>
        </div>
      ))}
    </section>
  );
}
