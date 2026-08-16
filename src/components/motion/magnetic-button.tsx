"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Wraps its children (typically a button/link) and pulls them toward the
 * cursor within the wrapper's bounds, springing back on mouse leave.
 */
export function MagneticButton({
  children,
  strength = 0.4,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

        const handleMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((e.clientX - rect.left - rect.width / 2) * strength);
          yTo((e.clientY - rect.top - rect.height / 2) * strength);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
          el.removeEventListener("mousemove", handleMove);
          el.removeEventListener("mouseleave", handleLeave);
        };
      });
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
