"use client";

import { useEffect } from "react";
import { logAnalyticsEvent } from "@/lib/analytics/events";

export default function TrackServiceView({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  useEffect(() => {
    logAnalyticsEvent("view_service", {
      service_slug: slug,
      service_name: name,
    });
  }, [slug, name]);

  return null;
}
