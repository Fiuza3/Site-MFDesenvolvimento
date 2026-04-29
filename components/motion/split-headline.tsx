'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { motionEase } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

const SOFTWARE = 'Software'
const TYPED = 'de verdade.'

export function SplitHeadline() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [typed, setTyped] = useState(prefersReducedMotion ? TYPED : '')

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(TYPED)
      return
    }

    setTyped('')
    let frame = 0
    const timers = TYPED.split('').map((_, index) =>
      window.setTimeout(() => {
        frame = index + 1
        setTyped(TYPED.slice(0, frame))
      }, 940 + index * 72)
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [prefersReducedMotion])

  return (
    <h1 className="hero-headline text-[clamp(2.85rem,13vw,9.5rem)] font-black leading-[0.84] tracking-tight text-foreground">
      <span className="group/word block overflow-hidden pb-3" aria-label={SOFTWARE}>
        {SOFTWARE.split('').map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 44, rotateX: -45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: index * 0.04,
              duration: 0.64,
              ease: motionEase.expoOut,
            }}
            className="inline-block origin-bottom transition-[color,transform,font-weight] duration-300 group-hover/word:translate-y-[-0.03em] group-hover/word:text-cyan group-hover/word:[font-weight:850]"
          >
            {letter}
          </motion.span>
        ))}
      </span>

      <span className="group/word block overflow-hidden pb-3">
        <motion.span
          initial={prefersReducedMotion ? false : { y: '110%', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.46, duration: 0.76, ease: motionEase.expoOut }}
          className="inline-block text-gray-text transition-[color,transform,font-weight] duration-300 group-hover/word:translate-x-2 group-hover/word:text-foreground group-hover/word:[font-weight:780]"
        >
          que funciona
        </motion.span>
      </span>

      <span className="group/word block min-h-[0.94em] text-foreground">
        <span className="transition-[color,font-weight] duration-300 group-hover/word:text-cyan group-hover/word:[font-weight:850]">
          {typed}
        </span>
        <span aria-hidden="true" className="hero-type-cursor ml-2 inline-block h-[0.72em] w-[0.055em] translate-y-[0.08em] bg-cyan" />
      </span>
    </h1>
  )
}
