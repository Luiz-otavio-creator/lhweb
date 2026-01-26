/* eslint-disable no-console */

import type { Bucket, File } from "@google-cloud/storage";
import fs from "node:fs";
import path from "node:path";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { homeContent } from "../src/lib/content/homeContent";

const HOME_DOC_PATH = "content/pages/home/page";

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

type MediaRef = {
  storagePath: string;
  downloadURL: string;
  localPath: string;
  alt?: string;
  width?: number;
  height?: number;
};

function loadServiceAccount(): ServiceAccount {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64;
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!base64 && !json) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON env vars.");
  }

  const raw = base64
    ? Buffer.from(base64, "base64").toString("utf-8")
    : json ?? "";

  const parsed = JSON.parse(raw) as ServiceAccount;
  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    throw new Error("Invalid Firebase service account JSON.");
  }

  return parsed;
}

function initAdmin() {
  if (getApps().length) return;
  const serviceAccount = loadServiceAccount();
  initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      `${serviceAccount.project_id}.appspot.com`,
  });
}

function isMediaRef(value: unknown): value is MediaRef {
  if (!value || typeof value !== "object") return false;
  return (
    "storagePath" in value &&
    "downloadURL" in value &&
    "localPath" in value
  );
}

function collectMediaRefs(obj: unknown, list: MediaRef[] = []): MediaRef[] {
  if (!obj || typeof obj !== "object") return list;
  if (isMediaRef(obj)) {
    list.push(obj);
  }
  Object.values(obj as Record<string, unknown>).forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => collectMediaRefs(item, list));
    } else if (value && typeof value === "object") {
      collectMediaRefs(value, list);
    }
  });
  return list;
}

function stripLocalPaths(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(stripLocalPaths);
  }
  if (obj && typeof obj === "object") {
    const next: Record<string, unknown> = {};
    Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
      if (key === "localPath") return;
      next[key] = stripLocalPaths(value);
    });
    return next;
  }
  return obj;
}

function applyDownloadUrls<T>(obj: T, urlMap: Record<string, string>): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => applyDownloadUrls(item, urlMap)) as T;
  }
  if (obj && typeof obj === "object") {
    const next = { ...(obj as Record<string, unknown>) };
    if (
      "storagePath" in (obj as Record<string, unknown>) &&
      typeof (obj as Record<string, unknown>).storagePath === "string"
    ) {
      const storagePath = (obj as Record<string, unknown>).storagePath as string;
      if (urlMap[storagePath]) {
        next.downloadURL = urlMap[storagePath];
      }
    }
    Object.keys(next).forEach((key) => {
      next[key] = applyDownloadUrls(next[key], urlMap) as unknown;
    });
    return next as T;
  }
  return obj;
}

async function uploadFileIfNeeded(bucket: Bucket, media: MediaRef, force: boolean) {
  const storagePath = media.storagePath;
  const localPath = path.join(process.cwd(), media.localPath);

  if (!fs.existsSync(localPath)) {
    throw new Error(`Missing file: ${localPath}`);
  }

  const file = bucket.file(storagePath);
  const [exists] = await file.exists();

  if (exists && !force) {
    return getSignedUrl(file);
  }

  await bucket.upload(localPath, {
    destination: storagePath,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  return getSignedUrl(file);
}

async function getSignedUrl(file: File): Promise<string> {
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2500",
  });
  return url;
}

async function main() {
  const force = process.argv.includes("--force");
  initAdmin();

  const db = getFirestore();
  const storage = getStorage();
  const bucket = storage.bucket();

  const mediaRefs = collectMediaRefs(homeContent);
  const urlMap: Record<string, string> = {};
  const seen = new Set<string>();

  console.log(`Found ${mediaRefs.length} media assets.`);

  for (const media of mediaRefs) {
    if (seen.has(media.storagePath)) continue;
    seen.add(media.storagePath);
    const url = await uploadFileIfNeeded(bucket, media, force);
    urlMap[media.storagePath] = url;
    console.log(`Uploaded: ${media.storagePath}`);
  }

  const updated = applyDownloadUrls(homeContent, urlMap);
  const payload = stripLocalPaths(updated) as Record<string, unknown>;

  await db.doc(HOME_DOC_PATH).set({
    ...payload,
    updatedAt: FieldValue.serverTimestamp(),
  });

  console.log("Home content seeded successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
