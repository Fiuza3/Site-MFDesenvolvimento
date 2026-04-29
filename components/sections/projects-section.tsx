'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { PROJECTS, type Project } from '@/content/projects'
import { motionEase } from '@/lib/motion'

const metrics: Record<string, string> = {
  'plataforma-rh': '12k usuários ativos',
  'api-fiscal': '60+ municipios integrados',
  'erp-logistica': '200+ veiculos rastreados',
  'crm-saas': '3 meses economizados',
  'data-api': 'cache inteligente multi-fonte',
  'portal-b2b': 'extranet B2B em producao',
}

const outcomes: Record<string, string> = {
  'plataforma-rh': 'multi-tenant, billing e operação diária sem planilha paralela',
  'api-fiscal': 'retry automático, fallback e rastreio de emissão por município',
  'erp-logistica': 'operação migrada sem parar frota nem perder histórico',
  'crm-saas': 'pipeline, follow-up e integrações com critério de aceite claro',
  'data-api': 'normalização de dados financeiros com latência previsível',
  'portal-b2b': 'pedidos e contratos fora do email, com auditoria e acesso por perfil',
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (!first || !last) return

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => closeRef.current?.focus(), 30)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center p-5"
        onMouseDown={onClose}
      >
        <div className="absolute inset-0 bg-background/85 backdrop-blur-md" aria-hidden="true" />
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.28 }}
          onMouseDown={(event) => event.stopPropagation()}
          className="relative z-10 w-full max-w-3xl rounded border border-line bg-surface p-6 shadow-2xl shadow-cyan/5 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Case tecnico: ${project.title}`}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar case"
            className="absolute right-4 top-4 rounded border border-line p-2 text-gray-text transition-colors hover:border-cyan hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
          >
            <X size={16} />
          </button>

          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">
            case.log / {project.year}
          </p>
          <h3 className="mt-4 max-w-2xl text-3xl font-black tracking-tight text-foreground lg:text-5xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-text">
            {project.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded border border-line bg-background/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gray-text">metrica</p>
              <p className="mt-3 font-mono text-xl text-cyan">{metrics[project.id]}</p>
            </div>
            <div className="rounded border border-line bg-background/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gray-text">resultado</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{outcomes[project.id]}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded border border-line px-2 py-1 font-mono text-xs text-gray-text">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectMockup({ project, index }: { project: Project; index: number }) {
  return (
    <div className="project-mockup relative overflow-hidden rounded border border-line bg-background/70 p-4" aria-hidden="true">
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gray-text">
          {project.category}
        </span>
      </div>

      <div className="grid h-44 gap-3 sm:h-52 lg:h-72">
        <div className="grid grid-cols-[0.75fr_1.25fr] gap-3">
          <span className="project-skeleton rounded bg-line/70" style={{ transitionDelay: `${index * 40}ms` }} />
          <span className="project-skeleton rounded bg-cyan/30" style={{ transitionDelay: `${index * 40 + 80}ms` }} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <span className="project-skeleton rounded bg-line/70" style={{ transitionDelay: `${index * 40 + 120}ms` }} />
          <span className="project-skeleton rounded bg-line/70" style={{ transitionDelay: `${index * 40 + 160}ms` }} />
          <span className="project-skeleton rounded bg-line/70" style={{ transitionDelay: `${index * 40 + 200}ms` }} />
        </div>
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-3">
          <span className="project-skeleton rounded bg-line/70" style={{ transitionDelay: `${index * 40 + 240}ms` }} />
          <span className="project-skeleton rounded bg-cyan/20" style={{ transitionDelay: `${index * 40 + 280}ms` }} />
        </div>
      </div>
    </div>
  )
}

function ProjectFrame({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
}) {
  const shouldAnimate = !useReducedMotion()

  return (
    <motion.article
      initial={shouldAnimate ? { opacity: 0, y: 32 } : {}}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={shouldAnimate ? { duration: 0.64, delay: index * 0.06, ease: motionEase.expoOut } : { duration: 0 }}
      viewport={shouldAnimate ? { once: true, margin: '-80px' } : undefined}
      className="project-frame group flex min-h-[540px] w-[86vw] shrink-0 scroll-ml-5 flex-col justify-between rounded border border-line bg-surface p-5 transition-colors hover:border-cyan/60 sm:min-h-[620px] sm:w-[74vw] lg:w-[72vw] lg:p-8 xl:w-[64vw] 2xl:w-[54vw]"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.15fr] lg:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">
            frame {String(index + 1).padStart(2, '0')} / {project.year}
          </p>
          <h3 className="mt-5 max-w-2xl text-[clamp(2.2rem,5vw,5.8rem)] font-black leading-[0.88] tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-text">
            {project.description}
          </p>
        </div>

        <ProjectMockup project={project} index={index} />
      </div>

      <div className="mt-8 grid gap-5 border-t border-line pt-6 md:grid-cols-[0.9fr_1fr_auto] md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gray-text">metrica forte</p>
          <p className="mt-2 font-mono text-xl text-cyan lg:text-2xl">{metrics[project.id]}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gray-text">stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded border border-line px-2 py-1 font-mono text-xs text-gray-text">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="rounded border border-cyan px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan transition-colors hover:bg-cyan hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
        >
          abrir case
        </button>
      </div>
    </motion.article>
  )
}

export function ProjectsSection() {
  const shouldAnimate = !useReducedMotion()
  const [selected, setSelected] = useState<Project | null>(null)
  const loopedProjects = [...PROJECTS, ...PROJECTS]

  return (
    <section
      id="projetos"
      aria-label="Projetos"
      className="relative overflow-hidden border-t border-line py-24 lg:py-40"
    >
      <div className="w-full px-5 sm:px-8 lg:px-10 2xl:px-14">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 24 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.7, ease: motionEase.expoOut } : { duration: 0 }}
          viewport={shouldAnimate ? { once: true, margin: '-80px' } : undefined}
          className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.7fr]"
        >
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan">// shipped work</p>
          <div>
            <h2 className="max-w-6xl text-[clamp(2.3rem,7vw,7.8rem)] font-black leading-[0.94] tracking-tight text-foreground">
              Cases como frames.
              <span className="block text-gray-text">Não como cards.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-text">
              Cada projeto abaixo mostra um recorte: problema, stack, métrica e resultado.
              No desktop, a leitura desliza lateralmente como uma sequência de execução.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="project-carousel relative overflow-hidden">
        <div
          className="project-carousel-track flex w-max gap-6 px-5 pb-4 sm:px-8 lg:px-10 2xl:px-14"
          aria-label="Sequencia de cases"
        >
          {loopedProjects.map((project, index) => (
            <ProjectFrame
              key={`${project.id}-${index}`}
              project={project}
              index={index % PROJECTS.length}
              onOpen={setSelected}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-background to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-background to-transparent lg:block"
        />
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
