'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SERVICES } from '@/content/services'
import { cn } from '@/lib/utils'
import { motionEase } from '@/lib/motion'

interface ServiceCardProps {
  service: (typeof SERVICES)[number]
  index: number
}

function SaaSMotif() {
  return (
    <svg viewBox="0 0 180 84" className="h-24 w-full" aria-hidden="true">
      <path d="M8 70 H172" className="stroke-line" strokeWidth="1" />
      <path d="M16 66 C44 58 48 34 76 38 S116 62 164 16" className="service-line-draw stroke-cyan" strokeWidth="2" fill="none" />
      {[16, 76, 164].map((x, index) => (
        <circle key={x} cx={x} cy={index === 0 ? 66 : index === 1 ? 38 : 16} r="4" className="fill-background stroke-cyan" strokeWidth="2" />
      ))}
    </svg>
  )
}

function ApiMotif() {
  return (
    <svg viewBox="0 0 180 84" className="h-24 w-full" aria-hidden="true">
      <path d="M36 42 H90 H144 M90 42 L62 18 M90 42 L62 66 M90 42 L122 18 M90 42 L122 66" className="service-line-draw stroke-cyan/80" strokeWidth="1.5" fill="none" />
      {[36, 90, 144, 62, 122].map((x, index) => {
        const y = index < 3 ? 42 : index === 3 ? 18 : 66
        return <circle key={`${x}-${index}`} cx={x} cy={y} r="6" className="fill-surface stroke-line transition-colors group-hover:stroke-cyan" strokeWidth="2" />
      })}
    </svg>
  )
}

function WebAppMotif() {
  return (
    <div className="grid h-24 grid-cols-[0.9fr_1.4fr] gap-3" aria-hidden="true">
      <div className="rounded border border-line bg-background/60 p-3">
        <span className="service-fill block h-2 w-8 rounded bg-cyan/70" />
        <span className="service-fill mt-4 block h-2 w-full rounded bg-line" />
        <span className="service-fill mt-2 block h-2 w-2/3 rounded bg-line" />
      </div>
      <div className="grid gap-3">
        <span className="service-fill rounded border border-line bg-background/60" />
        <span className="service-fill rounded border border-line bg-background/60" />
      </div>
    </div>
  )
}

function ConsultingMotif() {
  return (
    <div className="space-y-3 py-2 font-mono text-xs" aria-hidden="true">
      {['auth.ts: remove shared secret', 'billing.ts: isolate retry policy', 'api.ts: define acceptance criteria'].map((line) => (
        <div key={line} className="relative overflow-hidden rounded border border-line bg-background/60 px-3 py-2 text-gray-text">
          <span>{line}</span>
          <span className="service-review-mark absolute bottom-2 left-3 h-px w-0 bg-cyan" />
        </div>
      ))}
    </div>
  )
}

function ServiceMotif({ id }: { id: string }) {
  if (id === 'saas') return <SaaSMotif />
  if (id === 'apis') return <ApiMotif />
  if (id === 'web-apps') return <WebAppMotif />
  return <ConsultingMotif />
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const shouldAnimate = !useReducedMotion()
  const isWide = service.id === 'apis'
  const isTall = service.id === 'web-apps'

  return (
    <motion.article
      initial={shouldAnimate ? { opacity: 0, y: 28 } : {}}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={shouldAnimate ? { delay: index * 0.08, duration: 0.64, ease: motionEase.expoOut } : { duration: 0 }}
      viewport={shouldAnimate ? { once: true, margin: '-70px' } : undefined}
      className={cn(
        'group relative min-h-[320px] overflow-hidden rounded border border-line bg-surface p-6 transition-colors duration-300 hover:border-cyan/60 sm:min-h-[360px] lg:p-8',
        isWide && 'lg:col-span-2',
        isTall && 'lg:row-span-2',
        index === 0 && 'lg:-translate-y-10',
        index === 3 && 'lg:translate-y-10'
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle at 24% 0%, rgba(61,242,224,0.08), transparent 46%)' }}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-between gap-8">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-cyan">{service.tag}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-text">
              {service.id}
            </span>
          </div>

          <h3 className="mt-5 text-[clamp(1.6rem,3vw,3.2rem)] font-black leading-none tracking-tight text-foreground">
            {service.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-text lg:text-base">
            {service.description}
          </p>
        </div>

        <ServiceMotif id={service.id} />

        <ul className="grid gap-2 sm:grid-cols-2" aria-label={`Itens de ${service.title}`}>
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-text">
              <span className="mt-0.5 font-mono text-cyan" aria-hidden="true">
                /
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export function ServicesSection() {
  const shouldAnimate = !useReducedMotion()
  return (
    <section id="servicos" aria-label="Serviços" className="overflow-hidden border-t border-line py-24 lg:py-40">
      <div className="w-full px-5 sm:px-8 lg:px-10 2xl:px-14">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 22 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.68, ease: motionEase.expoOut } : { duration: 0 }}
          viewport={shouldAnimate ? { once: true, margin: '-60px' } : undefined}
          className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[0.9fr_1.4fr]"
        >
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan">// build modules</p>
          <div>
            <h2 className="max-w-5xl text-[clamp(2.25rem,6vw,6.6rem)] font-black leading-[0.94] tracking-tight text-foreground">
              Serviços como sistemas.
              <span className="block text-gray-text">Não como pacotes.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-text">
              Cada frente tem uma função clara: reduzir risco, criar produto, integrar operação ou
              dar ao seu time uma decisão técnica melhor.
            </p>
          </div>
        </motion.div>

        <div className="grid auto-rows-fr gap-6 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
