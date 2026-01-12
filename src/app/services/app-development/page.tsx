"use client";

import Link from "next/link";
import AppDevOrb from "@/components/visuals/AppDevOrb";
import type { Variants } from "framer-motion";
import { motion, useInView, easeOut } from "framer-motion";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Smartphone,
  Globe,
  LayoutTemplate,
  Activity,
  Sparkles,
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
   Goals:
   - Orb central (hero visual)
   - Text layered above orb (premium tech feel)
   - Zero clipping
   - Perfect readability
────────────────────────────────────────────────────────────── */
function HeroAppDev() {
  return (
    <section
      id="hero"
      aria-label="App Development hero"
      className="relative overflow-hidden bg-[#050812] pt-22 text-white md:pt-26"
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
            {/* glow behind orb (tighter + more premium) */}
            <div className="pointer-events-none absolute left-1/2 top-[44%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.18),transparent_62%)] blur-[120px]" />
            <div className="pointer-events-none absolute left-1/2 top-[44%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.12),transparent_64%)] blur-[120px]" />

            {/* ✅ Make orb slightly smaller so it doesn't crush the headline */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="
                relative mx-auto
                w-full
                max-w-[760px] sm:max-w-[780px] md:max-w-[820px]
                -my-6 sm:-my-8 md:-my-10
                overflow-visible
              "
            >
              <AppDevOrb />
            </motion.div>

            {/* ✅ Smart contrast veil – centered behind TEXT zone, not the whole hero */}
            <div className="pointer-events-none absolute left-1/2 top-[76%] h-[420px] w-[min(980px,100%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.38)_45%,rgba(0,0,0,0)_72%)]" />
          </motion.div>

          {/* TEXT OVERLAY */}
          <div className="relative -mt-10 w-full max-w-4xl sm:-mt-12 md:-mt-14">
            {/* ✅ subtle glass “haze card” behind copy (not a rectangle feel) */}
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

              {/* ✅ Better hierarchy: strong title + softer continuation */}
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

              {/* CTA row */}
              <motion.div
                variants={itemFadeUp}
                custom={3}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <Button
                  className="group h-12 rounded-2xl bg-[#2d6bff] px-7 text-white shadow-[0_18px_55px_-18px_rgba(45,107,255,0.95)] hover:bg-[#245ee6]"
                  aria-label="Start your app project"
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
                >
                  <Link href="#work" aria-label="See real app case studies">
                    See Real App Case Studies
                  </Link>
                </Button>
              </motion.div>

              {/* Trust pills */}
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
   2) Our Technical Foundation — ART LEVEL
────────────────────────────────────────────────────────────── */
function Foundation() {
  const items = useMemo(
    () => [
      {
        title: "Native & Hybrid Apps",
        desc: "Apps for iOS, Android and Web with React Native, Expo and hybrid approaches.",
        Icon: Smartphone,
        accent: "from-[#7A4DFF]/45 to-[#19D6FF]/25",
      },
      {
        title: "PWA & Cross-Platform",
        desc: "Fast, responsive PWAs that feel native — ready for every device.",
        Icon: Globe,
        accent: "from-[#19D6FF]/35 to-[#7A4DFF]/22",
      },
      {
        title: "UI/UX for Mobile",
        desc: "Premium mobile-first UI with micro-interactions, strong hierarchy and flawless usability.",
        Icon: LayoutTemplate,
        accent: "from-[#7A4DFF]/40 to-[#19D6FF]/18",
      },
      {
        title: "Performance & Monitoring",
        desc: "CI/CD, performance metrics and real-time monitoring from day one.",
        Icon: Activity,
        accent: "from-[#19D6FF]/32 to-[#7A4DFF]/18",
      },
    ],
    []
  );

  return (
    <Section id="foundation" className="bg-[#050812]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_680px_at_50%_-10%,rgba(122,77,255,0.12),transparent_62%),radial-gradient(900px_520px_at_80%_30%,rgba(25,214,255,0.08),transparent_64%),linear-gradient(to_bottom,#050812,#050812)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.90)_100%)]" />

        <div className="absolute -bottom-56 left-[-20%] h-[820px] w-[140%] bg-[radial-gradient(closest-side,rgba(122,77,255,0.26),transparent_70%)] blur-[90px]" />
        <div className="absolute -bottom-72 left-[-8%] h-[820px] w-[140%] bg-[radial-gradient(closest-side,rgba(90,70,255,0.16),transparent_72%)] blur-[115px]" />

        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] bg-size-[34px_34px]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(rgba(25,214,255,0.55)_1px,transparent_1px)] bg-size-[80px_80px]" />

        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-size-[140px_140px]" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-[0.32em] text-[#19D6FF]/80">
            OUR TECHNICAL FOUNDATION
          </div>

          <h2
            id="foundation-title"
            className="mx-auto mt-6 max-w-5xl text-balance text-3xl font-semibold tracking-tight text-white/90 sm:text-4xl md:text-5xl"
          >
            Our Technical Foundation for Scalable Apps
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/55 sm:text-base">
            Every app is built to scale, with a rock-solid base and a flawless
            experience from day one.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-14 grid gap-7 md:grid-cols-2"
        >
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              variants={itemFadeUp}
              custom={i}
              className="group relative overflow-hidden rounded-[30px]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-linear-to-br from-[#7A4DFF]/25 via-white/5 to-[#19D6FF]/18 opacity-90" />
              <div className="pointer-events-none absolute inset-0 rounded-[30px] shadow-[0_0_60px_rgba(122,77,255,0.18)]" />

              <div
                className={[
                  "relative rounded-[30px] border border-white/10 bg-white/5 p-8",
                  "backdrop-blur-xl",
                  "shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
                  "transition duration-300",
                  "group-hover:border-white/15 group-hover:bg-white/6",
                ].join(" ")}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),transparent_40%)] opacity-60" />
                <div className="pointer-events-none absolute inset-0 rounded-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.35)]" />

                <div className="pointer-events-none absolute -left-24 bottom-[-90px] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.50),transparent_65%)] blur-[34px]" />
                <div className="pointer-events-none absolute -right-28 top-[-90px] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.20),transparent_72%)] blur-[42px]" />
                <div
                  className={`pointer-events-none absolute inset-0 rounded-[30px] bg-linear-to-br ${it.accent} opacity-25`}
                />

                <div className="relative">
                  <div className="flex items-start gap-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_26px_rgba(25,214,255,0.14)]">
                      <it.Icon className="h-6 w-6 text-[#19D6FF]" aria-hidden />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-white/90">
                        {it.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                        {it.desc}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                          Premium UX
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                          Scalable
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                          Reliable
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 h-px w-full bg-white/10" />

                  <div className="mt-4 flex items-center gap-2 text-sm text-[#19D6FF]/80">
                    <Sparkles className="h-4 w-4" aria-hidden />
                    Built for production from day one
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[30px] opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-[30px] shadow-[0_0_90px_rgba(122,77,255,0.20)]" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-12 text-center text-sm text-white/45">
          Our technical edge is what prepares your product to grow from day 1.
        </p>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   3) Process
────────────────────────────────────────────────────────────── */
function Process() {
  const steps = useMemo(
    () => [
      {
        n: "01",
        title: "Discovery & Strategy",
        desc: "Clarify goals, scope, risks and the best roadmap to ship.",
        Icon: Search,
      },
      {
        n: "02",
        title: "UI/UX Design",
        desc: "Premium mobile-first UI, micro-interactions and strong hierarchy.",
        Icon: PenTool,
      },
      {
        n: "03",
        title: "Development",
        desc: "React Native / Expo / API integration with a modern stack.",
        Icon: Code2,
      },
      {
        n: "04",
        title: "Launch",
        desc: "Release pipelines, store submission and production readiness.",
        Icon: Rocket,
      },
      {
        n: "05",
        title: "Growth",
        desc: "Monitoring, iteration and feature expansion with clear KPIs.",
        Icon: TrendingUp,
      },
    ],
    []
  );

  return (
    <Section id="process" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="process-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Our App Development Process
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            A clear process, fast delivery, and total predictability from
            kickoff to post-launch.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 grid gap-5 md:grid-cols-5"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              variants={itemFadeUp}
              custom={i}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur md:col-span-1"
            >
              <div className="absolute inset-0 opacity-65">
                <div className="absolute -left-20 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.18),transparent_60%)] blur-2xl" />
                <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.10),transparent_60%)] blur-2xl" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/80">
                    {s.n}
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <s.Icon className="h-5 w-5 text-[#19D6FF]" aria-hidden />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-white/55">
          You always know what&apos;s being done — and when it will be
          delivered.
        </p>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   4) Results & Impact
────────────────────────────────────────────────────────────── */
function ResultsImpact() {
  const stats = useMemo(
    () => [
      {
        label: "Operational Efficiency",
        value: "+70%",
        desc: "Reduced rework through clear specs, QA and predictable process.",
        Icon: Gauge,
      },
      {
        label: "User Retention",
        value: "+38%",
        desc: "Premium UX with data-driven iteration and clean onboarding.",
        Icon: Users,
      },
      {
        label: "Time to Market",
        value: "-50%",
        desc: "Modern stack + CI/CD that accelerates releases without quality loss.",
        Icon: Rocket,
      },
    ],
    []
  );

  return (
    <Section id="results" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="results-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Results &amp; Impact
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Measurable outcomes you can show investors, stakeholders and teams.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={itemFadeUp}
              custom={i}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-65">
                <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.16),transparent_62%)] blur-2xl" />
                <div className="absolute -right-28 -bottom-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.10),transparent_62%)] blur-2xl" />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-white/60">
                  <s.Icon className="h-4 w-4 text-[#19D6FF]" aria-hidden />
                  {s.label.toUpperCase()}
                </div>
                <div className="mt-4 text-5xl font-semibold tracking-tight">
                  {s.value}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">{s.desc}</p>
                <div className="mt-6 h-10 w-full rounded-2xl border border-white/10 bg-white/5" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-white/55">
          Measurable results. Premium design. Predictable execution.
        </p>
      </div>
    </Section>
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
    []
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
    []
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
    []
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
          >
            Book a Free Consultation
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-2xl border border-white/10 bg-white/5 px-7 text-white hover:bg-white/10"
            asChild
          >
            <Link href="#work">See Case Studies</Link>
          </Button>
        </div>
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
