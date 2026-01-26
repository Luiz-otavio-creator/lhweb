"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "./SectionClient";
import {
  Smartphone,
  Globe,
  LayoutTemplate,
  Activity,
} from "lucide-react";

type FoundationItem = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

export default function FoundationClient() {
  const reduce = !!useReducedMotion();

  const items = React.useMemo<FoundationItem[]>(
    () => [
      {
        title: "Native & Hybrid Apps",
        desc: "Apps for iOS, Android and Web with React Native, Expo and hybrid approaches.",
        Icon: Smartphone,
      },
      {
        title: "PWA & Cross-Platform",
        desc: "Fast, responsive PWAs that feel native — ready for every device.",
        Icon: Globe,
      },
      {
        title: "UI/UX for Mobile",
        desc: "Premium mobile-first UI with micro-interactions, strong hierarchy and flawless usability.",
        Icon: LayoutTemplate,
      },
      {
        title: "Performance & Monitoring",
        desc: "CI/CD, performance metrics and real-time monitoring from day one.",
        Icon: Activity,
      },
    ],
    []
  );

  return (
    <Section
      id="foundation"
      className="relative overflow-hidden bg-[#050812] py-24 text-white"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(122,77,255,0.14),transparent_62%),radial-gradient(900px_520px_at_85%_25%,rgba(25,214,255,0.08),transparent_66%),linear-gradient(to_bottom,#050812,#050812)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.92)_100%)]" />

        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] bg-size-[34px_34px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(rgba(25,214,255,0.60)_1px,transparent_1px)] bg-size-[120px_120px]" />

        <div className="absolute -left-48 bottom-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.18),transparent_68%)] blur-[140px]" />
        <div className="absolute -right-56 top-24 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.12),transparent_72%)] blur-[160px]" />

        <div className="absolute -bottom-[540px] left-1/2 h-[1040px] w-[1600px] -translate-x-1/2 rounded-full opacity-80">
          <div className="absolute inset-0 rounded-full border border-transparent [background:conic-gradient(from_210deg,rgba(122,77,255,0.0),rgba(122,77,255,0.62),rgba(25,214,255,0.52),rgba(122,77,255,0.0))] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]" />
          <div className="absolute inset-0 rounded-full [background:conic-gradient(from_210deg,rgba(122,77,255,0.0),rgba(122,77,255,0.22),rgba(25,214,255,0.18),rgba(122,77,255,0.0))] blur-[28px] [mask:radial-gradient(farthest-side,transparent_calc(100%-10px),#000_calc(100%-1px))]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.34em] text-[#19D6FF]/80">
            OUR TECHNICAL FOUNDATION
          </div>

          <h2 className="mx-auto mt-6 max-w-5xl text-balance text-3xl font-semibold tracking-tight text-white/90 sm:text-4xl md:text-5xl">
            Our Technical Foundation for Scalable Apps
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/55 sm:text-base">
            Every app is built to scale, with a rock-solid base and a flawless
            experience from day one.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: "-28%" }}
          whileInView={{ opacity: 1, x: "28%" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none relative mt-12 h-0"
        >
          <div className="absolute left-1/2 top-0 h-[300px] w-[980px] -translate-x-1/2 -translate-y-28 -rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.10),rgba(25,214,255,0.10),transparent)] blur-[20px]" />
        </motion.div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {items.map((it, i) => (
            <ArtGlassCard
              key={it.title}
              index={i}
              title={it.title}
              desc={it.desc}
              Icon={it.Icon}
              reduce={reduce}
            />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-white/45">
          Our technical edge is what prepares your product to grow from day 1.
        </p>
      </div>
    </Section>
  );
}

function ArtGlassCard({
  index,
  title,
  desc,
  Icon,
  reduce,
}: {
  index: number;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  reduce: boolean;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    setTilt({
      ry: (px - 0.5) * 5,
      rx: (0.5 - py) * 5,
    });

    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
  };

  const onLeave = () => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--sx", `50%`);
    el.style.setProperty("--sy", `35%`);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="art-glass px-9 py-8"
        style={
          reduce
            ? undefined
            : {
                transformStyle: "preserve-3d",
                transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }
        }
      >
        <div className="specular" />
        <div className="grain" />

        <div className="pointer-events-none absolute -left-12 bottom-[-46px] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(143,94,255,0.32),transparent_70%)] blur-[46px]" />
        <div className="pointer-events-none absolute -right-12 top-[-54px] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.22),transparent_74%)] blur-[50px]" />

        <div className="relative flex items-start gap-5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/5">
            <Icon className="h-6 w-6 text-[#19D6FF]" aria-hidden />
          </div>

          <div className="min-w-0">
            <h3 className="text-[22px] font-semibold leading-snug text-white/90">
              {title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
              {desc}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-10 bottom-6 h-px bg-white/10 opacity-30" />
      </div>
    </motion.article>
  );
}
