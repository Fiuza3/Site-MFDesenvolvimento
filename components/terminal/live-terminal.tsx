'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TerminalModal } from '@/components/terminal/terminal-modal'
import { useTerminalLoop, type TerminalScene } from '@/hooks/use-terminal-loop'
import { motionEase } from '@/lib/motion'

const scenes: TerminalScene[] = [
  {
    command: 'git clone cliente/problema',
    output: ['escopo recebido', 'risco detectado: integracao fiscal'],
    status: 'diagnose',
  },
  {
    command: 'npm run diagnose',
    output: ['gargalo: fluxo manual', 'solucao: sistema web sob medida'],
    status: 'scope',
  },
  {
    command: 'npm run build',
    output: ['api criada', 'dashboard pronto', 'testes passando'],
    status: 'build',
  },
  {
    command: 'deploy --prod',
    output: ['producao online', 'handoff entregue'],
    status: 'ship',
  },
]

export function LiveTerminal() {
  const [paused, setPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { scene, index, prefersReducedMotion } = useTerminalLoop(scenes, paused)

  return (
    <>
      <button
        type="button"
        aria-label="Abrir explicacao do terminal vivo"
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="group relative w-full overflow-hidden rounded border border-line bg-surface text-left font-mono shadow-2xl shadow-cyan/5 outline-none transition-colors hover:border-cyan/60 focus-visible:ring-2 focus-visible:ring-cyan/70"
      >
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(61,242,224,0.08),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
        <div className="relative flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-gray-text">
            {paused ? 'paused' : scene.status}
          </span>
        </div>

        <div className="relative min-h-[260px] p-5 sm:min-h-[310px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.command}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.3, ease: motionEase.powerOut }}
              className="space-y-3"
            >
              <p className="text-sm text-foreground">
                <span className="text-cyan">$</span> {scene.command}
                <span className="terminal-cursor ml-1 inline-block h-4 w-2 translate-y-0.5 bg-cyan" aria-hidden="true" />
              </p>
              <div className="space-y-2">
                {scene.output.map((line, lineIndex) => (
                  <motion.p
                    key={line}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lineIndex * 0.12, duration: 0.28 }}
                    className="text-sm text-gray-text"
                  >
                    <span className="text-cyan/70">&gt;</span> {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-text">
              <span>runtime</span>
              <span>{String(index + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
            </div>
            <div className="h-px overflow-hidden bg-line">
              <motion.div
                key={index}
                className="h-full bg-cyan"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused || prefersReducedMotion ? 1 : 1 }}
                transition={{ duration: paused || prefersReducedMotion ? 0 : 3, ease: 'linear' }}
                style={{ originX: 0 }}
              />
            </div>
          </div>
        </div>
      </button>
      <TerminalModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

