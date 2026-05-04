import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { SITE } from '@/lib/constants'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Blog Técnico',
  description:
    'Artigos sobre desenvolvimento de software, SaaS, APIs, Vue.js, Next.js e boas práticas de arquitetura. Por Marcus Fiuza, desenvolvedor full stack sênior em BH.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${SITE.url}/blog`,
    title: 'Blog Técnico — MF Desenvolvimento',
    description: 'Artigos sobre SaaS, APIs, Vue.js, Next.js e arquitetura de software.',
    siteName: SITE.name,
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Técnico — MF Desenvolvimento',
    url: `${SITE.url}/blog`,
    description: 'Artigos técnicos sobre desenvolvimento de software por Marcus Fiuza.',
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'pt-BR',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Navbar />

      <main id="main-content" className="relative min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="hero-shell relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 lg:px-10 2xl:px-14">
          <div className="hero-noise pointer-events-none" aria-hidden="true" />

          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-mono text-xs text-gray-text">
              <li>
                <Link href="/" className="hover:text-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>

          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan mb-4">
            {'// blog'}
          </p>
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.88] tracking-tighter mb-6 text-foreground">
            Blog<br />
            <span className="text-cyan">Técnico</span>
          </h1>
          <p className="max-w-xl text-gray-text leading-relaxed">
            Reflexões sobre arquitetura, produto e a realidade do desenvolvimento de software sob medida.
          </p>
        </section>

        {/* Posts grid */}
        <section className="px-5 py-20 sm:px-8 lg:px-10 2xl:px-14">
          {posts.length === 0 ? (
            <p className="font-mono text-gray-text">
              <span className="text-cyan">$</span> Nenhum post publicado ainda.
            </p>
          ) : (
            <ul className="grid gap-px border border-line">
              {posts.map((post, i) => (
                <li key={post.slug} className="border-b border-line last:border-b-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3 bg-surface/40 p-8 transition-colors hover:bg-surface sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="flex-1">
                      <span className="font-mono text-xs text-cyan mr-4 select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <time className="font-mono text-xs text-gray-text" dateTime={post.date}>
                        {post.date}
                      </time>
                      <h2 className="mt-3 text-xl font-black tracking-tight text-foreground group-hover:text-cyan transition-colors sm:text-2xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-gray-text leading-relaxed max-w-2xl">
                        {post.description}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs text-gray-text group-hover:text-cyan transition-colors self-end sm:self-start whitespace-nowrap"
                      aria-hidden="true"
                    >
                      {'ler →'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
