import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ShowcaseCard({
  title,
  description,
  children,
  className,
  previewClassName,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  previewClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.02] p-6",
        className,
      )}
    >
      <h3 className="text-sm font-semibold text-white/80">{title}</h3>
      {description ? (
        <p className="mt-1 text-xs text-white/40">{description}</p>
      ) : null}
      <div
        className={cn(
          "relative mt-5 flex min-h-32 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-black/40 p-6",
          previewClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
