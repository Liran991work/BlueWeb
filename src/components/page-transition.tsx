"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Fades/shifts route content in and out on navigation, and resets Lenis's
 * scroll position — Lenis otherwise preserves scroll offset across
 * client-side route changes, which reads as broken on a page of different
 * length. `initial={false}` skips animating the very first page load.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.35,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
