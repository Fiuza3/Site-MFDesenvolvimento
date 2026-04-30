import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { SITE } from '@/lib/constants'

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
    <main className="relative min-h-screen bg-background text-foreground px-5 py-20 sm:px-8 lg:px-10 2xl:px-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan mb-6">// blog</p>
      <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.88] tracking-tighter mb-12">
        Blog Técnico
      </h1>
      {posts.length === 0 ? (
        <p className="text-gray-text">Nenhum post publicado ainda.</p>
      ) : (
        <ul className="grid gap-6 max-w-3xl">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded border border-line bg-surface/80 p-6 hover:border-cyan/50 transition-colors"
              >
                <time className="font-mono text-xs text-gray-text" dateTime={post.date}>{post.date}</time>
                <h2 className="text-xl font-black tracking-tight text-foreground mt-2 mb-3 group-hover:text-cyan transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-text leading-relaxed">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
