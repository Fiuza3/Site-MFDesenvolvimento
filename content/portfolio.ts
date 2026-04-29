export const PORTFOLIO_PROFILE = {
  name: 'Marcus Fiuza',
  headline: 'CEO & Founder da MF Desenvolvimento',
  role: 'CEO & Founder | Full Stack Developer | Vue 3, Node.js, TypeScript',
  location: 'Brasil',
  summary:
    'Desenvolvedor Full Stack com +3 anos de experiência real em produto, ERP, APIs, freelances e infraestrutura. Especializado em Vue 3, Node.js e TypeScript, atua do entendimento do problema até a entrega funcional: frontend, backend, banco de dados, Docker, Linux, VPS, DNS, filas, cache, manutenção e integrações. É o fundador da MF Desenvolvimento e conduz a empresa em fase de crescimento, com mentalidade prática: resolver macro problemas, orientar decisões técnicas e entregar sistemas úteis sem inflar escopo.',
  contact: {
    phone: '+55 31 97237-9038',
    email: 'devfiuza@gmail.com',
    linkedin: 'www.linkedin.com/in/devfiuza',
    website: 'www.mfdesenvolvimento.online',
  },
  competencies: [
    'Vue 3',
    'TypeScript',
    'Node.js',
    'Express.js',
    'Prisma ORM',
    'MySQL',
    'Docker',
    'Linux',
    'VPS',
    'APIs RESTful',
    'JWT',
    'React.js',
    'CI/CD',
    'SEO técnico',
    'SQL',
    'Redis',
    'Filas',
    'Nginx',
    'AWS',
    'Observabilidade',
  ],
  languages: [
    { name: 'Português', level: 'Nativo ou bilíngue' },
    { name: 'Inglês', level: 'Proficiência profissional limitada' },
  ],
  certifications: [
    'Javascript Fundamentals',
    'Responsive Web Design',
    'Curso de JavaScript e TypeScript do básico ao avançado JS/TS',
    'JavaScript',
    'Curso Vue JS 2 - O Guia Completo (incl. Vue Router & Vuex)',
  ],
  learningTracks: [
    'AWS Skill Builder - Cloud Practitioner Essentials',
    'AWS Educate - Cloud Computing Fundamentals',
    'Microsoft Learn - Azure Fundamentals',
    'Google Cloud Skills Boost - Introduction to Generative AI',
    'DeepLearning.AI - ChatGPT Prompt Engineering for Developers',
    'Harvard CS50x - Introduction to Computer Science',
    'freeCodeCamp - JavaScript Algorithms and Data Structures',
    'freeCodeCamp - Responsive Web Design',
  ],
} as const

export const PORTFOLIO_NUMBERS = [
  { value: '+3', label: 'anos de experiência prática em tecnologia' },
  { value: '10+', label: 'freelances, ajustes, APIs e entregas técnicas acumuladas' },
  { value: '4', label: 'frentes principais na MF: SMS, números virtuais, proxies e sites' },
  { value: '2', label: 'produtos próprios em validação e evolução contínua' },
  { value: '1', label: 'fundador técnico cuidando de produto, código e entrega' },
] as const

export const PORTFOLIO_MARKET_STACK = [
  {
    group: 'Frontend moderno',
    items: ['Vue 3', 'React.js', 'TypeScript', 'HTML5', 'CSS responsivo', 'SEO técnico'],
  },
  {
    group: 'Backend e APIs',
    items: ['Node.js', 'Express.js', 'APIs RESTful', 'JWT', 'Prisma ORM', 'Integrações', 'Filas', 'Rate limiting'],
  },
  {
    group: 'Dados e produto',
    items: ['MySQL', 'SQL', 'Modelagem relacional', 'Índices', 'Cache', 'Relatórios', 'Controle de saldo'],
  },
  {
    group: 'Infraestrutura',
    items: ['Docker', 'Docker Compose', 'Linux', 'VPS', 'DNS', 'Nginx', 'Load balance', 'AWS', 'CI/CD'],
  },
  {
    group: 'Escala e operação',
    items: ['Redis', 'BullMQ', 'SQS', 'Logs', 'Health checks', 'Retries', 'Backups', 'Manutenção'],
  },
] as const

export const PORTFOLIO_RECOGNITION = [
  'Resolveu problemas macro em freelances: fluxo confuso, API faltando, painel travado, deploy quebrado e integração sem dono.',
  'Criou APIs, integrações e automações pensando em fluxo de dados, autenticação, banco, cache e falhas possíveis.',
  'Estuda e aplica fundamentos que fazem sistema aguentar usuários: fila, retry, rate limit, cache, índices, logs, backups e manutenção.',
  'Já trabalhou com VPS, Docker, DNS, deploy e Nginx, evoluindo para arquitetura com load balance, orquestração de containers e AWS.',
  'Atuou em ERP corporativo, SQL, integração com legado e suporte técnico a clientes internos, aprendendo na marra como produção quebra.',
  'Faz consultoria prática: entende o cenário, aponta gargalos, resume caminhos e ajuda o cliente a decidir o próximo passo técnico.',
] as const

export const PORTFOLIO_EXPERIENCE = [
  {
    company: 'MF Desenvolvimento',
    total: '9 meses',
    roles: [
      {
        title: 'Desenvolvedor Full-Stack - SaaS de SMS Marketing TotalSMS',
        period: 'março de 2026 - presente',
        duration: '2 meses',
        location: 'Belo Horizonte, MG',
        description:
          'Atua no desenvolvimento de uma plataforma SaaS para envio de SMS em massa, trabalhando em módulos essenciais como painel do cliente, criação de campanhas, agendamento, histórico de envios, relatórios, painel administrativo, controle de saldo, dashboard financeiro, integrações de pagamento e filtragem de números para higienização de listas. A evolução técnica considera fila de processamento, cache, controle de concorrência, manutenção e estrutura para suportar mais usuários sem travar a operação.',
        stack: ['Vue 3', 'TypeScript', 'Node.js', 'Express', 'Prisma ORM', 'MySQL', 'Docker', 'VPS', 'Filas', 'Cache'],
      },
      {
        title: 'Desenvolvedor Full-Stack - Zapsuper',
        period: 'dezembro de 2025 - presente',
        duration: '5 meses',
        description:
          'Desenvolve de forma autônoma uma plataforma de números virtuais para verificação SMS, estudando referências do mercado e construindo a base técnica do produto. Atua no planejamento da infraestrutura, provisionamento de VPS, ambiente Linux, Docker, Docker Compose, DNS, deploy e decisões de arquitetura para evoluir em direção a balanceamento, filas, cache e operação mais resiliente.',
        stack: ['Node.js', 'Express', 'MySQL', 'Docker', 'Linux', 'JWT', 'API RESTful', 'Nginx', 'AWS'],
      },
      {
        title: 'Desenvolvedor Full-Stack - Brazuca Proxy',
        period: 'agosto de 2025 - dezembro de 2025',
        duration: '5 meses',
        description:
          'Desenvolveu módulos e fluxos para um sistema de gerenciamento de proxies, atuando na organização da arquitetura, construção de API, frontend em Vue.js, backend em Node.js e publicação do projeto para uso operacional. O trabalho exigiu visão de manutenção, estabilidade, autenticação, consumo controlado e estrutura para não derrubar a operação em uso real.',
        stack: ['Vue.js', 'Node.js', 'API RESTful', 'Manutenção', 'Controle de acesso'],
      },
      {
        title: 'Desenvolvedor de front-end',
        period: 'setembro de 2025 - setembro de 2025',
        duration: '1 mês',
        location: 'Brasil',
        description:
          'Desenvolveu o site institucional responsivo do cantor gospel Daniel Ramos, com foco em performance, SEO e conversão de visitantes. Implementou design minimalista e responsivo com React.js, SEO técnico avançado, sitemap XML, structured data, Open Graph, certificado SSL e deploy automatizado via Vercel com CI/CD.',
        stack: ['React.js', 'Vercel', 'CI/CD', 'SEO técnico', 'HTTPS/SSL'],
      },
    ],
  },
  {
    company: 'Teknisa',
    roles: [
      {
        title: 'Desenvolvedor Full-Stack',
        period: 'janeiro de 2024 - agosto de 2025',
        duration: '1 ano e 8 meses',
        location: 'Belo Horizonte, Minas Gerais, Brasil',
        description:
          'Atuou no desenvolvimento de aplicações web utilizando o framework Vue em uma plataforma ERP. Contribuiu na implementação e manutenção envolvendo frontend, backend e integração com banco de dados. Realizou análise de requisitos, especificações técnicas, depuração de código, integrações entre sistemas legados e módulos corporativos, otimizações de desempenho em consultas SQL e suporte técnico a clientes internos. Participou de dailies, plannings e retrospectivas.',
        stack: ['Framework Zeedhi', 'JavaScript', 'SQL', 'Scrum'],
      },
    ],
  },
  {
    company: 'SONDA',
    roles: [
      {
        title: 'Técnico de TI',
        period: 'janeiro de 2023 - janeiro de 2024',
        duration: '1 ano e 1 mês',
        location: 'Belo Horizonte, Minas Gerais, Brasil',
        description:
          'Prestou suporte técnico em ambientes Windows e Linux, realizando troubleshooting analítico, diagnóstico de falhas e resolução ágil de incidentes com comunicação técnica clara para usuários finais. Gerenciou chamados por sistemas de ticketing corporativos, aplicando priorização baseada em SLA e garantindo cumprimento de prazos críticos.',
        stack: ['GLPI', 'ServiceNow', 'Windows Server', 'Linux', 'Scrum', 'Kanban'],
      },
    ],
  },
] as const

export const PORTFOLIO_EDUCATION = [
  {
    institution: 'Estácio',
    course: 'Bacharelado em Sistemas de Informação',
    period: 'março de 2023 - janeiro de 2027',
  },
  {
    institution: 'Escola Estadual Técnico Industrial Professor Fontes',
    course: 'Curso Técnico Integrado em Eletrônica',
    period: 'janeiro de 2019 - dezembro de 2022',
  },
] as const
