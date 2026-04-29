import type { Metadata } from 'next'
import Link from 'next/link'
import { MFLogo } from '@/components/brand/mf-logo'

export const metadata: Metadata = {
  title: '404 — Página não encontrada',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="hero-shell relative flex min-h-[100svh] overflow-hidden">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-radial" aria-hidden="true" />

      <div className="relative z-10 flex w-full flex-col justify-between px-5 py-8 sm:px-8 lg:px-10 2xl:px-14">
        <div className="flex items-center justify-between">
          <MFLogo label="MF Desenvolvimento" />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-gray-text">route.missing</span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-cyan">// 404</p>
            <h1 className="max-w-6xl text-[clamp(4rem,16vw,16rem)] font-black leading-[0.78] tracking-tighter text-foreground">
              Rota nao encontrada.
            </h1>
          </div>

          <div className="rounded border border-line bg-surface p-5 font-mono lg:p-8">
            <p className="text-sm text-foreground">
              <span className="text-cyan">$</span> resolve --path current
            </p>
            <p className="mt-3 text-sm text-gray-text">
              <span className="text-cyan/70">&gt;</span> essa tela nao existe ou foi movida.
            </p>
            <p className="mt-2 text-sm text-gray-text">
              <span className="text-cyan/70">&gt;</span> retorno seguro disponivel.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex rounded border border-cyan bg-cyan px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background transition-colors hover:bg-transparent hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
            >
              voltar para home
            </Link>
          </div>
        </section>

        <p className="font-mono text-xs text-gray-text">
          <span className="text-cyan">$</span> fallback.rendered
        </p>
      </div>
    </main>
  )
}

