export interface Service {
  id: string
  tag: string
  title: string
  description: string
  items: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'saas',
    tag: '01',
    title: 'Produtos SaaS',
    description:
      'Arquitetura multi-tenant, billing integrado e painéis que escalam sem refatoração.',
    items: [
      'Autenticação e controle de acesso granular',
      'Integração Stripe / Asaas',
      'Onboarding e retenção',
      'Dashboards em tempo real',
    ],
  },
  {
    id: 'apis',
    tag: '02',
    title: 'APIs & Integrações',
    description:
      'REST e GraphQL com documentação gerada, versionamento e observabilidade desde o dia 1.',
    items: [
      'Design RESTful / GraphQL',
      'Rate limiting e autenticação JWT/OAuth',
      'Webhooks e filas de mensagens',
      'Monitoramento e alertas',
    ],
  },
  {
    id: 'web-apps',
    tag: '03',
    title: 'Web Apps',
    description:
      'Aplicações críticas que precisam de performance real, não de promessas de apresentação.',
    items: [
      'ERPs e sistemas internos',
      'Portais B2B e extranets',
      'Migração e refatoração de legados',
      'Core Web Vitals < 2.5s LCP',
    ],
  },
  {
    id: 'consultoria',
    tag: '04',
    title: 'Consultoria Técnica',
    description:
      'Diagnóstico, arquitetura e revisão técnica para decidir melhor antes de gastar meses construindo.',
    items: [
      'Code review e plano de refatoração',
      'Avaliação de arquitetura e custos',
      'Roadmap técnico com critérios de aceite',
      'Handoff para time interno',
    ],
  },
]
