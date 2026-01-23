"use client";

import Link from "next/link";
import AppDevOrb from "@/components/visuals/AppDevOrb";
import type { Variants } from "framer-motion";
import { motion, useInView, easeOut, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import LeadForm from "@/components/forms/LeadForm";
import PrivacySettingsLink from "@/components/analytics/PrivacySettingsLink";
import TrackServiceView from "@/components/analytics/TrackServiceView";
import {
  Smartphone,
  Globe,
  LayoutTemplate,
  Activity,
  Search,
  PenTool,
  Code2,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Users,
  Gauge,
  Layers,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import * as React from "react";
import { useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Motion helpers (typed)
────────────────────────────────────────────────────────────── */
const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: i * 0.08 },
  }),
};

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full py-16 md:py-24 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <motion.div
        variants={sectionFadeUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
────────────────────────────────────────────────────────────── */
export default function AppDevelopmentPage() {
  return (
    <main className="min-h-screen bg-[#060812] text-white selection:bg-white/10">
      <SiteHeader />
      <TrackServiceView slug="app-development" name="App Development" />
      <HeroAppDev />
      <Foundation />
      <Process />
      <ResultsImpact />
      <CaseStudies />
      <WhyChoose />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO – Mobile-first (Text OVER Orb)
────────────────────────────────────────────────────────────── */
function HeroAppDev() {
  return (
    <section
      id="hero"
      aria-label="App Development hero"
      className="relative overflow-hidden bg-[#050812] pt-24 text-white md:pt-28"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(122,77,255,0.20),transparent_62%),radial-gradient(900px_520px_at_60%_40%,rgba(25,214,255,0.12),transparent_64%),linear-gradient(to_bottom,#04060d,#050812,#04060d)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.56)_55%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-0 opacity-[0.09] bg-[radial-gradient(rgba(255,255,255,0.40)_1px,transparent_1px)] bg-size-[36px_36px]" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-size-[140px_140px]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-20 lg:px-10">
        <div className="relative grid place-items-center">
          {/* ORB STAGE */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="relative w-full max-w-[920px] overflow-visible pt-4 sm:pt-6 md:pt-8"
          >
            {/* glow behind orb */}
            <div className="pointer-events-none absolute left-1/2 top-[44%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.18),transparent_62%)] blur-[120px]" />
            <div className="pointer-events-none absolute left-1/2 top-[44%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.12),transparent_64%)] blur-[120px]" />

            {/* orb */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-[760px] sm:max-w-[780px] md:max-w-[820px] -my-6 sm:-my-8 md:-my-10 overflow-visible"
            >
              <AppDevOrb />
            </motion.div>

            {/* contrast veil behind TEXT zone */}
            <div className="pointer-events-none absolute left-1/2 top-[76%] h-[420px] w-[min(980px,100%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.38)_45%,rgba(0,0,0,0)_72%)]" />
          </motion.div>

          {/* TEXT OVERLAY */}
          <div className="relative -mt-44 w-full max-w-4xl sm:-mt-48 md:-mt-52">
            {/* haze behind copy */}
            <div className="pointer-events-none absolute inset-x-0 -top-6 mx-auto h-[260px] w-[min(880px,100%)] rounded-[48px] bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)] blur-[1px]" />
            <div className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-80 w-[min(900px,100%)] rounded-[56px] bg-[radial-gradient(circle_at_50%_50%,rgba(122,77,255,0.10),transparent_62%)] blur-[18px]" />
            <div className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-80 w-[min(900px,100%)] rounded-[56px] bg-[radial-gradient(circle_at_50%_50%,rgba(25,214,255,0.08),transparent_64%)] blur-[18px]" />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="text-center"
            >
              <motion.div variants={itemFadeUp} custom={0}>
                <div className="text-[11px] font-semibold tracking-[0.28em] text-white/80">
                  LHWEB
                </div>
              </motion.div>

              <motion.h1
                variants={itemFadeUp}
                custom={1}
                className="mx-auto mt-4 text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl"
              >
                <span className="text-white">App Development</span>{" "}
                <span className="text-white/65">that turns ideas into</span>{" "}
                <span className="text-white/65">scalable products.</span>
              </motion.h1>

              <motion.p
                variants={itemFadeUp}
                custom={2}
                className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7"
              >
                We design and build high-performance mobile and web apps with a
                product-first mindset and flawless execution.
              </motion.p>

              <motion.div
                variants={itemFadeUp}
                custom={3}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <Button
                  className="group h-12 rounded-2xl bg-[#2d6bff] px-7 text-white shadow-[0_18px_55px_-18px_rgba(45,107,255,0.95)] hover:bg-[#245ee6]"
                  aria-label="Start your app project"
                  data-cta-id="app-dev-hero-start"
                  data-cta-placement="app-dev-hero"
                  data-cta-text="Start Your App Project"
                >
                  Start Your App Project
                  <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-white/15">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Button>

                <Button
                  variant="secondary"
                  className="h-12 rounded-2xl border border-white/12 bg-transparent px-7 text-white/70 hover:bg-white/6 hover:text-white"
                  asChild
                  data-cta-id="app-dev-hero-case-studies"
                  data-cta-placement="app-dev-hero"
                  data-cta-text="See Real App Case Studies"
                >
                  <Link href="#work" aria-label="See real app case studies">
                    See Real App Case Studies
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                variants={itemFadeUp}
                custom={4}
                className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-white/55"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <ShieldCheck className="h-4 w-4 text-[#19D6FF]" aria-hidden />
                  Senior-led delivery
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <Gauge className="h-4 w-4 text-[#19D6FF]" aria-hidden />
                  Performance-first
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <Rocket className="h-4 w-4 text-[#19D6FF]" aria-hidden />
                  Fast launch cycles
                </span>
              </motion.div>

              <div className="mt-6 text-center text-xs text-white/40">
                Interactive visualization • pointer reactive
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOUNDATION — single implementation (no duplicates)
────────────────────────────────────────────────────────────── */

type FoundationItem = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

function Foundation() {
  const reduce = !!useReducedMotion();

  const items = React.useMemo<FoundationItem[]>(
    () => [
      {
        title: "Native & Hybrid Apps",
        desc: "Apps for iOS, Android and Web with React Native, Expo and hybrid approaches.",
        Icon: Smartphone,
      },
      {
        title: "PWA & Cross-Platform",
        desc: "Fast, responsive PWAs that feel native — ready for every device.",
        Icon: Globe,
      },
      {
        title: "UI/UX for Mobile",
        desc: "Premium mobile-first UI with micro-interactions, strong hierarchy and flawless usability.",
        Icon: LayoutTemplate,
      },
      {
        title: "Performance & Monitoring",
        desc: "CI/CD, performance metrics and real-time monitoring from day one.",
        Icon: Activity,
      },
    ],
    [],
  );

  return (
    <Section
      id="foundation"
      className="relative overflow-hidden bg-[#050812] py-24 text-white"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(122,77,255,0.14),transparent_62%),radial-gradient(900px_520px_at_85%_25%,rgba(25,214,255,0.08),transparent_66%),linear-gradient(to_bottom,#050812,#050812)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.92)_100%)]" />

        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] bg-size-[34px_34px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(25,214,255,0.60)_1px,transparent_1px)] bg-size-[120px_120px]" />

        <div className="absolute -left-48 bottom-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.18),transparent_68%)] blur-[140px]" />
        <div className="absolute -right-56 top-24 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.12),transparent_72%)] blur-[160px]" />

        <div className="absolute -bottom-[540px] left-1/2 h-[1040px] w-[1600px] -translate-x-1/2 rounded-full opacity-80">
          <div className="absolute inset-0 rounded-full border border-transparent [background:conic-gradient(from_210deg,rgba(122,77,255,0.0),rgba(122,77,255,0.62),rgba(25,214,255,0.52),rgba(122,77,255,0.0))] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]" />
          <div className="absolute inset-0 rounded-full [background:conic-gradient(from_210deg,rgba(122,77,255,0.0),rgba(122,77,255,0.22),rgba(25,214,255,0.18),rgba(122,77,255,0.0))] blur-[28px] [mask:radial-gradient(farthest-side,transparent_calc(100%-10px),#000_calc(100%-1px))]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.34em] text-[#19D6FF]/80">
            OUR TECHNICAL FOUNDATION
          </div>

          <h2 className="mx-auto mt-6 max-w-5xl text-balance text-3xl font-semibold tracking-tight text-white/90 sm:text-4xl md:text-5xl">
            Our Technical Foundation for Scalable Apps
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/55 sm:text-base">
            Every app is built to scale, with a rock-solid base and a flawless
            experience from day one.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: "-28%" }}
          whileInView={{ opacity: 1, x: "28%" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none relative mt-12 h-0"
        >
          <div className="absolute left-1/2 top-0 h-[300px] w-[980px] -translate-x-1/2 -translate-y-28 -rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.10),rgba(25,214,255,0.10),transparent)] blur-[20px]" />
        </motion.div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {items.map((it, i) => (
            <ArtGlassCard
              key={it.title}
              index={i}
              title={it.title}
              desc={it.desc}
              Icon={it.Icon}
              reduce={reduce}
            />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-white/45">
          Our technical edge is what prepares your product to grow from day 1.
        </p>
      </div>
    </Section>
  );
}

function ArtGlassCard({
  index,
  title,
  desc,
  Icon,
  reduce,
}: {
  index: number;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  reduce: boolean;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    setTilt({
      ry: (px - 0.5) * 5,
      rx: (0.5 - py) * 5,
    });

    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
  };

  const onLeave = () => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--sx", `50%`);
    el.style.setProperty("--sy", `35%`);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="art-glass px-9 py-8"
        style={
          reduce
            ? undefined
            : {
                transformStyle: "preserve-3d",
                transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }
        }
      >
        <div className="specular" />
        <div className="grain" />

        <div className="pointer-events-none absolute -left-12 bottom-[-46px] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(143,94,255,0.32),transparent_70%)] blur-[46px]" />
        <div className="pointer-events-none absolute -right-12 top-[-54px] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.22),transparent_74%)] blur-[50px]" />

        <div className="relative flex items-start gap-5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/5">
            <Icon className="h-6 w-6 text-[#19D6FF]" aria-hidden />
          </div>

          <div className="min-w-0">
            <h3 className="text-[22px] font-semibold leading-snug text-white/90">
              {title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
              {desc}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-10 bottom-6 h-px bg-white/10 opacity-30" />
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   3) Process — Apple-level + Flip (hover / tap)
   Fixes:
   - Removed bottom arc band (process-arc) that created the stripe
   - Fixed broken front cards: proper z-index layering for wash/grain/specular/content
   - Fixed tilt bug: separate refs for front/back
   - Copy rewritten for non-technical business owners/managers
────────────────────────────────────────────────────────────── */
export function Process() {
  const steps = useMemo(
    () => [
      {
        n: "01",
        title: "Discovery & Strategy",
        desc: "We understand your goals and define a clear plan — no guesswork.",
        more: "We align objectives, audience, scope and priorities. You leave with a clear plan, timeline, and what we’ll deliver — so decisions are easy and predictable.",
        Icon: Search,
        accent: "purple" as const,
        deliverable: "Project plan + scope",
        time: "2–5 days",
      },
      {
        n: "02",
        title: "UI/UX Design",
        desc: "A premium design that looks modern and makes users take action (buy, book, contact).",
        more: "We design a simple, high-conversion experience: structure, screens, copy hierarchy and micro-interactions. You approve before development starts.",
        Icon: PenTool,
        accent: "cyan" as const,
        deliverable: "Prototype + UI kit",
        time: "1–2 weeks",
      },
      {
        n: "03",
        title: "Development",
        desc: "We build fast, stable and scalable — ready for production.",
        more: "We implement with clean architecture, testing and performance checks. You see progress with clear milestones and frequent updates.",
        Icon: Code2,
        accent: "cyan" as const,
        deliverable: "Production build",
        time: "2–6 weeks",
      },
      {
        n: "04",
        title: "Launch",
        desc: "We publish safely and track everything from day one.",
        more: "Store submission, release checklist, analytics setup and monitoring. Launch without stress — with a rollback plan if needed.",
        Icon: Rocket,
        accent: "purple" as const,
        deliverable: "Release + tracking",
        time: "3–7 days",
      },
      {
        n: "05",
        title: "Growth",
        desc: "We improve results over time with data — not opinions.",
        more: "We monitor usage, find bottlenecks and optimize conversion. New features are prioritized by impact and KPIs.",
        Icon: TrendingUp,
        accent: "purple" as const,
        deliverable: "KPI plan + iterations",
        time: "Ongoing",
      },
    ],
    [],
  );

  return (
    <Section id="process" className="relative overflow-hidden py-24 text-white">
      {/* ✅ COSMIC BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#070A18]">
        <div className="absolute inset-0 process-nebula" />
        <div className="absolute inset-0 process-wash" />
        <div className="absolute inset-0 process-stars-1" />
        <div className="absolute inset-0 process-stars-2" />
        <div className="absolute inset-0 process-dust" />

        {/* Energy ribbon (kept subtle via globals.css) */}
        <div className="absolute left-1/2 top-[46%] h-[560px] w-[1400px] -translate-x-1/2 -rotate-6 process-ribbon" />

        {/* ❌ Removed process-arc to eliminate the bottom band/stripe */}

        {/* Vignette (readability) */}
        <div className="absolute inset-0 process-vignette" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.34em] text-[#19D6FF]/85">
            OUR PROCESS
          </div>

          <h2
            id="process-title"
            className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Our App Development Process
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            A clear process, fast delivery, and total predictability from
            kickoff to post-launch.
          </p>
        </div>

        <div className="relative mt-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="grid gap-6 md:grid-cols-5"
          >
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={itemFadeUp} custom={i}>
                <ProcessCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="mt-10 text-center text-sm text-white/55">
          You always know what&apos;s being done — and when it will be
          delivered.
        </p>
      </div>
    </Section>
  );
}

function ProcessCard({
  n,
  title,
  desc,
  more,
  Icon,
  accent,
  deliverable,
  time,
}: {
  n: string;
  title: string;
  desc: string;
  more: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  accent: "purple" | "cyan";
  deliverable: string;
  time: string;
}) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  // ✅ FIX: separate refs for front/back so tilt/specular works properly
  const frontRef = React.useRef<HTMLDivElement | null>(null);
  const backRef = React.useRef<HTMLDivElement | null>(null);

  const applyVars = (el: HTMLDivElement | null, px: number, py: number) => {
    if (!el) return;
    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
  };

  const resetVars = (el: HTMLDivElement | null) => {
    if (!el) return;
    el.style.setProperty("--sx", "50%");
    el.style.setProperty("--sy", "35%");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;

    const active = flipped ? backRef.current : frontRef.current;
    if (!active) return;

    const r = active.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    // apply to both faces so transition feels continuous
    applyVars(frontRef.current, px, py);
    applyVars(backRef.current, px, py);
  };

  const onLeave = () => {
    resetVars(frontRef.current);
    resetVars(backRef.current);
    setHovered(false);
  };

  const wash =
    accent === "purple"
      ? "bg-[radial-gradient(circle_at_20%_20%,rgba(143,94,255,0.22),transparent_62%),radial-gradient(circle_at_90%_85%,rgba(25,214,255,0.12),transparent_66%)]"
      : "bg-[radial-gradient(circle_at_20%_20%,rgba(25,214,255,0.18),transparent_62%),radial-gradient(circle_at_90%_85%,rgba(143,94,255,0.14),transparent_66%)]";

  const tiltStyle = reduce
    ? undefined
    : ({
        transformStyle: "preserve-3d" as const,
        transform:
          "perspective(1200px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      } as const);

  return (
    <div
      className="flip-scene h-[300px] w-full"
      role="button"
      tabIndex={0}
      aria-label={`${n} ${title} — ${
        flipped ? "close details" : "view details"
      }`}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setFlipped((v) => !v);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="flip-face">
          <div
            ref={frontRef}
            onMouseMove={onMove}
            className={`process-glass h-full p-6 ${
              hovered ? "is-hovered" : ""
            }`}
            style={tiltStyle}
          >
            {/* ✅ FIX: proper layers (wash behind / grain+specular above / content top) */}
            <div
              className={`pointer-events-none absolute inset-0 z-0 rounded-[26px] opacity-60 ${wash}`}
            />
            <div className="grain z-10" />
            <div className="specular z-10" />

            <div className="relative z-20 flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-semibold tracking-tight text-white/80">
                    {n}
                  </div>
                  <div className="hidden sm:block text-xs font-semibold tracking-[0.25em] text-white/40">
                    STEP
                  </div>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/5">
                  <Icon className="h-5 w-5 text-[#19D6FF]" aria-hidden />
                </div>
              </div>

              <h3 className="mt-4 text-[17px] font-semibold text-white/95">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/68">{desc}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Meta label="YOU GET" value={deliverable} />
                <Meta label="TYPICAL TIME" value={time} />
              </div>

              <div className="mt-auto pt-4 inline-flex items-center gap-2 text-xs text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                Tap / click to see details
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back">
          <div
            ref={backRef}
            onMouseMove={onMove}
            className={`process-glass h-full p-6 ${
              hovered ? "is-hovered" : ""
            }`}
            style={tiltStyle}
          >
            <div
              className={`pointer-events-none absolute inset-0 z-0 rounded-[26px] opacity-60 ${wash}`}
            />
            <div className="grain z-10" />
            <div className="specular z-10" />

            <div className="relative z-20 flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div className="text-xs font-semibold tracking-[0.25em] text-white/65">
                  STEP {n} — DETAILS
                </div>
                <div className="text-xs text-white/45">Click to close</div>
              </div>

              <h4 className="mt-3 text-lg font-semibold text-white/92">
                What we do in this step
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/68">{more}</p>

              <div className="mt-4 space-y-2 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                  Clear plan and responsibilities
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                  Risks solved early (before cost grows)
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                  Predictable delivery timeline
                </div>
              </div>

              <div className="mt-auto pt-4 text-xs text-white/45">
                Tip: press <span className="text-white/70">Enter</span> to
                toggle.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[10px] font-semibold tracking-[0.22em] text-white/45">
        {label}
      </div>
      <div className="mt-1 text-xs text-white/82">{value}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4) Results & Impact — Cosmic Premium (MATCHES MOCK)
   - Clean energetic background (not noisy)
   - Hero metric anchors attention (scroll emphasis)
   - Desktop: ONE connected panel with 3 columns + dividers
   - Mobile: snap story rail + dots + progress
   - Charts: real-feel data + premium texture + motion
────────────────────────────────────────────────────────────── */
function ResultsImpact() {
  const reduce = !!useReducedMotion();

  const stats = useMemo(
    () => [
      {
        key: "eff",
        label: "Operational Efficiency",
        value: "+70%",
        desc: "Fewer manual processes, clearer specs, and less rework so your team ships faster with confidence.",
        Icon: Gauge,
        accent: "purple" as const,
      },
      {
        key: "ret",
        label: "User Retention",
        value: "+38%",
        desc: "Better retention thanks to intuitive mobile UX, frictionless onboarding, and data-informed iterations.",
        Icon: Users,
        accent: "cyan" as const,
      },
      {
        key: "ttm",
        label: "Time to Market",
        value: "-50%",
        desc: "Cut your launch cycles in half through modern architecture, CI/CD automation, and predictable execution.",
        Icon: Rocket,
        accent: "cyan" as const,
      },
    ],
    [],
  );

  // scroll-based subtle emphasis for the hero metric
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [0.985, 1.0]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [0.72, 1]);

  return (
    <Section id="results" className="relative overflow-hidden results-energy">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 results-energy__base" />
        <div className="absolute inset-0 results-energy__stars1" />
        <div className="absolute inset-0 results-energy__stars2" />
        <div className="absolute inset-0 results-energy__streaks" />
        <div className="absolute inset-0 results-energy__vignette" />
      </div>

      <div ref={wrapRef} className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* Header */}
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.34em] text-white/60">
            RESULTS THAT SCALE WITH YOUR PRODUCT
          </div>

          <h2
            id="results-title"
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Results &amp; Impact
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Clear and measurable outcomes — proven across real app development
            projects.
          </p>
        </div>

        {/* Hero Metric */}
        <motion.div
          style={
            reduce ? undefined : { scale: heroScale, opacity: heroOpacity }
          }
          className="results-hero mt-12"
        >
          {/* halo */}
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(143,94,255,0.24),transparent_60%)] blur-2xl" />
            <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.18),transparent_62%)] blur-2xl" />
          </div>

          {/* energy line */}
          <div className="results-hero__line" />

          <div className="relative grid items-center gap-6 sm:grid-cols-[1.12fr_0.88fr]">
            <div className="text-left">
              <div className="text-[11px] font-semibold tracking-[0.26em] text-white/55">
                EXECUTIVE SUMMARY
              </div>

              <div className="mt-4 flex items-end gap-3">
                <div className="text-6xl font-semibold tracking-tight sm:text-7xl">
                  <span className="results-grad-text">+70%</span>
                </div>
                <div className="pb-2 text-sm leading-5 text-white/70 sm:text-base">
                  increase in operational performance
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
                A predictable process, premium UX, and modern delivery systems —
                built to reduce friction and accelerate outcomes.
              </p>
            </div>

            {/* micro-graph (premium: grid + area + texture + draw) */}
            <div className="results-hero__trend">
              <div className="text-[10px] font-semibold tracking-[0.22em] text-white/45">
                IMPACT TREND
              </div>
              <div className="mt-2 text-xs text-white/60">
                Efficiency ↑ • Retention ↑ • Time-to-market ↓
              </div>

              <ImpactTrendChart reduce={reduce} />
            </div>
          </div>
        </motion.div>

        {/* Desktop: ONE connected panel with 3 columns */}
        <div className="mt-10 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="results-panel"
          >
            <div className="results-panel__glow" />
            <div className="results-panel__grain" />

            <div className="grid grid-cols-3">
              {stats.map((s, i) => (
                <div key={s.key} className="relative">
                  {i !== 0 && <div className="results-panel__divider" />}

                  <div className="relative p-8">
                    <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] text-white/60">
                      <s.Icon
                        className={`h-4 w-4 ${
                          s.accent === "purple"
                            ? "text-[#8F5EFF]"
                            : "text-[#19D6FF]"
                        }`}
                        aria-hidden
                      />
                      {s.label.toUpperCase()}
                    </div>

                    <div className="mt-5 text-5xl font-semibold tracking-tight text-white">
                      <span
                        className={
                          s.accent === "purple"
                            ? "results-grad-text"
                            : "results-cyan-text"
                        }
                      >
                        {s.value}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-white/65">
                      {s.desc}
                    </p>

                    <div className="mt-6 results-microGraph">
                      <MiniBars accent={s.accent} reduce={reduce} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="mt-10 md:hidden">
          <MobileResultsRail stats={stats} reduce={reduce} />
        </div>

        {/* Footer line */}
        <p className="mt-12 text-center text-sm text-white/55">
          Measurable outcomes. Premium service. Predictable delivery.
        </p>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero trend chart (real-feel data + texture + draw animation)
────────────────────────────────────────────────────────────── */
function ImpactTrendChart({ reduce }: { reduce: boolean }) {
  // Coherent “real-feel” shape: steady growth with small variance
  const points = [
    { x: 18, y: 74 },
    { x: 90, y: 68 },
    { x: 160, y: 58 },
    { x: 235, y: 52 },
    { x: 300, y: 36 },
    { x: 402, y: 22 },
  ];

  const linePath =
    "M18 74 C 70 72, 110 66, 160 58 C 210 50, 250 56, 300 36 C 340 26, 372 26, 402 22";

  const areaPath =
    "M18 74 C 70 72, 110 66, 160 58 C 210 50, 250 56, 300 36 C 340 26, 372 26, 402 22 L402 96 L18 96 Z";

  return (
    <div className="results-miniChart mt-4">
      <svg
        className="h-[96px] w-full"
        viewBox="0 0 420 96"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="riLine2" x1="0" y1="0" x2="420" y2="0">
            <stop stopColor="rgba(143,94,255,0.15)" offset="0" />
            <stop stopColor="rgba(143,94,255,0.88)" offset="0.38" />
            <stop stopColor="rgba(25,214,255,0.88)" offset="0.72" />
            <stop stopColor="rgba(25,214,255,0.15)" offset="1" />
          </linearGradient>

          <linearGradient id="riArea2" x1="0" y1="0" x2="0" y2="96">
            <stop stopColor="rgba(25,214,255,0.14)" offset="0" />
            <stop stopColor="rgba(143,94,255,0.06)" offset="0.55" />
            <stop stopColor="rgba(0,0,0,0)" offset="1" />
          </linearGradient>

          <filter id="riGlow2" x="-30%" y="-50%" width="160%" height="200%">
            <feGaussianBlur stdDeviation="3.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle grain pattern */}
          <pattern
            id="riGrain2"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.6" fill="rgba(255,255,255,0.08)" />
            <circle cx="11" cy="7" r="0.6" fill="rgba(255,255,255,0.06)" />
            <circle cx="6" cy="14" r="0.6" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>

        {/* grid */}
        <g opacity="0.55">
          {[18, 38, 58, 78].map((y) => (
            <path
              key={y}
              d={`M0 ${y} H420`}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* baseline */}
        <path d="M0 92 H420" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

        {/* area */}
        <path d={areaPath} fill="url(#riArea2)" />

        {/* grain overlay */}
        <rect
          x="0"
          y="0"
          width="420"
          height="96"
          fill="url(#riGrain2)"
          opacity="0.22"
        />

        {/* animated line */}
        {!reduce ? (
          <motion.path
            d={linePath}
            stroke="url(#riLine2)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#riGlow2)"
            initial={{ pathLength: 0, opacity: 0.75 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <path
            d={linePath}
            stroke="url(#riLine2)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#riGlow2)"
          />
        )}

        {/* points */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="5.2" fill="rgba(255,255,255,0.16)" />
            <circle cx={p.x} cy={p.y} r="3.8" fill="rgba(255,255,255,0.92)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mobile rail (snap + dots + progress)
────────────────────────────────────────────────────────────── */
function MobileResultsRail({
  stats,
  reduce,
}: {
  stats: Array<{
    key: string;
    label: string;
    value: string;
    desc: string;
    Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    accent: "purple" | "cyan";
  }>;
  reduce: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-slide]"),
      );
      if (!slides.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      slides.forEach((s, idx) => {
        const mid = s.offsetLeft + s.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      });

      setActive(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div className="mb-7 text-center">
        <div className="text-[11px] font-semibold tracking-[0.26em] text-white/55">
          AT A GLANCE
        </div>
        <div className="mt-3 text-6xl font-semibold tracking-tight">
          <span className="results-grad-text">+70%</span>
        </div>
        <p className="mt-2 text-sm text-white/65">
          Faster teams, stronger retention, shorter launch cycles.
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="results-snap -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6"
      >
        {stats.map((s, i) => (
          <motion.article
            key={s.key}
            data-slide
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.08 }}
            className="results-card-mobile snap-center"
          >
            <div className="results-panel__grain" />

            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] text-white/60">
              <s.Icon
                className={`h-4 w-4 ${
                  s.accent === "purple" ? "text-[#8F5EFF]" : "text-[#19D6FF]"
                }`}
                aria-hidden
              />
              {s.label.toUpperCase()}
            </div>

            <div className="mt-5 text-5xl font-semibold tracking-tight text-white">
              <span
                className={
                  s.accent === "purple"
                    ? "results-grad-text"
                    : "results-cyan-text"
                }
              >
                {s.value}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/65">{s.desc}</p>

            <div className="mt-6 results-microGraph">
              <MiniBars accent={s.accent} reduce={reduce} />
            </div>
          </motion.article>
        ))}
      </div>

      {/* dots */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {stats.map((s, idx) => (
          <button
            key={s.key}
            type="button"
            aria-label={`Go to ${s.label}`}
            className={`h-2 w-2 rounded-full transition ${
              idx === active ? "bg-white/85" : "bg-white/25"
            }`}
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              const slide =
                el.querySelectorAll<HTMLElement>("[data-slide]")[idx];
              slide?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }}
          />
        ))}
      </div>

      {/* progress */}
      <div className="mx-auto mt-4 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(143,94,255,0.78),rgba(25,214,255,0.78))]"
          style={{
            width: `${((active + 1) / stats.length) * 100}%`,
            transition: "width 220ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mini bars — real-feel series + grow animation + specular sweep
────────────────────────────────────────────────────────────── */
function MiniBars({
  accent,
  reduce,
}: {
  accent: "purple" | "cyan";
  reduce?: boolean;
}) {
  // Real-feel “series” (different profile per metric family)
  const series =
    accent === "purple"
      ? [14, 22, 35, 48, 62, 78] // efficiency
      : [10, 18, 28, 44, 58, 70]; // retention/ttm

  const grad =
    accent === "purple"
      ? "linear-gradient(to top, rgba(143,94,255,0.92), rgba(143,94,255,0.16))"
      : "linear-gradient(to top, rgba(25,214,255,0.92), rgba(25,214,255,0.16))";

  return (
    <div className="results-bars">
      <div className="results-bars__grid" />

      <div className="results-bars__wrap">
        {series.map((h, i) => (
          <div key={i} className="results-bars__bar">
            {!reduce ? (
              <motion.div
                className="results-bars__fill"
                style={{ background: grad }}
                initial={{ height: "0%" }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ) : (
              <div
                className="results-bars__fill"
                style={{ height: `${h}%`, background: grad }}
              />
            )}
          </div>
        ))}
      </div>

      {!reduce && (
        <motion.div
          className="results-bars__sweep"
          initial={{ x: "-30%" }}
          whileInView={{ x: "120%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      )}

      <div className="results-bars__label">trend</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5) Case Studies
────────────────────────────────────────────────────────────── */
function CaseStudies() {
  const cases = useMemo(
    () => [
      {
        name: "BoostPay",
        stack: "React Native • Node.js",
        metric: "+150K downloads",
        href: "#contact",
      },
      {
        name: "Fit+",
        stack: "Next.js • Expo",
        metric: "4.8 ★ rating",
        href: "#contact",
      },
      {
        name: "NovaShop",
        stack: "Vue • Django",
        metric: "+82% conversion rate",
        href: "#contact",
      },
    ],
    [],
  );

  return (
    <Section id="work" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="work-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Case Studies
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            How we turn ideas into successful apps.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {cases.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              variants={itemFadeUp}
              custom={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur transition hover:border-white/20"
              aria-label={`Open case study: ${c.name}`}
            >
              <div className="absolute inset-0 opacity-65">
                <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.16),transparent_62%)] blur-2xl" />
                <div className="absolute -right-28 -bottom-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.10),transparent_62%)] blur-2xl" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{c.name}</div>
                  <ArrowRight className="h-5 w-5 text-white/50 transition group-hover:text-white" />
                </div>
                <div className="mt-2 text-sm text-white/65">{c.stack}</div>
                <div className="mt-5 inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  {c.metric}
                </div>
                <div className="mt-6 h-24 w-full rounded-2xl border border-white/10 bg-white/5" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   6) Why Choose LHWEB
────────────────────────────────────────────────────────────── */
function WhyChoose() {
  const bullets = useMemo(
    () => [
      {
        n: "01",
        title: "Direct access to senior engineers",
        desc: "Fast decisions, fewer handoffs, higher quality outputs.",
        Icon: ShieldCheck,
      },
      {
        n: "02",
        title: "Design-driven, not template-first",
        desc: "We design for conversion, retention and brand trust.",
        Icon: PenTool,
      },
      {
        n: "03",
        title: "Predictable delivery, no surprises",
        desc: "Clear scope, milestones and transparent communication.",
        Icon: Layers,
      },
      {
        n: "04",
        title: "Post-launch support included",
        desc: "Monitoring, improvements and iteration after shipping.",
        Icon: Activity,
      },
      {
        n: "05",
        title: "Built to scale from day one",
        desc: "Architecture ready for growth and performance.",
        Icon: Gauge,
      },
      {
        n: "06",
        title: "Business-focused execution",
        desc: "We care about outcomes: revenue, speed and customer experience.",
        Icon: TrendingUp,
      },
    ],
    [],
  );

  return (
    <Section id="why" className="bg-[#060812]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 lg:px-10">
        <div>
          <h2
            id="why-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Why Choose LHWEB
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/65 sm:text-base">
            We don&apos;t just build apps.
            <br />
            We build products founders can trust.
          </p>

          <p className="mt-6 text-sm leading-6 text-white/60">
            We collaborate with founders and teams who value clarity, speed, and
            long-term scalability. Every choice we make is designed to impact
            user experience and business outcomes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Senior-led
            </Badge>
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Conversion-first
            </Badge>
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Scalable architecture
            </Badge>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-4"
        >
          {bullets.map((b, i) => (
            <motion.div
              key={b.n}
              variants={itemFadeUp}
              custom={i}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -left-24 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.14),transparent_62%)] blur-2xl" />
                <div className="absolute -right-24 -bottom-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.08),transparent_62%)] blur-2xl" />
              </div>

              <div className="relative flex items-start gap-4">
                <div className="mt-0.5 text-sm font-semibold text-white/70">
                  {b.n}
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <b.Icon className="h-5 w-5 text-[#19D6FF]" aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-semibold">{b.title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/65">
                    {b.desc}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   7) FAQ (details)
────────────────────────────────────────────────────────────── */
function FAQ() {
  const faqs = useMemo(
    () => [
      {
        q: "How long does it take to build an app?",
        a: "It depends on scope. Most MVPs ship in 4–8 weeks, and more complex products take 8–16+ weeks. We define milestones early so delivery is predictable.",
      },
      {
        q: "What industries have you worked with?",
        a: "E-commerce, retail, fitness, fintech, internal tools and B2B SaaS. We adapt the process to your constraints and compliance needs.",
      },
      {
        q: "How do updates and maintenance work?",
        a: "We can provide ongoing support with monitoring, hotfixes, feature iterations and performance improvements — with clear SLAs if needed.",
      },
      {
        q: "What if I already have an app?",
        a: "We can audit, refactor, redesign, improve performance and ship new features. We’ll propose a roadmap based on impact and effort.",
      },
      {
        q: "How do you ensure app security?",
        a: "We follow best practices for auth, data handling, dependency hygiene and OWASP-aware patterns — plus automated checks in CI/CD where appropriate.",
      },
      {
        q: "What does it cost to develop an app?",
        a: "Pricing depends on scope, platforms, integrations and timeline. After a short discovery call, we provide a transparent quote with milestones.",
      },
    ],
    [],
  );

  return (
    <Section id="faq" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="faq-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            FAQ — App Development
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Answers to common questions before building and scaling apps with
            LHWEB.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-white/10 bg-white/4 p-2 backdrop-blur">
          <div className="divide-y divide-white/10">
            {faqs.map((f) => (
              <details key={f.q} className="group px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2">
                  <span className="text-sm font-semibold text-white/85">
                    {f.q}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-3 text-sm leading-6 text-white/65">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA
────────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <Section
      id="contact"
      className="bg-[radial-gradient(ellipse_at_center,rgba(25,214,255,0.14)_0%,transparent_45%)]"
    >
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 id="contact-title" className="text-3xl font-semibold md:text-5xl">
          Ready to build your app?
        </h2>
        <p className="mt-4 text-white/75">
          Let&apos;s ship something fast, premium and scalable — with a process
          you can trust.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="rounded-2xl bg-[#19D6FF] px-7 text-[#050914] shadow-[0_18px_48px_-18px_rgba(25,214,255,0.85)] hover:bg-[#12c9ef]"
            data-cta-id="app-dev-final-book"
            data-cta-placement="app-dev-final"
            data-cta-text="Book a Free Consultation"
          >
            Book a Free Consultation
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-2xl border border-white/10 bg-white/5 px-7 text-white hover:bg-white/10"
            asChild
            data-cta-id="app-dev-final-cases"
            data-cta-placement="app-dev-final"
            data-cta-text="See Case Studies"
          >
            <Link href="#work">See Case Studies</Link>
          </Button>
        </div>

        <LeadForm formId="app-dev-contact" leadType="app-development" />
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer
────────────────────────────────────────────────────────────── */
function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="grid items-start gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Layers className="h-4 w-4 text-[#19D6FF]" aria-hidden />
              </div>
              <span className="font-semibold tracking-wide">LHWEB</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              Premium websites, apps and AI systems — built with modern stacks
              and ruthless focus on results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <nav aria-label="Footer navigation">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#foundation" className="hover:text-white">
                    App Development
                  </Link>
                </li>
                <li>
                  <Link href="#work" className="hover:text-white">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Social links">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                Follow
              </h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li className="flex items-center gap-2">
                  <Github className="h-4 w-4" aria-hidden />
                  <Link href="#" className="hover:text-white">
                    GitHub
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" aria-hidden />
                  <Link href="#" className="hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" aria-hidden />
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-sm text-white/60 md:text-right">
            <div>© {year} LHWEB. All rights reserved.</div>
            <div className="mt-2">
              Dark mode by default • Accessible • SEO-ready
            </div>
            <div className="mt-2">
              <PrivacySettingsLink className="text-xs text-white/60 hover:text-white" />
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-white/10" />

        <div className="text-xs text-white/40">
          Built with Next.js • Tailwind CSS • shadcn/ui • Framer Motion •
          Deployed on Vercel
        </div>
      </div>
    </footer>
  );
}
