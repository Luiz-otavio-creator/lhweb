import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { iconMap, services, type ServiceDetail } from "@/lib/services";
import { SiteHeader } from "@/components/site-header";
import TrackServiceView from "@/components/analytics/TrackServiceView";

export const dynamic = "force-static";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service)
    return {
      title: "Service | LHWEB",
      description: "Service not found",
    };

  return {
    title: `${service.name} | LHWEB Services`,
    description: service.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) return notFound();

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteHeader />
      <TrackServiceView slug={service.slug} name={service.name} />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,242,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(143,94,255,0.12),transparent_30%),radial-gradient(circle_at_50%_60%,rgba(94,242,255,0.08),transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6 lg:px-10 lg:pt-28">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>

          <Hero service={service} />

          <section className="mt-12 grid gap-6 md:grid-cols-3">
            {service.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          <Capabilities service={service} />
          <Deliverables service={service} />
          <ProcessSection service={service} />
          <FAQSection service={service} />

          <FinalCTA service={service} />
        </div>
      </div>
    </main>
  );
}

function Hero({ service }: { service: ServiceDetail }) {
  const ServiceIcon = iconMap[service.icon];

  return (
    <section className="rounded-3xl border border-white/10 bg-linear-to-r from-[#0d1328] via-[#0f142c] to-[#0a0f1f] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.5)] md:p-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#0f1124] text-[#5ef2ff] shadow-[0_0_25px_rgba(94,242,255,0.4)]">
              <ServiceIcon className="h-7 w-7" strokeWidth={1.7} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                {service.label}
              </p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                {service.name}
              </h1>
            </div>
          </div>

          <p className="max-w-3xl text-base text-white/70 sm:text-lg">
            {service.heroTitle}
          </p>
          <p className="max-w-3xl text-sm text-white/60 md:text-[15px]">
            {service.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="rounded-full bg-[#35f0ff] px-5 py-3 text-sm font-semibold text-[#050914] shadow-[0_15px_40px_-10px_rgba(53,240,255,0.55)] transition hover:bg-[#32d8e5]"
              data-cta-id="service-primary-cta"
              data-cta-placement="service-hero"
              data-cta-text={service.primaryCta}
            >
              {service.primaryCta}
            </Link>
            <a
              href="#deliverables"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              data-cta-id="service-secondary-cta"
              data-cta-placement="service-hero"
              data-cta-text={service.secondaryCta}
            >
              {service.secondaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {service.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities({ service }: { service: ServiceDetail }) {
  return (
    <section className="mt-14 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5ef2ff]">
            What we do
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Core capabilities
          </h2>
        </div>
        <p className="max-w-2xl text-sm text-white/60 md:text-[15px]">
          Three pillars driving every project: speed, UX clarity, and governance so your team can operate safely.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {service.capabilities.map((capability) => {
          const CapabilityIcon = iconMap[capability.icon];
          return (
            <div
              key={capability.title}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0c1021]/70 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
            >
              <div className="mt-1 text-[#5ef2ff]">
                <CapabilityIcon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="space-y-1.5">
                <p className="text-base font-semibold text-white">
                  {capability.title}
                </p>
                <p className="text-sm text-white/60">
                  {capability.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Deliverables({ service }: { service: ServiceDetail }) {
  return (
    <section id="deliverables" className="mt-14 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5ef2ff]">
            Deliverables
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            What you actually get
          </h2>
        </div>
        <p className="max-w-2xl text-sm text-white/60 md:text-[15px]">
          Everything documented and ready to operate—no hidden dependencies.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {service.deliverables.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <span className="mt-1 h-2 w-2 rounded-full bg-[#5ef2ff]" />
            <p className="text-sm text-white/80">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection({ service }: { service: ServiceDetail }) {
  return (
    <section className="mt-14 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5ef2ff]">
            How we run
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Clear staged process
          </h2>
        </div>
        <p className="max-w-2xl text-sm text-white/60 md:text-[15px]">
          Each phase has defined goals, owners, and deliverables. Full transparency on progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {service.process.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-white/10 bg-[#0c1021]/70 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute right-5 top-5 text-xs font-semibold text-white/40">
              {(index + 1).toString().padStart(2, "0")}
            </div>
            <h3 className="text-base font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-white/60">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ service }: { service: ServiceDetail }) {
  return (
    <section className="mt-14 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5ef2ff]">
            FAQ
          </p>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Frequently asked questions
          </h2>
        </div>
        <p className="max-w-2xl text-sm text-white/60 md:text-[15px]">
          If you don’t see your question here, ping the team and we’ll answer within a day.
        </p>
      </div>

      <div className="space-y-3">
        {service.faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white">
              {faq.question}
              <span className="text-xs text-white/50 group-open:hidden">
                +
              </span>
              <span className="text-xs text-white/50 hidden group-open:inline">
                —
              </span>
            </summary>
            <p className="mt-3 text-sm text-white/60">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA({ service }: { service: ServiceDetail }) {
  return (
    <section className="mt-16 rounded-3xl border border-white/10 bg-linear-to-r from-[#0d1328] via-[#0f142c] to-[#0a0f1f] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.5)] md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5ef2ff]">
            Let’s get started
          </p>
          <h3 className="text-2xl font-semibold text-white md:text-3xl">
            Ready to move forward with {service.name}?
          </h3>
          <p className="max-w-2xl text-sm text-white/65 md:text-[15px]">
            Share context, links, and objectives. We’ll send back a lean plan with next steps, estimated investment, and a suggested timeline.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:text-right">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#5ef2ff] px-5 py-3 text-sm font-semibold text-[#050914] shadow-[0_18px_45px_rgba(94,242,255,0.45)] transition hover:bg-[#54dcec]"
            data-cta-id="service-final-cta"
            data-cta-placement="service-final"
            data-cta-text="Talk to LHWEB"
          >
            Talk to LHWEB
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            Response within 24h
          </span>
        </div>
      </div>
    </section>
  );
}
