'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { useScrollProgress } from '@/hooks/use-scroll-progress'
import { MFLogo } from '@/components/brand/mf-logo'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const progress = useScrollProgress()

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Focus trap effect
  useEffect(() => {
    if (!menuOpen) return
    const menu = menuRef.current
    if (!menu) return
    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])')
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [menuOpen])

  // Escape key effect
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'border-b border-line bg-background/90 backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <div className="flex w-full items-center justify-between px-5 py-4 sm:px-8 lg:px-10 2xl:px-14">
          {/* Logo */}
          <MFLogo
            compact={isScrolled}
            label="Ir para o topo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Desktop nav */}
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className="rounded px-1 py-0.5 text-sm text-gray-text hover:text-foreground transition-colors font-mono tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded border border-cyan px-4 py-1.5 font-mono text-sm text-cyan hover:bg-cyan hover:text-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            >
              Fale comigo
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 rounded p-2 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
          >
            <span className={cn('block h-px w-6 bg-foreground transition-all', menuOpen && 'translate-y-2 rotate-45')} />
            <span className={cn('block h-px w-6 bg-foreground transition-all', menuOpen && 'opacity-0')} />
            <span className={cn('block h-px w-6 bg-foreground transition-all', menuOpen && '-translate-y-2 -rotate-45')} />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-px bg-cyan transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 border-b border-line bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav aria-label="Menu mobile" className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="rounded py-2 font-mono text-sm text-gray-text hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded border border-cyan px-4 py-2 text-center font-mono text-sm text-cyan hover:bg-cyan hover:text-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
              >
                Fale comigo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
