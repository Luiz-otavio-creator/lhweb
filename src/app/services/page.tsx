import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { iconMap, services } from "@/lib/services";
import { SiteHeader } from "@/components/site-header";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <SiteHeader />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,242,255,0.1),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(143,94,255,0.12),transparent_30%),radial-gradient(circle_at_50%_60%,rgba(94,242,255,0.08),transparent_35%)]" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-20 pt-28 md:px-6 lg:px-10 lg:pt-32">
          <header className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#5ef2ff]">
              <span>Services</span>
              <span className="h-1 w-1 rounded-full bg-[#5ef2ff]" />
              <span>LHWEB</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Websites, apps, and automations with LHWEB performance standards.
              </h1>
              <p className="max-w-3xl text-base text-white/70 sm:text-lg">
                Three core tracks to launch your product or accelerate what already exists. Each service has a clear roadmap, measurable deliverables, and dedicated teams to ship fast without losing quality.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#contact"
                className="rounded-full bg-[#35f0ff] px-5 py-3 text-sm font-semibold text-[#050914] shadow-[0_15px_40px_-10px_rgba(53,240,255,0.55)] transition hover:bg-[#32d8e5]"
                data-cta-id="services-book-diagnostic"
                data-cta-placement="services-hero"
                data-cta-text="Book a free diagnostic"
              >
                Book a free diagnostic
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                data-cta-id="services-view-services"
                data-cta-placement="services-hero"
                data-cta-text="View services"
              >
                View services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <section
            id="services"
            className="space-y-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.4)] backdrop-blur xl:p-10"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5ef2ff]">
                  Our services
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                  Choose the track that solves your need now.
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/60 md:text-[15px]">
                Each track has specialists, processes, automations, and playbooks tailored to it. Click to see deliverables, steps, and stacks.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const ServiceIcon = iconMap[service.icon];
                const capabilityPreview = service.capabilities.slice(0, 2);

                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1021]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:border-[#5ef2ff]/40 hover:shadow-[0_25px_60px_rgba(94,242,255,0.15)]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(94,242,255,0.08),transparent_40%)] opacity-60" />
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#0f1124] text-[#5ef2ff] shadow-[0_0_25px_rgba(94,242,255,0.4)]">
                        <ServiceIcon className="h-6 w-6" strokeWidth={1.7} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                          {service.label}
                        </p>
                        <h3 className="text-lg font-semibold text-white">
                          {service.name}
                        </h3>
                      </div>
                      <ArrowUpRight className="ml-auto h-5 w-5 text-white/60 transition group-hover:text-white" />
                    </div>

                    <p className="text-sm text-white/65">{service.summary}</p>

                    <div className="space-y-3">
                      {capabilityPreview.map((capability) => {
                        const CapabilityIcon = iconMap[capability.icon];
                        return (
                          <div
                            key={capability.title}
                            className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3"
                          >
                            <div className="mt-0.5 text-[#5ef2ff]">
                              <CapabilityIcon
                                className="h-4 w-4"
                                strokeWidth={1.7}
                              />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-sm font-semibold text-white">
                                {capability.title}
                              </p>
                              <p className="text-xs text-white/60">
                                {capability.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-2 rounded-xl border border-white/5 bg-[#0f1328]/70 p-3 text-xs text-white/60">
                      {service.stats.map((stat) => (
                        <div key={stat.label} className="space-y-1">
                          <p className="font-semibold text-white/80">
                            {stat.value}
                          </p>
                          <p className="text-[11px] uppercase tracking-[0.18em]">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-linear-to-r from-[#0d1328] via-[#0f142c] to-[#0a0f1f] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.45)] md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5ef2ff]">
                  <Sparkles className="h-4 w-4" />
                  Next step
                </p>
                <h3 className="text-2xl font-semibold text-white md:text-3xl">
                  Share your context and we’ll design the ideal plan together.
                </h3>
                <p className="max-w-2xl text-sm text-white/65 md:text-[15px]">
                  It can be an urgent landing page, an evolving app, or a manual process that needs automation. In under 24 hours you’ll get a clear path to start.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:text-right">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#5ef2ff] px-5 py-3 text-sm font-semibold text-[#050914] shadow-[0_18px_45px_rgba(94,242,255,0.45)] transition hover:bg-[#54dcec]"
                  data-cta-id="services-talk-team"
                  data-cta-placement="services-next-step"
                  data-cta-text="Talk to the team"
                >
                  Talk to the team
                </Link>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Support in EN / PT
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
