export interface StackItem {
  name: string
  category: string
}

export const STACK_ITEMS: StackItem[] = [
  { name: 'TypeScript', category: 'lang' },
  { name: 'Next.js', category: 'framework' },
  { name: 'React', category: 'framework' },
  { name: 'Node.js', category: 'runtime' },
  { name: 'Python', category: 'lang' },
  { name: 'PostgreSQL', category: 'db' },
  { name: 'Redis', category: 'db' },
  { name: 'Supabase', category: 'platform' },
  { name: 'Prisma', category: 'orm' },
  { name: 'tRPC', category: 'api' },
  { name: 'GraphQL', category: 'api' },
  { name: 'FastAPI', category: 'framework' },
  { name: 'Docker', category: 'infra' },
  { name: 'Terraform', category: 'infra' },
  { name: 'AWS', category: 'cloud' },
  { name: 'Vercel', category: 'platform' },
  { name: 'Stripe', category: 'payments' },
  { name: 'RabbitMQ', category: 'messaging' },
  { name: 'Tailwind CSS', category: 'css' },
  { name: 'Framer Motion', category: 'animation' },
]

export interface StackLayer {
  id: string
  title: string
  command: string
  description: string
  items: string[]
}

export const STACK_LAYERS: StackLayer[] = [
  {
    id: 'interface',
    title: 'Interface',
    command: 'render.interface',
    description:
      'Onde produto vira fluxo: telas rapidas, acessiveis e faceis de evoluir sem refazer a base.',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'application',
    title: 'Aplicacao',
    command: 'orchestrate.domain',
    description:
      'Regras de negocio, APIs, filas e integracoes organizadas para crescer sem virar emaranhado.',
    items: ['Node.js', 'NestJS', 'tRPC', 'GraphQL', 'FastAPI'],
  },
  {
    id: 'data',
    title: 'Dados',
    command: 'persist.truth',
    description:
      'Modelagem, consistencia e performance para o sistema confiar no proprio estado.',
    items: ['PostgreSQL', 'Redis', 'Prisma', 'Supabase'],
  },
  {
    id: 'infra',
    title: 'Infra',
    command: 'ship.reliably',
    description:
      'Deploy, ambientes, custos e automacao para publicar sem transformar producao em aposta.',
    items: ['Docker', 'AWS', 'Vercel', 'Terraform'],
  },
  {
    id: 'observability',
    title: 'Observabilidade',
    command: 'watch.runtime',
    description:
      'Logs, metricas e alertas para descobrir problema antes do cliente virar monitor humano.',
    items: ['Logs', 'Metrics', 'Alerts', 'Tracing'],
  },
]
