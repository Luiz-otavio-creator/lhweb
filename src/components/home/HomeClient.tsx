"use client";

import Image from "next/image";
import Link from "next/link";
import type { Variants } from "framer-motion";
import clsx from "clsx";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useAnimationControls,
  useTransform,
  easeOut,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitch } from "@/components/ui/theme-switch";
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
import { SiteHeader } from "@/components/site-header";
import LeadForm from "@/components/forms/LeadForm";
import PrivacySettingsLink from "@/components/analytics/PrivacySettingsLink";
import type { HomeContent } from "@/lib/content/types";

const capabilityIcons = {
  code: Code2,
  smartphone: Smartphone,
  sparkles: Sparkles,
};

const whyIcons = {
  zap: Zap,
  bot: Bot,
  gauge: GaugeCircle,
  users: UsersRound,
};

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

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

export default function HomeClient({ content }: { content: HomeContent }) {
  return (
    <main className="min-h-screen bg-[#0b0e1a] text-white selection:bg-white/10">
      <SiteHeader />
      <Hero content={content} />
      <EnhancedCapabilities content={content} />
      <WhyLHWEB content={content} />
      <CaseStudies content={content} />
      <HowWeWork content={content} />
      <TechStack content={content} />
      <Insights content={content} />
      <FinalCTA content={content} />
      <SiteFooter content={content} />
    </main>
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

function CompanyMarquee({ content }: { content: HomeContent }) {
  const controls = useAnimationControls();
  const DURATION = 18;
  const companyLogos = content.hero.logos;

  const MIN_LOGOS = 6;
  const baseLogos =
    companyLogos.length === 0
      ? []
      : companyLogos.length >= MIN_LOGOS
        ? companyLogos
        : Array.from({
            length: Math.ceil(MIN_LOGOS / companyLogos.length),
          }).flatMap(() => companyLogos);
  const marqueeLogos = [...baseLogos, ...baseLogos];

  const startAnimation = useCallback(() => {
    void controls.start({
      x: "-50%",
      transition: { duration: DURATION, ease: "linear", repeat: Infinity },
    });
  }, [controls]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <div
      className="relative mt-4 h-14 overflow-hidden sm:h-16"
      role="region"
      aria-label="Company logos marquee"
    >
      <motion.div
        className="flex w-max items-center gap-4"
        animate={controls}
        initial={{ x: 0 }}
        onHoverStart={() => controls.stop()}
        onHoverEnd={startAnimation}
        onPointerLeave={startAnimation}
        onPointerCancel={startAnimation}
      >
        {marqueeLogos.map((logo, index) => (
          <Image
            key={`${logo.storagePath}-${index}`}
            src={logo.downloadURL}
            alt={logo.alt || "Company logo"}
            width={160}
            height={64}
            className="h-9 w-auto max-w-[140px] object-contain opacity-90 sm:h-10"
            aria-hidden={index >= baseLogos.length}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#050914] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#050914] to-transparent sm:w-16" />
    </div>
  );
}

function Hero({ content }: { content: HomeContent }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#070b16] text-white pt-28 pb-20 md:pt-32 md:pb-28"
      aria-label="Hero – LHWEB"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src={content.hero.backgroundVideo.downloadURL}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-b from-[#050914]/40 via-[#050914]/45 to-[#050914]/65" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 text-center md:gap-12 lg:px-10">
        <motion.div
          className="w-full max-w-3xl space-y-6 md:space-y-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h1
            variants={heroFadeUp}
            className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {content.hero.title}
          </motion.h1>

          <motion.p
            variants={heroFadeUp}
            transition={{ delay: 0.12 }}
            className="mx-auto max-w-2xl text-sm text-white/70 sm:text-base md:text-lg"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            variants={heroFadeUp}
            transition={{ delay: 0.24 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              className="w-full bg-[#35f0ff] text-[#050914] shadow-[0_15px_40px_-10px_rgba(53,240,255,0.55)] hover:bg-[#32d8e5] sm:w-auto"
              data-cta-id={content.hero.primaryCta.ctaId}
              data-cta-placement={content.hero.primaryCta.placement}
              data-cta-text={content.hero.primaryCta.text}
            >
              {content.hero.primaryCta.text}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-white hover:bg-white/5 sm:w-auto"
              data-cta-id={content.hero.secondaryCta.ctaId}
              data-cta-placement={content.hero.secondaryCta.placement}
              data-cta-text={content.hero.secondaryCta.text}
            >
              {content.hero.secondaryCta.text}
            </Button>
          </motion.div>

          <motion.div
            variants={heroFadeUp}
            transition={{ delay: 0.36 }}
            className="mt-6 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.28em] text-white/50">
              {content.hero.trustLabel}
            </span>

            <div className="mx-auto w-full max-w-3xl">
              <CompanyMarquee content={content} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Enhanced Capabilities
// ─────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

function EnhancedCapabilities({ content }: { content: HomeContent }) {
  const cards = content.sections.capabilities.cards;

  return (
    <Section
      id="enhanced-capabilities"
      className="relative bg-background text-foreground"
    >
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
            {content.sections.capabilities.eyebrow}
          </span>

          <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
            {content.sections.capabilities.title}
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {cards.map((card, index) => {
            const Icon = capabilityIcons[card.iconKey as keyof typeof capabilityIcons];
            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                className={clsx(
                  "group flex h-full flex-col items-center gap-5 rounded-3xl",
                  "border border-transparent",
                  "bg-[#0a0d16]/80",
                  "p-8",
                  "backdrop-blur-xl",
                  "shadow-[0_0_20px_rgba(0,0,0,0.5)]",
                  "transition-all",
                  "hover:shadow-[0_0_40px_rgba(96,0,255,0.35)]",
                  "hover:border",
                  "hover:border-[rgba(96,0,255,0.6)]",
                  "relative text-center"
                )}
              >
                {/* Gradient border overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent bg-[linear-gradient(to_bottom_right,rgba(0,255,255,0.22),rgba(123,0,255,0.22))] opacity-30" />

                <div className="relative flex flex-col items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center text-[#80f7ff]">
                    {Icon ? <Icon className="h-12 w-12" strokeWidth={1.7} /> : null}
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                </div>

                <p className="text-sm leading-6 text-white/70">
                  {card.description}
                </p>

                <div className="text-sm font-medium text-white/90">
                  {card.tech}
                </div>

                <Link
                  href={card.href}
                  className="mt-auto inline-flex items-center text-sm font-semibold text-[#5ef2ff] hover:text-white transition"
                  aria-label={card.ctaText}
                  data-cta-id={card.ctaId}
                  data-cta-placement={card.placement}
                  data-cta-text={card.ctaText}
                >
                  {card.ctaText}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Explore All */}
        <motion.div
          className="mt-16 space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p className="text-sm text-foreground/70">
            {content.sections.capabilities.footerText}
          </p>

          <Link
            href={content.sections.capabilities.footerCta.href || "/services"}
            aria-label={content.sections.capabilities.footerCta.text}
          >
            <Button
              variant="ghost"
              className={clsx(
                "rounded-2xl",
                "border border-[rgba(109,0,255,0.45)]",
                "bg-transparent",
                "px-8 py-4 text-sm font-semibold text-foreground",
                "shadow-[0_0_25px_rgba(109,0,255,0.3)]",
                "hover:bg-[rgba(109,0,255,0.1)]",
                "hover:border-[rgba(109,0,255,0.65)]",
                "transition"
              )}
              data-cta-id={content.sections.capabilities.footerCta.ctaId}
              data-cta-placement={content.sections.capabilities.footerCta.placement}
              data-cta-text={content.sections.capabilities.footerCta.text}
            >
              {content.sections.capabilities.footerCta.text}
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Why LHWEB
// ─────────────────────────────────────────────────────────────

const fadeUpWhy: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function WhyLHWEB({ content }: { content: HomeContent }) {
  const features = content.sections.why.features;
  const stats = content.sections.why.stats;

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
            {content.sections.why.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUpWhy}
            className="text-[36px] font-semibold leading-tight sm:text-[44px] md:text-[52px]"
          >
            {content.sections.why.title}
          </motion.h2>

          <motion.p
            variants={fadeUpWhy}
            className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {content.sections.why.subtitle}
          </motion.p>

          {/* Feature box */}
          <motion.div variants={fadeUpWhy} className="mt-6 w-full rounded-4xl ">
            <div className="grid gap-10 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = whyIcons[feature.iconKey as keyof typeof whyIcons];
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="mt-1 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[#5ef2ff] shadow-[0_0_32px_rgba(0,255,255,0.45)]">
                      {Icon ? <Icon className="h-8 w-8 stroke-[1.6]" /> : null}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/70 leading-6">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
              src={content.sections.why.image.downloadURL}
              alt={content.sections.why.image.alt || "Why LHWEB"}
              width={content.sections.why.image.width || 900}
              height={content.sections.why.image.height || 900}
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
// Case Studies
// ─────────────────────────────────────────────────────────────

const fadeUpCases: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function CaseStudies({ content }: { content: HomeContent }) {
  const traffic = useCounter(content.sections.caseStudies.stats[0]?.value || 0);
  const conv = useCounter(content.sections.caseStudies.stats[1]?.value || 0);
  const vitals = useCounter(content.sections.caseStudies.stats[2]?.value || 0);

  const cards = content.sections.caseStudies.cards;

  return (
    <Section
      id="case-studies"
      className="relative overflow-hidden bg-[#050815] py-24"
    >
      {/* BACKGROUND IMAGE */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="galaxy-bg absolute -inset-[20%]" />
      </div>

      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(95,240,255,0.18),transparent_60%)] blur-[130px]" />
        <div className="absolute right-0 -bottom-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(80,120,255,0.20),transparent_60%)] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div
          variants={fadeUpCases}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3"
        >
          <span className="text-xs font-semibold tracking-[0.28em] text-[#7ef1ff]">
            {content.sections.caseStudies.eyebrow}
          </span>

          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            {content.sections.caseStudies.title}
          </h2>

            <div className="mt-6 flex items-center justify-between gap-8">
            <p className="max-w-2xl text-lg text-white/70">
              {content.sections.caseStudies.subtitle}
            </p>

            <Link
              href={content.sections.caseStudies.cta.href || "#projects"}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10 whitespace-nowrap"
              data-cta-id={content.sections.caseStudies.cta.ctaId}
              data-cta-placement={content.sections.caseStudies.cta.placement}
              data-cta-text={content.sections.caseStudies.cta.text}
            >
              {content.sections.caseStudies.cta.text}
            </Link>
            </div>
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
              <div className="space-y-4 md:w-[45%]">
                <h3 className="text-3xl font-semibold text-white md:text-4xl">
                  {card.title}
                </h3>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <Image
                    src={card.image.downloadURL}
                    alt={card.image.alt || card.title}
                    width={card.image.width || 640}
                    height={card.image.height || 360}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div className="flex items-start justify-between">
                  <div className="text-right">
                    <div className="text-5xl font-bold text-[#7ef1ff] drop-shadow-[0_0_8px_rgba(80,240,255,0.4)] md:text-6xl">
                      {card.metric}
                    </div>
                    <div className="text-sm text-white/70">
                      {card.metricLabel}
                    </div>
                    <p className="mt-4 max-w-xl text-left text-lg text-white/70 md:text-xl">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Stat
            label={content.sections.caseStudies.stats[0]?.label || "Traffic"}
            value={traffic.get()}
            suffix={content.sections.caseStudies.stats[0]?.suffix || "%"}
          />
          <Stat
            label={content.sections.caseStudies.stats[1]?.label || "Conversions"}
            value={conv.get()}
            suffix={content.sections.caseStudies.stats[1]?.suffix || "%"}
          />
          <Stat
            label={content.sections.caseStudies.stats[2]?.label || "CWV"}
            value={vitals.get()}
            suffix={content.sections.caseStudies.stats[2]?.suffix || "%"}
          />
        </div>

        <motion.p
          variants={fadeUpCases}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 text-center text-white/60"
        >
          {content.sections.caseStudies.closingText}
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

// ─────────────────────────────────────────────────────────────
// How We Work
// ─────────────────────────────────────────────────────────────

type ProcessItem = {
  id: string;
  number: string;
  title: string;
  desc: string;
  video: string;
};

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
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

function HowWeWork({ content }: { content: HomeContent }) {
  const [openId, setOpenId] = useState<string>("01");

  const items: ProcessItem[] = content.sections.process.items.map((item) => ({
    id: item.id,
    number: item.number,
    title: item.title,
    desc: item.description,
    video: item.video.downloadURL,
  }));

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
            {content.sections.process.title}
          </h2>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            {content.sections.process.subtitle}
          </p>
        </div>

        {/* ACCORDION */}
        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/2 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          {items.map((item, index) => {
            const isOpen = openId === item.id;
            const panel = content.sections.process.items.find(
              (entry) => entry.id === item.id
            );

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
                  {isOpen && panel ? (
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
                              {panel.panel.eyebrow}
                            </p>
                            <h3 className="text-2xl font-semibold sm:text-3xl">
                              {panel.panel.heading}
                            </h3>
                            <p className="text-sm leading-6 text-white/70 sm:text-base">
                              {panel.panel.body}
                            </p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-3">
                            <Button
                              className="rounded-xl bg-white text-sm font-semibold text-[#050915] shadow-[0_18px_50px_rgba(0,0,0,0.6)] hover:bg-white/90"
                              data-cta-id={panel.panel.primaryCta.ctaId}
                              data-cta-placement={panel.panel.primaryCta.placement}
                              data-cta-text={panel.panel.primaryCta.text}
                            >
                              {panel.panel.primaryCta.text}
                            </Button>
                            <Button
                              variant="ghost"
                              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.6)] hover:bg-white/15"
                              data-cta-id={panel.panel.secondaryCta.ctaId}
                              data-cta-placement={panel.panel.secondaryCta.placement}
                              data-cta-text={panel.panel.secondaryCta.text}
                            >
                              {panel.panel.secondaryCta.text}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
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
// Tech Stack
// ─────────────────────────────────────────────────────────────

const fadeUpStack: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const techLogoMap: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  Framer: "framer",
  Vercel: "vercel",
  "React Native": "react",
  Swift: "swift",
  LangChain: "langchain",
  "Make.com": "make",
  AWS: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Amazon Web Services":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  AmazonDB:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/dynamodb/dynamodb-original.svg",
  "Amazon DB":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/dynamodb/dynamodb-original.svg",
  Firebase: "firebase",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
};

const fadeUpCTA: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function TechStack({ content }: { content: HomeContent }) {
  const techs = content.sections.techStack.techs;

  return (
    <Section
      id="stack"
      className="relative overflow-hidden bg-[#050712] py-24 text-white"
    >
      {/* Background FX */}
      <div className="pointer-events-none absolute inset-0">
        {/* Glow Left */}
        <div
          className={clsx(
            "absolute -left-32 top-10 h-80 w-80 rounded-full",
            "bg-[radial-gradient(circle_at_center,rgba(89,230,255,0.18),transparent_60%)]",
            "blur-[90px]"
          )}
        />

        {/* Glow Right */}
        <div
          className={clsx(
            "absolute -right-20 -bottom-20 h-[360px] w-[360px] rounded-full",
            "bg-[radial-gradient(circle_at_center,rgba(128,90,255,0.22),transparent_55%)]",
            "blur-[120px]"
          )}
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
            {content.sections.techStack.eyebrow}
          </span>

          <h2 className="text-4xl font-semibold leading-tight md:text-[46px]">
            {content.sections.techStack.title}
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            {content.sections.techStack.subtitle}
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
          {techs.map((t) => {
            const logo = techLogoMap[t.label];
            const logoSrc = logo
              ? logo.startsWith("http")
                ? logo
                : `https://cdn.simpleicons.org/${logo}`
              : "";

            return (
              <motion.div
                key={t.label}
                variants={fadeUpStack}
                whileHover={{
                  scale: 1.05,
                  translateY: -6,
                  boxShadow: "0px 0px 35px rgba(94,241,255,0.35)",
                }}
                transition={{ duration: 0.28 }}
                className={clsx(
                  "group relative flex items-center gap-4 overflow-hidden",
                  "rounded-2xl border border-white/10 bg-white/3 px-6 py-4",
                  "shadow-[0_0_25px_rgba(0,0,0,0.55)] backdrop-blur-xl",
                  "transition-all duration-300",
                  "hover:border-[#59e6ff66] hover:bg-white/6"
                )}
              >
              {/* BACKGROUND GLOW */}
              <div
                className={clsx(
                  "pointer-events-none absolute inset-0 opacity-0",
                  "transition-opacity duration-300",
                  "group-hover:opacity-100",
                  "group-hover:bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.18),transparent_55%)]"
                )}
              />

              {/* Icon */}
              <div
                className={clsx(
                  "relative grid h-10 w-10 place-items-center rounded-xl",
                  "bg-[#0c1a2b] text-[#5ef1ff]",
                  "shadow-[0_0_18px_rgba(89,230,255,0.45)] border border-white/10"
                )}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${t.label} logo`}
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-sm font-semibold">{t.abbr}</span>
                )}
              </div>

              {/* Label */}
              <span className="relative text-[15px] font-semibold">
                {t.label}
              </span>
              </motion.div>
            );
          })}
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
            {content.sections.techStack.ctaText}
          </p>

          <button
            type="button"
            className={clsx(
              "rounded-2xl bg-linear-to-r",
              "from-[#59e6ff] to-[#8f5eff]",
              "px-7 py-3 text-sm font-semibold text-[#030711]",
              "shadow-[0_18px_40px_rgba(94,241,255,0.4)]",
              "transition hover:opacity-90"
            )}
            data-cta-id={content.sections.techStack.ctaButton.ctaId}
            data-cta-placement={content.sections.techStack.ctaButton.placement}
            data-cta-text={content.sections.techStack.ctaButton.text}
          >
            {content.sections.techStack.ctaButton.text}
          </button>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Insights
// ─────────────────────────────────────────────────────────────

function Insights({ content }: { content: HomeContent }) {
  const posts = content.sections.insights.posts;

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
            {content.sections.insights.title}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-base leading-7 text-white/70 md:text-lg md:leading-8"
            variants={fadeUp}
          >
            {content.sections.insights.subtitle}
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
                    src={post.image.downloadURL}
                    alt={post.image.alt || post.title}
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
                  <p className="text-sm leading-6 text-white/70">
                    {post.description}
                  </p>
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
            href={content.sections.insights.cta.href || "/blog"}
            className="rounded-2xl bg-linear-to-r from-[#59e6ff] to-[#8f5eff] px-6 py-3 text-sm font-semibold text-[#030711] shadow-[0_15px_40px_-10px_rgba(94,241,255,0.4)] transition hover:opacity-90"
            aria-label={content.sections.insights.cta.text}
            data-cta-id={content.sections.insights.cta.ctaId}
            data-cta-placement={content.sections.insights.cta.placement}
            data-cta-text={content.sections.insights.cta.text}
          >
            {content.sections.insights.cta.text}
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────

function FinalCTA({ content }: { content: HomeContent }) {
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
            {content.sections.finalCta.eyebrow}
          </motion.p>

          <motion.h2
            className="text-[32px] font-semibold leading-tight md:text-[44px] lg:text-[50px]"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {content.sections.finalCta.title}
          </motion.h2>

          <motion.p
            className="max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {content.sections.finalCta.subtitle}
          </motion.p>

          <motion.div
            className="mt-4 flex flex-wrap gap-4"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Button
              className="rounded-2xl bg-linear-to-r from-[#5f5bff] via-[#7e5dff] to-[#5ef1ff] px-7 py-3 text-sm font-semibold shadow-[0_18px_45px_rgba(94,241,255,0.45)] hover:opacity-90"
              data-cta-id={content.sections.finalCta.primaryCta.ctaId}
              data-cta-placement={content.sections.finalCta.primaryCta.placement}
              data-cta-text={content.sections.finalCta.primaryCta.text}
            >
              {content.sections.finalCta.primaryCta.text}
            </Button>

            <Button
              variant="ghost"
              className="rounded-2xl border border-white/30 bg-white/5 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.6)] hover:bg-white/10"
              data-cta-id={content.sections.finalCta.secondaryCta.ctaId}
              data-cta-placement={content.sections.finalCta.secondaryCta.placement}
              data-cta-text={content.sections.finalCta.secondaryCta.text}
            >
              {content.sections.finalCta.secondaryCta.text}
            </Button>
          </motion.div>

          <LeadForm />

          <motion.p
            className="pt-4 text-sm text-white/60"
            variants={fadeUpCTA}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {content.sections.finalCta.trustText}
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
              src={content.sections.finalCta.image.downloadURL}
              alt={content.sections.finalCta.image.alt || "CTA image"}
              width={content.sections.finalCta.image.width || 1350}
              height={content.sections.finalCta.image.height || 1350}
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

function SiteFooter({ content }: { content: HomeContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0b0e1a]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid items-start gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center justify-center leading-none">
                <Image
                  src="/hero/logo.webp"
                  alt="LH Web"
                  width={260}
                  height={260}
                  className="h-14 w-auto md:h-28 lg:h-16 drop-shadow-[0_0_22px_rgba(94,241,255,0.75)]"
                />
              </Link>
            </div>

            <p className="mt-3 max-w-sm text-sm text-white/60">
              {content.footer.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <nav aria-label="Footer navigation">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                {content.footer.nav.title}
              </h4>
              <ul className="space-y-2 text-white/70">
                {content.footer.nav.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social links">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                {content.footer.social.title}
              </h4>
              <ul className="space-y-2 text-white/70">
                {content.footer.social.links.map((link) => {
                  const Icon = socialIcons[link.iconKey as keyof typeof socialIcons];
                  return (
                    <li key={link.label} className="flex items-center gap-2">
                      {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
                      <Link href={link.href} className="hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="text-sm text-white/60 md:text-right">
            <div>
              {content.footer.legal.copyright.replace("{year}", String(year))}
            </div>
            <div className="mt-2">{content.footer.legal.tagline}</div>
            <div className="mt-2">
              <PrivacySettingsLink className="text-xs text-white/60 hover:text-white" />
            </div>
            <div className="mt-4 flex items-center justify-start md:justify-end">
              <ThemeSwitch />
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-white/10" />

        <div className="text-xs text-white/40">
          {content.footer.legal.builtWith}
        </div>
      </div>
    </footer>
  );
}
