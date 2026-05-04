import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { linkifyTechTerms } from '@/lib/tech-links'
import { SITE } from '@/lib/constants'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: `${SITE.url}/blog/${slug}`,
      title: post.title,
      description: post.description,
      siteName: SITE.name,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const processedContent = await remark().use(remarkHtml).process(post.content)
  const contentHtml = linkifyTechTerms(processedContent.toString())

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${SITE.url}/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'pt-BR',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${slug}` },
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#organization` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main id="main-content" className="relative min-h-screen bg-background text-foreground">
        {/* Hero / header */}
        <section className="hero-shell relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:px-10 2xl:px-14">
          <div className="hero-noise pointer-events-none" aria-hidden="true" />

          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-mono text-xs text-gray-text">
              <li>
                <Link href="/" className="hover:text-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-cyan transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                className="text-foreground truncate max-w-[240px]"
                aria-current="page"
              >
                {post.title}
              </li>
            </ol>
          </nav>

          <time
            className="font-mono text-xs text-cyan"
            dateTime={post.date}
          >
            {post.date}
          </time>
          <h1 className="mt-4 text-[clamp(2rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter text-foreground max-w-4xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-text leading-relaxed">
            {post.description}
          </p>
        </section>

        {/* Article body */}
        <article className="px-5 py-20 sm:px-8 lg:px-10 2xl:px-14">
          <div
            className="prose prose-invert max-w-3xl
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-text prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-cyan prose-a:no-underline hover:prose-a:text-foreground
              prose-li:text-gray-text prose-li:leading-relaxed
              prose-ul:my-4 prose-ol:my-4
              prose-blockquote:border-l-cyan prose-blockquote:text-gray-text
              prose-code:text-cyan prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-surface prose-pre:border prose-pre:border-line"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* CTA */}
          <div className="mt-20 max-w-3xl border border-line bg-surface/60 p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan mb-4">
              {'// contato'}
            </p>
            <p className="text-xl font-black tracking-tight text-foreground mb-2">
              Vamos conversar sobre o seu projeto?
            </p>
            <p className="text-gray-text text-sm mb-6 leading-relaxed">
              Diagnóstico técnico, arquitetura e desenvolvimento sob medida para startups e empresas.
            </p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-cyan px-6 py-2.5 font-mono text-sm text-cyan hover:bg-cyan hover:text-background transition-all duration-200"
            >
              Fale comigo →
            </a>
          </div>

          {/* Back link */}
          <div className="mt-10 max-w-3xl border-t border-line pt-8">
            <Link
              href="/blog"
              className="font-mono text-sm text-gray-text hover:text-cyan transition-colors"
            >
              ← Voltar para o blog
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
