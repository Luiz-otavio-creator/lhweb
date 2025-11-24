// src/app/product/types.ts

export type ProductTag = {
  label: string;
};

export type ProductValueProp = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type ProductFeature = {
  id: string;
  title: string;
  description: string;
  highlight?: string;
};

export type ProductImage = {
  id: string;
  alt: string;
  caption?: string;
};

export type ProductTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  result: string;
  quote: string;
};

export type ProductPricingTier = {
  id: string;
  name: string;
  description: string;
  price?: string;
  priceNote?: string;
  highlight?: boolean;
  features: string[];
  ctaLabel: string;
};

export type ProductFAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type ProductComparisonSide = {
  title: string;
  items: string[];
};

export type ProductPageData = {
  slug: string;
  title: string;
  subtitle: string;
  heroLabel?: string;
  heroBenefit?: string;
  tags: ProductTag[];
  primaryCta: string;
  secondaryCta: string;
  trustBar?: string;
  valueProps: ProductValueProp[];
  features: ProductFeature[];
  images: ProductImage[];
  testimonials: ProductTestimonial[];
  comparison: {
    before: ProductComparisonSide;
    after: ProductComparisonSide;
  };
  pricing?: ProductPricingTier[];
  faq: ProductFAQItem[];
  finalCta: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta?: string;
    trustNote?: string;
  };
};
