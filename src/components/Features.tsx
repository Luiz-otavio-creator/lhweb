// src/components/product/Features.tsx
"use client";

import { motion } from "framer-motion";
import type { ProductFeature } from "@/types/product";

type Props = {
  items: ProductFeature[];
};

export default function Features({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="mb-16 md:mb-20">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          O que você leva na prática
        </p>
        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
          Um ciclo completo de produto mobile — do discovery ao growth.
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-[15px]">
          Cada etapa do processo foi desenhada para reduzir risco, acelerar
          entrega e manter o app saudável no longo prazo.
        </p>
      </div>

      <div className="space-y-5">
        {items.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.9)] backdrop-blur-sm md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="max-w-xl space-y-2">
              <h3 className="text-[15px] font-semibold text-slate-50 md:text-base">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 md:text-[13px]">
                {feature.description}
              </p>
              {feature.highlight && (
                <p className="text-xs font-medium text-cyan-300">
                  {feature.highlight}
                </p>
              )}
            </div>

            {/* Mini mockup / ilustração abstrata */}
            <div className="relative w-full max-w-[220px] self-end md:self-auto">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.55),transparent_65%)] blur-2xl" />
              <div className="h-28 rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-3">
                <div className="mb-2 flex items-center justify-between text-[9px] text-slate-400">
                  <span>App flow</span>
                  <span>LHWEB</span>
                </div>
                <div className="flex h-16 items-end gap-1.5">
                  <div className="flex-1 rounded-lg bg-linear-to-t from-slate-700 via-violet-500/60 to-violet-300/70" />
                  <div className="flex-1 rounded-lg bg-linear-to-t from-slate-700 via-blue-500/60 to-blue-300/70" />
                  <div className="flex-1 rounded-lg bg-linear-to-t from-slate-700 via-cyan-500/60 to-cyan-300/70" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
