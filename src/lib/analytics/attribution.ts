export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_path?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  session_id?: string;
  first_touch_ts?: number;
};

const ATTR_KEY = "lhweb_attribution_v1";
const SESSION_KEY = "lhweb_session_v1";

function getOrCreateSession() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as { session_id: string; first_touch_ts: number };
    } catch {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }

  const session = {
    session_id: crypto.randomUUID(),
    first_touch_ts: Date.now(),
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function normalize(value: string | null) {
  if (!value) return undefined;
  return value.trim() || undefined;
}

export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;

  const existing = window.localStorage.getItem(ATTR_KEY);
  if (existing) {
    try {
      return JSON.parse(existing) as Attribution;
    } catch {
      window.localStorage.removeItem(ATTR_KEY);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const session = getOrCreateSession();

  const attribution: Attribution = {
    utm_source: normalize(params.get("utm_source")),
    utm_medium: normalize(params.get("utm_medium")),
    utm_campaign: normalize(params.get("utm_campaign")),
    utm_content: normalize(params.get("utm_content")),
    utm_term: normalize(params.get("utm_term")),
    referrer: normalize(document.referrer) || "direct",
    landing_path: window.location.pathname + window.location.search,
    gclid: normalize(params.get("gclid")),
    fbclid: normalize(params.get("fbclid")),
    msclkid: normalize(params.get("msclkid")),
    session_id: session?.session_id,
    first_touch_ts: session?.first_touch_ts,
  };

  window.localStorage.setItem(ATTR_KEY, JSON.stringify(attribution));
  return attribution;
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ATTR_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}
