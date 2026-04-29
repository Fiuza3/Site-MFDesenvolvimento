'use client'

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

export interface TerminalScene {
  command: string
  output: string[]
  status: string
}

export function useTerminalLoop(scenes: TerminalScene[], paused: boolean, delay = 3000) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (paused || prefersReducedMotion || scenes.length <= 1) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % scenes.length)
    }, delay)

    return () => window.clearInterval(timer)
  }, [delay, paused, prefersReducedMotion, scenes.length])

  return {
    scene: scenes[index],
    index,
    prefersReducedMotion,
    setIndex,
  }
}

