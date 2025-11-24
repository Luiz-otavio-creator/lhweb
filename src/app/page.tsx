"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Variants } from "framer-motion";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  easeOut,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  Smartphone,
  Sparkles,
  Zap,
  Bot,
  GaugeCircle,
  UsersRound,
  Layers,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const fadeUpSection: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

/** Animated counter 0 → to */
function useCounter(to: number, duration = 1.4) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest: number) => Math.floor(latest));

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      count.set(to * t);
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, count]);

  return rounded;
}

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
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full py-16 md:py-24 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <motion.div
        variants={fadeUpSection}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0e1a] text-white selection:bg-white/10">
      <SiteHeader />
      <Hero />
      <EnhancedCapabilities />
      <WhyLHWEB />
      <CaseStudies />
      <HowWeWork />
      <TechStack />
      <Insights />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// Site Header – LHWEB
// ─────────────────────────────────────────────────────────────

function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Services",
      href: "/product/mobile-development", // ✅ Agora abre a página de serviços
    },
    {
      label: "Portfolio",
      href: "#portfolio",
    },
    {
      label: "Insights",
      href: "#insights",
    },
    {
      label: "About",
      href: "#about",
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#050914]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-18 md:px-6 lg:px-10">
        {/* Logo LHWEB */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9">
            <Image
              src="/hero/lhweb-logo.png"
              alt="LH Web"
              fill
              className="object-contain drop-shadow-[0_0_18px_rgba(94,241,255,0.7)]"
              sizes="36px"
            />
          </div>
          <span className="bg-linear-to-r from-[#c56bff] via-[#b47dff] to-[#35f0ff] bg-clip-text text-sm font-semibold tracking-[0.16em] text-transparent sm:text-base">
            LH Web
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 text-xs font-medium text-white/70 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative inline-flex items-center transition hover:text-white"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-linear-to-r from-[#59e6ff] to-[#8f5eff] transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}

          <Button
            size="sm"
            className="rounded-full bg-linear-to-r from-[#59e6ff] to-[#8f5eff] px-5 text-xs font-semibold text-[#050914] shadow-[0_12px_30px_rgba(94,241,255,0.45)] hover:opacity-90"
          >
            Book a Call
          </Button>
        </nav>

        {/* Botão mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/30 p-2 text-white/80 shadow-[0_0_18px_rgba(0,0,0,0.6)] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-0.5">
            <span className="h-0.5 w-4 rounded-full bg-white" />
            <span className="h-0.5 w-3 rounded-full bg-white" />
          </div>
        </button>

        {/* Menu mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-4 top-16 w-56 rounded-2xl border border-white/10 bg-[#050914]/95 p-3 text-sm shadow-[0_18px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl md:hidden"
            >
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <Button
                    className="w-full rounded-xl bg-linear-to-r from-[#59e6ff] to-[#8f5eff] text-xs font-semibold text-[#050914] shadow-[0_12px_30px_rgba(94,241,255,0.45)] hover:opacity-90"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a Call
                  </Button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#050914] text-white pt-28 pb-20 md:pt-32 md:pb-28"
      aria-label="Hero – LHWEB"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src="/hero/herov.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-b from-[#050914]/70 via-[#050914]/70 to-[#050914]/90" />
      </div>

      {/* Content */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-10">
        {/* Left Side */}
        <motion.div
          className="space-y-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h1
            variants={heroFadeUp}
            className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            We build high-performance websites, apps, and AI-powered
            experiences.
          </motion.h1>

          <motion.p
            variants={heroFadeUp}
            transition={{ delay: 0.12 }}
            className="max-w-2xl text-base text-white/70 sm:text-lg"
          >
            From strategy to launch, we craft digital products designed to
            scale, convert, and automate.
          </motion.p>

          <motion.div
            variants={heroFadeUp}
            transition={{ delay: 0.24 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button className="bg-[#35f0ff] text-[#050914] shadow-[0_15px_40px_-10px_rgba(53,240,255,0.55)] hover:bg-[#32d8e5]">
              Book a Free Consultation
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/5">
              See Our Work
            </Button>
          </motion.div>

          <motion.div
            variants={heroFadeUp}
            transition={{ delay: 0.36 }}
            className="mt-6 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.28em] text-white/50">
              Trusted by businesses in 5+ countries
            </span>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              <span className="rounded-full border border-white/10 px-4 py-2 backdrop-blur">
                Lory&apos;s
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 backdrop-blur">
                PagSi
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 backdrop-blur">
                AI RetailLabs
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side completely removed (video is background now) */}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Enhanced Capabilities (DESIGN NOVO)
// ─────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

function EnhancedCapabilities() {
  const cards = [
    {
      title: "Web Development",
      desc: "High performance websites built with Next.js and crafted for speed, SEO and conversion.",
      tech: "Next.js • Framer • Vercel",
      cta: "Explore Web →",
      Icon: Code2,
    },
    {
      title: "App Development",
      desc: "Native & hybrid mobile apps and PWAs that deliver seamless experiences on iOS, Android and the web.",
      tech: "React Native • Swift • Kotlin",
      cta: "Explore Apps →",
      Icon: Smartphone,
    },
    {
      title: "AI & Automation",
      desc: "Artificial intelligence and workflow automation solutions that unlock efficiency and innovation across teams.",
      tech: "Python • OpenAI • LangChain • Make",
      cta: "Explore AI →",
      Icon: Sparkles,
    },
  ];

  return (
    <Section id="enhanced-capabilities" className="relative bg-[#070a11]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,255,255,0.08),transparent_70%)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.55 }}
          variants={fadeUp}
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-[#5ef2ff]">
            OUR CORE CAPABILITIES
          </span>

          <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Transforming ideas into high-performance websites, apps and
            intelligent systems.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              className="
                group flex h-full flex-col gap-5 rounded-3xl 
                border border-transparent 
                bg-[#0a0d16]/80 
                p-8 
                backdrop-blur-xl 
                shadow-[0_0_20px_rgba(0,0,0,0.5)]
                transition-all
                hover:shadow-[0_0_40px_rgba(96,0,255,0.35)]
                hover:border
                hover:border-[rgba(96,0,255,0.6)]
                relative
              "
            >
              {/* Gradient border overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent bg-[linear-gradient(to_bottom_right,rgba(0,255,255,0.22),rgba(123,0,255,0.22))] opacity-30" />

              <div className="relative flex items-center gap-4">
                <div
                  className="
                    grid h-14 w-14 place-items-center 
                    rounded-2xl bg-[#0f1120] 
                    text-[#80f7ff] 
                    shadow-[0_0_25px_rgba(0,255,255,0.5)]
                  "
                >
                  <card.Icon className="h-7 w-7" strokeWidth={1.7} />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>
              </div>

              <p className="text-sm leading-6 text-white/70">{card.desc}</p>

              <div className="text-sm font-medium text-white/90">
                {card.tech}
              </div>

              <Link
                href="#services"
                className="mt-auto inline-flex items-center text-sm font-semibold text-[#5ef2ff] hover:text-white transition"
                aria-label={card.cta}
              >
                {card.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore All */}
        <motion.div
          className="mt-16 space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p className="text-sm text-white/70">
            Want to explore our full portfolio of services? Let&apos;s talk.
          </p>

          <Link href="#contact" aria-label="Explore all services">
            <Button
              variant="ghost"
              className="
                rounded-2xl 
                border border-[rgba(109,0,255,0.45)]
                bg-transparent 
                px-8 py-4 text-sm font-semibold text-white
                shadow-[0_0_25px_rgba(109,0,255,0.3)]
                hover:bg-[rgba(109,0,255,0.1)]
                hover:border-[rgba(109,0,255,0.65)]
                transition
              "
            >
              Explore All Services →
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Why LHWEB — pixel perfect
// ─────────────────────────────────────────────────────────────

const fadeUpWhy: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function WhyLHWEB() {
  const features = [
    {
      title: "Performance-First Development",
      desc: "Our websites and apps are optimized for speed, SEO, and conversion — measurable performance, not aesthetics only.",
      Icon: Zap,
    },
    {
      title: "Automation & AI by Default",
      desc: "Every solution we build integrates automation and AI Insights — saving time, cutting costs and unlocking scalability.",
      Icon: Bot,
    },
    {
      title: "Design That Actually Converts",
      desc: "We create user experiences built on analytics and behavior — design that drives engagement and real ROI.",
      Icon: GaugeCircle,
    },
    {
      title: "Direct Access to Founders",
      desc: "Work directly with the LHWEB founders. Real communication, faster decisions and total alignment with your business.",
      Icon: UsersRound,
    },
  ];

  const stats = [
    { value: "+70", label: "Projects Delivered" },
    { value: "+62%", label: "Average Conversion Increase" },
    { value: "5", label: "Countries Served", sub: "EU / LATAM / US" },
  ];

  return (
    <Section id="why" className="relative overflow-hidden bg-[#050914] py-24">
      {/* Background blend with image */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[10%] top-[15%] h-[700px] w-[700px] opacity-[0.35] bg-[radial-gradient(circle,rgba(0,240,255,0.25),transparent_65%)] blur-[140px]" />
        <div className="absolute right-[0%] top-[28%] h-[600px] w-[600px] opacity-[0.25] bg-[radial-gradient(circle,rgba(80,0,255,0.28),transparent_70%)] blur-[160px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-20 px-6 lg:flex-row lg:items-start lg:gap-24">
        {/* Left content */}
        <motion.div
          className="max-w-2xl space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            variants={fadeUpWhy}
            className="text-xs font-semibold tracking-[0.26em] text-[#5ef2ff]"
          >
            WHY LHWEB
          </motion.span>

          <motion.h2
            variants={fadeUpWhy}
            className="text-[36px] font-semibold leading-tight sm:text-[44px] md:text-[52px]"
          >
            Why companies choose LHWEB.
          </motion.h2>

          <motion.p
            variants={fadeUpWhy}
            className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Technology meets intelligence. We combine performance-driven
            development, automation, and AI to build scalable digital ecosystems
            — with a human touch.
          </motion.p>

          {/* Feature box */}
          <motion.div
            variants={fadeUpWhy}
            className="mt-6 w-full rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_0_55px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            <div className="grid gap-10 sm:grid-cols-2">
              {features.map(({ title, desc, Icon }) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#5ef2ff] shadow-[0_0_32px_rgba(0,255,255,0.45)]">
                    <Icon className="h-8 w-8 stroke-[1.6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-white/70 leading-6">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right side — image + stats below */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative flex w-full flex-col items-center lg:w-[46%]"
        >
          {/* Hologram image */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/why/hologram-gear.png"
              alt="Hologram Gear"
              width={900}
              height={900}
              className="pointer-events-none select-none object-contain drop-shadow-[0_0_65px_rgba(0,240,255,0.4)]"
            />
          </div>

          {/* Stats below image */}
          <div className="mt-10 grid w-full grid-cols-3 gap-10 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-[32px] font-semibold text-[#5ef2ff] sm:text-[38px]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
                {stat.sub && (
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40">
                    {stat.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// CASE STUDIES — FIXED / UPDATED / NO DEFAULT EXPORT
// ─────────────────────────────────────────────────────────────

const fadeUpCases: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function CaseStudies() {
  const traffic = useCounter(120);
  const conv = useCounter(38);
  const vitals = useCounter(98);

  const cards = [
    {
      title: "Lorys Modas",
      metric: "+62%",
      metricLabel: "sales in 3 months",
      img: "/cases/lorys.png",
      desc: "Redefined UX and implemented AI product recommendation for a Brazilian fashion brand.",
    },
    {
      title: "Pag Si",
      metric: "-45%",
      metricLabel: "manual workload",
      img: "/cases/pagsi.png",
      desc: "Built a custom automation platform integrating WhatsApp CRM and billing system.",
    },
    {
      title: "AI Retail Labs",
      metric: "+28%",
      metricLabel: "customer retention",
      img: "/cases/retail.png",
      desc: "Created an AI-powered demand forecasting system for retail analytics.",
    },
  ];

  return (
    <Section
      id="case-studies"
      className="relative overflow-hidden bg-[#050815] py-24"
    >
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(95,240,255,0.18),transparent_60%)] blur-[130px]" />
        <div className="absolute right-0 -bottom-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(80,120,255,0.20),transparent_60%)] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div
          variants={fadeUpCases}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.28em] text-[#7ef1ff]">
            CASE STUDIES
          </span>

          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            Proof in Results.
          </h2>

          <p className="max-w-2xl text-lg text-white/70">
            From websites to AI systems, we design and build solutions that
            deliver measurable growth scalability.
          </p>

          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
          >
            View All Projects →
          </Link>
        </motion.div>

        {/* CARDS */}
        <div className="mt-14 space-y-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={fadeUpCases}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="group flex flex-col gap-8 rounded-[28px] border border-white/10 bg-white/3 p-6 shadow-[0_0_65px_rgba(0,0,0,0.55)] backdrop-blur-xl md:flex-row md:p-8"
            >
              {/* IMAGE */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:w-[45%]">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority={index === 0}
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="max-w-xl text-sm text-white/70 md:text-base">
                      {card.desc}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-4xl font-bold text-[#7ef1ff] drop-shadow-[0_0_8px_rgba(80,240,255,0.4)] md:text-5xl">
                      {card.metric}
                    </div>
                    <div className="text-sm text-white/70">
                      {card.metricLabel}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Stat label="Traffic" value={traffic.get()} suffix="%" />
          <Stat label="Conversions" value={conv.get()} suffix="%" />
          <Stat label="CWV" value={vitals.get()} suffix="%" />
        </div>

        <motion.p
          variants={fadeUpCases}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 text-center text-white/60"
        >
          Ready to see how we can scale your business?
        </motion.p>
      </div>
    </Section>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
      <div className="text-3xl font-semibold text-white">
        {value}
        {suffix}
      </div>
      <div className="mt-1 text-white/60">{label}</div>
    </div>
  );
}

export { CaseStudies };

//

/* --------------------------------------------------------
   HOW WE WORK — PREMIUM VERSION WITH CLIP-PATH EXPANSION
--------------------------------------------------------- */

type ProcessItem = {
  id: string;
  number: string;
  title: string;
  desc: string;
  video: string;
};

// Painel abrindo com máscara (clipPath)
const maskVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
  show: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1], // mais premium
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

function HowWeWork() {
  const [openId, setOpenId] = useState<string>("01");

  const items: ProcessItem[] = [
    {
      id: "01",
      number: "01",
      title: "Strategy & Discovery",
      desc: "Deep-dive into goals, users, markets, and constraints to design a roadmap aligned with business impact.",
      video: "/videos/section-video.mp4",
    },
    {
      id: "02",
      number: "02",
      title: "Design & Experience",
      desc: "UI/UX, prototypes, and interaction concepts that turn complex journeys into clear, frictionless flows.",
      video: "/videos/section-video.mp4",
    },
    {
      id: "03",
      number: "03",
      title: "Development & QA",
      desc: "Modern architectures, performance, security, and testing baked into every release.",
      video: "/videos/section-video.mp4",
    },
    {
      id: "04",
      number: "04",
      title: "Launch & Growth",
      desc: "Monitoring, optimization, and iteration focused on ROI, conversions, and long-term scalability.",
      video: "/videos/section-video.mp4",
    },
  ];

  return (
    <Section
      id="process"
      className="relative overflow-hidden bg-[#050915] py-20"
    >
      {/* GLOWS DE FUNDO */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(100,255,230,0.22),transparent_60%)] blur-[90px]" />
        <div className="absolute -right-10 -bottom-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(88,101,255,0.22),transparent_60%)] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        {/* HEADER */}
        <div className="mb-10 space-y-3">
          <h2 className="text-3xl font-semibold leading-tight md:text-[44px]">
            How we work
          </h2>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            Strategy, technology, and growth — orchestrated in one seamless,
            transparent workflow so you always know exactly what’s happening and
            why.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/2 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          {items.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                className={clsx(
                  "cursor-pointer px-6 sm:px-8 transition-all duration-300",
                  index !== items.length - 1 && "border-b border-white/10",
                  isOpen ? "bg-white/5" : "bg-transparent hover:bg-white/3"
                )}
                onClick={() => setOpenId(isOpen ? "" : item.id)}
              >
                {/* HEADER DA LINHA */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  onClick={() => setOpenId(isOpen ? item.id : item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={clsx(
                        "grid h-10 w-10 place-items-center rounded-full border text-xs font-medium tracking-[0.15em]",
                        isOpen
                          ? "border-[#7ef1ff] bg-[#07101c] text-[#7ef1ff] shadow-[0_0_22px_rgba(126,241,255,0.55)]"
                          : "border-white/20 bg-white/5 text-white/60"
                      )}
                    >
                      {item.number}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold md:text-xl">
                        {item.title}
                      </h3>
                      {!isOpen && (
                        <p className="max-w-xl text-sm text-white/60">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={clsx(
                      "text-2xl font-light leading-none text-white transition-transform duration-300",
                      isOpen && "translate-x-1 rotate-0"
                    )}
                  >
                    →
                  </span>
                </button>

                {/* PAINEL EXPANDIDO */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      variants={maskVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="mb-6 overflow-hidden rounded-3xl border border-white/10 shadow-[0_25px_90px_rgba(0,0,0,0.65)] bg-black/30 backdrop-blur-xl"
                    >
                      <div className="relative h-[260px] w-full overflow-hidden rounded-3xl sm:h-80">
                        {/* VÍDEO DE FUNDO */}
                        <video
                          src={item.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover opacity-70"
                        />

                        {/* OVERLAYS */}
                        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/65 to-black/20" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,255,220,0.18),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_60%,rgba(100,180,255,0.18),transparent_50%)]" />

                        {/* CONTEÚDO INTERNO */}
                        <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                          <div className="max-w-xl space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7ef1ff]">
                              {item.number} • {item.title}
                            </p>
                            <h3 className="text-2xl font-semibold sm:text-3xl">
                              A clear, guided step in your digital growth.
                            </h3>
                            <p className="text-sm leading-6 text-white/70 sm:text-base">
                              We take this phase off your plate with a proven
                              framework — so you gain clarity, momentum, and a
                              partner that thinks about your product like a
                              founder would.
                            </p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-3">
                            <Button className="rounded-xl bg-white text-sm font-semibold text-[#050915] shadow-[0_18px_50px_rgba(0,0,0,0.6)] hover:bg-white/90">
                              Book a consultation
                            </Button>
                            <Button
                              variant="ghost"
                              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.6)] hover:bg-white/15"
                            >
                              View all services
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Tech Stack — Ultra-Faithful Premium UI
// ─────────────────────────────────────────────────────────────

const fadeUpStack: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const fadeUpCTA: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function TechStack() {
  const techs = [
    { abbr: "NE", label: "Next.js" },
    { abbr: "RE", label: "React" },
    { abbr: "FR", label: "Framer" },
    { abbr: "VE", label: "Vercel" },
    { abbr: "RN", label: "React Native" },
    { abbr: "SW", label: "Swift" },
    { abbr: "LA", label: "LangChain" },
    { abbr: "MA", label: "Make.com" },
    { abbr: "AW", label: "AWS" },
    { abbr: "FI", label: "Firebase" },
    { abbr: "SU", label: "Supabase" },
    { abbr: "PO", label: "PostgreSQL" },
  ];

  return (
    <Section
      id="stack"
      className="relative overflow-hidden bg-[#050712] py-24 text-white"
    >
      {/* Background FX */}
      <div className="pointer-events-none absolute inset-0">
        {/* Glow Left */}
        <div
          className="absolute -left-32 top-10 h-80 w-80 rounded-full 
          bg-[radial-gradient(circle_at_center,rgba(89,230,255,0.18),transparent_60%)] 
          blur-[90px]"
        />

        {/* Glow Right */}
        <div
          className="absolute -right-20 -bottom-20 h-[360px] w-[360px] 
          rounded-full bg-[radial-gradient(circle_at_center,rgba(128,90,255,0.22),transparent_55%)] 
          blur-[120px]"
        />

        {/* Animated Light Sweep */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(94,241,255,0.1)_0%,rgba(128,90,255,0.04)_50%,rgba(94,241,255,0.1)_100%)]"
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Header */}
        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45 }}
          variants={fadeUpStack}
        >
          <span className="text-xs font-semibold tracking-[0.32em] text-[#59e6ff]">
            TECH STACK
          </span>

          <h2 className="text-4xl font-semibold leading-tight md:text-[46px]">
            Built for Scalability
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            We build on a modern, future-ready stack—trusted by global leaders
            and optimized for performance, security, and growth.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.12 },
            },
            hidden: {},
          }}
        >
          {techs.map((t) => (
            <motion.div
              key={t.label}
              variants={fadeUpStack}
              whileHover={{
                scale: 1.05,
                translateY: -6,
                boxShadow: "0px 0px 35px rgba(94,241,255,0.35)",
              }}
              transition={{ duration: 0.28 }}
              className="group relative flex items-center gap-4 overflow-hidden 
                rounded-2xl border border-white/10 bg-white/3 px-6 py-4 
                shadow-[0_0_25px_rgba(0,0,0,0.55)] backdrop-blur-xl
                transition-all duration-300 
                hover:border-[#59e6ff66] hover:bg-white/6"
            >
              {/* BACKGROUND GLOW */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 
                transition-opacity duration-300 
                group-hover:opacity-100 
                group-hover:bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.18),transparent_55%)]"
              />

              {/* Icon */}
              <div
                className="relative grid h-10 w-10 place-items-center rounded-xl 
                bg-[#0c1a2b] text-[#5ef1ff] 
                shadow-[0_0_18px_rgba(89,230,255,0.45)] border border-white/10"
              >
                {t.abbr}
              </div>

              {/* Label */}
              <span className="relative text-[15px] font-semibold">
                {t.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpStack}
        >
          <p className="text-base text-white/70">
            Looking for a reliable tech partner?
          </p>

          <button
            type="button"
            className="rounded-2xl bg-linear-to-r 
              from-[#59e6ff] to-[#8f5eff] 
              px-7 py-3 text-sm font-semibold text-[#030711]
              shadow-[0_18px_40px_rgba(94,241,255,0.4)]
              transition hover:opacity-90"
          >
            Let&apos;s Build Together →
          </button>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Insights
// ─────────────────────────────────────────────────────────────

function Insights() {
  const posts = [
    {
      title: "AI in E-Commerce: How to Automate and Scale Sales",
      category: "Artificial Intelligence",
      desc: "From personalized recommendations to dynamic pricing — see how AI is reshaping e-commerce growth.",
      img: "/blog/ai-ecommerce.png",
      href: "/blog/ai-ecommerce",
    },
    {
      title: "Why Your Website Isn’t Converting — and How to Fix It",
      category: "UX / Design",
      desc: "A deep dive into expertise, leading speed and behavioural analytics that actually drive conversions.",
      img: "/blog/conversion-fix.png",
      href: "/blog/conversion",
    },
    {
      title: "From MVP to Scalable Product in 60 Days",
      category: "Development",
      desc: "How agile sprints, automation, and fast iteration help teams build and launch successful digital products.",
      img: "/blog/mvp-scalable.png",
      href: "/blog/mvp",
    },
  ];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Section
      id="insights"
      className="relative overflow-hidden bg-[#060815] py-20 text-white md:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(89,230,255,0.18),transparent_60%)] blur-[90px]" />
        <div className="absolute right-[-60px] -bottom-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(128,90,255,0.18),transparent_55%)] blur-[120px]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(94,241,255,0.06)_0%,rgba(128,90,255,0.05)_50%,rgba(94,241,255,0.06)_100%)]"
          animate={{ opacity: [0.35, 0.65, 0.35], y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          className="space-y-4 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            show: {
              transition: { staggerChildren: 0.08 },
            },
            hidden: {},
          }}
        >
          <motion.h2
            id="insights-title"
            className="text-3xl font-semibold leading-tight md:text-[44px]"
            variants={fadeUp}
          >
            Authority Through Knowledge.
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8"
            variants={fadeUp}
          >
            We share strategies, tools, and insights on web development, AI, and
            business automation to help brands grow smarter.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
            hidden: {},
          }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={fadeUp}
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/3 shadow-[0_0_40px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 hover:border-[#59e6ff] hover:shadow-[0_0_60px_rgba(80,240,255,0.35)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(89,230,255,0.12),transparent_50%)] opacity-80" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(128,90,255,0.12),transparent_55%)] opacity-80" />
              <div className="relative overflow-hidden rounded-[26px]">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 px-5 pb-6 pt-5">
                  <div className="text-sm font-semibold text-[#59e6ff]">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-white">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-6 text-white/70">{post.desc}</p>
                  <Link
                    href={post.href}
                    className="inline-flex items-center text-sm font-semibold text-[#59e6ff] group-hover:underline underline-offset-4"
                    aria-label={post.title}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <Link
            href="/blog"
            className="rounded-2xl bg-linear-to-r from-[#59e6ff] to-[#8f5eff] px-6 py-3 text-sm font-semibold text-[#030711] shadow-[0_15px_40px_-10px_rgba(94,241,255,0.4)] transition hover:opacity-90"
            aria-label="Visit blog"
          >
            Visit Blog →
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Final CTA — Perfect Matching Design
// ─────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <Section
      id="contact"
      className="relative overflow-hidden bg-[#050816] py-24 text-white"
    >
      {/* Background FX */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.25),transparent_60%)] blur-[100px]" />
        <div className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(143,94,255,0.25),transparent_60%)] blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side – Text */}
        <div className="space-y-5 lg:w-[60%]">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.32em] text-[#59e6ff]"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            READY TO TAKE SOMETHING EXTRAORDINARY
          </motion.p>

          <motion.h2
            className="text-[32px] font-semibold leading-tight md:text-[44px] lg:text-[50px]"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Ready to take your digital{" "}
            <span className="text-white">presence to the next level?</span>
          </motion.h2>

          <motion.p
            className="max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Tell us about your project and our team will send you a tailored
            proposal within 24 hours.
          </motion.p>

          <motion.div
            className="mt-4 flex flex-wrap gap-4"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Button className="rounded-2xl bg-linear-to-r from-[#5f5bff] via-[#7e5dff] to-[#5ef1ff] px-7 py-3 text-sm font-semibold shadow-[0_18px_45px_rgba(94,241,255,0.45)] hover:opacity-90">
              Book a Free Consultation
            </Button>

            <Button
              variant="ghost"
              className="rounded-2xl border border-white/30 bg-white/5 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.6)] hover:bg-white/10"
            >
              Chat with Our Team
            </Button>
          </motion.div>

          <motion.p
            className="pt-4 text-sm text-white/60"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Trusted by businesses in 5+ countries · 70+ successful projects ·
            98% client satisfaction
          </motion.p>
        </div>

        {/* Right Side – Glow + Floating Image */}
        <motion.div
          className="relative flex items-start justify-end lg:w-[40%]"
          variants={fadeUpCTA}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="pointer-events-none absolute -inset-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.45),transparent_70%)] blur-[120px]" />

          <motion.div
            className="relative w-full max-w-[520px]"
            animate={{
              scale: [1.05, 1.12, 1.05],
              y: [0, -6, 0],
              filter: [
                "drop-shadow(0 0 40px rgba(94,241,255,0.4))",
                "drop-shadow(0 0 90px rgba(94,241,255,0.75))",
                "drop-shadow(0 0 40px rgba(94,241,255,0.4))",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/cta/24h-response-stack.png"
              alt="24h response icons floating hologram"
              width={1350}
              height={1350}
              priority
              className="relative z-20 w-full h-auto object-contain pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0b0e1a]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid items-start gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/10">
                <Layers className="h-4 w-4" aria-hidden />
              </div>
              <span className="font-semibold tracking-wide">LHWEB</span>
            </div>

            <p className="mt-3 max-w-sm text-sm text-white/60">
              We craft high-performance digital products with Next.js, Tailwind
              and a relentless focus on results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <nav aria-label="Footer navigation">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                Company
              </h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link href="#about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#capabilities" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
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
              <ul className="space-y-2 text-white/70">
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
          Built with Next.js 14 • Tailwind CSS • shadcn/ui • Framer Motion •
          Deployed on Vercel
        </div>
      </div>
    </footer>
  );
}
