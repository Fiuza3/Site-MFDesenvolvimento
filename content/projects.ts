export type ProjectCategory = 'SaaS' | 'API' | 'Sistema'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  year: number
  tags: string[]
  highlight?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'plataforma-rh',
    title: 'Plataforma de RH',
    description:
      'SaaS multi-tenant para gestão de ponto, folha e benefícios. 12k usuários ativos, latência < 80ms.',
    category: 'SaaS',
    year: 2024,
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    highlight: true,
  },
  {
    id: 'api-fiscal',
    title: 'API Fiscal Unificada',
    description:
      'Gateway para emissão de NFS-e em 60+ municípios brasileiros com retry automático e fallback.',
    category: 'API',
    year: 2023,
    tags: ['Node.js', 'RabbitMQ', 'Redis'],
    highlight: true,
  },
  {
    id: 'erp-logistica',
    title: 'ERP de Logística',
    description:
      'Sistema de rastreio e roteirização para transportadora com 200+ veículos.',
    category: 'Sistema',
    year: 2023,
    tags: ['React', 'Python', 'PostgreSQL'],
  },
  {
    id: 'crm-saas',
    title: 'CRM para Corretoras',
    description:
      'Pipeline de vendas, automação de follow-up e integração com portais imobiliários.',
    category: 'SaaS',
    year: 2024,
    tags: ['Next.js', 'Supabase', 'Resend'],
  },
  {
    id: 'data-api',
    title: 'API de Dados Financeiros',
    description:
      'Agregação e normalização de dados de múltiplas corretoras com cache inteligente.',
    category: 'API',
    year: 2022,
    tags: ['FastAPI', 'Redis', 'Celery'],
  },
  {
    id: 'portal-b2b',
    title: 'Portal B2B Industrial',
    description:
      'Extranet para gestão de pedidos e contratos entre indústria e distribuidores.',
    category: 'Sistema',
    year: 2022,
    tags: ['Next.js', 'tRPC', 'PostgreSQL'],
  },
]

export const PROJECT_CATEGORIES: ProjectCategory[] = ['SaaS', 'API', 'Sistema']
