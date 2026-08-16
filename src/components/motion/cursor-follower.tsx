"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/**
 * A global cursor dot that follows the mouse and scales up over any element
 * marked `data-cursor-hover`. Mount once near the app root. Off on touch/
 * coarse-pointer devices and under prefers-reduced-motion.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = dotRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
      () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
        // Split scale into scaleX/scaleY — quickTo-ing the shorthand "scale"
        // alongside x/y logs "scale not eligible for reset" on revert.
        const scaleXTo = gsap.quickTo(el, "scaleX", {
          duration: 0.3,
          ease: "power2",
        });
        const scaleYTo = gsap.quickTo(el, "scaleY", {
          duration: 0.3,
          ease: "power2",
        });

        function handleMove(e: MouseEvent) {
          xTo(e.clientX);
          yTo(e.clientY);
        }

        function handleOver(e: MouseEvent) {
          const hovering = (e.target as HTMLElement)?.closest?.(
            "[data-cursor-hover]",
          );
          const scale = hovering ? 2.5 : 1;
          scaleXTo(scale);
          scaleYTo(scale);
        }

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseover", handleOver);

        return () => {
          window.removeEventListener("mousemove", handleMove);
          window.removeEventListener("mouseover", handleOver);
        };
      },
    );
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-100 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
    />
  );
}
