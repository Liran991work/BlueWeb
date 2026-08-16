"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Skips the entrance animation entirely under prefers-reduced-motion —
      // elements just render in their final (non-`.from()`) state.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-badge", { y: -16, opacity: 0, duration: 0.6 })
          .from(
            ".hero-word",
            { yPercent: 120, opacity: 0, stagger: 0.06, duration: 0.9 },
            "-=0.3",
          )
          .from(
            ".hero-sub",
            { y: 20, opacity: 0, duration: 0.7 },
            "-=0.5",
          )
          .from(
            ".hero-cta",
            { y: 20, opacity: 0, duration: 0.6 },
            "-=0.4",
          );
      });
    },
    { scope: container },
  );

  const headline = "Websites built at the highest level.".split(" ");

  return (
    <section
      ref={container}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <Particles
        className="absolute inset-0 -z-10"
        quantity={140}
        color="#ffffff"
        ease={60}
      />

      <div className="hero-badge mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur">
        <AnimatedGradientText>GSAP, Lenis &amp; MagicUI</AnimatedGradientText>
      </div>

      <h1 className="max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight md:text-7xl">
        <span className="inline-flex flex-wrap justify-center gap-x-4">
          {headline.map((word, i) => (
            <span key={i} className="overflow-hidden py-1">
              <span className="hero-word inline-block">{word}</span>
            </span>
          ))}
        </span>
      </h1>

      <p className="hero-sub mt-6 max-w-xl text-balance text-lg text-white/60">
        A starter wired end-to-end: Lenis smooth scroll driven by GSAP&apos;s
        ticker, ScrollTrigger-powered reveals, and MagicUI components on top.
      </p>

      <div className="hero-cta mt-10">
        <ShimmerButton asChild>
          <Link href="/library">
            <span className="text-sm font-medium">Explore the library</span>
          </Link>
        </ShimmerButton>
      </div>
    </section>
  );
}
