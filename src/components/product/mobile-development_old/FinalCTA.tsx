// src/components/product/FinalCTA.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ProductPageData } from "@/app/product/types";

type Props = {
  data: ProductPageData["finalCta"];
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function FinalCTA({ data }: Props) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-white">
      {/* Background FX */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.25),transparent_60%)] blur-[100px]" />
        <div className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(143,94,255,0.25),transparent_60%)] blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Text */}
        <motion.div
          className="space-y-5 lg:w-[60%]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#59e6ff]">
            {data.trustNote || "READY TO SCALE"}
          </p>

          <h2 className="text-[32px] font-semibold leading-tight md:text-[44px] lg:text-[50px]">
            {data.title}
          </h2>

          <p className="max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            {data.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <Button className="rounded-2xl bg-linear-to-r from-[#5f5bff] via-[#7e5dff] to-[#5ef1ff] px-7 py-3 text-sm font-semibold shadow-[0_18px_45px_rgba(94,241,255,0.45)] hover:opacity-90">
              {data.primaryCta}
            </Button>

            {data.secondaryCta && (
              <Button
                variant="ghost"
                className="rounded-2xl border border-white/30 bg-white/5 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.6)] hover:bg-white/10"
              >
                {data.secondaryCta}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Floating Graphic */}
        <motion.div
          className="relative flex items-start justify-end lg:w-[40%]"
          animate={{
            scale: [1.05, 1.12, 1.05],
            y: [0, -6, 0],
            filter: [
              "drop-shadow(0 0 30px rgba(94,241,255,0.4))",
              "drop-shadow(0 0 65px rgba(94,241,255,0.75))",
              "drop-shadow(0 0 30px rgba(94,241,255,0.4))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="pointer-events-none absolute -inset-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.45),transparent_70%)] blur-[120px]" />

          <img
            src="/cta/24h-response-stack.png"
            alt="LHWEB floating hologram"
            className="relative z-20 w-full max-w-[520px] object-contain pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
