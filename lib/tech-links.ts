import { SITE } from './constants'

// Terms sorted by length desc so longer matches win (e.g. "Next.js" before "JS")
const TECH_TERMS: [string, RegExp][] = (
  [
    'Next.js',
    'Vue.js',
    'Vue 3',
    'NestJS',
    'Node.js',
    'FastAPI',
    'RabbitMQ',
    'BullMQ',
    'GraphQL',
    'PostgreSQL',
    'TypeScript',
    'JavaScript',
    'Kubernetes',
    'Tailwind',
    'Drizzle',
    'Prisma',
    'Docker',
    'Python',
    'Celery',
    'GitHub',
    'Stripe',
    'Asaas',
    'Vercel',
    'MySQL',
    'Redis',
    'React',
    'Asaas',
    'tRPC',
    'CI/CD',
    'SaaS',
    'REST',
    'AWS',
    'MVP',
    'ERP',
    'API',
  ] as string[]
)
  .sort((a, b) => b.length - a.length)
  .map((term) => [
    term,
    new RegExp(`(?<![\\w/])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w/])`, 'g'),
  ])

/**
 * Replaces tech-term occurrences in rendered HTML with links to the site.
 * Skips text that is already inside an <a> tag.
 */
export function linkifyTechTerms(html: string): string {
  // Split into segments: tag tokens vs text tokens
  const segments = html.split(/(<[^>]+>)/g)

  let insideAnchor = 0
  const out: string[] = []

  for (const seg of segments) {
    if (seg.startsWith('<')) {
      // It's an HTML tag
      if (/^<a[\s>]/i.test(seg)) insideAnchor++
      if (/^<\/a>/i.test(seg)) insideAnchor = Math.max(0, insideAnchor - 1)
      out.push(seg)
      continue
    }

    if (insideAnchor > 0) {
      // Inside an existing anchor — don't nest
      out.push(seg)
      continue
    }

    // Plain text segment — replace tech terms
    let text = seg
    for (const [term, re] of TECH_TERMS) {
      re.lastIndex = 0
      text = text.replace(
        re,
        `<a href="${SITE.url}" class="text-cyan hover:text-foreground transition-colors underline decoration-cyan/30 hover:decoration-cyan/80" target="_blank" rel="noopener noreferrer">${term}</a>`,
      )
    }
    out.push(text)
  }

  return out.join('')
}
