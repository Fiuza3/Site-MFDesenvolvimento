import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/content/services'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Serviços de Desenvolvimento',
  description:
    'SaaS sob medida, APIs REST, Web Apps e Consultoria Técnica para startups e empresas. Desenvolvedor full stack sênior PJ em Belo Horizonte/MG.',
  alternates: { canonical: '/servicos' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${SITE.url}/servicos`,
    title: 'Serviços — MF Desenvolvimento',
    description: 'SaaS, APIs, Web Apps e Consultoria Técnica. Desenvolvedor full stack sênior BH.',
    siteName: SITE.name,
  },
}

export default function ServicosPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground px-5 py-20 sm:px-8 lg:px-10 2xl:px-14">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan mb-6">// serviços</p>
      <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.88] tracking-tighter mb-12">
        Serviços de Desenvolvimento
      </h1>
      <ul className="grid gap-5 md:grid-cols-2">
        {SERVICES.map((service) => (
          <li key={service.id}>
            <Link
              href={`/servicos/${service.id}`}
              className="group block rounded border border-line bg-surface/80 p-6 transition-colors hover:border-cyan/50"
            >
              <p className="font-mono text-xs text-cyan mb-3">{service.tag}</p>
              <h2 className="text-xl font-black tracking-tight text-foreground mb-2 group-hover:text-cyan transition-colors">
                {service.title}
              </h2>
              <p className="text-sm text-gray-text leading-relaxed">{service.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
