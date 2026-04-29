'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { STACK_LAYERS } from '@/content/stack'
import { cn } from '@/lib/utils'
import { motionEase } from '@/lib/motion'

export function StackSection() {
  const shouldAnimate = !useReducedMotion()
  const [active, setActive] = useState(STACK_LAYERS[0])

  return (
    <section
      id="stack"
      aria-label="Mapa técnico da stack"
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
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan">// architecture map</p>
          <div>
            <h2 className="max-w-6xl text-[clamp(2.3rem,7vw,7.8rem)] font-black leading-[0.94] tracking-tight text-foreground">
              Stack como decisão.
              <span className="block text-gray-text">Não como vitrine.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-text">
              Tecnologia entra quando reduz risco, acelera entrega ou deixa o produto mais fácil
              de operar. O mapa abaixo mostra as camadas que costumo montar.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[0.95fr_1.25fr]">
          <div className="grid gap-3">
            {STACK_LAYERS.map((layer, index) => {
              const selected = active.id === layer.id
              return (
                <motion.button
                  key={layer.id}
                  type="button"
                  initial={shouldAnimate ? { opacity: 0, x: -18 } : {}}
                  whileInView={shouldAnimate ? { opacity: 1, x: 0 } : {}}
                  transition={shouldAnimate ? { delay: index * 0.05, duration: 0.48, ease: motionEase.expoOut } : { duration: 0 }}
                  viewport={shouldAnimate ? { once: true, margin: '-80px' } : undefined}
                  onClick={() => setActive(layer)}
                  onMouseEnter={() => setActive(layer)}
                  aria-pressed={selected}
                  className={cn(
                    'group grid gap-5 rounded border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 sm:grid-cols-[auto_1fr]',
                    selected
                      ? 'border-cyan bg-cyan/10'
                      : 'border-line bg-surface hover:border-cyan/50'
                  )}
                >
                  <span className={cn(
                    'font-mono text-sm transition-colors',
                    selected ? 'text-cyan' : 'text-gray-text group-hover:text-cyan'
                  )}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-2xl font-black tracking-tight text-foreground">
                      {layer.title}
                    </span>
                    <span className="mt-2 block font-mono text-xs text-gray-text">
                      $ {layer.command}
                    </span>
                  </span>
                </motion.button>
              )
            })}
          </div>

          <div className="rounded border border-line bg-surface p-5 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={shouldAnimate ? { opacity: 0, y: 18, filter: 'blur(8px)' } : {}}
                animate={shouldAnimate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                exit={shouldAnimate ? { opacity: 0, y: -14, filter: 'blur(8px)' } : {}}
                transition={shouldAnimate ? { duration: 0.28, ease: motionEase.powerOut } : { duration: 0 }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">
                      layer / {active.id}
                    </p>
                    <h3 className="mt-4 text-[clamp(2.2rem,5vw,5.8rem)] font-black leading-[0.9] tracking-tight text-foreground">
                      {active.title}
                    </h3>
                  </div>
                  <span className="hidden rounded border border-line px-3 py-1 font-mono text-xs text-gray-text sm:block">
                    active
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-text">
                  {active.description}
                </p>

                <div className="stack-map-grid mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {active.items.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={shouldAnimate ? { opacity: 0, y: 10 } : {}}
                      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                      transition={shouldAnimate ? { delay: index * 0.04, duration: 0.25 } : { duration: 0 }}
                      className="group/item relative overflow-hidden rounded border border-line bg-background/55 p-4 font-mono transition-colors hover:border-cyan/60"
                    >
                      <span className="relative z-10 text-sm text-foreground">{item}</span>
                      <span className="stack-chip-fill absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-cyan/10 transition-transform duration-500 group-hover/item:scale-x-100" aria-hidden="true" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 border-t border-line pt-5 font-mono">
                  <p className="text-sm text-foreground">
                    <span className="text-cyan">$</span> explain --when-to-use {active.id}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-text">
                    <span className="text-cyan/70">&gt;</span> uso essa camada quando ela diminui incerteza operacional, não para preencher logo em carrossel.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
