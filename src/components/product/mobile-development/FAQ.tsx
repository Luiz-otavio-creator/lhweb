// src/components/product/FAQ.tsx
"use client";

import { useState } from "react";
import type { ProductFAQItem } from "/app/product/types";

type Props = {
  items: ProductFAQItem[];
};

export default function FAQ({ items }: Props) {
  // Hook SEMPRE vem antes de qualquer return condicional
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (!items.length) return null;

  return (
    <section className="mb-16 md:mb-20">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          FAQ
        </p>
        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
          Perguntas que normalmente surgem antes de começarmos.
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <button
              key={faq.id}
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-left shadow-[0_18px_50px_rgba(15,23,42,0.9)] transition-colors hover:border-cyan-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-50">
                  {faq.question}
                </p>
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-white/20 text-xs text-slate-300">
                  {isOpen ? "–" : "+"}
                </span>
              </div>
              {isOpen && (
                <p className="mt-2 text-xs text-slate-300">{faq.answer}</p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
