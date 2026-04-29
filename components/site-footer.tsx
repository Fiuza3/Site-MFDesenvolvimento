'use client'

import { SITE, NAV_LINKS } from '@/lib/constants'
import { MFLogo } from '@/components/brand/mf-logo'

export function SiteFooter() {
  const year = new Date().getFullYear()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-line py-16 lg:py-24" aria-label="Rodapé do site">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      <div className="w-full px-5 sm:px-8 lg:px-10 2xl:px-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <div className="mb-8">
              <MFLogo
                label="Voltar ao topo"
                className="text-2xl"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            <p
              aria-hidden="true"
              className="select-none font-mono text-[clamp(5rem,24vw,24rem)] font-black leading-[0.76] tracking-tighter text-cyan/10"
            >
              {'<MF/>'}
            </p>
          </div>

          <div className="grid gap-8 font-mono">
            <div className="rounded border border-line bg-surface p-5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-gray-text"><span lang="en">runtime summary</span></p>
              <div className="mt-5 grid gap-3 text-sm">
                <p className="flex items-center justify-between gap-4 border-b border-line pb-2">
                  <span className="text-gray-text">location</span>
                  <span className="text-foreground">{SITE.location}</span>
                </p>
                <p className="flex items-center justify-between gap-4 border-b border-line pb-2">
                  <span className="text-gray-text" lang="en">contract mode</span>
                  <span className="text-foreground">PJ / NFS-e</span>
                </p>
                <p className="flex items-center justify-between gap-4 border-b border-line pb-2">
                  <span className="text-gray-text">contact</span>
                  <a href={`mailto:${SITE.email}`} className="text-cyan hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70">
                    {SITE.email}
                  </a>
                </p>
                <p className="flex items-center justify-between gap-4">
                  <span className="text-gray-text">status</span>
                  <span className="text-cyan" lang="en">available</span>
                </p>
              </div>
            </div>

            <nav aria-label="Links do rodapé" className="flex flex-wrap gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className="rounded border border-line px-3 py-2 text-xs text-gray-text transition-colors hover:border-cyan/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-line pt-6 text-xs text-gray-text sm:flex-row sm:items-center sm:justify-between">
              <p>© {year} {SITE.name}</p>
              <p>
                <span className="text-cyan">$</span> <span lang="en">process.exit(0)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

