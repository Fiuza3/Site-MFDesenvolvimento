import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES } from '@/content/services'
import { SITE } from '@/lib/constants'

const SERVICE_META: Record<string, { title: string; description: string; h1: string }> = {
  saas: {
    title: 'Desenvolvimento de SaaS sob medida — BH',
    description:
      'Criação de produtos SaaS multi-tenant em Belo Horizonte/MG. Arquitetura escalável, billing Stripe/Asaas, dashboards em tempo real. Desenvolvedor full stack sênior PJ.',
    h1: 'Desenvolvimento de Produtos SaaS sob Medida em Belo Horizonte',
  },
  apis: {
    title: 'Desenvolvimento de API REST — Integrações e Webhooks',
    description:
      'APIs REST e GraphQL com documentação, versionamento e observabilidade. Rate limiting, JWT/OAuth, webhooks e filas. Desenvolvedor Node.js/NestJS PJ em BH.',
    h1: 'APIs REST & Integrações para Startups e Empresas',
  },
  'web-apps': {
    title: 'Desenvolvimento de Web Apps — ERPs, Portais B2B, Sistemas',
    description:
      'Web apps críticos com performance real: ERPs, portais B2B, extranets e migração de legados. Core Web Vitals < 2.5s LCP. Desenvolvedor full stack sênior em BH.',
    h1: 'Desenvolvimento de Web Apps de Alta Performance',
  },
  consultoria: {
    title: 'Consultoria Técnica em Software — Arquitetura e Revisão',
    description:
      'Diagnóstico, arquitetura e code review para founders e CTOs. Roadmap técnico com critérios de aceite antes de gastar meses construindo. Belo Horizonte/MG.',
    h1: 'Consultoria Técnica em Software: Diagnóstico Antes do Código',
  },
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = SERVICE_META[slug]
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/servicos/${slug}` },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `${SITE.url}/servicos/${slug}`,
      title: meta.title,
      description: meta.description,
      siteName: SITE.name,
    },
  }
}

const SERVICE_CONTENT: Record<string, {
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ q: string; a: string }>
}> = {
  saas: {
    intro:
      'Construir um SaaS do zero é diferente de construir um site ou um sistema interno. O erro mais comum é tratar como se fosse. A arquitetura multi-tenant exige isolamento de dados entre clientes, um modelo de billing que não quebre na upgrade, e painéis que escalam conforme o número de usuários cresce — sem refatoração de emergência às 2h da manhã.',
    sections: [
      { heading: 'O que entrego em um projeto SaaS', body: 'Autenticação e controle de acesso granular com roles e permissões por tenant. Integração com Stripe ou Asaas para billing recorrente, upgrades e cancelamentos. Onboarding com fluxo de trial e ativação. Dashboards em tempo real com WebSocket ou polling inteligente. Deploy em VPS com Docker, CI/CD e monitoramento desde o dia 1.' },
      { heading: 'Por que "diagnóstico antes do código"', body: 'Antes de abrir o editor, entendo o problema real: qual é o fluxo crítico do negócio, onde está o maior risco técnico, o que precisa funcionar no MVP versus o que pode esperar. Isso evita meses de retrabalho em funcionalidades que o usuário final nunca vai usar.' },
      { heading: 'Stack e infraestrutura', body: 'Next.js 16 no frontend, NestJS ou Node.js no backend, PostgreSQL com índices bem pensados, Redis para cache e sessão, RabbitMQ ou BullMQ para filas, Docker + Nginx + VPS Linux para deploy. Monitoramento com logs estruturados e alertas desde o primeiro deploy.' },
      { heading: 'Para quem faz sentido contratar', body: 'Founders de startups em fase de MVP ou pós-validação que precisam de um dev sênior PJ para construir o produto sem contratar uma equipe inteira. CTOs de empresas médias que precisam de reforço técnico especializado em SaaS. Donos de negócio que já têm um sistema legado e querem evoluí-lo para modelo SaaS.' },
    ],
    faqs: [
      { q: 'Quanto tempo leva para desenvolver um MVP SaaS?', a: 'Depende do escopo. Um MVP focado em 1-2 fluxos críticos pode ser entregue em 6 a 10 semanas. Escopos maiores, como billing completo + painel de admin + API pública, costumam levar 3 a 5 meses. O diagnóstico inicial define isso com precisão.' },
      { q: 'Você trabalha com contrato PJ e emite NFS-e?', a: 'Sim. Trabalho exclusivamente como PJ com emissão de NFS-e. Contratos por projeto ou por hora, com escopo definido antes de começar.' },
      { q: 'É possível trabalhar em um SaaS que já existe?', a: 'Sim. Faço revisão técnica do código atual, identifico gargalos de arquitetura, e construo novas funcionalidades ou refatoro partes críticas sem parar o produto.' },
      { q: 'Você faz deploy e infraestrutura também?', a: 'Sim. Configuro VPS Linux, Docker, Nginx, CI/CD (GitHub Actions ou similar), certificados SSL, backups automáticos e monitoramento. O produto fica em produção, não só no localhost.' },
    ],
  },
  apis: {
    intro:
      'Uma API mal projetada cria débito técnico que escala junto com o crescimento do produto. Rate limiting ausente resulta em abuso. Falta de versionamento quebra integrações de parceiros. Ausência de observabilidade significa descobrir problemas pelo cliente, não pelo monitoramento. A abordagem correta começa pelo contrato da API antes da primeira linha de código.',
    sections: [
      { heading: 'O que entrego em um projeto de API', body: 'Design RESTful ou GraphQL com documentação gerada automaticamente (Swagger/OpenAPI). Autenticação JWT ou OAuth 2.0. Rate limiting e throttling. Webhooks com retry automático e fila de mensagens (RabbitMQ/BullMQ). Versionamento de API para não quebrar integrações existentes. Monitoramento com logs estruturados e alertas.' },
      { heading: 'Integrações com terceiros', body: 'Gateways de pagamento (Stripe, Asaas, PagSeguro), emissão de NFS-e para 60+ municípios brasileiros, portais imobiliários, sistemas de ERP legados, APIs fiscais e Correios. Cada integração tem circuit breaker e fallback para não travar o sistema principal quando o serviço externo cai.' },
      { heading: 'Observabilidade desde o dia 1', body: 'Logs estruturados em JSON, rastreamento de requisições com correlation ID, métricas de latência por endpoint, alertas para erros 5xx e timeouts. Você vai saber o que está acontecendo na API antes que o usuário final perceba.' },
      { heading: 'Para quem faz sentido', body: 'Startups que precisam de uma API pública para parceiros ou integradores. Empresas com sistemas legados que precisam de uma camada de API moderna por cima. Times de produto que precisam de um back-end sólido para um app mobile ou SPA.' },
    ],
    faqs: [
      { q: 'REST ou GraphQL: qual você recomenda?', a: 'Depende do caso de uso. REST é mais simples para integrações com parceiros externos. GraphQL brilha quando múltiplos clientes (web, mobile, dashboard) consomem dados com formatos diferentes. O diagnóstico inicial define qual faz mais sentido para o seu produto.' },
      { q: 'Quanto custa integrar um gateway de pagamento?', a: 'Uma integração básica com Stripe (checkout, webhooks de pagamento confirmado/recusado, portal do cliente) leva de 1 a 2 semanas. Billing recorrente com upgrades, downgrades e pro-rata leva de 3 a 5 semanas dependendo da complexidade.' },
      { q: 'É possível migrar uma API legada sem parar o sistema?', a: 'Sim. Uso a técnica de strangler fig: construo a nova API em paralelo, migro endpoints gradualmente e mantenho o legado funcionando até a migração estar completa e validada.' },
      { q: 'Como funciona o monitoramento pós-entrega?', a: 'Configuro alertas no Sentry ou similar, dashboards de métricas, e um runbook básico de operação. Para suporte contínuo pós-entrega, posso oferecer contrato mensal de manutenção.' },
    ],
  },
  'web-apps': {
    intro:
      'Performance real não é uma promessa de apresentação. Um ERP que trava com 50 usuários simultâneos, um portal B2B com LCP de 8 segundos, ou um sistema de gestão que perde dados em pico de carga são problemas de arquitetura, não de front-end. A solução começa pelo diagnóstico correto do gargalo.',
    sections: [
      { heading: 'Tipos de projeto que executo', body: 'ERPs e sistemas internos de gestão. Portais B2B e extranets para parceiros e distribuidores. Migração e refatoração de sistemas legados (PHP, jQuery, sistemas desktop para web). Dashboards administrativos com dados em tempo real. Aplicações com Core Web Vitals < 2.5s de LCP e < 100ms de INP.' },
      { heading: 'Abordagem técnica', body: 'Next.js 16 com App Router para aplicações React. Vue 3 com Composition API para sistemas internos. Server Components para eliminar JavaScript desnecessário no cliente. Otimização de banco de dados com índices, query analysis e connection pooling. Caching estratégico com Redis para dados que não mudam a cada requisição.' },
      { heading: 'Migração de legados', body: 'Sistemas legados em PHP, jQuery ou desktop não precisam ser reescritos do zero. O caminho mais seguro é uma migração incremental: identificar os módulos com maior impacto no negócio, reescrever primeiro, validar com usuários reais, e continuar módulo a módulo. Isso garante continuidade operacional durante a migração.' },
      { heading: 'Para quem faz sentido', body: 'Empresas com sistemas legados que estão limitando o crescimento. Startups que precisam de um sistema interno robusto sem contratar um time inteiro. Indústrias e distribuidores que precisam de portais B2B para parceiros.' },
    ],
    faqs: [
      { q: 'Qual é a diferença entre um web app e um site?', a: 'Um site apresenta conteúdo. Um web app tem estado, lógica de negócio, autenticação, e geralmente manipula dados. ERPs, CRMs, portais B2B e dashboards são web apps. A complexidade técnica é diferente e o orçamento reflete isso.' },
      { q: 'Como você garante performance com muitos usuários simultâneos?', a: 'Combinando: banco de dados com índices corretos e queries otimizadas, cache Redis para reduzir leitura do banco, connection pooling, e infraestrutura dimensionada para o pico esperado. Monitoro métricas reais em produção, não só em ambiente de desenvolvimento.' },
      { q: 'Quanto tempo leva migrar um sistema legado?', a: 'Depende do tamanho e complexidade. Um módulo específico (ex: gestão de pedidos) pode levar de 4 a 8 semanas. Um sistema completo pode levar de 3 a 12 meses dependendo do escopo. O diagnóstico inicial mapeia o esforço por módulo.' },
      { q: 'Você faz suporte pós-entrega?', a: 'Sim. Ofereço contratos mensais de manutenção e suporte técnico após a entrega do projeto. O sistema vai para produção com monitoramento configurado e documentação básica de operação.' },
    ],
  },
  consultoria: {
    intro:
      'O erro mais caro em desenvolvimento de software é construir a solução errada. Um mês de desenvolvimento baseado em premissas incorretas custa mais do que uma semana de diagnóstico correto. Consultoria técnica não é sobre dar uma opinião — é sobre reduzir o risco da próxima decisão técnica importante.',
    sections: [
      { heading: 'O que a consultoria cobre', body: 'Code review com plano de refatoração priorizado. Avaliação de arquitetura atual e identificação de gargalos. Análise de custos de infraestrutura e otimização. Roadmap técnico com critérios de aceite por entrega. Definição de stack para novos projetos. Handoff para time interno com documentação.' },
      { heading: 'Formato de trabalho', body: 'Reunião de diagnóstico de 1h (gratuita para projetos maiores). Análise do código e infraestrutura atual. Entrega de relatório técnico com findings, prioridades e recomendações. Sessões de acompanhamento para implementação das recomendações se necessário.' },
      { heading: 'Quando contratar consultoria', body: 'Quando o time está travado em uma decisão arquitetural importante. Quando o sistema está com problemas de performance mas a causa não está clara. Quando há intenção de migrar stack ou escalar um produto existente. Quando um investidor ou parceiro pediu uma revisão técnica independente do produto.' },
      { heading: 'Entregável', body: 'Relatório técnico com: diagnóstico do estado atual, lista de problemas ordenada por impacto, recomendações com custo estimado de implementação, e roadmap com critérios de aceite claros. Sem jargão desnecessário, direto ao ponto.' },
    ],
    faqs: [
      { q: 'Quanto custa uma consultoria técnica?', a: 'Cobro por hora ou por projeto. Para um diagnóstico com relatório escrito, o escopo é definido na reunião inicial gratuita. Entre em contato pelo WhatsApp para discutir o seu caso específico.' },
      { q: 'Você faz consultoria para times que já têm desenvolvedores?', a: 'Sim. Atuo como consultor externo que olha o código e a arquitetura com olhos frescos, sem viés interno. Frequentemente identifico problemas que o time interno não vê por estar muito perto do código.' },
      { q: 'Você pode ajudar a definir a stack para um novo produto?', a: 'Sim. Analiso os requisitos do produto, a capacidade do time, o orçamento de infraestrutura e o roadmap de crescimento esperado, e recomendo a stack mais adequada com justificativa técnica.' },
      { q: 'A consultoria inclui implementação?', a: 'A consultoria é separada da implementação. Após a entrega do relatório, posso executar as recomendações como projeto de desenvolvimento separado, ou o time interno pode executar com base no roadmap entregue.' },
    ],
  },
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.id === slug)
  if (!service) notFound()

  const meta = SERVICE_META[slug]
  const content = SERVICE_CONTENT[slug]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${SITE.url}/servicos` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE.url}/servicos/${slug}` },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${SITE.url}/servicos/${slug}`,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    serviceType: service.title,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="px-5 py-8 sm:px-8 lg:px-10 2xl:px-14 border-b border-line">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-xs text-gray-text">
            <li><Link href="/" className="hover:text-cyan transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/servicos" className="hover:text-cyan transition-colors">Serviços</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground truncate max-w-[200px]" aria-current="page">{service.title}</li>
          </ol>
        </nav>
      </div>

      <div className="px-5 py-20 sm:px-8 lg:px-10 2xl:px-14">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan mb-6">{service.tag}</p>
        <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.88] tracking-tighter mb-8 max-w-5xl">
          {meta.h1}
        </h1>
        <p className="text-lg leading-relaxed text-gray-text max-w-3xl mb-20">{content.intro}</p>

        <div className="grid gap-8 mb-20">
          {content.sections.map((section) => (
            <section key={section.heading} className="rounded border border-line bg-surface/80 p-6 lg:p-8">
              <h2 className="text-xl font-black tracking-tight text-foreground mb-4">{section.heading}</h2>
              <p className="text-base leading-relaxed text-gray-text">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-black tracking-tight text-foreground mb-8">Perguntas frequentes</h2>
          <div className="grid gap-4">
            {content.faqs.map((faq) => (
              <div key={faq.q} className="rounded border border-line bg-surface/80 p-5 lg:p-6">
                <h3 className="font-mono text-sm font-bold text-foreground mb-3">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-text">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded border border-cyan/30 bg-background/60 p-6 lg:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan mb-4">próximo passo</p>
          <h2 className="text-2xl font-black tracking-tight text-foreground mb-4">Pronto para começar?</h2>
          <p className="text-base text-gray-text mb-6">Entre em contato pelo WhatsApp para uma conversa rápida sobre o seu projeto.</p>
          <a
            href="https://wa.me/5531972379038"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded border border-cyan bg-cyan px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background transition-colors hover:bg-transparent hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
