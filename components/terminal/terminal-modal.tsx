'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface TerminalModalProps {
  open: boolean
  onClose: () => void
}

export function TerminalModal({ open, onClose }: TerminalModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

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
  }, [onClose, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-5 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-md" aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="terminal-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative z-10 w-full max-w-2xl rounded border border-line bg-surface p-6 shadow-2xl shadow-cyan/5"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar explicacao do terminal"
              className="absolute right-4 top-4 rounded border border-line p-2 text-gray-text transition-colors hover:border-cyan hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            >
              <X size={16} />
            </button>

            <p className="font-mono text-xs uppercase tracking-widest text-cyan">// runtime</p>
            <h2 id="terminal-modal-title" className="mt-3 max-w-xl text-2xl font-bold text-foreground">
              Esse terminal e a versao comprimida do meu processo.
            </h2>
            <div className="mt-6 grid gap-4 text-sm leading-relaxed text-gray-text sm:grid-cols-2">
              <p>
                Primeiro eu reduzo ambiguidade: escopo, risco, regra de negocio, prazo e dependencias.
              </p>
              <p>
                Depois vem a execucao: arquitetura, entregas pequenas, staging, revisao e handoff sem surpresa.
              </p>
              <p>
                O loop mostra o que interessa para o cliente: diagnosticar, construir, publicar e sustentar.
              </p>
              <p>
                Nao e decoracao. E a linguagem visual da marca: type, compile, reveal, ship.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
