// src/components/product/Comparison.tsx
"use client";

import { motion } from "framer-motion";
import type { ProductPageData } from "@/types/product";

type Props = {
  data: ProductPageData["comparison"];
};

export default function Comparison({ data }: Props) {
  return (
    <section className="mb-16 md:mb-20">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          Antes vs. Depois
        </p>
        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
          A diferença entre “ter um app” e ter um produto mobile saudável.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-red-400/25 bg-slate-950/80 p-4 shadow-[0_20px_60px_rgba(127,29,29,0.65)]"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="pointer-events-none absolute -left-8 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.4),transparent_60%)] blur-2xl" />
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300">
            Antes
          </p>
          <h3 className="mb-3 text-sm font-semibold text-slate-50">
            {data.before.title}
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {data.before.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border border-emerald-400/35 bg-slate-950/80 p-4 shadow-[0_22px_70px_rgba(6,95,70,0.75)]"
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.45),transparent_60%)] blur-2xl" />
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Depois com LHWEB
          </p>
          <h3 className="mb-3 text-sm font-semibold text-slate-50">
            {data.after.title}
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {data.after.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
