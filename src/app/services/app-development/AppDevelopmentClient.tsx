"use client";

import Link from "next/link";
import type { Variants } from "framer-motion";
import { motion, easeOut } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import LeadForm from "@/components/forms/LeadForm";
import PrivacySettingsLink from "@/components/analytics/PrivacySettingsLink";
import TrackServiceView from "@/components/analytics/TrackServiceView";
import Section from "./sections/SectionClient";
import HeroClient from "./sections/HeroClient";
import ProcessClient from "./sections/ProcessClient";
import FoundationClient from "./sections/FoundationClient";
import ResultsClient from "./sections/ResultsClient";
import {
  PenTool,
  Activity,
  TrendingUp,
  ShieldCheck,
  Gauge,
  Layers,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Motion helpers (typed)
────────────────────────────────────────────────────────────── */
const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: i * 0.08 },
  }),
};

/* ─────────────────────────────────────────────────────────────
   Page
────────────────────────────────────────────────────────────── */
export default function AppDevelopmentClient({
  faqSlot,
}: {
  faqSlot?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#060812] text-white selection:bg-white/10">
      <SiteHeader />
      <TrackServiceView slug="app-development" name="App Development" />
      <HeroClient />
      <FoundationClient />
      <ProcessClient />
      <ResultsClient />
      <CaseStudies />
      <WhyChoose />
      {faqSlot}
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   5) Case Studies
────────────────────────────────────────────────────────────── */
function CaseStudies() {
  const cases = useMemo(
    () => [
      {
        name: "BoostPay",
        stack: "React Native • Node.js",
        metric: "+150K downloads",
        href: "#contact",
      },
      {
        name: "Fit+",
        stack: "Next.js • Expo",
        metric: "4.8 ★ rating",
        href: "#contact",
      },
      {
        name: "NovaShop",
        stack: "Vue • Django",
        metric: "+82% conversion rate",
        href: "#contact",
      },
    ],
    [],
  );

  return (
    <Section id="work" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="work-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Case Studies
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            How we turn ideas into successful apps.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {cases.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              variants={itemFadeUp}
              custom={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur transition hover:border-white/20"
              aria-label={`Open case study: ${c.name}`}
            >
              <div className="absolute inset-0 opacity-65">
                <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.16),transparent_62%)] blur-2xl" />
                <div className="absolute -right-28 -bottom-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.10),transparent_62%)] blur-2xl" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{c.name}</div>
                  <ArrowRight className="h-5 w-5 text-white/50 transition group-hover:text-white" />
                </div>
                <div className="mt-2 text-sm text-white/65">{c.stack}</div>
                <div className="mt-5 inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                  {c.metric}
                </div>
                <div className="mt-6 h-24 w-full rounded-2xl border border-white/10 bg-white/5" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   6) Why Choose LHWEB
────────────────────────────────────────────────────────────── */
function WhyChoose() {
  const bullets = useMemo(
    () => [
      {
        n: "01",
        title: "Direct access to senior engineers",
        desc: "Fast decisions, fewer handoffs, higher quality outputs.",
        Icon: ShieldCheck,
      },
      {
        n: "02",
        title: "Design-driven, not template-first",
        desc: "We design for conversion, retention and brand trust.",
        Icon: PenTool,
      },
      {
        n: "03",
        title: "Predictable delivery, no surprises",
        desc: "Clear scope, milestones and transparent communication.",
        Icon: Layers,
      },
      {
        n: "04",
        title: "Post-launch support included",
        desc: "Monitoring, improvements and iteration after shipping.",
        Icon: Activity,
      },
      {
        n: "05",
        title: "Built to scale from day one",
        desc: "Architecture ready for growth and performance.",
        Icon: Gauge,
      },
      {
        n: "06",
        title: "Business-focused execution",
        desc: "We care about outcomes: revenue, speed and customer experience.",
        Icon: TrendingUp,
      },
    ],
    [],
  );

  return (
    <Section id="why" className="bg-[#060812]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 lg:px-10">
        <div>
          <h2
            id="why-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Why Choose LHWEB
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/65 sm:text-base">
            We don&apos;t just build apps.
            <br />
            We build products founders can trust.
          </p>

          <p className="mt-6 text-sm leading-6 text-white/60">
            We collaborate with founders and teams who value clarity, speed, and
            long-term scalability. Every choice we make is designed to impact
            user experience and business outcomes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Senior-led
            </Badge>
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Conversion-first
            </Badge>
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Scalable architecture
            </Badge>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-4"
        >
          {bullets.map((b, i) => (
            <motion.div
              key={b.n}
              variants={itemFadeUp}
              custom={i}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -left-24 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.14),transparent_62%)] blur-2xl" />
                <div className="absolute -right-24 -bottom-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.08),transparent_62%)] blur-2xl" />
              </div>

              <div className="relative flex items-start gap-4">
                <div className="mt-0.5 text-sm font-semibold text-white/70">
                  {b.n}
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <b.Icon className="h-5 w-5 text-[#19D6FF]" aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-semibold">{b.title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/65">
                    {b.desc}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA
────────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <Section
      id="contact"
      className="bg-[radial-gradient(ellipse_at_center,rgba(25,214,255,0.14)_0%,transparent_45%)]"
    >
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 id="contact-title" className="text-3xl font-semibold md:text-5xl">
          Ready to build your app?
        </h2>
        <p className="mt-4 text-white/75">
          Let&apos;s ship something fast, premium and scalable — with a process
          you can trust.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="rounded-2xl bg-[#19D6FF] px-7 text-[#050914] shadow-[0_18px_48px_-18px_rgba(25,214,255,0.85)] hover:bg-[#12c9ef]"
            data-cta-id="app-dev-final-book"
            data-cta-placement="app-dev-final"
            data-cta-text="Book a Free Consultation"
          >
            Book a Free Consultation
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-2xl border border-white/10 bg-white/5 px-7 text-white hover:bg-white/10"
            asChild
            data-cta-id="app-dev-final-cases"
            data-cta-placement="app-dev-final"
            data-cta-text="See Case Studies"
          >
            <Link href="#work">See Case Studies</Link>
          </Button>
        </div>

        <LeadForm formId="app-dev-contact" leadType="app-development" />
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer
────────────────────────────────────────────────────────────── */
function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="grid items-start gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Layers className="h-4 w-4 text-[#19D6FF]" aria-hidden />
              </div>
              <span className="font-semibold tracking-wide">LHWEB</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              Premium websites, apps and AI systems — built with modern stacks
              and ruthless focus on results.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <nav aria-label="Footer navigation">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#foundation" className="hover:text-white">
                    App Development
                  </Link>
                </li>
                <li>
                  <Link href="#work" className="hover:text-white">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Social links">
              <h4 className="mb-3 text-sm font-semibold text-white/80">
                Follow
              </h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li className="flex items-center gap-2">
                  <Github className="h-4 w-4" aria-hidden />
                  <Link href="#" className="hover:text-white">
                    GitHub
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" aria-hidden />
                  <Link href="#" className="hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" aria-hidden />
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-sm text-white/60 md:text-right">
            <div>© {year} LHWEB. All rights reserved.</div>
            <div className="mt-2">
              Dark mode by default • Accessible • SEO-ready
            </div>
            <div className="mt-2">
              <PrivacySettingsLink className="text-xs text-white/60 hover:text-white" />
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-white/10" />

        <div className="text-xs text-white/40">
          Built with Next.js • Tailwind CSS • shadcn/ui • Framer Motion •
          Deployed on Vercel
        </div>
      </div>
    </footer>
  );
}
