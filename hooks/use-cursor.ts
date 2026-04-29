'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isVisible: boolean
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isVisible: false,
  })
  const rafRef = useRef<number>(0)
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      setCursor((prev) => ({ ...prev, isVisible: true, x: e.clientX, y: e.clientY }))
    }

    const handleEnter = () => setCursor((prev) => ({ ...prev, isVisible: true }))
    const handleLeave = () => setCursor((prev) => ({ ...prev, isVisible: false }))

    const handleHoverStart = () =>
      setCursor((prev) => ({ ...prev, isHovering: true }))
    const handleHoverEnd = () =>
      setCursor((prev) => ({ ...prev, isHovering: false }))

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseleave', handleLeave)

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], [data-cursor-hover]'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseleave', handleLeave)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return cursor
}
