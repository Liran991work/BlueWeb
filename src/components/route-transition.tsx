import { ViewTransition } from "react";

/**
 * Wraps a page's root content in a native View Transition for a cross-fade
 * on navigation. Lateral navigation between sibling routes (/, /library,
 * /studio) has no spatial hierarchy to communicate, so this is a bare fade
 * rather than a directional slide — see the vercel-react-view-transitions
 * skill's "Choosing Animation Style" table.
 *
 * Placed per-page (not in the root layout): a layout-level wrapper doesn't
 * reliably fire enter/exit since the layout itself never unmounts. Must be
 * the outermost element of the page's returned JSX (before any DOM nodes)
 * for enter/exit to activate.
 */
export function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
      {children}
    </ViewTransition>
  );
}
