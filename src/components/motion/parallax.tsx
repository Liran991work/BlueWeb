"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useId, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps its children and translates them vertically as the wrapper crosses
 * the viewport, scrubbed to scroll position, for a depth/parallax effect.
 */
export function Parallax({
  children,
  speed = 0.3,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const id = useId();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(target.current, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            id: `parallax-${id}`,
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: container, dependencies: [speed] },
  );

  return (
    <div ref={container} className={cn("overflow-hidden", className)}>
      <div ref={target} className="size-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
