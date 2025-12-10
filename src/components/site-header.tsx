"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Portfolio",
      href: "#portfolio",
    },
    {
      label: "Insights",
      href: "#insights",
    },
    {
      label: "About",
      href: "#about",
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#050914]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-18 md:px-6 lg:px-10">
        {/* Logo LHWEB */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9">
            <Image
              src="/hero/lhweb-logo.png"
              alt="LH Web"
              fill
              className="object-contain drop-shadow-[0_0_18px_rgba(94,241,255,0.7)]"
              sizes="36px"
            />
          </div>
          <span className="bg-linear-to-r from-[#c56bff] via-[#b47dff] to-[#35f0ff] bg-clip-text text-sm font-semibold tracking-[0.16em] text-transparent sm:text-base">
            LH Web
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 text-xs font-medium text-white/70 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative inline-flex items-center transition hover:text-white"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-linear-to-r from-[#59e6ff] to-[#8f5eff] transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}

          <Button
            size="sm"
            className="rounded-full bg-linear-to-r from-[#59e6ff] to-[#8f5eff] px-5 text-xs font-semibold text-[#050914] shadow-[0_12px_30px_rgba(94,241,255,0.45)] hover:opacity-90"
          >
            Book a Call
          </Button>
        </nav>

        {/* Botão mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/30 p-2 text-white/80 shadow-[0_0_18px_rgba(0,0,0,0.6)] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-0.5">
            <span className="h-0.5 w-4 rounded-full bg-white" />
            <span className="h-0.5 w-3 rounded-full bg-white" />
          </div>
        </button>

        {/* Menu mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-4 top-16 w-56 rounded-2xl border border-white/10 bg-[#050914]/95 p-3 text-sm shadow-[0_18px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl md:hidden"
            >
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <Button
                    className="w-full rounded-xl bg-linear-to-r from-[#59e6ff] to-[#8f5eff] text-xs font-semibold text-[#050914] shadow-[0_12px_30px_rgba(94,241,255,0.45)] hover:opacity-90"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a Call
                  </Button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default SiteHeader;
