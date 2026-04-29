'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MFLogoProps {
  compact?: boolean
  className?: string
  onClick?: () => void
  label?: string
}

const ease = [0.16, 1, 0.3, 1] as const

// Geist Mono at fontSize 22 — advance width ≈ 13.2px per char
const CW = 13.2
const FS = 22
const H = 30

export function MFLogo({
  compact = false,
  className,
  onClick,
  label = 'MF Desenvolvimento',
}: MFLogoProps) {
  const reduced = useReducedMotion()
  const anim = !reduced

  const bracketOpacity = compact ? 0.28 : 0.58
  const transitionCss = anim
    ? 'fill-opacity 0.38s cubic-bezier(0.16,1,0.3,1)'
    : undefined

  const textProps = {
    dominantBaseline: 'central' as const,
    fontFamily:
      "var(--font-geist-mono, ui-monospace, 'Courier New', monospace)",
    fontWeight: 700,
    fontSize: FS,
    fill: 'rgb(61,242,224)',
    y: H / 2,
  }

  const enter = (delay: number) =>
    anim
      ? {
          initial: { opacity: 0, y: 5 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.42, ease },
        }
      : {}

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-cyan/70',
        className,
      )}
    >
      <span className="sr-only">{label}</span>

      {/*
        viewBox: 5 glyphs × CW + 2px left pad = ~68px wide, 30px tall.
        Each motion.text shares the same y, fontFamily, fontSize, fontWeight —
        so all three glyphs sit on the same baseline with identical metrics.
        overflow: visible keeps clipping off if font metrics differ slightly.
      */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 68 ${H}`}
        height="2em"
        style={{ width: 'auto', overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
        className="transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_9px_rgba(61,242,224,0.6))]"
      >
        {/* < */}
        <motion.text
          {...textProps}
          x={1}
          fillOpacity={bracketOpacity}
          style={{ fillOpacity: bracketOpacity, transition: transitionCss }}
          {...enter(0)}
        >
          {'<'}
        </motion.text>

        {/* MF */}
        <motion.text
          {...textProps}
          x={1 + CW}
          {...enter(0.08)}
        >
          MF
        </motion.text>

        {/* /> */}
        <motion.text
          {...textProps}
          x={1 + CW * 3}
          fillOpacity={bracketOpacity}
          style={{ fillOpacity: bracketOpacity, transition: transitionCss }}
          {...enter(0.16)}
        >
          {'/>'}
        </motion.text>
      </svg>
    </button>
  )
}
