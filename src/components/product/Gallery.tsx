// src/components/product/Gallery.tsx
"use client";

import { motion } from "framer-motion";
import type { ProductImage } from "../../app/product/types";

type Props = {
  images: ProductImage[];
};

export default function Gallery({ images }: Props) {
  if (!images.length) return null;

  return (
    <section className="mb-16 md:mb-20">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          Visual do Produto
        </p>
        <h2 className="text-balance text-2xl font-semibold text-slate-50 md:text-3xl">
          Uma visão clara do que você recebe.
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-[15px]">
          Mockups, telas e visuais que representam a experiência do seu produto.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            className="
              group relative overflow-hidden rounded-2xl border border-white/10 
              bg-slate-950/60 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.9)] 
              backdrop-blur-sm
            "
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none absolute -inset-6 -z-10 
                rounded-3xl bg-[radial-gradient(circle_at_center,rgba(94,241,255,0.25),transparent_65%)]
                blur-2xl opacity-40
              "
            />

            {/* Image */}
            <img
              src={`/products/${img.id}.png`}
              alt={img.alt}
              className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />

            {/* Caption */}
            {img.caption && (
              <p className="mt-2 text-center text-xs text-slate-400">
                {img.caption}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
