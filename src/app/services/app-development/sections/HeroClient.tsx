"use client";

import Link from "next/link";
import { motion, easeOut, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AppDevOrb from "@/components/visuals/AppDevOrb";
import { ArrowRight, ShieldCheck, Gauge, Rocket } from "lucide-react";

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: i * 0.08 },
  }),
};

export default function HeroClient() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    performance.mark("app-dev-hero-mounted");
  }, []);

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
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 7, repeat: Infinity, ease: "easeInOut" }
              }
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
