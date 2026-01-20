// src/app/product/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "@/components/product/mobile-development_old/hero";
import ValueProps from "@/components/product/mobile-development_old/ValueProps";
import Features from "@/components/product/mobile-development_old/Features";
import Gallery from "@/components/product/mobile-development_old/Gallery";
import Testimonials from "@/components/product/mobile-development_old/Testimonials";
import Comparison from "@/components/product/mobile-development_old/Comparison";
import Pricing from "@/components/product/mobile-development_old/Pricing";
import FAQ from "@/components/product/mobile-development_old/FAQ";
import FinalCTA from "@/components/product/mobile-development_old/FinalCTA";

import type { ProductPageData } from "@/types/product";
import TrackProductView from "@/components/analytics/TrackProductView";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { slug: "mobile-development" },
    { slug: "web-development" },
    { slug: "ai-automation" },
  ];
}

export const PRODUCTS: Record<string, ProductPageData> = {
  "mobile-development": {
    slug: "mobile-development",
    title:
      "Aplicativos mobile que parecem magia, mas foram desenhados para performance.",
    subtitle:
      "Da ideia ao app publicado, a LHWEB projeta, desenvolve e otimiza aplicativos focados em retenção, conversão e escala — sem fricção para o usuário e sem caos para o seu time.",
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
        name: "Pag Si",
        role: "Agência Digital",
        company: "Itália",
        result: "-45% tempo operacional",
        quote:
          "Fluxos automatizados reduziram trabalho manual e tornaram tudo mais rápido para os clientes finais.",
      },
      {
        id: "retail-labs",
        name: "AI Retail Labs",
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
        answer: "Sim. IA para recomendações, automação e personalização.",
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
  "web-development": {
    slug: "web-development",
    title: "Web experiences rápidas, seguras e prontas para converter.",
    subtitle:
      "Sites, portais e plataformas web com foco em performance, SEO e acessibilidade — construídos para escalar e vender.",
    heroLabel: "Web Platform Experience",
    heroBenefit: "Alta conversão, SEO técnico e escalabilidade.",
    tags: [
      { label: "Next.js & Edge" },
      { label: "Design System" },
      { label: "SEO & Performance" },
    ],
    primaryCta: "Planejar meu projeto web",
    secondaryCta: "Ver portfólio",
    trustBar:
      "Webapps entregues para e-commerce, SaaS e enterprise em 5+ países.",
    valueProps: [
      {
        id: "seo",
        title: "SEO e Core Web Vitals no topo.",
        description:
          "Arquitetura e otimizações para LCP, CLS e TTFB em níveis de referência.",
        icon: "search",
      },
      {
        id: "design-system",
        title: "Design System reutilizável.",
        description:
          "Componentes consistentes, acessíveis e rápidos para manter o produto evoluindo.",
        icon: "palette",
      },
      {
        id: "edge",
        title: "Edge & caching inteligentes.",
        description:
          "Entrega global com Vercel/Edge Functions para latência mínima.",
        icon: "server",
      },
      {
        id: "analytics",
        title: "Métricas claras de negócio.",
        description:
          "Eventos, funnels e dashboards para acompanhar conversão e retenção.",
        icon: "bar-chart",
      },
    ],
    features: [
      {
        id: "architecture",
        title: "Arquitetura moderna",
        description:
          "Next.js 14, turbopack e edge-ready para crescer sem gargalos.",
        highlight: "Performance e segurança.",
      },
      {
        id: "ux-ui",
        title: "UX/UI orientado a conversão",
        description:
          "Fluxos claros, CTAs fortes e micro-interações que guiam o usuário.",
        highlight: "Conversão em primeiro lugar.",
      },
      {
        id: "cms",
        title: "Headless CMS & integrações",
        description:
          "Conteúdo gerenciável, APIs unificadas e automações de marketing.",
        highlight: "Escala sem complicação.",
      },
      {
        id: "a11y",
        title: "Acessibilidade real",
        description:
          "Padrões WCAG, navegação por teclado e otimização para leitores de tela.",
        highlight: "Inclusivo por padrão.",
      },
      {
        id: "observability",
        title: "Observabilidade completa",
        description:
          "Logs, métricas e alertas para manter a operação saudável.",
        highlight: "Menos incidentes, mais previsibilidade.",
      },
      {
        id: "rollouts",
        title: "Rollouts seguros",
        description:
          "Feature flags, testes A/B e monitoramento contínuo após deploy.",
        highlight: "Lançamentos sem risco.",
      },
    ],
    images: [
      { id: "web-hero", alt: "Landing page moderna com charts" },
      { id: "web-dashboard", alt: "Dashboard web com métricas" },
      { id: "web-components", alt: "Biblioteca de componentes web" },
    ],
    testimonials: [
      {
        id: "saas",
        name: "SaaS B2B",
        role: "Chief Product Officer",
        company: "Europa",
        result: "+38% conversão orgânica",
        quote:
          "A nova experiência web trouxe SEO técnico impecável e um ganho direto em leads qualificados.",
      },
      {
        id: "fintech",
        name: "Fintech",
        role: "Head de Marketing",
        company: "Brasil",
        result: "+24% velocidade de carregamento",
        quote:
          "Performance e consistência visual aumentaram a confiança do usuário em todas as páginas.",
      },
    ],
    comparison: {
      before: {
        title: "Antes da LHWEB",
        items: [
          "Páginas lentas e mal indexadas.",
          "Layout inconsistente entre squads.",
          "Dependência de engenharia para publicar conteúdo.",
          "Pouca visibilidade de métricas.",
        ],
      },
      after: {
        title: "Depois da LHWEB",
        items: [
          "Core Web Vitals no verde.",
          "Design System unificado.",
          "CMS e fluxos automatizados.",
          "Dashboards de conversão e growth.",
        ],
      },
    },
    pricing: [
      {
        id: "landing",
        name: "Landing Pro",
        description: "Landing page premium otimizada para conversão.",
        price: "A partir de €6k",
        priceNote: "4 a 6 semanas",
        features: ["UX/UI", "SEO técnico", "Setup de analytics", "Deploy edge"],
        ctaLabel: "Planejar landing",
      },
      {
        id: "platform",
        name: "Web Platform",
        highlight: true,
        description: "Plataformas e portais com conteúdo dinâmico.",
        price: "Sob consulta",
        priceNote: "Projeto completo",
        features: [
          "Arquitetura Next.js",
          "Design System",
          "Headless CMS",
          "A/B tests e monitoramento",
        ],
        ctaLabel: "Falar com especialista",
      },
    ],
    faq: [
      {
        id: "cms",
        question: "Vocês trabalham com qual CMS?",
        answer:
          "Headless CMS (ex: Sanity, Contentful, Strapi) ou o que você já usa.",
      },
      {
        id: "seo",
        question: "O projeto já vem otimizado para SEO?",
        answer: "Sim, incluímos SEO técnico, sitemaps, schema e performance.",
      },
      {
        id: "handoff",
        question: "Entrega inclui design system?",
        answer: "Sim, bibliotecas de componentes reutilizáveis e documentadas.",
      },
    ],
    finalCta: {
      title: "Vamos acelerar seu produto web?",
      subtitle:
        "Conte seu objetivo e desenhamos um plano claro com prazos, stack e roadmap.",
      primaryCta: "Iniciar meu projeto web",
      secondaryCta: "Ver cases",
      trustNote: "Projetos entregues para SaaS, fintechs e e-commerce.",
    },
  },
  "ai-automation": {
    slug: "ai-automation",
    title: "Soluções de IA e automação para escalar operação e receita.",
    subtitle:
      "Chatbots, copilots internos, automações de backoffice e integrações de dados com IA — desenhados para reduzir custo e aumentar velocidade.",
    heroLabel: "AI & Automation Experience",
    heroBenefit: "Automação ponta a ponta com segurança e governança.",
    tags: [
      { label: "LLMs & LangChain" },
      { label: "Process Automation" },
      { label: "Data & Analytics" },
    ],
    primaryCta: "Explorar automação com IA",
    secondaryCta: "Ver casos de uso",
    trustBar: "Projetos entregues para operações em LATAM, EUA e Europa.",
    valueProps: [
      {
        id: "copilots",
        title: "Copilots para times internos.",
        description:
          "Assistentes que pesquisam dados, geram respostas e executam ações com segurança.",
        icon: "bot",
      },
      {
        id: "workflows",
        title: "Workflows automatizados.",
        description:
          "Integrações entre CRM, billing, suporte e analytics para cortar trabalho manual.",
        icon: "workflow",
      },
      {
        id: "data",
        title: "Dados governados e rastreáveis.",
        description:
          "Observabilidade, logs e controles de acesso para IA com compliance.",
        icon: "shield",
      },
      {
        id: "roi",
        title: "ROI em semanas, não meses.",
        description:
          "Pilotos rápidos, métricas claras de ganho de tempo e redução de custo.",
        icon: "trending-up",
      },
    ],
    features: [
      {
        id: "discovery",
        title: "IA Discovery",
        description:
          "Mapeamos processos e priorizamos onde IA gera mais impacto.",
        highlight: "Quick wins em semanas.",
      },
      {
        id: "chatbots",
        title: "Chatbots e copilots",
        description:
          "Assistentes para suporte, vendas ou operação conectados às suas fontes de dados.",
        highlight: "Contexto real do negócio.",
      },
      {
        id: "automation",
        title: "Automação de backoffice",
        description:
          "Workflows em Make/Zapier/temporal + integrações customizadas.",
        highlight: "Menos trabalho manual.",
      },
      {
        id: "observability",
        title: "Observabilidade de IA",
        description:
          "Monitoramento de prompts, custos e qualidade das respostas.",
        highlight: "Governança e segurança.",
      },
      {
        id: "experiments",
        title: "Experimentação contínua",
        description:
          "AB tests, feedback loops e afinamento de prompts/modelos.",
        highlight: "Melhoria constante.",
      },
    ],
    images: [
      { id: "ai-dashboard", alt: "Dashboard de IA e automação" },
      { id: "ai-chat", alt: "Interface de chatbot com IA" },
      { id: "ai-workflow", alt: "Workflow automatizado com IA" },
    ],
    testimonials: [
      {
        id: "support",
        name: "Suporte Global",
        role: "Head of CS",
        company: "LATAM",
        result: "-55% tempo por ticket",
        quote:
          "O copiloto entende contexto, consulta dados e responde clientes com qualidade superior.",
      },
      {
        id: "ops",
        name: "Operações",
        role: "COO",
        company: "EUA",
        result: "+40% velocidade em processos",
        quote:
          "Automatizamos reconciliações e notificações. O time agora foca em decisões, não em tarefas repetitivas.",
      },
    ],
    comparison: {
      before: {
        title: "Antes da LHWEB",
        items: [
          "Processos manuais e desconectados.",
          "Decisões sem dados em tempo real.",
          "Custos altos de operação.",
          "Time sobrecarregado com tarefas repetitivas.",
        ],
      },
      after: {
        title: "Depois da LHWEB",
        items: [
          "Workflows automatizados ponta a ponta.",
          "Dados centralizados e acessíveis via copilots.",
          "Redução de custo e aumento de velocidade.",
          "Equipe focada em estratégia e crescimento.",
        ],
      },
    },
    pricing: [
      {
        id: "pilot",
        name: "AI Pilot",
        description: "Prova de conceito com caso de uso prioritário.",
        price: "A partir de €7k",
        priceNote: "4 a 6 semanas",
        features: [
          "Discovery e mapeamento de dados",
          "Copilot ou automação prioritária",
          "Monitoramento básico",
          "Treinamento do time",
        ],
        ctaLabel: "Iniciar piloto",
      },
      {
        id: "scale",
        name: "Automation Scale",
        highlight: true,
        description: "Expansão de automações e copilots com governança.",
        price: "Sob consulta",
        priceNote: "Modelo mensal",
        features: [
          "Múltiplos casos de uso",
          "Observabilidade e guardrails",
          "Suporte contínuo",
          "AB tests e otimizações",
        ],
        ctaLabel: "Planejar rollout",
      },
    ],
    faq: [
      {
        id: "privacy",
        question: "Como vocês tratam dados sensíveis?",
        answer:
          "Aplicamos controle de acesso, logging, anonimização quando necessário e políticas de retenção.",
      },
      {
        id: "models",
        question: "Quais modelos de IA são usados?",
        answer:
          "Selecionamos provedores (OpenAI, Anthropic, Azure, etc.) conforme caso de uso, custo e compliance.",
      },
      {
        id: "integration",
        question: "Vocês integram com nossos sistemas internos?",
        answer:
          "Sim. Conectamos a CRMs, ERPs, billing, bancos de dados e APIs proprietárias.",
      },
    ],
    finalCta: {
      title: "Pronto para automatizar com IA?",
      subtitle:
        "Conte o processo que mais consome tempo hoje. Em 24h sugerimos um piloto com ROI claro.",
      primaryCta: "Explorar automação",
      secondaryCta: "Ver casos",
      trustNote: "Governança e segurança incluídas desde o primeiro piloto.",
    },
  },
};

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = PRODUCTS[params.slug];

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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS[params.slug];

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24 md:px-6 lg:px-8 lg:pt-28">
        <TrackProductView slug={product.slug} name={product.title} />
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
