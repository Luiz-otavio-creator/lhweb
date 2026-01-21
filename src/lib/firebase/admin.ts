import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

function loadServiceAccount(): ServiceAccount {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64;
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!base64 && !json) {
    throw new Error("Missing Firebase service account env vars.");
  }

  const raw = base64
    ? Buffer.from(base64, "base64").toString("utf-8")
    : json || "";

  const parsed = JSON.parse(raw) as ServiceAccount;

  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    throw new Error("Invalid Firebase service account JSON.");
  }

  return parsed;
}

let adminApp: App | null = null;

export function getAdminApp(): App {
  if (adminApp) return adminApp;
  const apps = getApps();
  if (apps.length) {
    adminApp = apps[0]!;
    return adminApp;
  }

  const serviceAccount = loadServiceAccount();
  adminApp = initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      `${serviceAccount.project_id}.appspot.com`,
  });

  return adminApp;
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminStorage() {
  return getStorage(getAdminApp());
}
