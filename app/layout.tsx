import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CustomCursor } from '@/components/custom-cursor'
import { SITE } from '@/lib/constants'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Marcus Fiuza — Desenvolvedor Full Stack Sênior | Belo Horizonte, MG',
    template: '%s | MF Desenvolvimento',
  },
  description:
    'Desenvolvedor full stack sênior PJ em Belo Horizonte/MG. Especialista em Next.js, Vue.js e NestJS para SaaS sob medida, APIs REST e consultoria técnica. Emite NFS-e.',
  authors: [{ name: 'Marcus Fiuza', url: SITE.url }],
  creator: 'Marcus Fiuza',
  keywords: [
    'desenvolvedor freelancer Belo Horizonte',
    'desenvolvedor full stack sênior BH',
    'criação de SaaS sob medida',
    'desenvolvimento de API REST Brasil',
    'consultoria técnica software Next.js NestJS Vue.js',
    'desenvolvedor Vue.js Node.js freelancer',
    'desenvolvedor freelancer',
    'engenheiro de software BH',
    'Next.js',
    'SaaS',
    'API REST',
    'TypeScript',
    'NestJS',
    'Vue.js',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    title: 'Marcus Fiuza — Desenvolvedor Full Stack Sênior | Belo Horizonte, MG',
    description:
      'Desenvolvedor full stack sênior PJ em Belo Horizonte/MG. Especialista em Next.js, Vue.js e NestJS para SaaS, APIs REST e consultoria técnica.',
    siteName: SITE.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Marcus Fiuza — MF Desenvolvimento',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcus Fiuza — Desenvolvedor Full Stack Sênior | BH',
    description:
      'Desenvolvedor full stack sênior PJ em Belo Horizonte/MG. Next.js, Vue.js, NestJS, SaaS, APIs REST.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  // verification: { google: 'SEU_TOKEN_AQUI' }, // TODO: adicionar após verificar no Search Console
}

export const viewport: Viewport = {
  themeColor: '#0B0F14',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: 'Marcus Fiuza',
        givenName: 'Marcus',
        familyName: 'Fiuza',
        jobTitle: 'CEO & Founder | Desenvolvedor Full Stack Sênior',
        description:
          'Desenvolvedor Full Stack Sênior com +3 anos de experiência em produto, ERP, APIs, SaaS e infraestrutura. Especializado em Vue 3, Node.js, Next.js e TypeScript.',
        url: SITE.url,
        email: `mailto:${SITE.email}`,
        image: `${SITE.url}/marcus-fiuza.jpg`,
        sameAs: [SITE.github, SITE.linkedin],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Belo Horizonte',
          addressRegion: 'MG',
          addressCountry: 'BR',
        },
        worksFor: { '@id': `${SITE.url}/#organization` },
        knowsAbout: [
          'Next.js',
          'Vue.js',
          'NestJS',
          'Node.js',
          'TypeScript',
          'PostgreSQL',
          'MySQL',
          'Redis',
          'Docker',
          'Clean Architecture',
          'SaaS Multi-tenant',
          'APIs REST',
          'GraphQL',
        ],
      },
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: 'MF Desenvolvimento',
        url: SITE.url,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/logo.png`,
          width: 512,
          height: 512,
        },
        description:
          'Desenvolvimento de software sob medida — SaaS, APIs REST e sistemas web de alto desempenho para startups e empresas médias.',
        founder: { '@id': `${SITE.url}/#person` },
        email: SITE.email,
        telephone: SITE.phone,
        priceRange: '$$$',
        areaServed: ['Brasil', 'América Latina'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Belo Horizonte',
          addressRegion: 'MG',
          addressCountry: 'BR',
        },
        sameAs: [SITE.github, SITE.linkedin],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços de Desenvolvimento',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Produtos SaaS',
                description:
                  'Arquitetura multi-tenant, billing integrado e painéis que escalam sem refatoração.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'APIs & Integrações',
                description:
                  'REST e GraphQL com documentação gerada, versionamento e observabilidade desde o dia 1.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Apps',
                description:
                  'Aplicações críticas que precisam de performance real, não de promessas de apresentação.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Consultoria Técnica',
                description:
                  'Diagnóstico, arquitetura e revisão técnica para decidir melhor antes de gastar meses construindo.',
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${SITE.url}/#organization` },
      },
    ],
  }

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:border focus:border-cyan focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-cyan focus:outline-none"
        >
          Ir para o conteúdo principal
        </a>
        <CustomCursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
