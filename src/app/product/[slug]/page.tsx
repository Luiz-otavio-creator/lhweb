// src/app/product/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "@/components/product/mobile-development/hero";
import ValueProps from "@/components/product/mobile-development/ValueProps";
import Features from "@/components/product/mobile-development/Features";
import Gallery from "@/components/product/mobile-development/Gallery";
import Testimonials from "@/components/product/mobile-development/Testimonials";
import Comparison from "@/components/product/mobile-development/Comparison";
import Pricing from "@/components/product/mobile-development/Pricing";
import FAQ from "@/components/product/mobile-development/FAQ";
import FinalCTA from "@/components/product/mobile-development/FinalCTA";

import type { ProductPageData } from "@/types/product";

// -----------------------------------------------------------------------------
// FORCE STATIC
// -----------------------------------------------------------------------------
export const dynamic = "force-static";

// -----------------------------------------------------------------------------
// DATABASE (PRODUTOS REGISTRADOS)
// -----------------------------------------------------------------------------

// ⚠️ Você pode mover isso para um arquivo externo depois
const products: Record<string, ProductPageData> = {
  "mobile-development": {
    slug: "mobile-development",
    title:
      "Aplicativos mobile que parecem mágica, mas foram desenhados para performance.",
    subtitle:
      "Da ideia ao app publicado, a LHWEB projeta, desenvolve e otimiza aplicativos mobile focados em retenção, conversão e escala — sem fricção para o usuário e sem caos para o seu time.",
    heroLabel: "Mobile Product Experience",
    heroBenefit: "Projetado para escalar em iOS, Android e além.",
    tags: [
      { label: "Native & Cross-platform" },
      { label: "Product Strategy & UX" },
      { label: "Analytics & Growth" },
    ],
    primaryCta: "Agendar diagnóstico do seu app",
    secondaryCta: "Ver roadmap de entrega",
    trustBar:
      "Produtos usados em múltiplos países, por times reais — não apenas em apresentações.",

    valueProps: [
      {
        id: "performance",
        title: "Performance digna de app global.",
        description:
          "Arquitetura mobile otimizada desde o primeiro clique: animações suaves, tempos de carregamento baixos e experiência fluida.",
        icon: "rocket",
      },
      {
        id: "security",
        title: "Segurança pensada para escalar.",
        description:
          "Autenticação segura, fluxos de permissão claros e proteção de dados alinhada às melhores práticas.",
        icon: "shield",
      },
      {
        id: "automation",
        title: "Automação do fluxo inteiro.",
        description:
          "Backoffice, integrações, notificações e dados conectados — o app não é uma ilha.",
        icon: "sparkles",
      },
      {
        id: "roi",
        title: "ROI mensurável.",
        description:
          "Métricas claras: retenção, engajamento, conversão. Ajustes contínuos para evolução real.",
        icon: "trending-up",
      },
    ],

    features: [
      {
        id: "product-strategy",
        title: "Product Discovery & Estratégia",
        description:
          "Roadmap claro antes de qualquer linha de código. Menos retrabalho, mais velocidade.",
        highlight: "Menos retrabalho. Mais clareza.",
      },
      {
        id: "ux-ui",
        title: "UX & UI com padrão LHWEB",
        description:
          "Interfaces inspiradas em apps globais — minimalistas, rápidas e agradáveis.",
        highlight: "Experiência memorável.",
      },
      {
        id: "architecture",
        title: "Arquitetura escalável",
        description:
          "Stack ideal (nativo ou cross-platform) para crescer com segurança.",
        highlight: "Pronto para evoluir.",
      },
      {
        id: "integrations",
        title: "Integrações & automações",
        description:
          "Pagamentos, analytics, CRM, notificações, IA — tudo conectado.",
        highlight: "Um ecossistema, não apenas um app.",
      },
      {
        id: "growth",
        title: "Analytics & Growth",
        description:
          "Medimos, testamos e refinamos: funis, retenção, ativação e upgrades.",
        highlight: "Evolução contínua baseada em dados.",
      },
      {
        id: "care",
        title: "Suporte próximo",
        description:
          "Acompanhamento contínuo, evolução de features e suporte ao time interno.",
        highlight: "Parceria de longo prazo.",
      },
    ],

    images: [
      {
        id: "hero-mobile-dashboard",
        alt: "Mockup de aplicativo mobile moderno",
        caption: "Interfaces móveis fluidas e consistentes.",
      },
      {
        id: "flow-automation",
        alt: "Fluxo de automação mobile",
      },
      {
        id: "analytics-screen",
        alt: "Tela mobile de analytics",
      },
    ],

    testimonials: [
      {
        id: "lorys",
        name: "Lorys Modas",
        role: "E-commerce",
        company: "Brasil",
        result: "+62% conversões no mobile",
        quote:
          "A LHWEB transformou a experiência mobile em poucas semanas. O canal virou nosso principal gerador de receita.",
      },
      {
        id: "pag-si",
        name: "Página Si",
        role: "Agência Digital",
        company: "Itália",
        result: "-45% tempo operacional",
        quote:
          "Os fluxos automatizados reduziram trabalho manual e tornaram tudo mais rápido para os clientes finais.",
      },
      {
        id: "retail-labs",
        name: "All Retail Labs",
        role: "Retail Intelligence",
        company: "Europa",
        result: "+28% velocidade de entrega",
        quote:
          "Agora conseguimos lançar novas features mobile com muito mais velocidade e estabilidade.",
      },
    ],

    comparison: {
      before: {
        title: "Antes da LHWEB",
        items: [
          "Navegação confusa e experiência inconsistente.",
          "Processos manuais para acompanhar métricas.",
          "Decisões baseadas em achismo.",
          "Trabalho operacional interminável.",
        ],
      },
      after: {
        title: "Depois da LHWEB",
        items: [
          "Experiência mobile fluida e clara.",
          "Integrações e automações conectadas.",
          "Métricas em tempo real.",
          "Time focado em inovação, não trabalho manual.",
        ],
      },
    },

    pricing: [
      {
        id: "launch",
        name: "Launch",
        description: "Validação rápida com escopo definido.",
        price: "A partir de €8k",
        priceNote: "6 a 10 semanas",
        features: [
          "Discovery & roadmap",
          "UX/UI completo",
          "MVP mobile",
          "Integrações principais",
          "Publicação App Store / Google Play",
        ],
        ctaLabel: "Discutir MVP",
      },
      {
        id: "scale",
        name: "Scale",
        highlight: true,
        description: "Para apps em evolução contínua.",
        price: "Sob consulta",
        priceNote: "Modelo mensal",
        features: [
          "Auditoria técnica & UX",
          "Refino de arquitetura",
          "Suporte contínuo",
          "Analytics & Growth",
        ],
        ctaLabel: "Agendar diagnóstico",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "Para operações globais.",
        price: "Enterprise",
        priceNote: "Projeto sob medida",
        features: [
          "Arquitetura avançada",
          "Integrações complexas",
          "Design System mobile",
          "Workshops para o time",
        ],
        ctaLabel: "Falar com o time",
      },
    ],

    faq: [
      {
        id: "scope",
        question: "Esse modelo funciona para qualquer tipo de app mobile?",
        answer:
          "Sim. B2B, B2C, SaaS, marketplaces, e-commerce e apps internos.",
      },
      {
        id: "timeline",
        question: "Quanto tempo leva para lançar a primeira versão?",
        answer: "6 a 10 semanas, dependendo da complexidade do escopo.",
      },
      {
        id: "tech",
        question: "Vocês trabalham com app nativo ou cross-platform?",
        answer: "Ambos. Escolhemos o stack ideal para o seu produto.",
      },
      {
        id: "handoff",
        question: "Depois do lançamento, o app é meu?",
        answer: "100% seu. Código + documentação + acessos.",
      },
      {
        id: "team",
        question: "Vocês conseguem trabalhar junto com nosso time interno?",
        answer: "Sim. Atuamos como extensão do seu time.",
      },
      {
        id: "budget",
        question: "Qual é o investimento mínimo?",
        answer: "Projetos começam em €8k para MVPs bem definidos.",
      },
      {
        id: "ai",
        question: "Vocês implementam IA dentro do app?",
        answer: "Sim. IA para recomendações, automação, personalização.",
      },
      {
        id: "next",
        question: "Qual o próximo passo para começar?",
        answer:
          "Agendar um diagnóstico do app para definirmos juntos o plano ideal.",
      },
    ],

    finalCta: {
      title: "Pronto para levar seu produto mobile ao próximo nível?",
      subtitle:
        "Conte sua ideia, contexto ou dor atual. Respondemos em menos de 24h com um plano claro para evolução do seu app.",
      primaryCta: "Agendar diagnóstico",
      secondaryCta: "Ver cases",
      trustNote:
        "Atendimento em PT / EN. Projetos para Brasil, Irlanda e Europa.",
    },
  },
};

// -----------------------------------------------------------------------------
// ROTAS ESTÁTICAS (OBRIGATÓRIO PARA [slug])
// -----------------------------------------------------------------------------

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

// -----------------------------------------------------------------------------
// SEO DINÂMICO
// -----------------------------------------------------------------------------

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = products[params.slug];

  if (!product)
    return {
      title: "Produto | LHWEB",
      description: "Serviço não encontrado",
    };

  return {
    title: `${product.title} | LHWEB`,
    description: product.subtitle,
  };
}

// -----------------------------------------------------------------------------
// PAGE
// -----------------------------------------------------------------------------

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug];

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24 md:px-6 lg:px-8 lg:pt-28">
        <Hero data={product} />
        <ValueProps items={product.valueProps} />
        <Features items={product.features} />
        <Gallery images={product.images} />
        <Testimonials items={product.testimonials} />
        <Comparison data={product.comparison} />
        {product.pricing && <Pricing tiers={product.pricing} />}
        <FAQ items={product.faq} />
        <FinalCTA data={product.finalCta} />
      </div>
    </main>
  );
}
