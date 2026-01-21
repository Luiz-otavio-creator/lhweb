"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const AppDevOrbCanvas = dynamic(() => import("./AppDevOrbCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full">
      <div className="absolute inset-0 pointer-events-none opacity-40 blur-2xl bg-[radial-gradient(circle_at_55%_45%,rgba(25,214,255,0.22),transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-35 blur-2xl bg-[radial-gradient(circle_at_45%_55%,rgba(122,77,255,0.22),transparent_60%)]" />
    </div>
  ),
});

export default function AppDevOrb() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-20% 0px -20% 0px" });

  const isSafari = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua);
  }, []);

  const quality = reduceMotion ? "low" : isSafari ? "medium" : "high";
  const shouldRenderCanvas = inView && !reduceMotion;

  return (
    // ✅ bigger stage + overflow-visible = no clipping
    <div
      ref={wrapRef}
      className="relative h-[520px] w-full overflow-visible sm:h-[560px] md:h-[620px]"
    >
      {/* ✅ Premium halo behind the orb (organic) */}
      <div className="pointer-events-none absolute -inset-12 opacity-60 blur-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(25,214,255,0.20),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_52%,rgba(122,77,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      {/* ❌ Removed: vignette inset-0 (causes "panel/rectangle" feeling + can contribute to clipping perception) */}
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.55)_100%)]" /> */}

      {/* ✅ Canvas layer */}
      <div className="absolute inset-0 overflow-visible">
        {shouldRenderCanvas ? (
          <AppDevOrbCanvas quality={quality} />
        ) : (
          <div className="absolute inset-0 pointer-events-none opacity-55 blur-2xl bg-[radial-gradient(circle_at_55%_45%,rgba(25,214,255,0.20),transparent_60%)]" />
        )}
      </div>

      {/* ✅ Top shine (subtle) */}
      <div className="pointer-events-none absolute left-1/2 top-[-12%] h-32 w-[72%] -translate-x-1/2 rounded-full bg-white/5 blur-2xl opacity-30" />

      {/* ✅ Micro grain (premium finish) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-size-[120px_120px]" />
      </div>
    </div>
  );
}
