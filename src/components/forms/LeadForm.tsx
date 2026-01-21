"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAttribution } from "@/lib/analytics/attribution";
import { logAnalyticsEvent } from "@/lib/analytics/events";

const SERVICES = [
  { value: "web-development", label: "Web Development" },
  { value: "app-development", label: "App Development" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "other", label: "Other" },
];

export default function LeadForm({
  formId = "contact_form",
  leadType = "contact",
}: {
  formId?: string;
  leadType?: string;
}) {
  const [formStart, setFormStart] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    service_interest: "",
    message: "",
    consent_to_contact: false,
    website: "",
  });

  const canSubmit = useMemo(() => {
    return (
      values.name.trim().length > 1 &&
      values.email.trim().length > 3 &&
      values.message.trim().length >= 10 &&
      values.consent_to_contact &&
      status !== "submitting"
    );
  }, [values, status]);

  const handleChange = (field: keyof typeof values, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormStart = () => {
    if (formStart) return;
    setFormStart(true);
    logAnalyticsEvent("form_start", { form_id: formId });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage(null);

    const payload = {
      form_id: formId,
      lead_type: leadType,
      page_path:
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`
          : "",
      attribution: getAttribution(),
      fields: {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        company: values.company.trim() || null,
        budget: values.budget.trim() || null,
        service_interest: values.service_interest || null,
        message: values.message.trim(),
        consent_to_contact: values.consent_to_contact,
        website: values.website,
      },
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }

      setStatus("success");
      const numericBudget = values.budget.replace(/[^0-9]/g, "");
      const valueEstimate = numericBudget ? Number(numericBudget) : undefined;
      logAnalyticsEvent("lead_submit", {
        form_id: formId,
        lead_type: leadType,
        value_estimate: valueEstimate,
      });

      setValues({
        name: "",
        email: "",
        phone: "",
        company: "",
        budget: "",
        service_interest: "",
        message: "",
        consent_to_contact: false,
        website: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4" onFocus={handleFormStart}>
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={(event) => handleChange("website", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#59e6ff] focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#59e6ff] focus:outline-none"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#59e6ff] focus:outline-none"
        />
        <input
          type="text"
          name="company"
          placeholder="Company (optional)"
          value={values.company}
          onChange={(event) => handleChange("company", event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#59e6ff] focus:outline-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="budget"
          placeholder="Budget range (optional)"
          value={values.budget}
          onChange={(event) => handleChange("budget", event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#59e6ff] focus:outline-none"
        />
        <select
          name="service_interest"
          value={values.service_interest}
          onChange={(event) => handleChange("service_interest", event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#59e6ff] focus:outline-none"
        >
          <option value="" className="text-black">
            Service interest (optional)
          </option>
          {SERVICES.map((service) => (
            <option key={service.value} value={service.value} className="text-black">
              {service.label}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Tell us about your project"
        value={values.message}
        onChange={(event) => handleChange("message", event.target.value)}
        className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#59e6ff] focus:outline-none"
        required
      />

      <label className="flex items-start gap-2 text-xs text-white/60">
        <input
          type="checkbox"
          checked={values.consent_to_contact}
          onChange={(event) => handleChange("consent_to_contact", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10"
          required
        />
        I agree to be contacted about my request.
      </label>

      {status === "error" && (
        <p className="text-sm text-red-300">
          {errorMessage || "Please fill in all required fields (message min 10 characters)."}
        </p>
      )}
      {status === "success" && (
        <p className="text-sm text-emerald-200">Thanks! We will reply within 24 hours.</p>
      )}

      <Button
        type="submit"
        disabled={!canSubmit}
        className="rounded-2xl bg-[#19D6FF] px-7 text-[#050914] shadow-[0_18px_48px_-18px_rgba(25,214,255,0.85)] hover:bg-[#12c9ef] disabled:opacity-60"
        data-cta-id="lead-form-submit"
        data-cta-placement="lead-form"
        data-cta-text="Submit lead"
      >
        {status === "submitting" ? "Sending..." : "Send request"}
      </Button>
    </form>
  );
}
