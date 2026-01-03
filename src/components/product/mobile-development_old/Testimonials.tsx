// src/components/product/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import type { ProductTestimonial } from "@/app/product/types";

type Props = {
  items: ProductTestimonial[];
};

export default function Testimonials({ items }: Props) {
  if (!items?.length) return null;

  return (
    <section className="mb-16 md:mb-20">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          Depoimentos
        </p>
        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
          O que nossos clientes dizem.
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-[15px]">
          Resultados reais, conquistados com produtos digitais de alta
          performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="
              flex flex-col gap-4 rounded-2xl border border-white/10 
              bg-white/3 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)] 
              backdrop-blur-xl
            "
          >
            {/* Quote */}
            <blockquote className="text-sm leading-6 text-white/80">
              “{t.quote}”
            </blockquote>

            {/* Divider */}
            <div className="h-px w-full bg-white/10" />

            {/* Footer */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{t.name}</span>
              <span className="text-xs text-white/50">
                {t.role} • {t.company}
              </span>
              <span className="text-xs font-medium text-cyan-300 mt-1">
                {t.result}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
