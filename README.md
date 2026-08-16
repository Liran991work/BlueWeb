# BlueWeb

Next.js 16 (App Router, Turbopack) + Tailwind v4 + shadcn/ui, wired with:

- **[GSAP](https://gsap.com)** — timeline animation + `ScrollTrigger` for scroll-driven reveals. Used through the `@gsap/react` `useGSAP()` hook, which auto-cleans up on unmount/Strict Mode.
- **[Lenis](https://lenis.dev)** — smooth scroll, mounted once in [`src/components/smooth-scroll.tsx`](src/components/smooth-scroll.tsx) and driven from GSAP's own `gsap.ticker` so Lenis and `ScrollTrigger` always agree on scroll position.
- **[MagicUI](https://magicui.design)** — copy-paste, shadcn-flavored components (`shimmer-button`, `text-reveal`, `marquee`, `particles`, `animated-gradient-text`) living in `src/components/ui/`. Add more with:

  ```bash
  npx shadcn@latest add "@magicui/<component-name>"
  ```

## How the pieces connect

- `src/app/layout.tsx` wraps `{children}` in `<SmoothScroll>`, so every route gets Lenis smooth scroll for free.
- `SmoothScroll` (`src/components/smooth-scroll.tsx`) registers `ScrollTrigger`, ticks Lenis from `gsap.ticker`, and disables `autoRaf` on Lenis so there's a single animation loop.
- Any component that needs scroll-triggered motion registers it inside `useGSAP(() => {...}, { scope: containerRef })` — see `src/components/hero.tsx` and `src/components/scroll-features.tsx` for the pattern (entrance timeline vs. `ScrollTrigger`-gated reveal).
- The `dark` class is set on `<html>` in the root layout because the whole site is designed dark-first — MagicUI components (like `TextReveal`) use `dark:` variants for their color states, so this must stay set for correct contrast.

## Component library

[`/library`](src/app/library/page.tsx) catalogs every MagicUI piece installed in this project (buttons, text effects, backgrounds, cards, bento grid, dock, animated beam, orbiting circles, lists, avatars) as a live reference — pull from it instead of re-installing/re-learning a component for the next page. `src/components/site-nav.tsx` links to it from every page.

`MagicCard` needs a theme context, so `src/components/theme-provider.tsx` (wrapping `next-themes`) is mounted in the root layout with `defaultTheme="dark"` / `enableSystem={false}` — this replaced the earlier hardcoded `dark` class on `<html>`.

## Commands

```bash
npm run dev     # start dev server (Turbopack)
npm run build   # production build
npm run lint    # ESLint (includes the react-hooks/refs rule)
```

## Notes / gotchas found while wiring this up

- `globals.css`'s `--font-sans` must point at the actual font variable from `next/font` (`--font-geist-sans` here) — shadcn's `init` scaffolds a generic `--font-sans: var(--font-sans)` placeholder that resolves to nothing on its own.
- MagicUI's `Particles` component assigns to refs during render, which trips the newer `react-hooks/refs` ESLint rule; fixed here by moving that assignment into a `useLayoutEffect` (runs before the mount effect that reads it, so behavior is unchanged).
- Several other MagicUI components shipped code that this project's ESLint config (the new React Compiler rules: `react-hooks/purity`, `react-hooks/set-state-in-effect`, `react-hooks/refs`) flags as errors — fixed in place rather than suppressed:
  - `dot-pattern.tsx` called `Math.random()` during render; replaced with a seeded deterministic pseudo-random function (same visual variety, but pure).
  - `magic-card.tsx` used the classic `useState(false)` + `useEffect(() => setMounted(true))` "hasMounted" trick; replaced with `useSyncExternalStore` (React's blessed way to do this without an extra render/commit).
  - `typing-animation.tsx` reset its animation state in a `useEffect` keyed on a derived prop; replaced with the ["adjust state during render"](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes) pattern (`useState` tracking the previous key, not a ref — refs can't be read/written during render either).
  - `bento-grid.tsx`'s CTA link and the library page's homepage link had to use `next/link`'s `Link`, not a raw `<a>`, per `@next/next/no-html-link-for-pages`.
- When adding more MagicUI components, run `npm run lint` right after — expect to hit one or more of the above patterns and fix them the same way rather than disabling the rule.
