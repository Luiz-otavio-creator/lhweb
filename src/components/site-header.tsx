"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Insights", href: "/#insights" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-5 md:px-7 lg:px-11">
        {/* Logo + Brand */}
        {/* Logo */}
<Link href="/" className="flex items-center justify-center leading-none">
  <Image
    src="/hero/logo.webp"
    alt="LH Web"
    width={260}
    height={260}
    priority
    className="h-14 w-auto md:h-28 lg:h-16 drop-shadow-[0_0_22px_rgba(94,241,255,0.75)]"
  />
</Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative inline-flex items-center text-sm font-semibold tracking-wide text-foreground/80 transition hover:text-foreground md:text-[15px]"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-2 h-px origin-center scale-x-0 bg-gradient-to-r from-[#59e6ff] to-[#8f5eff] transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}

          <Button
            size="default"
            className="h-10 rounded-full bg-gradient-to-r from-[#59e6ff] to-[#8f5eff] px-6 text-sm font-semibold text-[#fff] shadow-[0_14px_34px_rgba(94,241,255,0.35)] hover:opacity-90"
            data-cta-id="header-book-call"
            data-cta-placement="header"
            data-cta-text="Book a Call"
          >
            Book a Call
          </Button>
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border bg-background/70 p-2.5 text-foreground/90 shadow-[0_0_18px_rgba(0,0,0,0.2)] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 rounded-full bg-foreground" />
            <span className="h-0.5 w-4 rounded-full bg-foreground" />
          </div>
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-4 top-[76px] w-64 rounded-2xl border border-border bg-background/95 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl md:hidden"
            >
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-[15px] font-semibold text-foreground/85 hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Button
                    className="h-11 w-full rounded-xl bg-gradient-to-r from-[#59e6ff] to-[#8f5eff] text-sm font-semibold text-[#050914] shadow-[0_12px_30px_rgba(94,241,255,0.35)] hover:opacity-90"
                    onClick={() => setIsOpen(false)}
                    data-cta-id="header-book-call-mobile"
                    data-cta-placement="header-mobile"
                    data-cta-text="Book a Call"
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
