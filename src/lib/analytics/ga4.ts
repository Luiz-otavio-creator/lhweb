import { BetaAnalyticsDataClient } from "@google-analytics/data";

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

function loadServiceAccount(): ServiceAccount {
  const base64 = process.env.GA4_SERVICE_ACCOUNT_JSON_BASE64;
  const json = process.env.GA4_SERVICE_ACCOUNT_JSON;

  if (!base64 && !json) {
    throw new Error("Missing GA4 service account env vars.");
  }

  const raw = base64
    ? Buffer.from(base64, "base64").toString("utf-8")
    : json || "";

  const parsed = JSON.parse(raw) as ServiceAccount;

  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Invalid GA4 service account JSON.");
  }

  return parsed;
}

let client: BetaAnalyticsDataClient | null = null;

export function getGa4Client() {
  if (client) return client;
  const serviceAccount = loadServiceAccount();
  client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: serviceAccount.client_email,
      private_key: serviceAccount.private_key,
    },
  });
  return client;
}

export function getGa4Property() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error("Missing GA4_PROPERTY_ID env var.");
  }
  return `properties/${propertyId}`;
}
