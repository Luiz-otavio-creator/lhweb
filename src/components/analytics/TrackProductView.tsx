"use client";

import { useEffect } from "react";
import { logAnalyticsEvent } from "@/lib/analytics/events";

export default function TrackProductView({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  useEffect(() => {
    logAnalyticsEvent("view_product", {
      product_slug: slug,
      product_name: name,
    });
  }, [slug, name]);

  return null;
}
