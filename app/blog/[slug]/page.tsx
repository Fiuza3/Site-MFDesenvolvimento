import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { SITE } from '@/lib/constants'

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
  const contentHtml = processedContent.toString()

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
    <main className="relative min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-5 py-8 sm:px-8 lg:px-10 2xl:px-14 border-b border-line">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-xs text-gray-text">
            <li><Link href="/" className="hover:text-cyan transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="hover:text-cyan transition-colors">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground truncate max-w-[200px]" aria-current="page">{post.title}</li>
          </ol>
        </nav>
      </div>

      <article className="px-5 py-20 sm:px-8 lg:px-10 2xl:px-14 max-w-4xl">
        <header className="mb-12">
          <time className="font-mono text-xs text-gray-text" dateTime={post.date}>{post.date}</time>
          <h1 className="text-[clamp(2rem,6vw,5rem)] font-black leading-[0.9] tracking-tighter mt-4 mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-gray-text leading-relaxed">{post.description}</p>
        </header>
        <div
          className="prose prose-invert prose-headings:font-black prose-headings:tracking-tight prose-p:text-gray-text prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-cyan max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  )
}
