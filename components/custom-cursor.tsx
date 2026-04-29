'use client'

import { useEffect, useState } from 'react'
import { useCursor } from '@/hooks/use-cursor'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { cn } from '@/lib/utils'

export function CustomCursor() {
  const { x, y, isHovering, isVisible } = useCursor()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [canUseCursor, setCanUseCursor] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const update = () => {
      const isFine = media.matches
      setCanUseCursor(isFine)
      document.documentElement.classList.toggle('cursor-active', isFine && !prefersReducedMotion)
    }

    update()
    media.addEventListener('change', update)

    return () => {
      media.removeEventListener('change', update)
      document.documentElement.classList.remove('cursor-active')
    }
  }, [prefersReducedMotion])

  if (!canUseCursor || prefersReducedMotion) return null

  return (
    <>
      {/* Dot */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed z-[9999] rounded-full transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          width: 8,
          height: 8,
          background: '#3DF2E0',
          top: y - 4,
          left: x - 4,
          mixBlendMode: 'difference',
          transition: 'opacity 0.3s',
        }}
      />
      {/* Ring */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed z-[9998] rounded-full border border-[#3DF2E0] transition-all duration-200',
          isVisible ? 'opacity-100' : 'opacity-0',
          isHovering ? 'scale-150 border-opacity-80' : 'scale-100'
        )}
        style={{
          width: 32,
          height: 32,
          top: y - 16,
          left: x - 16,
          mixBlendMode: 'difference',
          transition: 'transform 0.15s ease-out, opacity 0.3s',
        }}
      />
    </>
  )
}
