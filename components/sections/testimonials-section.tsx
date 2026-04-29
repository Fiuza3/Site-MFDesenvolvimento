'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { TESTIMONIALS } from '@/content/testimonials'

const AUTOPLAY_MS = 5000

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (paused || userPaused) return
    timerRef.current = setInterval(next, AUTOPLAY_MS)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [paused, userPaused, next])

  const t = TESTIMONIALS[current]

  return (
    <section
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="py-32 border-t border-line"
    >
      <div className="w-full px-5 sm:px-8 lg:px-10 2xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-60px' }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-cyan tracking-widest uppercase mb-4">// depoimentos</p>
          <h2 className="text-3xl font-bold text-balance lg:text-4xl">
            O que dizem{' '}
            <span className="text-gray-text">quem já trabalhou comigo.</span>
          </h2>
        </motion.div>

        <div
          role="region"
          aria-label="Depoimentos de clientes"
          aria-roledescription="carrossel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <div aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="rounded border border-line bg-surface p-10 lg:p-14"
            >
              {/* Quote mark */}
              <span
                aria-hidden="true"
                className="font-mono text-6xl text-cyan opacity-20 leading-none select-none"
              >
                "
              </span>

              <p className="mt-2 max-w-6xl text-lg leading-relaxed text-foreground lg:text-xl">
                {t.text}
              </p>

              <footer className="mt-8 flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded border border-line bg-surface-raised font-mono text-sm font-bold text-cyan"
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-foreground">{t.name}</cite>
                  <p className="text-sm text-gray-text">
                    {t.role} · {t.company}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              className="flex h-11 w-11 items-center justify-center rounded border border-line text-gray-text hover:border-cyan hover:text-cyan transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Próximo depoimento"
              className="flex h-11 w-11 items-center justify-center rounded border border-line text-gray-text hover:border-cyan hover:text-cyan transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5" role="tablist" aria-label="Navegar depoimentos">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className="h-11 w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 rounded"
                >
                  <span className={`block rounded-full transition-all duration-300 ${
                    i === current ? 'h-1 w-6 bg-cyan' : 'h-1.5 w-1.5 bg-line hover:bg-gray-text'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setUserPaused(p => !p)}
              aria-label={userPaused ? 'Retomar apresentação' : 'Pausar apresentação'}
              className="flex h-11 w-11 items-center justify-center rounded border border-line text-gray-text hover:border-cyan hover:text-cyan transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            >
              {userPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            </button>
            <span className="ml-auto font-mono text-xs text-gray-text">
              {String(current + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
