"use client";

import Link from "next/link";
import { motion, useInView, easeOut } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import LeadForm from "@/components/forms/LeadForm";
import PrivacySettingsLink from "@/components/analytics/PrivacySettingsLink";
import {
  ArrowRight,
  GaugeCircle,
  Layers,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const sectionFadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full py-16 md:py-24 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <motion.div
        variants={sectionFadeUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#060812] text-white selection:bg-white/10">
      <SiteHeader />
      <Hero />
      <Story />
      <Values />
      <Team />
      <CTA />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section
      id="about"
      aria-label="About LHWEB"
      className="relative overflow-hidden bg-[#050812] pt-24 text-white md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(122,77,255,0.18),transparent_62%),radial-gradient(900px_520px_at_60%_40%,rgba(25,214,255,0.12),transparent_64%),linear-gradient(to_bottom,#04060d,#050812,#04060d)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.56)_55%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-0 opacity-[0.09] bg-[radial-gradient(rgba(255,255,255,0.40)_1px,transparent_1px)] bg-size-[36px_36px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16 text-center md:pb-20 lg:px-10">
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.34em] text-[#19D6FF]/85">
            ABOUT LHWEB
          </p>
          <h1
            id="about-title"
            className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl"
          >
            We build digital products that feel premium and perform flawlessly.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            LHWEB is a focused studio of designers and engineers helping brands
            launch faster, convert more, and scale with confidence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Senior-led delivery
            </Badge>
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Performance-first
            </Badge>
            <Badge className="border-white/10 bg-white/5 text-white/80">
              Global clients
            </Badge>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button className="group h-12 rounded-2xl bg-[#2d6bff] px-7 text-white shadow-[0_18px_55px_-18px_rgba(45,107,255,0.95)] hover:bg-[#245ee6]">
              Talk to the team
              <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-white/15">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Button>
            <Button
              variant="secondary"
              className="h-12 rounded-2xl border border-white/12 bg-transparent px-7 text-white/70 hover:bg-white/6 hover:text-white"
              asChild
            >
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Story() {
  const milestones = [
    {
      title: "2019 — Founded",
      desc: "Started as a small studio focused on high-performance web experiences.",
      Icon: Sparkles,
    },
    {
      title: "2021 — Product-grade delivery",
      desc: "Expanded into apps and automation, supporting growth-focused teams.",
      Icon: Layers,
    },
    {
      title: "2024 — Global partnerships",
      desc: "Serving founders across EU, LATAM, and the US with a senior-led team.",
      Icon: UsersRound,
    },
  ];

  return (
    <Section id="story" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="story-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Our story
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Built to ship fast, think deep, and obsess over results that matter.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {milestones.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.16),transparent_62%)] blur-2xl" />
                <div className="absolute -right-24 -bottom-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.10),transparent_62%)] blur-2xl" />
              </div>
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <item.Icon className="h-5 w-5 text-[#19D6FF]" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Values() {
  const values = [
    {
      title: "Performance as a default",
      desc: "We obsess over speed, stability, and SEO because it drives revenue.",
      Icon: GaugeCircle,
    },
    {
      title: "Premium craft",
      desc: "Design systems, micro-interactions, and polish that users can feel.",
      Icon: Sparkles,
    },
    {
      title: "Clear ownership",
      desc: "Senior talent, direct communication, and zero handoff chaos.",
      Icon: ShieldCheck,
    },
  ];

  return (
    <Section id="values" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="values-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Our values
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            The principles that shape every build, sprint, and decision.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.16),transparent_62%)] blur-2xl" />
                <div className="absolute -right-24 -bottom-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.10),transparent_62%)] blur-2xl" />
              </div>
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <value.Icon className="h-5 w-5 text-[#19D6FF]" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Team() {
  const members = [
    {
      name: "Lucas Henrique",
      role: "Co-founder • Strategy & Growth",
    },
    {
      name: "Guilherme Silva",
      role: "Co-founder • Product & Engineering",
    },
    {
      name: "Senior Network",
      role: "Design, Web, Mobile, AI",
    },
  ];

  return (
    <Section id="team" className="bg-[#060812]">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="team-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            The team
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            A compact, senior-first team with hands-on leadership.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.name}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur"
            >
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(122,77,255,0.16),transparent_62%)] blur-2xl" />
                <div className="absolute -right-24 -bottom-20 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(25,214,255,0.10),transparent_62%)] blur-2xl" />
              </div>
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5" />
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm text-white/60">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <Section
      id="contact"
      className="bg-[radial-gradient(ellipse_at_center,rgba(25,214,255,0.14)_0%,transparent_45%)]"
    >
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 id="contact-title" className="text-3xl font-semibold md:text-5xl">
          Ready to build with LHWEB?
        </h2>
        <p className="mt-4 text-white/75">
          Tell us what you are shipping and we will map the fastest path to
          launch.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            className="rounded-2xl bg-[#19D6FF] px-7 text-[#050914] shadow-[0_18px_48px_-18px_rgba(25,214,255,0.85)] hover:bg-[#12c9ef]"
            data-cta-id="about-book-call"
            data-cta-placement="about-cta"
            data-cta-text="Book a Call"
          >
            Book a Call
          </Button>
          <Button
            variant="secondary"
            className="rounded-2xl border border-white/10 bg-white/5 px-7 text-white hover:bg-white/10"
            asChild
            data-cta-id="about-view-services"
            data-cta-placement="about-cta"
            data-cta-text="View services"
          >
            <Link href="/services">View services</Link>
          </Button>
        </div>

        <LeadForm formId="about-contact" leadType="about" />
      </div>
    </Section>
  );
}

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
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#insights" className="hover:text-white">
                    Insights
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white">
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
