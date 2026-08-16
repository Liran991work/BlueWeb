import { MagneticButton } from "@/components/motion/magnetic-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function StudioCta() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
        Let&apos;s build something worth showing off.
      </h2>
      <p className="mt-4 text-white/50">
        Available for select projects starting next quarter.
      </p>
      <div className="mt-10 inline-block">
        <MagneticButton>
          <ShimmerButton>
            <span className="text-sm font-medium">Get in touch</span>
          </ShimmerButton>
        </MagneticButton>
      </div>
    </section>
  );
}
