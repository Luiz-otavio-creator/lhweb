// src/components/product/ValueProps.tsx
"use client";

import { motion } from "framer-motion";
import type { ProductValueProp } from "@/app/product/types";

type Props = {
  items: ProductValueProp[];
};

export default function ValueProps({ items }: Props) {
  if (!items?.length) return null;

  return (
    <section className="mb-16 md:mb-20">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          Por que escolher este produto
        </p>

        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
          Os pilares que sustentam uma solução de alto impacto.
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-[15px]">
          Performance, segurança, automação e ROI — todas as fundações
          essenciais para construir produtos que escalam e geram resultado real.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((v, index) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="
              group flex flex-col gap-4 rounded-2xl border border-white/10 
              bg-white/3 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] 
              backdrop-blur-xl hover:border-cyan-400/40 hover:shadow-[0_18px_60px_rgba(94,241,255,0.35)] transition
            "
          >
            {/* Icon */}
            <div
              className="
                grid h-12 w-12 place-items-center rounded-xl border border-white/10 
                bg-white/5 text-cyan-300 shadow-[0_0_20px_rgba(94,241,255,0.3)]
              "
            >
              {v.icon ? (
                <span className="text-lg">
                  {/* You can replace this with lucide-react icon */}
                  {v.icon}
                </span>
              ) : (
                <span className="text-xl">★</span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-white">{v.title}</h3>

            {/* Description */}
            <p className="text-sm text-white/70 leading-6">{v.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
