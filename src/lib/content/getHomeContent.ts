import { cache } from "react";
import type { HomeContent } from "@/lib/content/types";
import { homeContent } from "@/lib/content/homeContent";
import { getAdminDb } from "@/lib/firebase/admin";

const HOME_DOC_PATH = "content/pages/home/page";

function hasAdminConfig() {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64 ||
      process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  );
}

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  if (!hasAdminConfig()) return homeContent;

  try {
    const doc = await getAdminDb().doc(HOME_DOC_PATH).get();
    if (!doc.exists) return homeContent;
    const data = doc.data() as HomeContent | undefined;
    if (!data) return homeContent;
    const updatedAt = (data as { updatedAt?: unknown }).updatedAt;
    if (updatedAt && typeof updatedAt === "object" && "toDate" in updatedAt) {
      data.updatedAt = (updatedAt as { toDate: () => Date }).toDate().toISOString();
    }
    return data;
  } catch {
    return homeContent;
  }
});
