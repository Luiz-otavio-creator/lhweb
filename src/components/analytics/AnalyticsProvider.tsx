"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initAnalytics } from "@/lib/firebase/client";
import { captureAttribution } from "@/lib/analytics/attribution";
import { getConsent, onConsentChange } from "@/lib/analytics/consent";
import { logAnalyticsEvent, setAnalyticsInstance } from "@/lib/analytics/events";

const SCROLL_DEPTHS = [25, 50, 75, 100];
const TIME_MILESTONES = [30, 60, 120];

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);
  const lastPath = useRef<string | null>(null);
  const depthFired = useRef(new Set<number>());
  const timeouts = useRef<number[]>([]);
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  const pagePath = useMemo(() => {
    const search = searchParams?.toString();
    return search ? `${pathname}?${search}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isDashboardRoute) return;
    captureAttribution();
  }, [isDashboardRoute]);

  useEffect(() => {
    if (isDashboardRoute) {
      setAnalyticsInstance(null);
      return;
    }
    const consent = getConsent();
    setHasConsent(!!consent?.analytics);
    if (consent?.analytics) {
      void initAnalytics().then((instance) => setAnalyticsInstance(instance));
    }

    return onConsentChange((state) => {
      const enabled = !!state?.analytics;
      setHasConsent(enabled);
      if (enabled) {
        void initAnalytics().then((instance) => setAnalyticsInstance(instance));
      } else {
        setAnalyticsInstance(null);
      }
    });
  }, [isDashboardRoute]);

  useEffect(() => {
    if (!hasConsent) return;
    if (isDashboardRoute) return;
    if (lastPath.current === pagePath) return;

    lastPath.current = pagePath;
    depthFired.current = new Set();
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current = [];

    logAnalyticsEvent("page_view", {
      page_path: pagePath,
      page_title: typeof document !== "undefined" ? document.title : "",
      section:
        typeof window !== "undefined" && window.location.hash
          ? window.location.hash.replace("#", "")
          : undefined,
    });

    TIME_MILESTONES.forEach((seconds) => {
      const id = window.setTimeout(() => {
        logAnalyticsEvent("time_on_page", {
          seconds,
          page_path: pagePath,
        });
      }, seconds * 1000);
      timeouts.current.push(id);
    });
  }, [hasConsent, pagePath]);

  useEffect(() => {
    if (!hasConsent) return;
    if (isDashboardRoute) return;

    let scrollTimeout: number | null = null;

    const onScroll = () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 100;

        SCROLL_DEPTHS.forEach((depth) => {
          if (percent >= depth && !depthFired.current.has(depth)) {
            depthFired.current.add(depth);
            logAnalyticsEvent("scroll_depth", {
              depth,
              page_path: pagePath,
            });
          }
        });
      }, 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [hasConsent, isDashboardRoute, pagePath]);

  useEffect(() => {
    if (!hasConsent) return;
    if (isDashboardRoute) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a") as HTMLAnchorElement | null;
      const cta = target.closest("[data-cta-id]") as HTMLElement | null;

      if (cta) {
        logAnalyticsEvent("click_cta", {
          cta_id: cta.getAttribute("data-cta-id"),
          cta_text: cta.getAttribute("data-cta-text") || cta.textContent?.trim(),
          placement: cta.getAttribute("data-cta-placement"),
          page_path: pagePath,
        });
      }

      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("mailto:")) {
        logAnalyticsEvent("email_click", { placement: link.dataset.placement, page_path: pagePath });
        return;
      }
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        logAnalyticsEvent("whatsapp_click", { placement: link.dataset.placement, page_path: pagePath });
        return;
      }
      if (href.startsWith("http")) {
        try {
          const url = new URL(href);
          if (url.hostname !== window.location.hostname) {
            logAnalyticsEvent("outbound_click", {
              url: href,
              domain: url.hostname,
              placement: link.dataset.placement,
            });
          }
        } catch {
          // ignore invalid URLs
        }
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [hasConsent, isDashboardRoute, pagePath]);

  return null;
}
