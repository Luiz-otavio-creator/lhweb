import type { HomeContent } from "@/lib/content/types";

export const homeContent: HomeContent = {
  seo: {
    title: "LHWEB — High-performance websites, apps, and AI",
    description:
      "We build high-performance websites, apps, and AI-powered experiences designed to scale, convert, and automate.",
  },
  hero: {
    title: "We build high-performance websites, apps, and AI-powered experiences.",
    subtitle:
      "From strategy to launch, we craft digital products designed to scale, convert, and automate.",
    trustLabel: "Trusted by businesses in 5+ countries",
    primaryCta: {
      text: "Book a Free Consultation",
      href: "#contact",
      ctaId: "hero-book-consultation",
      placement: "home-hero",
    },
    secondaryCta: {
      text: "See Our Work",
      href: "#case-studies",
      ctaId: "hero-see-work",
      placement: "home-hero",
    },
    backgroundVideo: {
      storagePath: "content/home/hero/herov.mp4",
      downloadURL: "/hero/herov.mp4",
      localPath: "public/hero/herov.mp4",
    },
    logos: [
      {
        storagePath: "content/home/companys/babita.png",
        downloadURL: "/companys/babita.png",
        alt: "Babita logo",
        localPath: "public/companys/babita.png",
      },
      {
        storagePath: "content/home/companys/brilhodemulher.png",
        downloadURL: "/companys/brilhodemulher.png",
        alt: "Brilho de Mulher logo",
        localPath: "public/companys/brilhodemulher.png",
      },
      {
        storagePath: "content/home/companys/brilhointimo.png",
        downloadURL: "/companys/brilhointimo.png",
        alt: "Brilho Intimo logo",
        localPath: "public/companys/brilhointimo.png",
      },
      {
        storagePath: "content/home/companys/criswinter.png",
        downloadURL: "/companys/criswinter.png",
        alt: "Cris Winter logo",
        localPath: "public/companys/criswinter.png",
      },
      {
        storagePath: "content/home/companys/deissy.png",
        downloadURL: "/companys/deissy.png",
        alt: "Deissy logo",
        localPath: "public/companys/deissy.png",
      },
      {
        storagePath: "content/home/companys/fetelle.png",
        downloadURL: "/companys/fetelle.png",
        alt: "Fetelle logo",
        localPath: "public/companys/fetelle.png",
      },
      {
        storagePath: "content/home/companys/fitsgym.png",
        downloadURL: "/companys/fitsgym.png",
        alt: "Fits Gym logo",
        localPath: "public/companys/fitsgym.png",
      },
      {
        storagePath: "content/home/companys/horadosono.png",
        downloadURL: "/companys/horadosono.png",
        alt: "Hora do Sono logo",
        localPath: "public/companys/horadosono.png",
      },
      {
        storagePath: "content/home/companys/jussilly.png",
        downloadURL: "/companys/jussilly.png",
        alt: "Jussilly logo",
        localPath: "public/companys/jussilly.png",
      },
      {
        storagePath: "content/home/companys/kallifon.png",
        downloadURL: "/companys/kallifon.png",
        alt: "Kallifon logo",
        localPath: "public/companys/kallifon.png",
      },
      {
        storagePath: "content/home/companys/lindaseducao.png",
        downloadURL: "/companys/lindaseducao.png",
        alt: "Linda Seducao logo",
        localPath: "public/companys/lindaseducao.png",
      },
      {
        storagePath: "content/home/companys/mercado.png",
        downloadURL: "/companys/mercado.png",
        alt: "Mercado logo",
        localPath: "public/companys/mercado.png",
      },
      {
        storagePath: "content/home/companys/oficina.png",
        downloadURL: "/companys/oficina.png",
        alt: "Oficina logo",
        localPath: "public/companys/oficina.png",
      },
      {
        storagePath: "content/home/companys/ouseuse.png",
        downloadURL: "/companys/ouseuse.png",
        alt: "Ouseuse logo",
        localPath: "public/companys/ouseuse.png",
      },
      {
        storagePath: "content/home/companys/tereza.png",
        downloadURL: "/companys/tereza.png",
        alt: "Tereza logo",
        localPath: "public/companys/tereza.png",
      },
      {
        storagePath: "content/home/companys/useintuicao.png",
        downloadURL: "/companys/useintuicao.png",
        alt: "Use Intuicao logo",
        localPath: "public/companys/useintuicao.png",
      },
    ],
  },
  sections: {
    capabilities: {
      eyebrow: "OUR CORE CAPABILITIES",
      title:
        "Transforming ideas into high-performance websites, apps and intelligent systems.",
      subtitle: "",
      cards: [
        {
          title: "Web Development",
          description:
            "High performance websites built with Next.js and crafted for speed, SEO and conversion.",
          tech: "Next.js • Framer • Vercel",
          ctaText: "Explore Web →",
          href: "/services/web-development",
          iconKey: "code",
          ctaId: "home-service-web-development",
          placement: "home-capabilities",
        },
        {
          title: "App Development",
          description:
            "Native & hybrid mobile apps and PWAs that deliver seamless experiences on iOS, Android and the web.",
          tech: "React Native • Swift • Kotlin",
          ctaText: "Explore Apps →",
          href: "/services/app-development",
          iconKey: "smartphone",
          ctaId: "home-service-app-development",
          placement: "home-capabilities",
        },
        {
          title: "AI & Automation",
          description:
            "Artificial intelligence and workflow automation solutions that unlock efficiency and innovation across teams.",
          tech: "Python • OpenAI • LangChain • Make",
          ctaText: "Explore AI →",
          href: "/services/ai-automation",
          iconKey: "sparkles",
          ctaId: "home-service-ai-automation",
          placement: "home-capabilities",
        },
      ],
      footerText: "Want to explore our full portfolio of services? Let's talk.",
      footerCta: {
        text: "Explore All Services →",
        href: "/services",
        ctaId: "home-explore-services",
        placement: "home-capabilities",
      },
    },
    why: {
      eyebrow: "WHY LHWEB",
      title: "Why companies choose LHWEB.",
      subtitle:
        "Technology meets intelligence. We combine performance-driven development, automation, and AI to build scalable digital ecosystems — with a human touch.",
      features: [
        {
          title: "Performance-First Development",
          description:
            "Our websites and apps are optimized for speed, SEO, and conversion — measurable performance, not aesthetics only.",
          iconKey: "zap",
        },
        {
          title: "Automation & AI by Default",
          description:
            "Every solution we build integrates automation and AI Insights — saving time, cutting costs and unlocking scalability.",
          iconKey: "bot",
        },
        {
          title: "Design That Actually Converts",
          description:
            "We create user experiences built on analytics and behavior — design that drives engagement and real ROI.",
          iconKey: "gauge",
        },
        {
          title: "Direct Access to Founders",
          description:
            "Work directly with the LHWEB founders. Real communication, faster decisions and total alignment with your business.",
          iconKey: "users",
        },
      ],
      stats: [
        { value: "+70", label: "Projects Delivered" },
        { value: "+62%", label: "Average Conversion Increase" },
        { value: "5", label: "Countries Served", sub: "EU / LATAM / US" },
      ],
      image: {
        storagePath: "content/home/why/hologram-gear.png",
        downloadURL: "/why/hologram-gear.png",
        alt: "Hologram Gear",
        width: 900,
        height: 900,
        localPath: "public/why/hologram-gear.png",
      },
    },
    caseStudies: {
      eyebrow: "CASE STUDIES",
      title: "Proof in Results.",
      subtitle:
        "From websites to AI systems, we design and build solutions that deliver measurable growth scalability.",
      cta: {
        text: "View All Projects →",
        href: "#projects",
        ctaId: "case-studies-view-all",
        placement: "home-case-studies",
      },
      cards: [
        {
          title: "Lorys Modas",
          metric: "+62%",
          metricLabel: "sales in 3 months",
          description:
            "Redefined UX and implemented AI product recommendation for a Brazilian fashion brand.",
          image: {
            storagePath: "content/home/case-studies/mockup-dashboard-1.png",
            downloadURL: "/hero/mockup-dashboard-1.png",
            alt: "Lorys Modas",
            width: 640,
            height: 360,
            localPath: "public/hero/mockup-dashboard-1.png",
          },
        },
        {
          title: "Pag Si",
          metric: "-45%",
          metricLabel: "manual workload",
          description:
            "Built a custom automation platform integrating WhatsApp CRM and billing system.",
          image: {
            storagePath: "content/home/case-studies/mockup-dashboard-2.png",
            downloadURL: "/hero/mockup-dashboard-2.png",
            alt: "Pag Si",
            width: 640,
            height: 360,
            localPath: "public/hero/mockup-dashboard-2.png",
          },
        },
        {
          title: "AI Retail Labs",
          metric: "+28%",
          metricLabel: "customer retention",
          description:
            "Created an AI-powered demand forecasting system for retail analytics.",
          image: {
            storagePath: "content/home/case-studies/mockup-mobile.png",
            downloadURL: "/hero/mockup-mobile.png",
            alt: "AI Retail Labs",
            width: 640,
            height: 360,
            localPath: "public/hero/mockup-mobile.png",
          },
        },
      ],
      stats: [
        { label: "Traffic", value: 120, suffix: "%" },
        { label: "Conversions", value: 38, suffix: "%" },
        { label: "CWV", value: 98, suffix: "%" },
      ],
      closingText: "Ready to see how we can scale your business?",
    },
    process: {
      title: "How we work",
      subtitle:
        "Strategy, technology, and growth — orchestrated in one seamless, transparent workflow so you always know exactly what’s happening and why.",
      items: [
        {
          id: "01",
          number: "01",
          title: "Strategy & Discovery",
          description:
            "Deep-dive into goals, users, markets, and constraints to design a roadmap aligned with business impact.",
          video: {
            storagePath: "content/home/process/section-video.mp4",
            downloadURL: "/videos/section-video.mp4",
            localPath: "public/videos/section-video.mp4",
          },
          panel: {
            eyebrow: "01 • Strategy & Discovery",
            heading: "A clear, guided step in your digital growth.",
            body:
              "We take this phase off your plate with a proven framework — so you gain clarity, momentum, and a partner that thinks about your product like a founder would.",
            primaryCta: {
              text: "Book a consultation",
              href: "#contact",
              ctaId: "process-book-consultation",
              placement: "home-process",
            },
            secondaryCta: {
              text: "View all services",
              href: "/services",
              ctaId: "process-view-services",
              placement: "home-process",
            },
          },
        },
        {
          id: "02",
          number: "02",
          title: "Design & Experience",
          description:
            "UI/UX, prototypes, and interaction concepts that turn complex journeys into clear, frictionless flows.",
          video: {
            storagePath: "content/home/process/section-video.mp4",
            downloadURL: "/videos/section-video.mp4",
            localPath: "public/videos/section-video.mp4",
          },
          panel: {
            eyebrow: "02 • Design & Experience",
            heading: "A clear, guided step in your digital growth.",
            body:
              "We take this phase off your plate with a proven framework — so you gain clarity, momentum, and a partner that thinks about your product like a founder would.",
            primaryCta: {
              text: "Book a consultation",
              href: "#contact",
              ctaId: "process-book-consultation",
              placement: "home-process",
            },
            secondaryCta: {
              text: "View all services",
              href: "/services",
              ctaId: "process-view-services",
              placement: "home-process",
            },
          },
        },
        {
          id: "03",
          number: "03",
          title: "Development & QA",
          description:
            "Modern architectures, performance, security, and testing baked into every release.",
          video: {
            storagePath: "content/home/process/section-video.mp4",
            downloadURL: "/videos/section-video.mp4",
            localPath: "public/videos/section-video.mp4",
          },
          panel: {
            eyebrow: "03 • Development & QA",
            heading: "A clear, guided step in your digital growth.",
            body:
              "We take this phase off your plate with a proven framework — so you gain clarity, momentum, and a partner that thinks about your product like a founder would.",
            primaryCta: {
              text: "Book a consultation",
              href: "#contact",
              ctaId: "process-book-consultation",
              placement: "home-process",
            },
            secondaryCta: {
              text: "View all services",
              href: "/services",
              ctaId: "process-view-services",
              placement: "home-process",
            },
          },
        },
        {
          id: "04",
          number: "04",
          title: "Launch & Growth",
          description:
            "Monitoring, optimization, and iteration focused on ROI, conversions, and long-term scalability.",
          video: {
            storagePath: "content/home/process/section-video.mp4",
            downloadURL: "/videos/section-video.mp4",
            localPath: "public/videos/section-video.mp4",
          },
          panel: {
            eyebrow: "04 • Launch & Growth",
            heading: "A clear, guided step in your digital growth.",
            body:
              "We take this phase off your plate with a proven framework — so you gain clarity, momentum, and a partner that thinks about your product like a founder would.",
            primaryCta: {
              text: "Book a consultation",
              href: "#contact",
              ctaId: "process-book-consultation",
              placement: "home-process",
            },
            secondaryCta: {
              text: "View all services",
              href: "/services",
              ctaId: "process-view-services",
              placement: "home-process",
            },
          },
        },
      ],
    },
    techStack: {
      eyebrow: "TECH STACK",
      title: "Built for Scalability",
      subtitle:
        "We build on a modern, future-ready stack—trusted by global leaders and optimized for performance, security, and growth.",
      techs: [
        { abbr: "NE", label: "Next.js" },
        { abbr: "RE", label: "React" },
        { abbr: "FR", label: "Framer" },
        { abbr: "VE", label: "Vercel" },
        { abbr: "RN", label: "React Native" },
        { abbr: "SW", label: "Swift" },
        { abbr: "LA", label: "LangChain" },
        { abbr: "MA", label: "Make.com" },
        { abbr: "AW", label: "AWS" },
        { abbr: "FI", label: "Firebase" },
        { abbr: "SU", label: "Supabase" },
        { abbr: "PO", label: "PostgreSQL" },
      ],
      ctaText: "Looking for a reliable tech partner?",
      ctaButton: {
        text: "Let's Build Together →",
        href: "#contact",
        ctaId: "tech-stack-cta",
        placement: "home-tech-stack",
      },
    },
    insights: {
      title: "Authority Through Knowledge.",
      subtitle:
        "We share strategies, tools, and insights on web development, AI, and business automation to help brands grow smarter.",
      posts: [
        {
          title: "AI in E-Commerce: How to Automate and Scale Sales",
          category: "Artificial Intelligence",
          description:
            "From personalized recommendations to dynamic pricing — see how AI is reshaping e-commerce growth.",
          href: "/blog/ai-ecommerce",
          image: {
            storagePath: "content/home/insights/ai-ecommerce.png",
            downloadURL: "/blog/ai-ecommerce.png",
            alt: "AI in E-Commerce",
            localPath: "public/blog/ai-ecommerce.png",
          },
        },
        {
          title: "Why Your Website Isn’t Converting — and How to Fix It",
          category: "UX / Design",
          description:
            "A deep dive into expertise, leading speed and behavioural analytics that actually drive conversions.",
          href: "/blog/conversion",
          image: {
            storagePath: "content/home/insights/conversion-fix.png",
            downloadURL: "/blog/conversion-fix.png",
            alt: "Why Your Website Isn't Converting",
            localPath: "public/blog/conversion-fix.png",
          },
        },
        {
          title: "From MVP to Scalable Product in 60 Days",
          category: "Development",
          description:
            "How agile sprints, automation, and fast iteration help teams build and launch successful digital products.",
          href: "/blog/mvp",
          image: {
            storagePath: "content/home/insights/mvp-scalable.png",
            downloadURL: "/blog/mvp-scalable.png",
            alt: "From MVP to Scalable Product",
            localPath: "public/blog/mvp-scalable.png",
          },
        },
      ],
      cta: {
        text: "Visit Blog →",
        href: "/blog",
        ctaId: "insights-visit-blog",
        placement: "home-insights",
      },
    },
    finalCta: {
      eyebrow: "READY TO TAKE SOMETHING EXTRAORDINARY",
      title: "Ready to take your digital presence to the next level?",
      subtitle:
        "Tell us about your project and our team will send you a tailored proposal within 24 hours.",
      primaryCta: {
        text: "Book a Free Consultation",
        href: "#contact",
        ctaId: "final-cta-book-consultation",
        placement: "home-final-cta",
      },
      secondaryCta: {
        text: "Chat with Our Team",
        href: "#contact",
        ctaId: "final-cta-chat",
        placement: "home-final-cta",
      },
      trustText:
        "Trusted by businesses in 5+ countries · 70+ successful projects · 98% client satisfaction",
      image: {
        storagePath: "content/home/cta/24h-response-stack.png",
        downloadURL: "/cta/24h-response-stack.png",
        alt: "24h response icons floating hologram",
        width: 1350,
        height: 1350,
        localPath: "public/cta/24h-response-stack.png",
      },
    },
  },
  footer: {
    brandName: "LHWEB",
    description:
      "We craft high-performance digital products with Next.js, Tailwind and a relentless focus on results.",
    nav: {
      title: "Company",
      links: [
        { label: "About", href: "#why" },
        { label: "Services", href: "#enhanced-capabilities" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "#contact" },
      ],
    },
    social: {
      title: "Follow",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/HugoMarangao",
          iconKey: "github",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/hugo-marangao-17ab44219/",
          iconKey: "linkedin",
        },
        { label: "Twitter", href: "https://x.com/HugoMarang39640", iconKey: "twitter" },
      ],
    },
    legal: {
      copyright: "© {year} LHWEB. All rights reserved.",
      tagline: "Dark mode by default • Accessible • SEO-ready",
      builtWith:
        "Built with Next.js 14 • Tailwind CSS • shadcn/ui • Framer Motion • Deployed on Vercel",
    },
  },
};
