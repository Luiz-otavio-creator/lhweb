export type ConsentState = {
  analytics: boolean;
  timestamp: number;
};

const CONSENT_KEY = "lhweb_consent_v1";
const CONSENT_COOKIE = "lhweb_consent";

function dispatchConsentChange(state: ConsentState | null) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("lhweb-consent-updated", { detail: state })
  );
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_COOKIE}=${state.analytics ? "1" : "0"}; path=/; max-age=${maxAge}; samesite=lax`;
  dispatchConsentChange(state);
}

export function clearConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
  document.cookie = `${CONSENT_COOKIE}=; path=/; max-age=0; samesite=lax`;
  dispatchConsentChange(null);
}

export function onConsentChange(handler: (state: ConsentState | null) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<ConsentState | null>).detail;
    handler(detail ?? null);
  };
  window.addEventListener("lhweb-consent-updated", listener);
  return () => window.removeEventListener("lhweb-consent-updated", listener);
}

export function openConsentManager() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("lhweb-open-consent"));
}
