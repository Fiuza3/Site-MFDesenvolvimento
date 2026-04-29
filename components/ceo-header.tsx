'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MFLogo } from '@/components/brand/mf-logo'
import { useScrollProgress } from '@/hooks/use-scroll-progress'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

const CEO_NAV_LINKS = [
  { href: '#ceo-inicio', label: 'Início' },
  { href: '#ceo-prova', label: 'Prova' },
  { href: '#ceo-stack', label: 'Stack' },
  { href: '#ceo-trajetoria', label: 'Trajetória' },
  { href: '#ceo-sobre', label: 'Sobre' },
]

export function CEOHeader() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          isScrolled ? 'border-b border-line bg-background/90 backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <div className="flex w-full items-center justify-between px-5 py-4 sm:px-8 lg:px-10 2xl:px-14">
          <MFLogo
            compact={isScrolled}
            label="Voltar para a página inicial"
            onClick={() => router.push('/')}
          />

          <nav aria-label="Navegação CEO" className="hidden items-center gap-8 md:flex">
            {CEO_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavClick(link.href)
                }}
                className="rounded px-1 py-0.5 font-mono text-sm tracking-wide text-gray-text transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded border border-cyan px-4 py-1.5 font-mono text-sm text-cyan transition-all duration-200 hover:bg-cyan hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            >
              Fale comigo
            </a>
          </nav>

          <button
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 rounded p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 md:hidden"
          >
            <span className={cn('block h-px w-6 bg-foreground transition-all', menuOpen && 'translate-y-2 rotate-45')} />
            <span className={cn('block h-px w-6 bg-foreground transition-all', menuOpen && 'opacity-0')} />
            <span className={cn('block h-px w-6 bg-foreground transition-all', menuOpen && '-translate-y-2 -rotate-45')} />
          </button>
        </div>

        <div
          className="absolute bottom-0 left-0 h-px bg-cyan transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 border-b border-line bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav aria-label="Menu CEO mobile" className="flex flex-col gap-1 px-6 py-6">
              {CEO_NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="rounded py-2 font-mono text-sm text-gray-text transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded border border-cyan px-4 py-2 text-center font-mono text-sm text-cyan transition-all hover:bg-cyan hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
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
