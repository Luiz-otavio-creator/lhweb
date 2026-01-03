// src/components/product/Pricing.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ProductPricingTier } from "@/app/product/types";

type Props = {
  tiers: ProductPricingTier[];
};

export default function Pricing({ tiers }: Props) {
  if (!tiers?.length) return null;

  return (
    <section className="mb-16 md:mb-20">
      <div className="mb-6 space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          Pricing
        </p>
        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
          Escolha o plano ideal para o momento do seu produto.
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-[15px]">
          Planos criados para diferentes estágios — validação, escala ou
          operações avançadas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className={`group relative flex flex-col rounded-2xl border border-white/10 bg-white/3 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl
              ${
                tier.highlight
                  ? "border-cyan-400/40 shadow-[0_18px_60px_rgba(94,241,255,0.45)]"
                  : ""
              }`}
          >
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
              <p className="text-sm text-white/60">{tier.description}</p>

              {tier.price && (
                <p className="text-2xl font-semibold text-cyan-300">
                  {tier.price}
                </p>
              )}

              {tier.priceNote && (
                <p className="text-xs text-white/40">{tier.priceNote}</p>
              )}
            </div>

            {/* Feature List */}
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              {tier.features.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-300 mt-0.5">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-auto pt-6">
              <Button
                className={`w-full rounded-xl px-6 py-3 text-sm font-semibold shadow-[0_18px_45px_rgba(94,241,255,0.45)]
                  ${
                    tier.highlight
                      ? "bg-linear-to-r from-[#5ef1ff] to-[#8f5eff] text-[#050816]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
              >
                {tier.ctaLabel}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
