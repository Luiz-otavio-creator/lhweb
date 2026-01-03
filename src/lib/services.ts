import {
  type LucideIcon,
  Bot,
  Code2,
  GaugeCircle,
  Layers,
  Smartphone,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

export type ServiceIcon =
  | "code"
  | "phone"
  | "sparkles"
  | "gauge"
  | "users"
  | "layers"
  | "zap"
  | "bot";

export type ServiceCapability = {
  title: string;
  description: string;
  icon: ServiceIcon;
};

export type ServiceProcess = {
  title: string;
  description: string;
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  slug: string;
  name: string;
  label: string;
  icon: ServiceIcon;
  summary: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { label: string; value: string }[];
  capabilities: ServiceCapability[];
  deliverables: string[];
  process: ServiceProcess[];
  stack: string[];
  faqs: ServiceFAQ[];
};

export const services: ServiceDetail[] = [
  {
    slug: "web-development",
    name: "Web Development",
    label: "High-performance Web",
    icon: "code",
    summary:
      "High-performance websites built with Next.js and optimized for speed, technical SEO, and real conversion.",
    heroTitle: "Fast sites that convert and get indexed.",
    heroSubtitle:
      "Landing pages, marketing sites, and content hubs with spotless Core Web Vitals, ready to scale without headaches.",
    primaryCta: "Talk about your site",
    secondaryCta: "See deliverables",
    stats: [
      { label: "Core Web Vitals", value: "90+ on Lighthouse" },
      { label: "Average timeline", value: "4–8 weeks" },
    ],
    capabilities: [
      {
        title: "Performance & technical SEO",
        description:
          "Next.js, hybrid rendering, image optimization, and caching to load in milliseconds.",
        icon: "gauge",
      },
      {
        title: "Conversion-first UX",
        description:
          "Clear flows, micro-interactions, and copy that guide the user to the CTA.",
        icon: "zap",
      },
      {
        title: "Scalable content",
        description:
          "Headless CMS integration, lean design system, and governance so marketing ships content without dev bottlenecks.",
        icon: "layers",
      },
    ],
    deliverables: [
      "Information architecture and navigation maps",
      "Full UI/UX (desktop and mobile) aligned with the brand book",
      "Next.js implementation with Tailwind and framer-motion animations",
      "Technical SEO, Schema, Open Graph, and event tracking",
      "Headless CMS integration (Sanity, Contentful, or similar)",
      "Optimized hosting on Vercel plus observability",
    ],
    process: [
      {
        title: "Discovery & positioning",
        description:
          "Align goals, personas, journey, and differentiators to guide design and copy.",
      },
      {
        title: "UX/UI and prototyping",
        description:
          "High-fidelity flows and screens with clear interactions and intentional micro-animations.",
      },
      {
        title: "Build & integrations",
        description:
          "Clean code, performance optimizations, connected CMS, and analytics configured.",
      },
      {
        title: "QA and go-live",
        description:
          "Cross-browser tests, fine-tuning vitals, and post-launch monitoring.",
      },
    ],
    stack: [
      "Next.js",
      "Tailwind",
      "Vercel",
      "Framer Motion",
      "Headless CMS",
      "Analytics/SEO",
    ],
    faqs: [
      {
        question: "Can you work with my current design?",
        answer:
          "Yes. We can evolve an existing design or create a new visual language if needed.",
      },
      {
        question: "Can I edit the content later?",
        answer:
          "Yes. We connect a headless CMS so marketing can publish pages and posts without the dev team.",
      },
      {
        question: "What project sizes do you take?",
        answer:
          "From single campaign landing pages to full marketing sites and multi-language content hubs.",
      },
    ],
  },
  {
    slug: "mobile-development",
    name: "App Development",
    label: "Mobile & PWA",
    icon: "phone",
    summary:
      "Native and hybrid apps with a fluid experience across iOS, Android, and the web — from discovery to growth.",
    heroTitle:
      "Apps and PWAs that feel like magic, engineered for performance.",
    heroSubtitle:
      "Solid architecture, delightful UX, and automation so your product grows without friction.",
    primaryCta: "Plan your app",
    secondaryCta: "View process",
    stats: [
      { label: "Launch", value: "6–10 weeks (MVP)" },
      { label: "Stacks", value: "React Native, Swift, Kotlin" },
    ],
    capabilities: [
      {
        title: "Premium mobile experience",
        description:
          "Smooth interfaces, fluid navigation, and interaction patterns users already love.",
        icon: "phone",
      },
      {
        title: "Scalable architecture",
        description:
          "Choice of the ideal stack (native or cross-platform) and well-structured integrations to scale without rework.",
        icon: "layers",
      },
      {
        title: "Growth, data, and automation",
        description:
          "Analytics, push, A/B testing, and CRM-connected automations to track retention and conversion.",
        icon: "users",
      },
    ],
    deliverables: [
      "Discovery, roadmap, and feature prioritization",
      "High-fidelity mobile UX/UI with clickable prototype",
      "Native or React Native implementation with CI/CD",
      "Integrations with APIs, payments, auth, and notifications",
      "Observability, crash reporting, and analytics configured",
      "Publication and support for App Store / Google Play",
    ],
    process: [
      {
        title: "Discovery and strategy",
        description:
          "Align objectives, KPIs, and define the MVP to validate fast.",
      },
      {
        title: "Design and prototyping",
        description:
          "Complete flows with native-feeling interactions and quick user testing.",
      },
      {
        title: "Build + integrations",
        description:
          "Development with automated pipelines, integrations, and security baked in.",
      },
      {
        title: "Launch & growth",
        description:
          "Publish, monitor, and continuously optimize retention and revenue.",
      },
    ],
    stack: [
      "React Native",
      "Swift/Kotlin",
      "Expo",
      "Firebase",
      "Push/Analytics",
      "CI/CD mobile",
    ],
    faqs: [
      {
        question: "Do you work on existing apps?",
        answer:
          "Yes. We run a technical/UX audit and continue with ongoing evolution or replatforming.",
      },
      {
        question: "Should I go native or cross-platform?",
        answer:
          "We decide together: if extreme native performance is key, we go Swift/Kotlin. If time-to-market and feature parity matter most, React Native/Expo is ideal.",
      },
      {
        question: "How do you ensure production quality?",
        answer:
          "Build pipelines, automated tests, feature flags, and crash/error monitoring from day one.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    label: "AI + Ops",
    icon: "bot",
    summary:
      "Applied AI and orchestrated automations to clear manual work and accelerate entire teams.",
    heroTitle: "Automation and AI to scale operations at product speed.",
    heroSubtitle:
      "Bots, integrations, agents, and dashboards to turn manual processes into orchestrated, measurable flows.",
    primaryCta: "Map processes",
    secondaryCta: "See use cases",
    stats: [
      { label: "Operational reduction", value: "30–60% less manual time" },
      { label: "Stacks", value: "Python, OpenAI, LangChain, Make/Zapier" },
    ],
    capabilities: [
      {
        title: "End-to-end automation",
        description:
          "Workflows across CRM, support, billing, spreadsheets, and databases — no repetitive tasks left behind.",
        icon: "bot",
      },
      {
        title: "Agents and copilots",
        description:
          "Chatbots, internal copilots, and smart routing that understand context and call APIs.",
        icon: "sparkles",
      },
      {
        title: "Observability and security",
        description:
          "Logs, guardrails, prompt versioning, and access policies to stay in control.",
        icon: "gauge",
      },
    ],
    deliverables: [
      "Process mapping and prioritization of the highest-ROI automations",
      "Workflow design and orchestration (Make, n8n, Temporal, or serverless)",
      "Bots/agents with LLMs, embeddings, and external tools",
      "Integrations with CRM, support, billing, and databases",
      "Monitoring dashboards, alerts, and guardrails",
      "Documentation for the team to operate and evolve",
    ],
    process: [
      {
        title: "Discovery & diagnosis",
        description:
          "We map manual processes, volume, and risks to prioritize where automation drives the most ROI.",
      },
      {
        title: "Solution design",
        description:
          "Architecture, tools, responsibilities, and KPIs defined before we build.",
      },
      {
        title: "Implementation",
        description:
          "Workflows, agents, and integrations built with tests and logs from day one.",
      },
      {
        title: "Pilot and scale",
        description:
          "Run a controlled pilot, monitor, and expand to the rest of the team.",
      },
    ],
    stack: [
      "OpenAI/LLMs",
      "LangChain",
      "Python",
      "Make/n8n",
      "API/CRM",
      "Observability",
    ],
    faqs: [
      {
        question: "Can we start small?",
        answer:
          "Yes. We start with a high-impact pilot and expand as results show up.",
      },
      {
        question: "Will sensitive data stay safe?",
        answer:
          "We apply access policies, masking, and logging so each automation follows your security requirements.",
      },
      {
        question: "Do you train the internal team?",
        answer:
          "Yes. We deliver documentation and training so the team can operate and iterate on the flows.",
      },
    ],
  },
];

export const iconMap: Record<ServiceIcon, LucideIcon> = {
  code: Code2,
  phone: Smartphone,
  sparkles: Sparkles,
  gauge: GaugeCircle,
  users: UsersRound,
  layers: Layers,
  zap: Zap,
  bot: Bot,
};
