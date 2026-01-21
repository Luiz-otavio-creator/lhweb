export type MediaRef = {
  storagePath: string;
  downloadURL: string;
  alt?: string;
  width?: number;
  height?: number;
  localPath?: string;
};

export type CtaConfig = {
  text: string;
  href?: string;
  ctaId: string;
  placement: string;
};

export type HomeContent = {
  updatedAt?: string;
  seo: {
    title: string;
    description: string;
    ogImage?: MediaRef;
  };
  hero: {
    title: string;
    subtitle: string;
    trustLabel: string;
    primaryCta: CtaConfig;
    secondaryCta: CtaConfig;
    backgroundVideo: MediaRef;
    logos: MediaRef[];
  };
  sections: {
    capabilities: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cards: {
        title: string;
        description: string;
        tech: string;
        ctaText: string;
        href: string;
        iconKey: string;
        ctaId: string;
        placement: string;
      }[];
      footerText: string;
      footerCta: CtaConfig;
    };
    why: {
      eyebrow: string;
      title: string;
      subtitle: string;
      features: {
        title: string;
        description: string;
        iconKey: string;
      }[];
      stats: {
        value: string;
        label: string;
        sub?: string;
      }[];
      image: MediaRef;
    };
    caseStudies: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cta: CtaConfig;
      cards: {
        title: string;
        metric: string;
        metricLabel: string;
        description: string;
        image: MediaRef;
      }[];
      stats: {
        label: string;
        value: number;
        suffix: string;
      }[];
      closingText: string;
    };
    process: {
      title: string;
      subtitle: string;
      items: {
        id: string;
        number: string;
        title: string;
        description: string;
        video: MediaRef;
        panel: {
          eyebrow: string;
          heading: string;
          body: string;
          primaryCta: CtaConfig;
          secondaryCta: CtaConfig;
        };
      }[];
    };
    techStack: {
      eyebrow: string;
      title: string;
      subtitle: string;
      techs: {
        abbr: string;
        label: string;
      }[];
      ctaText: string;
      ctaButton: CtaConfig;
    };
    insights: {
      title: string;
      subtitle: string;
      posts: {
        title: string;
        category: string;
        description: string;
        href: string;
        image: MediaRef;
      }[];
      cta: CtaConfig;
    };
    finalCta: {
      eyebrow: string;
      title: string;
      subtitle: string;
      primaryCta: CtaConfig;
      secondaryCta: CtaConfig;
      trustText: string;
      image: MediaRef;
    };
  };
  footer: {
    brandName: string;
    description: string;
    nav: {
      title: string;
      links: { label: string; href: string }[];
    };
    social: {
      title: string;
      links: { label: string; href: string; iconKey: string }[];
    };
    legal: {
      copyright: string;
      tagline: string;
      builtWith: string;
    };
  };
};
