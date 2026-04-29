import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CustomCursor } from '@/components/custom-cursor'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Marcus Fiuza — CEO da MF Desenvolvimento',
  description:
    'Desenvolvimento de software sob medida — SaaS, APIs e sistemas web de alto desempenho. Belo Horizonte, MG.',
  authors: [{ name: 'Marcus Fiuza' }],
  creator: 'Marcus Fiuza',
  keywords: [
    'desenvolvedor freelancer',
    'engenheiro de software',
    'Next.js',
    'SaaS',
    'API',
    'Belo Horizonte',
    'TypeScript',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mfdev.com.br',
    title: 'Marcus Fiuza — CEO da MF Desenvolvimento',
    description:
      'Desenvolvimento de software sob medida — SaaS, APIs e sistemas web de alto desempenho.',
    siteName: 'MF Desenvolvimento',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcus Fiuza — CEO da MF Desenvolvimento',
    description:
      'Desenvolvimento de software sob medida — SaaS, APIs e sistemas web de alto desempenho.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        name: 'Marcus Fiuza',
        jobTitle: 'CEO & Founder da MF Desenvolvimento',
        url: 'https://mfdev.com.br',
        email: 'devfiuza@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Belo Horizonte',
          addressRegion: 'MG',
          addressCountry: 'BR',
        },
      },
      {
        '@type': 'WebSite',
        name: 'MF Desenvolvimento',
        url: 'https://mfdev.com.br',
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
