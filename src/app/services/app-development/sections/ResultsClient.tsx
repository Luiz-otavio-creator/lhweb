"use client";

import * as React from "react";
import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Section from "./SectionClient";
import { Gauge, Users, Rocket } from "lucide-react";

export default function ResultsClient() {
  const reduce = !!useReducedMotion();

  const stats = useMemo(
    () => [
      {
        key: "eff",
        label: "Operational Efficiency",
        value: "+70%",
        desc: "Fewer manual processes, clearer specs, and less rework so your team ships faster with confidence.",
        Icon: Gauge,
        accent: "purple" as const,
      },
      {
        key: "ret",
        label: "User Retention",
        value: "+38%",
        desc: "Better retention thanks to intuitive mobile UX, frictionless onboarding, and data-informed iterations.",
        Icon: Users,
        accent: "cyan" as const,
      },
      {
        key: "ttm",
        label: "Time to Market",
        value: "-50%",
        desc: "Cut your launch cycles in half through modern architecture, CI/CD automation, and predictable execution.",
        Icon: Rocket,
        accent: "cyan" as const,
      },
    ],
    []
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [0.985, 1.0]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [0.72, 1]);

  return (
    <Section id="results" className="relative overflow-hidden results-energy">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 results-energy__base" />
        <div className="absolute inset-0 results-energy__stars1" />
        <div className="absolute inset-0 results-energy__stars2" />
        <div className="absolute inset-0 results-energy__streaks" />
        <div className="absolute inset-0 results-energy__vignette" />
      </div>

      <div ref={wrapRef} className="relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* Header */}
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.34em] text-white/60">
            RESULTS THAT SCALE WITH YOUR PRODUCT
          </div>

          <h2
            id="results-title"
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Results &amp; Impact
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Clear and measurable outcomes — proven across real app development
            projects.
          </p>
        </div>

        {/* Hero Metric */}
        <motion.div
          style={
            reduce ? undefined : { scale: heroScale, opacity: heroOpacity }
          }
          className="results-hero mt-12"
        >
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(143,94,255,0.24),transparent_60%)] blur-2xl" />
            <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.18),transparent_62%)] blur-2xl" />
          </div>

          <div className="results-hero__line" />

          <div className="relative grid items-center gap-6 sm:grid-cols-[1.12fr_0.88fr]">
            <div className="text-left">
              <div className="text-[11px] font-semibold tracking-[0.26em] text-white/55">
                EXECUTIVE SUMMARY
              </div>

              <div className="mt-4 flex items-end gap-3">
                <div className="text-6xl font-semibold tracking-tight sm:text-7xl">
                  <span className="results-grad-text">+70%</span>
                </div>
                <div className="pb-2 text-sm leading-5 text-white/70 sm:text-base">
                  increase in operational performance
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
                A predictable process, premium UX, and modern delivery systems —
                built to reduce friction and accelerate outcomes.
              </p>
            </div>

            <div className="results-hero__trend">
              <div className="text-[10px] font-semibold tracking-[0.22em] text-white/45">
                IMPACT TREND
              </div>
              <div className="mt-2 text-xs text-white/60">
                Efficiency ↑ • Retention ↑ • Time-to-market ↓
              </div>

              <ImpactTrendChart reduce={reduce} />
            </div>
          </div>
        </motion.div>

        <div className="mt-10 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="results-panel"
          >
            <div className="results-panel__glow" />
            <div className="results-panel__grain" />

            <div className="grid grid-cols-3">
              {stats.map((s, i) => (
                <div key={s.key} className="relative">
                  {i !== 0 && <div className="results-panel__divider" />}

                  <div className="relative p-8">
                    <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] text-white/60">
                      <s.Icon
                        className={`h-4 w-4 ${
                          s.accent === "purple"
                            ? "text-[#8F5EFF]"
                            : "text-[#19D6FF]"
                        }`}
                        aria-hidden
                      />
                      {s.label.toUpperCase()}
                    </div>

                    <div className="mt-5 text-5xl font-semibold tracking-tight text-white">
                      <span
                        className={
                          s.accent === "purple"
                            ? "results-grad-text"
                            : "results-cyan-text"
                        }
                      >
                        {s.value}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-white/65">
                      {s.desc}
                    </p>

                    <div className="mt-6 results-microGraph">
                      <MiniBars accent={s.accent} reduce={reduce} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 md:hidden">
          <MobileResultsRail stats={stats} reduce={reduce} />
        </div>

        <p className="mt-12 text-center text-sm text-white/55">
          Measurable outcomes. Premium service. Predictable delivery.
        </p>
      </div>
    </Section>
  );
}

function ImpactTrendChart({ reduce }: { reduce: boolean }) {
  const points = [
    { x: 18, y: 74 },
    { x: 90, y: 68 },
    { x: 160, y: 58 },
    { x: 235, y: 52 },
    { x: 300, y: 36 },
    { x: 402, y: 22 },
  ];

  const linePath =
    "M18 74 C 70 72, 110 66, 160 58 C 210 50, 250 56, 300 36 C 340 26, 372 26, 402 22";

  const areaPath =
    "M18 74 C 70 72, 110 66, 160 58 C 210 50, 250 56, 300 36 C 340 26, 372 26, 402 22 L402 96 L18 96 Z";

  return (
    <div className="results-miniChart mt-4">
      <svg
        className="h-[96px] w-full"
        viewBox="0 0 420 96"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="riLine2" x1="0" y1="0" x2="420" y2="0">
            <stop stopColor="rgba(143,94,255,0.15)" offset="0" />
            <stop stopColor="rgba(143,94,255,0.88)" offset="0.38" />
            <stop stopColor="rgba(25,214,255,0.88)" offset="0.72" />
            <stop stopColor="rgba(25,214,255,0.15)" offset="1" />
          </linearGradient>

          <linearGradient id="riArea2" x1="0" y1="0" x2="0" y2="96">
            <stop stopColor="rgba(25,214,255,0.14)" offset="0" />
            <stop stopColor="rgba(143,94,255,0.06)" offset="0.55" />
            <stop stopColor="rgba(0,0,0,0)" offset="1" />
          </linearGradient>

          <filter id="riGlow2" x="-30%" y="-50%" width="160%" height="200%">
            <feGaussianBlur stdDeviation="3.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern
            id="riGrain2"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.6" fill="rgba(255,255,255,0.08)" />
            <circle cx="11" cy="7" r="0.6" fill="rgba(255,255,255,0.06)" />
            <circle cx="6" cy="14" r="0.6" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>

        <g opacity="0.55">
          {[18, 38, 58, 78].map((y) => (
            <path
              key={y}
              d={`M0 ${y} H420`}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}
        </g>

        <path d="M0 92 H420" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

        <path d={areaPath} fill="url(#riArea2)" />

        <rect
          x="0"
          y="0"
          width="420"
          height="96"
          fill="url(#riGrain2)"
          opacity="0.22"
        />

        {!reduce ? (
          <motion.path
            d={linePath}
            stroke="url(#riLine2)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#riGlow2)"
            initial={{ pathLength: 0, opacity: 0.75 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <path
            d={linePath}
            stroke="url(#riLine2)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#riGlow2)"
          />
        )}

        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="5.2" fill="rgba(255,255,255,0.16)" />
            <circle cx={p.x} cy={p.y} r="3.8" fill="rgba(255,255,255,0.92)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function MobileResultsRail({
  stats,
  reduce,
}: {
  stats: Array<{
    key: string;
    label: string;
    value: string;
    desc: string;
    Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    accent: "purple" | "cyan";
  }>;
  reduce: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-slide]")
      );
      if (!slides.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      slides.forEach((s, idx) => {
        const mid = s.offsetLeft + s.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = idx;
        }
      });

      setActive(best);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div className="mb-7 text-center">
        <div className="text-[11px] font-semibold tracking-[0.26em] text-white/55">
          AT A GLANCE
        </div>
        <div className="mt-3 text-6xl font-semibold tracking-tight">
          <span className="results-grad-text">+70%</span>
        </div>
        <p className="mt-2 text-sm text-white/65">
          Faster teams, stronger retention, shorter launch cycles.
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="results-snap -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6"
      >
        {stats.map((s, i) => (
          <motion.article
            key={s.key}
            data-slide
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.08 }}
            className="results-card-mobile snap-center"
          >
            <div className="results-panel__grain" />

            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] text-white/60">
              <s.Icon
                className={`h-4 w-4 ${
                  s.accent === "purple" ? "text-[#8F5EFF]" : "text-[#19D6FF]"
                }`}
                aria-hidden
              />
              {s.label.toUpperCase()}
            </div>

            <div className="mt-5 text-5xl font-semibold tracking-tight text-white">
              <span
                className={
                  s.accent === "purple"
                    ? "results-grad-text"
                    : "results-cyan-text"
                }
              >
                {s.value}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/65">{s.desc}</p>

            <div className="mt-6 results-microGraph">
              <MiniBars accent={s.accent} reduce={reduce} />
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {stats.map((s, idx) => (
          <button
            key={s.key}
            type="button"
            aria-label={`Go to ${s.label}`}
            className={`h-2 w-2 rounded-full transition ${
              idx === active ? "bg-white/85" : "bg-white/25"
            }`}
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) return;
              const slide = el.querySelectorAll<HTMLElement>("[data-slide]")[
                idx
              ];
              slide?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
              });
            }}
          />
        ))}
      </div>

      <div className="mx-auto mt-4 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(143,94,255,0.78),rgba(25,214,255,0.78))]"
          style={{
            width: `${((active + 1) / stats.length) * 100}%`,
            transition: "width 220ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

function MiniBars({
  accent,
  reduce,
}: {
  accent: "purple" | "cyan";
  reduce?: boolean;
}) {
  const series =
    accent === "purple"
      ? [14, 22, 35, 48, 62, 78]
      : [10, 18, 28, 44, 58, 70];

  const grad =
    accent === "purple"
      ? "linear-gradient(to top, rgba(143,94,255,0.92), rgba(143,94,255,0.16))"
      : "linear-gradient(to top, rgba(25,214,255,0.92), rgba(25,214,255,0.16))";

  return (
    <div className="results-bars">
      <div className="results-bars__grid" />

      <div className="results-bars__wrap">
        {series.map((h, i) => (
          <div key={i} className="results-bars__bar">
            {!reduce ? (
              <motion.div
                className="results-bars__fill"
                style={{ background: grad }}
                initial={{ height: "0%" }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ) : (
              <div
                className="results-bars__fill"
                style={{ height: `${h}%`, background: grad }}
              />
            )}
          </div>
        ))}
      </div>

      {!reduce && (
        <motion.div
          className="results-bars__sweep"
          initial={{ x: "-30%" }}
          whileInView={{ x: "120%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
      )}

      <div className="results-bars__label">trend</div>
    </div>
  );
}
