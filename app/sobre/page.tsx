import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { CEOHeader } from '@/components/ceo-header'
import {
  PORTFOLIO_EDUCATION,
  PORTFOLIO_EXPERIENCE,
  PORTFOLIO_MARKET_STACK,
  PORTFOLIO_NUMBERS,
  PORTFOLIO_PROFILE,
  PORTFOLIO_RECOGNITION,
} from '@/content/portfolio'

export const metadata: Metadata = {
  title: 'Sobre Marcus Fiuza — CEO da MF Desenvolvimento',
  description:
    'Perfil profissional de Marcus Fiuza: CEO e Founder da MF Desenvolvimento, desenvolvedor full stack sênior com +3 anos em Vue.js, Node.js, Next.js, TypeScript, SaaS e infraestrutura. Belo Horizonte, MG.',
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    type: 'profile',
    locale: 'pt_BR',
    url: 'https://mfdesenvolvimento.online/sobre',
    title: 'Sobre Marcus Fiuza — CEO da MF Desenvolvimento',
    description:
      'CEO e Founder da MF Desenvolvimento. Desenvolvedor full stack sênior especializado em Vue.js, Node.js, Next.js, TypeScript e SaaS. Belo Horizonte, MG.',
    siteName: 'MF Desenvolvimento',
    images: [{ url: '/sobre/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Marcus Fiuza — CEO da MF Desenvolvimento',
    description:
      'CEO e Founder da MF Desenvolvimento. Full stack sênior: Vue.js, Node.js, Next.js, SaaS.',
  },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan">
      // {children}
    </p>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-line bg-background/55 px-3 py-1.5 font-mono text-xs text-gray-text transition-colors hover:border-cyan/50 hover:text-foreground">
      {children}
    </span>
  )
}

const CEO_COMMANDS = [
  '$ diagnosticar --macro-problema',
  '$ criar-api --sem-inflar-escopo',
  '$ publicar --vps docker dns',
  '$ explicar --caminho-claro',
]

const ARCHITECTURE_SIGNALS = [
  'Fila para absorver pico',
  'Cache para reduzir custo',
  'Banco com índice e leitura limpa',
  'Load balance para distribuir carga',
  'Containers com manutenção previsível',
  'Logs, retries e health checks',
  'AWS para crescer com critério',
  'Backups e operação assistida',
]

export default function SobrePage() {
  const { contact } = PORTFOLIO_PROFILE

  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@id': 'https://mfdesenvolvimento.online/#person' },
    url: 'https://mfdesenvolvimento.online/sobre',
    name: 'Sobre Marcus Fiuza',
  }

  return (
    <main className="ceo-page relative min-h-screen overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <CEOHeader />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-radial" aria-hidden="true" />
      <div className="ceo-grid" aria-hidden="true" />
      <div className="ceo-scan" aria-hidden="true" />

      <section id="ceo-inicio" className="hero-shell relative min-h-screen border-b border-line px-5 pb-20 pt-28 sm:px-8 lg:px-10 lg:pb-28 lg:pt-32 2xl:px-14">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.28fr)_minmax(360px,0.72fr)] lg:items-end">
          <div className="relative">
            <div className="mb-8 hidden grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-text md:grid">
              <span className="border-t border-line pt-3">founder / operator</span>
              <span className="border-t border-line pt-3">apis / produto</span>
              <span className="border-t border-cyan/50 pt-3 text-cyan">mf desenvolvimento</span>
            </div>
            <SectionLabel>ceo profile</SectionLabel>
            <h1 className="ceo-title mt-6 max-w-[12ch] text-[clamp(4.2rem,15vw,15.5rem)] font-black leading-[0.74] tracking-tighter">
              Marcus Fiuza
            </h1>
            <p className="mt-8 max-w-5xl text-[clamp(1.3rem,3vw,3.4rem)] font-black leading-[0.95] tracking-tight text-gray-text">
              {PORTFOLIO_PROFILE.headline}. Um fundador técnico no começo da jornada, mas com fome de resolver problema real.
            </p>
          </div>

          <aside className="ceo-terminal relative overflow-hidden rounded border border-line bg-surface/90 p-5 font-mono shadow-2xl shadow-cyan/5 lg:translate-y-12 lg:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-gray-text">runtime.identity</p>
              <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_18px_rgba(61,242,224,0.7)]" />
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-foreground">{PORTFOLIO_PROFILE.role}</p>
              <p className="text-gray-text">{PORTFOLIO_PROFILE.location}</p>
              <a className="block text-cyan hover:text-foreground" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <a className="block text-cyan hover:text-foreground" href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer">
                {contact.linkedin}
              </a>
              <a className="block text-cyan hover:text-foreground" href={`https://${contact.website}`} target="_blank" rel="noreferrer">
                {contact.website}
              </a>
              <p className="text-gray-text">{contact.phone}</p>
            </div>
            <div className="mt-8 border-t border-line pt-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-gray-text">current.commands</p>
              <div className="mt-4 space-y-3">
                {CEO_COMMANDS.map((command) => (
                  <p key={command} className="ceo-command text-xs text-gray-text">
                    <span className="text-cyan">{'>'}</span> {command}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative border-b border-line px-5 py-8 sm:px-8 lg:px-10 2xl:px-14">
        <div className="ceo-metric-rail grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PORTFOLIO_NUMBERS.map((item, index) => (
            <article key={item.label} className="group rounded border border-line bg-surface/80 p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan/40">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-text">metric.{String(index + 1).padStart(2, '0')}</p>
              <p className="font-mono text-[clamp(2rem,5vw,4.2rem)] font-black leading-none text-cyan">
                {item.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-text">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative border-b border-line px-5 py-20 sm:px-8 lg:px-10 lg:py-28 2xl:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.2fr_0.55fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionLabel>resumo</SectionLabel>
            <p className="mt-5 max-w-xs font-mono text-xs uppercase tracking-[0.2em] text-gray-text">
              leitura rapida para cliente que precisa entender se da para confiar.
            </p>
          </div>
          <div className="lg:-mt-8">
            <h2 className="max-w-5xl text-[clamp(2.3rem,6vw,6.8rem)] font-black leading-[0.92] tracking-tight">
              Full stack que pega problema aberto e transforma em próximo passo.
            </h2>
            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-gray-text">
              {PORTFOLIO_PROFILE.summary}
            </p>
            <p className="mt-5 max-w-4xl text-lg leading-relaxed text-foreground">
              Cliente nem sempre chega pedindo um sistema fechado. Às vezes chega com uma API para
              arrumar, um fluxo para organizar, uma ideia de painel, uma integração parada ou uma
              dúvida técnica. É nesse ponto que Marcus entra: entende o cenário, resume o problema
              e constrói o caminho possível.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {PORTFOLIO_PROFILE.competencies.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
          <div className="hidden border-l border-line pl-6 lg:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">scope</p>
            <div className="mt-6 space-y-4 text-sm text-gray-text">
              <p>APIs que faltam.</p>
              <p>Integração que travou.</p>
              <p>Deploy que não fecha.</p>
              <p>Banco sem clareza.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ceo-prova" className="relative border-b border-line px-5 py-20 sm:px-8 lg:px-10 lg:py-28 2xl:px-14">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.68fr_1.55fr]">
          <SectionLabel>prova tecnica</SectionLabel>
          <div>
            <h2 className="max-w-5xl text-[clamp(2.3rem,6vw,6.8rem)] font-black leading-[0.92] tracking-tight">
              Sinais de um desenvolvedor que resolve.
            </h2>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-text">
              Não é sobre parecer gigante. É sobre ter repertório para resolver o que trava o
              cliente: API, banco, deploy, regra de negócio, infraestrutura, fila, cache,
              manutenção, fluxo e decisão técnica. É mentalidade de sênior que aprende na marra:
              entende onde o sistema quebra e trabalha para ele aguentar usuários de verdade.
            </p>
          </div>
        </div>

        <div className="ceo-proof-grid grid gap-4 lg:grid-cols-5">
          {PORTFOLIO_RECOGNITION.map((item, index) => (
            <article key={item} className="rounded border border-line bg-surface/80 p-5 transition-colors hover:border-cyan/40">
              <p className="font-mono text-xs text-cyan">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-text">{item}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded border border-cyan/30 bg-background/60 p-5 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.68fr_1.55fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">
                escala.real
              </p>
              <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight lg:text-5xl">
                O que faz um sistema parar de ser demo e virar operação.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {ARCHITECTURE_SIGNALS.map((item) => (
                <div key={item} className="rounded border border-line bg-surface/70 p-4">
                  <p className="font-mono text-xs leading-relaxed text-gray-text">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ceo-stack" className="relative border-b border-line px-5 py-20 sm:px-8 lg:px-10 lg:py-28 2xl:px-14">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.68fr_1.55fr]">
          <SectionLabel>stacks principais</SectionLabel>
          <h2 className="max-w-5xl text-[clamp(2.3rem,6vw,6.8rem)] font-black leading-[0.92] tracking-tight">
            Minhas stacks reais. O que uso para construir e destravar.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {PORTFOLIO_MARKET_STACK.map((stackGroup, index) => (
            <article key={stackGroup.group} className="ceo-stack-card rounded border border-line bg-surface/80 p-5" style={{ '--stack-offset': `${index * 18}px` } as CSSProperties}>
              <h3 className="font-mono text-sm text-cyan">{stackGroup.group}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {stackGroup.items.map((item) => (
                  <Chip key={`${stackGroup.group}-${item}`}>{item}</Chip>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ceo-trajetoria" className="relative border-b border-line px-5 py-20 sm:px-8 lg:px-10 lg:py-28 2xl:px-14">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.68fr_1.55fr]">
          <SectionLabel>experiencia</SectionLabel>
          <h2 className="max-w-5xl text-[clamp(2.3rem,6vw,6.8rem)] font-black leading-[0.92] tracking-tight">
            Trajetória entre empresa, freelances, APIs e produtos próprios.
          </h2>
        </div>

        <div className="grid gap-6">
          {PORTFOLIO_EXPERIENCE.map((company) => (
            <article key={company.company} className="ceo-experience-card rounded border border-line bg-surface/82 p-5 lg:p-8">
              <div className="mb-8 flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="text-3xl font-black tracking-tight text-foreground lg:text-5xl">
                  {company.company}
                </h3>
                {'total' in company && company.total && (
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
                    {company.total}
                  </span>
                )}
              </div>

              <div className="grid gap-5">
                {company.roles.map((role) => (
                  <div key={`${company.company}-${role.title}`} className="rounded border border-line bg-background/45 p-5">
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
                          {role.period} / {role.duration}
                        </p>
                        <h4 className="mt-3 text-2xl font-black tracking-tight text-foreground">
                          {role.title}
                        </h4>
                        {'location' in role && role.location && (
                          <p className="mt-2 font-mono text-xs text-gray-text">{role.location}</p>
                        )}
                      </div>
                    </div>
                    <p className="mt-5 max-w-5xl text-sm leading-relaxed text-gray-text lg:text-base">
                      {role.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.stack.map((item) => (
                        <Chip key={`${role.title}-${item}`}>{item}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-b border-line px-5 py-20 sm:px-8 lg:grid-cols-3 lg:px-10 lg:py-28 2xl:px-14">
        <div className="rounded border border-line bg-surface/80 p-5">
          <SectionLabel>idiomas</SectionLabel>
          <div className="mt-6 space-y-4">
            {PORTFOLIO_PROFILE.languages.map((language) => (
              <p key={language.name} className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0">
                <span className="font-mono text-sm text-foreground">{language.name}</span>
                <span className="text-right text-xs text-gray-text">{language.level}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="rounded border border-line bg-surface/80 p-5 lg:col-span-2">
          <SectionLabel>estudo continuo</SectionLabel>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-gray-text">
                certificações e cursos feitos
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PORTFOLIO_PROFILE.certifications.map((certification) => (
                  <Chip key={certification}>{certification}</Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-gray-text">
                trilhas gratuitas para evolução
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PORTFOLIO_PROFILE.learningTracks.map((track) => (
                  <Chip key={track}>{track}</Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line px-5 py-20 sm:px-8 lg:px-10 lg:py-28 2xl:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.55fr]">
          <SectionLabel>formacao</SectionLabel>
          <div className="grid gap-4">
            {PORTFOLIO_EDUCATION.map((education) => (
              <article key={education.institution} className="rounded border border-line bg-surface/80 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
                  {education.period}
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-foreground">
                  {education.institution}
                </h3>
                <p className="mt-2 text-gray-text">{education.course}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ceo-sobre" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28 2xl:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.55fr]">
          <SectionLabel>sobre mim</SectionLabel>
          <article className="ceo-final-note rounded border border-cyan/40 bg-cyan-dim p-6 lg:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">founder.note</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(2rem,5vw,5.6rem)] font-black leading-[0.94] tracking-tight">
              Sou um homem de execução, responsabilidade e palavra.
            </h2>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-text lg:text-lg">
              Construo a MF Desenvolvimento sem fingir ser maior do que é. Estou começando uma
              empresa com base em trabalho real: freelances, APIs, consultorias, produtos próprios
              em evolução e problemas que precisei entender de ponta a ponta. O compromisso é
              simples: clareza, responsabilidade e entrega possível.
            </p>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-foreground lg:text-lg">
              Se o pedido envolve produto web, API, painel administrativo, banco de dados,
              integração, deploy, servidor Linux ou automação, eu sei quebrar o problema em partes,
              explicar o caminho e construir algo que faça sentido para o momento do cliente.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>CEO & Founder</Chip>
              <Chip>Full Stack</Chip>
              <Chip>Vue 3</Chip>
              <Chip>Node.js</Chip>
              <Chip>TypeScript</Chip>
              <Chip>SaaS</Chip>
              <Chip>Infraestrutura</Chip>
              <Chip>Produção</Chip>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
