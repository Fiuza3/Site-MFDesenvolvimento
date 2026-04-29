'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { motionEase } from '@/lib/motion'

const steps = [
  {
    key: 'type',
    question: 'Qual tipo de projeto?',
    options: ['SaaS', 'API', 'Web App', 'Sistema interno', 'Outro'],
  },
  {
    key: 'timeline',
    question: 'Prazo estimado?',
    options: ['1-3 meses', '3-6 meses', '6m+'],
  },
  {
    key: 'budget',
    question: 'Orcamento aproximado?',
    options: ['ate 10k', '10k-30k', '30k+', 'quero conversar'],
  },
] as const

type StepKey = (typeof steps)[number]['key']
type Answers = Partial<Record<StepKey, string>> & { contact?: string }

function getWhatsAppHref(answers: Answers) {
  const phone = SITE.whatsapp.replace('https://wa.me/', '').split('?')[0]
  const message = [
    'Olá Marcus, quero iniciar um projeto.',
    '',
    `Tipo: ${answers.type ?? '-'}`,
    `Prazo: ${answers.timeline ?? '-'}`,
    `Orçamento: ${answers.budget ?? '-'}`,
    `Contato: ${answers.contact ?? '-'}`,
  ].join('\n')

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function BriefingTerminal() {
  const [answers, setAnswers] = useState<Answers>({})
  const [contact, setContact] = useState('')
  const answeredCount = steps.filter((step) => answers[step.key]).length
  const complete = answeredCount === steps.length && contact.trim().length >= 3
  const href = useMemo(() => getWhatsAppHref({ ...answers, contact }), [answers, contact])

  const selectAnswer = (key: StepKey, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="relative overflow-hidden rounded border border-line bg-surface font-mono shadow-2xl shadow-cyan/5">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.28em] text-gray-text">
          briefing.session
        </span>
      </div>

      <div className="space-y-8 p-5 lg:p-8">
        <div>
          <p className="text-base text-foreground">
            <span className="text-cyan">$</span> iniciar-projeto --briefing
            <span className="terminal-cursor ml-1 inline-block h-4 w-2 translate-y-0.5 bg-cyan" aria-hidden="true" />
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-text">
            <span className="text-cyan/70">&gt;</span> responda em menos de um minuto. Eu recebo o contexto ja formatado.
          </p>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.48, ease: motionEase.expoOut }}
              viewport={{ once: true }}
              className="rounded border border-line bg-background/45 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm text-foreground">
                  <span className="text-cyan">{String(index + 1).padStart(2, '0')}</span> {step.question}
                </p>
                {answers[step.key] && (
                  <span className="text-[10px] uppercase tracking-[0.22em] text-cyan">set</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label={step.question}>
                {step.options.map((option) => {
                  const active = answers[step.key] === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(step.key, option)}
                      aria-pressed={active}
                      className={cn(
                        'rounded border px-3 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70',
                        active
                          ? 'border-cyan bg-cyan text-background'
                          : 'border-line text-gray-text hover:border-cyan/60 hover:text-foreground'
                      )}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded border border-line bg-background/45 p-4">
          <label htmlFor="briefing-contact" className="text-sm text-foreground">
            <span className="text-cyan">04</span> Seu WhatsApp ou email:
          </label>
          <div className="mt-3 flex items-center gap-2 rounded border border-line bg-surface px-3 py-3 focus-within:border-cyan/70">
            <span className="text-cyan">&gt;</span>
            <input
              id="briefing-contact"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder="voce@empresa.com ou +55..."
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-gray-text/60"
            />
          </div>
        </div>

        <div className="grid gap-4 border-t border-line pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={complete ? 'complete' : 'pending'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="text-sm text-gray-text"
            >
              {complete ? (
                <>
                  <span className="text-cyan">&gt;</span> briefing.generated / opening whatsapp...
                </>
              ) : (
                <>
                  <span className="text-cyan/70">&gt;</span> {answeredCount}/{steps.length} respostas configuradas
                </>
              )}
            </motion.p>
          </AnimatePresence>

          <a
            href={complete ? href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!complete}
            className={cn(
              'rounded border px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70',
              complete
                ? 'border-cyan bg-cyan text-background hover:bg-transparent hover:text-cyan'
                : 'pointer-events-none border-line text-gray-text/50'
            )}
          >
            enviar briefing no WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

