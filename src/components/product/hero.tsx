// src/components/product/hero.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "../../components/ui/button";
import type { ProductPageData, ProductTag } from "../../app/product/types";

type Props = {
  data: ProductPageData;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Hero({ data }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-[#050816] py-24 text-white"
      aria-label="Product Hero"
    >
      {/* Background FX */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.25),transparent_60%)] blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(143,94,255,0.25),transparent_60%)] blur-[180px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6 max-w-3xl"
        >
          {/* Label */}
          {data.heroLabel && (
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300"
            >
              {data.heroLabel}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
          >
            {data.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base text-white/70 sm:text-lg"
          >
            {data.subtitle}
          </motion.p>

          {/* Benefit */}
          {data.heroBenefit && (
            <motion.p
              variants={fadeUp}
              className="text-sm font-medium text-cyan-300"
            >
              {data.heroBenefit}
            </motion.p>
          )}

          {/* Tags */}
          {data.tags?.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {data.tags.map((tag: ProductTag) => (
                <span
                  key={tag.label}
                  className="rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-xs text-white/70 backdrop-blur hover:text-white hover:border-cyan-300/40 transition"
                >
                  {tag.label}
                </span>
              ))}
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-6">
            <Button className="rounded-xl bg-linear-to-r from-[#5ef1ff] to-[#8f5eff] px-7 py-3 text-sm font-semibold text-[#050816] shadow-[0_18px_40px_rgba(94,241,255,0.45)] hover:opacity-90">
              {data.primaryCta}
            </Button>

            <Button
              variant="ghost"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.6)] hover:bg-white/15"
            >
              {data.secondaryCta}
            </Button>
          </motion.div>

          {/* Trust Bar */}
          {data.trustBar && (
            <motion.p variants={fadeUp} className="pt-4 text-sm text-white/60">
              {data.trustBar}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
