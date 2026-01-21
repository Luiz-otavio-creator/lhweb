import { logEvent, type Analytics } from "firebase/analytics";

let analyticsInstance: Analytics | null = null;

export function setAnalyticsInstance(instance: Analytics | null) {
  analyticsInstance = instance;
}

export function logAnalyticsEvent(name: string, params?: Record<string, unknown>) {
  if (!analyticsInstance) return;
  try {
    logEvent(analyticsInstance, name, params ?? {});
  } catch {
    // swallow analytics errors
  }
}
