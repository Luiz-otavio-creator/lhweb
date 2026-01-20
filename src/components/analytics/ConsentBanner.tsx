"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent, onConsentChange } from "@/lib/analytics/consent";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setVisible(true);
      setAnalyticsEnabled(false);
    } else {
      setAnalyticsEnabled(existing.analytics);
    }

    const unsubscribe = onConsentChange((state) => {
      if (!state) {
        setVisible(true);
        setAnalyticsEnabled(false);
      } else {
        setAnalyticsEnabled(state.analytics);
      }
    });

    const openListener = () => setVisible(true);
    window.addEventListener("lhweb-open-consent", openListener);

    return () => {
      unsubscribe();
      window.removeEventListener("lhweb-open-consent", openListener);
    };
  }, []);

  const handleAccept = () => {
    setConsent({ analytics: true, timestamp: Date.now() });
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent({ analytics: false, timestamp: Date.now() });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#050914]/95 p-5 text-white shadow-[0_25px_70px_rgba(0,0,0,0.55)] backdrop-blur">
      <div className="space-y-3">
        <div className="text-sm font-semibold tracking-[0.2em] text-[#5ef2ff]">
          Privacy settings
        </div>
        <p className="text-sm text-white/70">
          We use analytics to understand traffic sources and improve conversions.
          You can opt in or out at any time.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-[#35f0ff] px-5 py-2 text-sm font-semibold text-[#050914] shadow-[0_12px_30px_-10px_rgba(53,240,255,0.55)]"
          >
            Accept analytics
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-full border border-white/20 bg-transparent px-5 py-2 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            Decline
          </button>
          <span className="text-xs text-white/50">
            Analytics currently {analyticsEnabled ? "enabled" : "disabled"}.
          </span>
        </div>
      </div>
    </div>
  );
}
