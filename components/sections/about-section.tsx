'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '@/lib/constants'
import { motionEase } from '@/lib/motion'

const signals = [
  { label: 'risco', detail: 'mapeado antes de virar custo' },
  { label: 'legado', detail: 'tratado como restrição real' },
  { label: 'prazo', detail: 'quebrado em entregas verificáveis' },
  { label: 'handoff', detail: 'documentado para não criar dependência' },
]

const diagnostics = [
  ['scope.locked', 'critérios de aceite definidos'],
  ['risk.map', 'dependências e gargalos visíveis'],
  ['build.plan', 'arquitetura antes da promessa'],
]

export function AboutSection() {
  const shouldAnimate = !useReducedMotion()

  return (
    <section id="sobre" aria-label="Sobre Marcus Fiuza" className="relative overflow-hidden py-24 lg:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      <div className="w-full px-5 sm:px-8 lg:px-10 2xl:px-14">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.86fr)] lg:items-start 2xl:grid-cols-[minmax(0,1.7fr)_minmax(460px,0.8fr)]">
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 28 } : {}}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={shouldAnimate ? { duration: 0.74, ease: motionEase.expoOut } : { duration: 0 }}
            viewport={shouldAnimate ? { once: true, margin: '-80px' } : undefined}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-cyan">
              // diagnóstico antes do código
            </p>

            <h2 className="max-w-6xl text-[clamp(2.25rem,7vw,7.4rem)] font-black leading-[0.94] tracking-tight text-foreground">
              Eu não começo pelo código.
              <span className="block text-gray-text">Eu começo pela ambiguidade.</span>
            </h2>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
              <p className="max-w-xl text-lg leading-relaxed text-gray-text">
                Sou {SITE.author}. Antes da primeira linha, eu entendo produto, regra de negócio,
                legado, prazo, risco e orçamento. O trabalho é transformar incerteza em uma
                execução que dá para acompanhar.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {signals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    initial={shouldAnimate ? { opacity: 0, y: 18 } : {}}
                    whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                    transition={shouldAnimate ? { delay: index * 0.06, duration: 0.48, ease: motionEase.powerOut } : { duration: 0 }}
                    viewport={shouldAnimate ? { once: true, margin: '-80px' } : undefined}
                    className="group rounded border border-line bg-surface p-4 transition-colors hover:border-cyan/60"
                  >
                    <span className="font-mono text-xs text-cyan">.{signal.label}</span>
                    <p className="mt-2 text-sm leading-relaxed text-gray-text group-hover:text-foreground">
                      {signal.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={shouldAnimate ? { opacity: 0, y: 40 } : {}}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={shouldAnimate ? { delay: 0.12, duration: 0.74, ease: motionEase.expoOut } : { duration: 0 }}
            viewport={shouldAnimate ? { once: true, margin: '-80px' } : undefined}
            className="rounded border border-line bg-surface font-mono lg:sticky lg:top-28"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-xs text-gray-text">diagnostic.log</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-cyan">active</span>
            </div>
            <div className="space-y-5 p-5">
              {diagnostics.map(([command, output], index) => (
                <motion.div
                  key={command}
                  initial={shouldAnimate ? { opacity: 0, x: -10 } : {}}
                  whileInView={shouldAnimate ? { opacity: 1, x: 0 } : {}}
                  transition={shouldAnimate ? { delay: 0.22 + index * 0.1, duration: 0.36 } : { duration: 0 }}
                  viewport={shouldAnimate ? { once: true } : undefined}
                >
                  <p className="text-sm text-foreground">
                    <span className="text-cyan">$</span> {command}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-text">
                    <span className="text-cyan/70">&gt;</span> {output}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-line p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-gray-text">resultado</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Menos reunião para explicar problema. Mais entrega com critério claro.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
