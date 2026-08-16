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
- Any component that needs scroll-triggered motion registers it inside `useGSAP(() => {...}, { scope: containerRef })` — see `src/components/hero.tsx` and `src/components/scroll-features.tsx` for the pattern (entrance timeline vs. `ScrollTrigger`-gated reveal). Every one of these wraps its animation code in `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {...})` so `prefers-reduced-motion` is respected — do the same for any new GSAP animation.
- Theme is forced dark via `ThemeProvider` (`defaultTheme="dark"`, `enableSystem={false}`) in the root layout, not a hardcoded `dark` class — MagicUI components (like `TextReveal`, `MagicCard`) rely on `dark:` variants / the `next-themes` context for correct contrast, so this must stay set.

### Cursor & motion recipes (`src/components/motion/`)

- `magnetic-button.tsx` / `cursor-follower.tsx` / `parallax.tsx` — GSAP `quickTo()`/`ScrollTrigger` recipes, demoed in `/library`'s "Cursor & Motion" section. `CursorFollower` is mounted once in the root layout (global, like `SiteNav`). All three gate on `matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)")` so they're off for reduced-motion and touch/coarse-pointer users.

## Pages

- [`/library`](src/app/library/page.tsx) catalogs every MagicUI piece installed in this project (buttons, text effects, backgrounds, cards, bento grid, dock, animated beam, orbiting circles, cursor/motion recipes, lists, avatars) as a live reference — pull from it instead of re-installing/re-learning a component for the next page.
- [`/studio`](src/app/studio/page.tsx) is a fictional studio landing page composed entirely from that library (hero, bento services grid, `MagicCard` + `Parallax` work grid, client marquee, closing CTA) — proof the pieces work together in a real composition, not just in isolation. `src/components/logo-marquee.tsx` takes an optional `items` prop so both pages can reuse it with different content.
- `src/components/site-nav.tsx` links to both from every page. Route transitions use React's native `<ViewTransition>` (`src/components/route-transition.tsx`, wrapped around each page's root JSX — not the layout, see below) for a cross-fade on navigation; `src/components/scroll-reset.tsx` (mounted once in the root layout) resets Lenis's scroll position on route change — Lenis otherwise keeps the previous page's scroll offset.

`MagicCard` needs a theme context, so `src/components/theme-provider.tsx` (wrapping `next-themes`) is mounted in the root layout with `defaultTheme="dark"` / `enableSystem={false}` — this replaced the earlier hardcoded `dark` class on `<html>`.

## Deployment

Deployed to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main` — static export (`output: "export"` in `next.config.ts`), no server needed since there are no API routes, Server Actions, or dynamic routes. `next.config.ts`'s `basePath` comes from the `PAGES_BASE_PATH` env var, which `actions/configure-pages` supplies automatically in CI (so it resolves to `/BlueWeb` there); it's `undefined` for local `npm run dev`/`npm run build`, matching the official [nextjs/deploy-github-pages](https://github.com/nextjs/deploy-github-pages) template pattern. To test the exported build locally with the GitHub Pages path: `PAGES_BASE_PATH=/BlueWeb npm run build` (on Windows Git Bash, prefix with `MSYS_NO_PATHCONV=1` or the path gets mangled).

## Accessibility

Scanned with AccessLint's `accessibility-scan` skill (`@accesslint/cli` + `@accesslint/chrome`, run over CDP against a live page — a real WCAG 2.2 rule engine, not a linter heuristic):

```bash
npx -y @accesslint/chrome@latest ensure --download   # one-time managed Chrome
npx -y @accesslint/cli@latest scan "http://localhost:3000" --port 9222 --format json
npx -y @accesslint/chrome@latest stop --all           # tear down when done
```

All three routes currently pass with zero violations. Re-run after any change that touches interactive elements or heading structure — it caught two real bugs during development (see notes below).

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
- TypeScript's null-narrowing on a `const` ref (e.g. `const el = ref.current; if (!el) return;`) does **not** survive into a nested hoisted `function` declaration — only into `const`/arrow function expressions. This only surfaces in `npm run build`'s type-check, not `npm run lint` or the dev server, so always run a full `npm run build` before considering a change done (see `src/components/motion/magnetic-button.tsx`'s `handleMove`/`handleLeave`, which had to be arrow functions for this reason).
- GSAP's `quickTo(el, "scale", ...)` combined with `quickTo`-ing `x`/`y` on the same element logs "scale not eligible for reset" on revert — split into separate `scaleX`/`scaleY` `quickTo` calls instead (see `cursor-follower.tsx`).
- `<Parallax>` layers: if a scrub `ScrollTrigger` on a freshly-added instance doesn't seem to pick up (no inline `transform` applied), clear `.next` and restart the dev server before assuming it's a code bug — Turbopack HMR state got stale enough during iteration to reliably reproduce a "second instance never animates" symptom that a clean restart resolved every time.
- **View Transitions need no config flag in Next.js 16** — `experimental.viewTransition` (documented by the `vercel-react-view-transitions` skill, presumably accurate for an earlier Next version) errors as an unrecognized key here; per Next's own bundled docs (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`), the App Router supports `<ViewTransition>` out of the box. Always cross-check a skill's setup step against the framework's own bundled docs when they're this version-specific.
- `<ViewTransition>` must be the outermost element of each page's returned JSX (before any DOM nodes) for `enter`/`exit` to fire, and it belongs in each `page.tsx`, not the root layout — layouts persist across navigations and never unmount, so a layout-level wrapper's enter/exit never retriggers. See `route-transition.tsx` and how `page.tsx`/`library/page.tsx`/`studio/page.tsx` each wrap their `<main>` in it.
- `ShimmerButton` wrapped in `<Link>` nested a `<button>` inside an `<a>` — invalid HTML, breaks keyboard/screen-reader nav (WCAG 4.1.2), caught by `accessibility-scan`. Fixed by adding `asChild` to `ShimmerButton`: since it renders multiple decorative sibling `<div>`s alongside `children` (not just one), Radix `Slot` can't merge props onto it (`Slot` needs exactly one child) — used `React.cloneElement` instead, moving the decoration *inside* the child's own children rather than as siblings. Any future "button-as-link" component needs the same treatment if it has decorative markup beyond `children`.
- Section headings must increase by one level with no skips (`h1` → `h2` → `h3`, never `h1` → `h3`) — `accessibility-scan` flagged `ScrollFeatures`' `<h3>` feature-card titles on the homepage, which had no `<h2>` before them (unlike `/library` and `/studio`, which have visible section labels as `<h2>`). Fixed by changing them to `<h2>`.
