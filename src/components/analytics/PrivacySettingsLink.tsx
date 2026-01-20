"use client";

import { openConsentManager } from "@/lib/analytics/consent";

export default function PrivacySettingsLink({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openConsentManager}
      className={className}
    >
      Privacy settings
    </button>
  );
}
