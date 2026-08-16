"use client";

import { useRef, type RefObject } from "react";

import { AnimatedBeam } from "@/components/ui/animated-beam";

function Node({
  nodeRef,
  label,
}: {
  nodeRef: RefObject<HTMLDivElement | null>;
  label: string;
}) {
  return (
    <div
      ref={nodeRef}
      className="z-10 flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-medium"
    >
      {label}
    </div>
  );
}

export function BeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-32 w-full items-center justify-between px-8"
    >
      <Node nodeRef={fromRef} label="A" />
      <Node nodeRef={toRef} label="B" />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
      />
    </div>
  );
}
