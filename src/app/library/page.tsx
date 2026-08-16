import Link from "next/link";
import {
  Bell,
  Code2,
  Home,
  Mail,
  Palette,
  Rocket,
  Search,
  Settings,
  Sparkles,
  Wand2,
} from "lucide-react";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedList } from "@/components/ui/animated-list";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Dock, DockIcon } from "@/components/ui/dock";
import { DotPattern } from "@/components/ui/dot-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Particles } from "@/components/ui/particles";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BeamDemo } from "@/components/demo/beam-demo";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Parallax } from "@/components/motion/parallax";
import { ShowcaseCard } from "@/components/showcase-card";

const AVATARS = [
  { imageUrl: "https://i.pravatar.cc/80?img=1", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/80?img=2", profileUrl: "#" },
  { imageUrl: "https://i.pravatar.cc/80?img=3", profileUrl: "#" },
];

const NOTIFICATIONS = ["New signup", "Payment received", "Deploy succeeded"];

const DOCK_ICONS = [Home, Search, Bell, Mail, Settings];

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Component Library
        </h1>
        <p className="mt-3 max-w-xl text-white/50">
          Every MagicUI piece installed in this project, in one place: a
          reference for building the next BlueWeb page without starting from
          scratch.
        </p>

        {/* Buttons */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Buttons
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ShowcaseCard title="Shimmer Button">
              <ShimmerButton>
                <span className="text-sm font-medium">Get started</span>
              </ShimmerButton>
            </ShowcaseCard>
            <ShowcaseCard title="Rainbow Button">
              <RainbowButton>Subscribe</RainbowButton>
            </ShowcaseCard>
          </div>
        </section>

        {/* Text */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Text
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ShowcaseCard title="Animated Gradient Text">
              <span className="rounded-full border border-white/10 px-4 py-1.5 text-sm">
                <AnimatedGradientText>
                  Now shipping v2.0
                </AnimatedGradientText>
              </span>
            </ShowcaseCard>
            <ShowcaseCard title="Typing Animation">
              <TypingAnimation className="text-xl font-semibold">
                Built for speed.
              </TypingAnimation>
            </ShowcaseCard>
            <ShowcaseCard title="Number Ticker">
              <span className="text-4xl font-bold">
                <NumberTicker value={247} />
              </span>
            </ShowcaseCard>
            <ShowcaseCard title="Text Reveal" description="Full scroll-driven version lives on the homepage (needs 200vh of scroll room to work).">
              <Link href="/" className="text-sm text-white/50 underline underline-offset-4 hover:text-white">
                See it on the homepage →
              </Link>
            </ShowcaseCard>
          </div>
        </section>

        {/* Backgrounds */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Backgrounds
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ShowcaseCard title="Particles" previewClassName="h-48">
              <Particles className="absolute inset-0" quantity={80} color="#ffffff" />
            </ShowcaseCard>
            <ShowcaseCard title="Dot Pattern" previewClassName="h-48">
              <DotPattern glow className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
            </ShowcaseCard>
          </div>
        </section>

        {/* Cards & effects */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Cards &amp; Effects
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ShowcaseCard title="Magic Card (gradient)" description="Move your cursor over it.">
              <MagicCard className="flex h-32 w-full items-center justify-center p-4">
                <span className="text-sm text-white/70">Hover me</span>
              </MagicCard>
            </ShowcaseCard>
            <ShowcaseCard title="Magic Card (orb)" description="Move your cursor over it.">
              <MagicCard mode="orb" className="flex h-32 w-full items-center justify-center p-4">
                <span className="text-sm text-white/70">Hover me</span>
              </MagicCard>
            </ShowcaseCard>
            <ShowcaseCard
              title="Border Beam"
              className="sm:col-span-2"
              previewClassName="h-32"
            >
              <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-white/10">
                <span className="text-sm text-white/70">
                  Wrap any bordered container
                </span>
                <BorderBeam duration={6} size={100} />
              </div>
            </ShowcaseCard>
          </div>
        </section>

        {/* Layout */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Layout
          </h2>
          <div className="mt-4 space-y-4">
            <ShowcaseCard title="Bento Grid" previewClassName="h-auto p-0 bg-transparent border-none">
              <BentoGrid className="auto-rows-[10rem] grid-cols-1 gap-4 sm:grid-cols-3">
                <BentoCard
                  name="Fast"
                  Icon={Rocket}
                  description="Turbopack dev server, instant refresh."
                  href="#"
                  cta="Learn more"
                  className="col-span-1"
                  background={<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />}
                />
                <BentoCard
                  name="Animated"
                  Icon={Wand2}
                  description="GSAP + Motion under one roof."
                  href="#"
                  cta="Learn more"
                  className="col-span-1"
                  background={<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />}
                />
                <BentoCard
                  name="Composable"
                  Icon={Code2}
                  description="Every piece is source you own."
                  href="#"
                  cta="Learn more"
                  className="col-span-1"
                  background={<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />}
                />
              </BentoGrid>
            </ShowcaseCard>

            <ShowcaseCard title="Dock" previewClassName="h-28">
              <Dock>
                {DOCK_ICONS.map((Icon, i) => (
                  <DockIcon key={i} className="bg-white/5">
                    <Icon className="size-5" />
                  </DockIcon>
                ))}
              </Dock>
            </ShowcaseCard>
          </div>
        </section>

        {/* Composition */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Composition
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ShowcaseCard title="Animated Beam" previewClassName="h-40">
              <BeamDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Orbiting Circles" previewClassName="h-56">
              <div className="relative flex size-full items-center justify-center">
                <Sparkles className="size-8" />
                <OrbitingCircles radius={70} iconSize={28}>
                  <Palette className="size-5" />
                  <Code2 className="size-5" />
                  <Wand2 className="size-5" />
                </OrbitingCircles>
              </div>
            </ShowcaseCard>
          </div>
        </section>

        {/* Cursor & motion */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Cursor &amp; Motion
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ShowcaseCard
              title="Magnetic Button"
              description="Move your cursor near the button."
            >
              <MagneticButton>
                <ShimmerButton>
                  <span className="text-sm font-medium">Pull me</span>
                </ShimmerButton>
              </MagneticButton>
            </ShowcaseCard>
            <ShowcaseCard
              title="Cursor Follower"
              description="Global effect, mounted once in the layout. Hover this box."
            >
              <div
                data-cursor-hover
                className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-white/15 text-sm text-white/50"
              >
                Hover here
              </div>
            </ShowcaseCard>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-sm font-semibold text-white/80">Parallax</h3>
            <p className="mt-1 text-xs text-white/40">
              Scroll past this section: the two layers move at different
              speeds.
            </p>
            <div className="relative mt-5 h-72 overflow-hidden rounded-xl border border-white/5 bg-black/40">
              <Parallax speed={0.15} className="absolute inset-0">
                <div className="flex h-full items-center justify-center text-6xl">
                  🌙
                </div>
              </Parallax>
              <Parallax speed={0.4} className="absolute inset-0">
                <div className="flex h-full items-end justify-center pb-6 text-sm text-white/50">
                  Foreground layer
                </div>
              </Parallax>
            </div>
          </div>
        </section>

        {/* Lists & social proof */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Lists &amp; Social Proof
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ShowcaseCard title="Animated List" previewClassName="h-40 items-start">
              <AnimatedList delay={1200}>
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    {n}
                  </div>
                ))}
              </AnimatedList>
            </ShowcaseCard>
            <ShowcaseCard title="Avatar Circles">
              <AvatarCircles numPeople={99} avatarUrls={AVATARS} />
            </ShowcaseCard>
          </div>
        </section>
      </div>
    </main>
  );
}
