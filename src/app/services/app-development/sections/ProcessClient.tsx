"use client";

import * as React from "react";
import { motion, easeOut, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Section from "./SectionClient";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  TrendingUp,
} from "lucide-react";

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: i * 0.08 },
  }),
};

export default function ProcessClient() {
  const steps = React.useMemo(
    () => [
      {
        n: "01",
        title: "Discovery & Strategy",
        desc: "We understand your goals and define a clear plan — no guesswork.",
        more: "We align objectives, audience, scope and priorities. You leave with a clear plan, timeline, and what we’ll deliver — so decisions are easy and predictable.",
        Icon: Search,
        accent: "purple" as const,
        deliverable: "Project plan + scope",
        time: "2–5 days",
      },
      {
        n: "02",
        title: "UI/UX Design",
        desc: "A premium design that looks modern and makes users take action (buy, book, contact).",
        more: "We design a simple, high-conversion experience: structure, screens, copy hierarchy and micro-interactions. You approve before development starts.",
        Icon: PenTool,
        accent: "cyan" as const,
        deliverable: "Prototype + UI kit",
        time: "1–2 weeks",
      },
      {
        n: "03",
        title: "Development",
        desc: "We build fast, stable and scalable — ready for production.",
        more: "We implement with clean architecture, testing and performance checks. You see progress with clear milestones and frequent updates.",
        Icon: Code2,
        accent: "cyan" as const,
        deliverable: "Production build",
        time: "2–6 weeks",
      },
      {
        n: "04",
        title: "Launch",
        desc: "We publish safely and track everything from day one.",
        more: "Store submission, release checklist, analytics setup and monitoring. Launch without stress — with a rollback plan if needed.",
        Icon: Rocket,
        accent: "purple" as const,
        deliverable: "Release + tracking",
        time: "3–7 days",
      },
      {
        n: "05",
        title: "Growth",
        desc: "We improve results over time with data — not opinions.",
        more: "We monitor usage, find bottlenecks and optimize conversion. New features are prioritized by impact and KPIs.",
        Icon: TrendingUp,
        accent: "purple" as const,
        deliverable: "KPI plan + iterations",
        time: "Ongoing",
      },
    ],
    []
  );

  return (
    <Section id="process" className="relative overflow-hidden py-24 text-white">
      {/* ✅ COSMIC BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#070A18]">
        <div className="absolute inset-0 process-nebula" />
        <div className="absolute inset-0 process-wash" />
        <div className="absolute inset-0 process-stars-1" />
        <div className="absolute inset-0 process-stars-2" />
        <div className="absolute inset-0 process-dust" />

        {/* Energy ribbon (kept subtle via globals.css) */}
        <div className="absolute left-1/2 top-[46%] h-[560px] w-[1400px] -translate-x-1/2 -rotate-6 process-ribbon" />

        {/* Vignette (readability) */}
        <div className="absolute inset-0 process-vignette" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.34em] text-[#19D6FF]/85">
            OUR PROCESS
          </div>

          <h2
            id="process-title"
            className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Our App Development Process
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            A clear process, fast delivery, and total predictability from
            kickoff to post-launch.
          </p>
        </div>

        <div className="relative mt-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="grid gap-6 md:grid-cols-5"
          >
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={itemFadeUp} custom={i}>
                <ProcessCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="mt-10 text-center text-sm text-white/55">
          You always know what&apos;s being done — and when it will be
          delivered.
        </p>
      </div>
    </Section>
  );
}

function ProcessCard({
  n,
  title,
  desc,
  more,
  Icon,
  accent,
  deliverable,
  time,
}: {
  n: string;
  title: string;
  desc: string;
  more: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  accent: "purple" | "cyan";
  deliverable: string;
  time: string;
}) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const frontRef = React.useRef<HTMLDivElement | null>(null);
  const backRef = React.useRef<HTMLDivElement | null>(null);

  const applyVars = (el: HTMLDivElement | null, px: number, py: number) => {
    if (!el) return;
    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
  };

  const resetVars = (el: HTMLDivElement | null) => {
    if (!el) return;
    el.style.setProperty("--sx", "50%");
    el.style.setProperty("--sy", "35%");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;

    const active = flipped ? backRef.current : frontRef.current;
    if (!active) return;

    const r = active.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    applyVars(frontRef.current, px, py);
    applyVars(backRef.current, px, py);
  };

  const onLeave = () => {
    resetVars(frontRef.current);
    resetVars(backRef.current);
    setHovered(false);
  };

  const wash =
    accent === "purple"
      ? "bg-[radial-gradient(circle_at_20%_20%,rgba(143,94,255,0.22),transparent_62%),radial-gradient(circle_at_90%_85%,rgba(25,214,255,0.12),transparent_66%)]"
      : "bg-[radial-gradient(circle_at_20%_20%,rgba(25,214,255,0.18),transparent_62%),radial-gradient(circle_at_90%_85%,rgba(143,94,255,0.14),transparent_66%)]";

  const tiltStyle = reduce
    ? undefined
    : ({
        transformStyle: "preserve-3d" as const,
        transform:
          "perspective(1200px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      } as const);

  return (
    <div
      className="flip-scene h-[300px] w-full"
      role="button"
      tabIndex={0}
      aria-label={`${n} ${title} — ${
        flipped ? "close details" : "view details"
      }`}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setFlipped((v) => !v);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
        {/* FRONT */}
        <div className="flip-face">
          <div
            ref={frontRef}
            onMouseMove={onMove}
            className={`process-glass h-full p-6 ${
              hovered ? "is-hovered" : ""
            }`}
            style={tiltStyle}
          >
            <div
              className={`pointer-events-none absolute inset-0 z-0 rounded-[26px] opacity-60 ${wash}`}
            />
            <div className="grain z-10" />
            <div className="specular z-10" />

            <div className="relative z-20 flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-semibold tracking-tight text-white/80">
                    {n}
                  </div>
                  <div className="hidden sm:block text-xs font-semibold tracking-[0.25em] text-white/40">
                    STEP
                  </div>
                </div>

                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/5">
                  <Icon className="h-5 w-5 text-[#19D6FF]" aria-hidden />
                </div>
              </div>

              <h3 className="mt-4 text-[17px] font-semibold text-white/95">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/68">{desc}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Meta label="YOU GET" value={deliverable} />
                <Meta label="TYPICAL TIME" value={time} />
              </div>

              <div className="mt-auto pt-4 inline-flex items-center gap-2 text-xs text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                Tap / click to see details
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back">
          <div
            ref={backRef}
            onMouseMove={onMove}
            className={`process-glass h-full p-6 ${
              hovered ? "is-hovered" : ""
            }`}
            style={tiltStyle}
          >
            <div
              className={`pointer-events-none absolute inset-0 z-0 rounded-[26px] opacity-60 ${wash}`}
            />
            <div className="grain z-10" />
            <div className="specular z-10" />

            <div className="relative z-20 flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div className="text-xs font-semibold tracking-[0.25em] text-white/65">
                  STEP {n} — DETAILS
                </div>
                <div className="text-xs text-white/45">Click to close</div>
              </div>

              <h4 className="mt-3 text-lg font-semibold text-white/92">
                What we do in this step
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/68">{more}</p>

              <div className="mt-4 space-y-2 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                  Clear plan and responsibilities
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                  Risks solved early (before cost grows)
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19D6FF]" />
                  Predictable delivery timeline
                </div>
              </div>

              <div className="mt-auto pt-4 text-xs text-white/45">
                Tip: press <span className="text-white/70">Enter</span> to
                toggle.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[10px] font-semibold tracking-[0.22em] text-white/45">
        {label}
      </div>
      <div className="mt-1 text-xs text-white/82">{value}</div>
    </div>
  );
}
