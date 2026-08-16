"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Resets Lenis's scroll position on route change — Lenis otherwise
 * preserves scroll offset across client-side navigations, which reads as
 * broken on a page of different length. Mounted once in the root layout.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
