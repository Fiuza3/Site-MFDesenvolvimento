'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

interface CountUpStatProps {
  value: number
  suffix?: string
  prefix?: string
  padStart?: number
  label: string
}

function expoOut(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function CountUpStat({ value, suffix = '', prefix = '', padStart, label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = usePrefersReducedMotion()
  const [current, setCurrent] = useState(prefersReducedMotion ? value : 0)

  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      if (prefersReducedMotion) setCurrent(value)
      return
    }

    const duration = 1200
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCurrent(Math.round(value * expoOut(progress)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [inView, prefersReducedMotion, value])

  const display = String(current).padStart(padStart ?? 0, '0')

  return (
    <div ref={ref} className="group relative border-l border-line pl-4 transition-colors hover:border-cyan">
      <span className="font-mono text-[clamp(1.65rem,4vw,3rem)] font-black leading-none text-cyan">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="mt-2 block max-w-28 text-xs leading-tight text-gray-text">{label}</span>
    </div>
  )
}

