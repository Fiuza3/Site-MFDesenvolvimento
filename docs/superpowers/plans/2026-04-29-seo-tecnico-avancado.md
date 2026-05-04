# SEO Técnico Avançado — MF Desenvolvimento

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar SEO técnico production-grade no site de Marcus Fiuza para rankeamento orgânico nos termos de busca alvo (desenvolvedor freelancer BH, full stack sênior, SaaS sob medida, etc.).

**Architecture:** Uso exclusivo da Metadata API nativa do Next.js 16 (sem next-seo), `@graph` JSON-LD com três entidades (Person/Organization/WebSite), sitemap e robots gerados via Route Handlers nativos, blog em MDX, e OG image dinâmica via `ImageResponse`. Nenhuma mudança visual.

**Tech Stack:** Next.js 16 App Router, TypeScript, `@next/mdx`, `gray-matter`, `remark`, `@vercel/speed-insights`

---

## Contexto Crítico

- **Domínio de produção:** `https://mfdev.com.br` (usar este em todo canonical/JSON-LD)
- **Domínio alternativo em `portfolio.ts`:** `www.mfdesenvolvimento.online` (ignorar — usar mfdev.com.br)
- **`/app/CEO/page.tsx`:** Não há nenhum link interno apontando para `/CEO`. A renomeação para `/sobre` é segura.
- **`/public/`:** Completamente vazia. Todos os assets de mídia precisam ser criados.
- **`next.config.mjs`:** Tem `images.unoptimized: true` — confirmar com usuário se deploy é Vercel antes de remover (Task 11).
- **JSON-LD existente em `layout.tsx`:** Já tem `@graph` com Person e WebSite mínimos — Task 3 expande completamente.
- **`not-found.tsx`:** Não tem `metadata` — Task 13 adiciona.

---

## Mapa de Arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `lib/constants.ts` | Modificar | Adicionar `url`, `phone`, `phoneDisplay` ao objeto SITE |
| `app/layout.tsx` | Modificar | Metadata API completa + JSON-LD `@graph` com 3 entidades |
| `app/sitemap.ts` | Criar | Sitemap dinâmico com todas as rotas |
| `app/robots.ts` | Criar | Configuração robots.txt |
| `app/manifest.ts` | Criar | PWA manifest |
| `app/CEO/page.tsx` → `app/sobre/page.tsx` | Mover + modificar | Metadata + JSON-LD ProfilePage |
| `app/servicos/page.tsx` | Criar | Listagem de serviços com metadata |
| `app/servicos/[slug]/page.tsx` | Criar | Página por serviço com Schema, FAQ, Breadcrumb |
| `app/opengraph-image.tsx` | Criar | OG image dinâmica da home (1200×630) |
| `app/sobre/opengraph-image.tsx` | Criar | OG image dinâmica da página sobre |
| `app/blog/page.tsx` | Criar | Listagem do blog |
| `app/blog/[slug]/page.tsx` | Criar | Post individual com BlogPosting schema |
| `content/blog/` | Criar | Pasta com 3 posts MDX de exemplo |
| `app/not-found.tsx` | Modificar | Adicionar metadata `robots: noindex` |
| `next.config.mjs` | Modificar | Adicionar suporte MDX, compress, poweredByHeader |
| `public/` | Criar assets | favicon, icons, og-image, marcus-fiuza.jpg, logo |
| `app/google-tag.tsx` | Criar | Placeholder para GA4 |

---

## Task 1 — Expandir `lib/constants.ts`

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Adicionar `url`, `phone` e `phoneDisplay` ao objeto SITE**

```typescript
// lib/constants.ts
export const SITE = {
  name: 'MF Desenvolvimento',
  handle: '<MF/>',
  author: 'Marcus Fiuza',
  role: 'CEO & Founder | Desenvolvedor Full Stack',
  location: 'Belo Horizonte, MG',
  email: 'devfiuza@gmail.com',
  whatsapp: 'https://wa.me/5531972379038',
  github: 'https://github.com/devfiuza',
  linkedin: 'https://linkedin.com/in/devfiuza',
  url: 'https://mfdev.com.br',
  phone: '+5531972379038',
  phoneDisplay: '+55 (31) 97237-9038',
  description:
    'Desenvolvimento de software sob medida — SaaS, APIs e sistemas web de alto desempenho.',
} as const
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat(seo): add url, phone and phoneDisplay to SITE constants"
```

---

## Task 2 — Reescrever metadata em `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Substituir o export `metadata` e adicionar export `viewport`**

Substituir o bloco `export const metadata: Metadata = { ... }` existente (linhas 17–51) por:

```typescript
import type { Metadata, Viewport } from 'next'
import { SITE } from '@/lib/constants'

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
```

- [ ] **Step 2: Confirmar que o import de `Viewport` está incluído na linha 1**

A linha 1 deve ficar:
```typescript
import type { Metadata, Viewport } from 'next'
```

- [ ] **Step 3: Verificar que `pnpm build` compila sem erros de metadata**

```bash
pnpm build
```

Esperado: sem erros de tipo ou warnings de metadata.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): rewrite layout metadata with full Metadata API, viewport export"
```

---

## Task 3 — Expandir JSON-LD para `@graph` com 3 entidades

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Substituir o objeto `jsonLd` dentro de `RootLayout`**

Localizar o bloco `const jsonLd = { ... }` (linhas 58–80 do layout original) e substituir por:

```typescript
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
```

- [ ] **Step 2: Verificar que `SITE` está importado no topo do arquivo**

A linha de import deve ser:
```typescript
import { SITE } from '@/lib/constants'
```

- [ ] **Step 3: Verificar build sem erros**

```bash
pnpm build
```

Esperado: sem erros de TypeScript.

- [ ] **Step 4: Inspecionar o JSON-LD no browser**

Rodar `pnpm dev`, acessar `http://localhost:3000`, abrir DevTools → Sources e confirmar que o `<script type="application/ld+json">` contém as três entidades com `@id` correto.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx lib/constants.ts
git commit -m "feat(seo): expand JSON-LD to @graph with Person, Organization, WebSite entities"
```

---

## Task 4 — Criar `app/sitemap.ts`

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Criar o arquivo**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { PROJECTS } from '@/content/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE.url}/projetos/${project.id}`,
    lastModified: new Date(`${project.year}-01-01`),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE.url}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/servicos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/servicos/saas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/servicos/apis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/servicos/web-apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/servicos/consultoria`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectRoutes,
  ]
}
```

- [ ] **Step 2: Verificar build e rota**

```bash
pnpm build && pnpm start
```

Acessar `http://localhost:3000/sitemap.xml` — deve retornar XML válido com todas as URLs.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): create dynamic sitemap with all routes"
```

---

## Task 5 — Criar `app/robots.ts`

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Criar o arquivo**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
```

- [ ] **Step 2: Verificar rota**

Iniciar `pnpm dev` e acessar `http://localhost:3000/robots.txt`.

Esperado:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Sitemap: https://mfdev.com.br/sitemap.xml
Host: https://mfdev.com.br
```

- [ ] **Step 3: Commit**

```bash
git add app/robots.ts
git commit -m "feat(seo): create robots.ts with sitemap reference"
```

---

## Task 6 — Criar `app/manifest.ts`

**Files:**
- Create: `app/manifest.ts`

- [ ] **Step 1: Criar o arquivo**

```typescript
// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MF Desenvolvimento — Marcus Fiuza',
    short_name: 'MF Dev',
    description:
      'Desenvolvedor full stack sênior PJ em Belo Horizonte/MG. Next.js, Vue.js, NestJS, SaaS, APIs REST.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F14',
    theme_color: '#0B0F14',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

- [ ] **Step 2: Verificar rota**

Acessar `http://localhost:3000/manifest.webmanifest` — deve retornar JSON válido.

- [ ] **Step 3: Commit**

```bash
git add app/manifest.ts
git commit -m "feat(seo): create PWA manifest"
```

---

## Task 7 — Renomear `/app/CEO` para `/app/sobre` e atualizar metadata

**Files:**
- Create: `app/sobre/page.tsx` (conteúdo de `app/CEO/page.tsx` com metadata expandida)
- Create: `app/sobre/opengraph-image.tsx`
- Delete: `app/CEO/page.tsx` (após criar `/sobre`)

**Contexto:** Não há nenhum link interno apontando para `/CEO` no projeto. A renomeação não vai quebrar nada internamente — apenas URLs externas eventualmente bookmarkadas.

- [ ] **Step 1: Criar pasta `app/sobre/` e copiar o conteúdo de `app/CEO/page.tsx`**

Criar `app/sobre/page.tsx` com o conteúdo idêntico ao atual `app/CEO/page.tsx`, mas substituindo o bloco de `metadata` por:

```typescript
export const metadata: Metadata = {
  title: 'Sobre Marcus Fiuza — CEO da MF Desenvolvimento',
  description:
    'Perfil profissional de Marcus Fiuza: CEO e Founder da MF Desenvolvimento, desenvolvedor full stack sênior com +3 anos em Vue.js, Node.js, Next.js, TypeScript, SaaS e infraestrutura. Belo Horizonte, MG.',
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    type: 'profile',
    locale: 'pt_BR',
    url: 'https://mfdev.com.br/sobre',
    title: 'Sobre Marcus Fiuza — CEO da MF Desenvolvimento',
    description:
      'CEO e Founder da MF Desenvolvimento. Desenvolvedor full stack sênior especializado em Vue.js, Node.js, Next.js, TypeScript e SaaS. Belo Horizonte, MG.',
    siteName: 'MF Desenvolvimento',
    images: [{ url: '/sobre/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Marcus Fiuza — CEO da MF Desenvolvimento',
    description:
      'CEO e Founder da MF Desenvolvimento. Full stack sênior: Vue.js, Node.js, Next.js, SaaS.',
  },
}
```

E adicionar o JSON-LD de ProfilePage **antes do `return`** na função `CEOPage` (renomear para `SobrePage`):

```typescript
const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: { '@id': 'https://mfdev.com.br/#person' },
  url: 'https://mfdev.com.br/sobre',
  name: 'Sobre Marcus Fiuza',
}
```

Adicionar no `<main>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
/>
```

- [ ] **Step 2: Deletar `app/CEO/page.tsx`**

```bash
rm "app/CEO/page.tsx"
rmdir "app/CEO"
```

- [ ] **Step 3: Criar `app/sobre/opengraph-image.tsx`** (ver Task 9 para padrão — criar versão "Sobre Marcus Fiuza" com subtítulo diferente)

```tsx
// app/sobre/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sobre Marcus Fiuza — MF Desenvolvimento'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function SobreOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0F14',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', color: '#3DF2E0', fontSize: 18, letterSpacing: '0.2em' }}>
          {'<MF/>'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ color: '#3DF2E0', fontSize: 20, letterSpacing: '0.3em' }}>
            // sobre
          </div>
          <div style={{ color: '#F7FAFC', fontSize: 72, fontWeight: 900, lineHeight: 1 }}>
            Marcus Fiuza
          </div>
          <div style={{ color: '#9BA3AF', fontSize: 32, fontWeight: 700 }}>
            CEO & Founder — MF Desenvolvimento
          </div>
        </div>
        <div style={{ color: '#4B5563', fontSize: 18, letterSpacing: '0.1em' }}>
          mfdev.com.br/sobre
        </div>
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 4: Verificar que `/sobre` carrega sem erros**

```bash
pnpm dev
```

Acessar `http://localhost:3000/sobre` — deve renderizar identicamente ao antigo `/CEO`.

- [ ] **Step 5: Commit**

```bash
git add app/sobre/
git rm app/CEO/page.tsx
git commit -m "feat(seo): rename /CEO to /sobre, add ProfilePage schema and OG image"
```

---

## Task 8 — Criar páginas de serviços `app/servicos/[slug]/page.tsx`

**Files:**
- Create: `app/servicos/page.tsx`
- Create: `app/servicos/[slug]/page.tsx`

**Nota:** As páginas de serviço exigem conteúdo de +600 palavras cada. O plano inclui drafts baseados em `content/services.ts`. Revisar antes de publicar.

- [ ] **Step 1: Criar `app/servicos/page.tsx`** — página index de serviços

```typescript
// app/servicos/page.tsx
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
    <main>
      <h1>Serviços de Desenvolvimento</h1>
      <ul>
        {SERVICES.map((service) => (
          <li key={service.id}>
            <Link href={`/servicos/${service.id}`}>{service.title}</Link>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

**Nota:** Aplicar a identidade visual existente (classes do design system) aos elementos da listagem.

- [ ] **Step 2: Criar `app/servicos/[slug]/page.tsx`**

```typescript
// app/servicos/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/content/services'
import { SITE } from '@/lib/constants'

const SERVICE_META: Record<string, { title: string; description: string; h1: string }> = {
  saas: {
    title: 'Desenvolvimento de SaaS sob medida — BH',
    description:
      'Criação de produtos SaaS multi-tenant em Belo Horizonte/MG. Arquitetura escalável, billing Stripe/Asaas, dashboards em tempo real. Desenvolvedor full stack sênior PJ.',
    h1: 'Desenvolvimento de Produtos SaaS sob Medida em Belo Horizonte',
  },
  apis: {
    title: 'Desenvolvimento de API REST — Integrações e Webhooks',
    description:
      'APIs REST e GraphQL com documentação, versionamento e observabilidade. Rate limiting, JWT/OAuth, webhooks e filas. Desenvolvedor Node.js/NestJS PJ em BH.',
    h1: 'APIs REST & Integrações para Startups e Empresas',
  },
  'web-apps': {
    title: 'Desenvolvimento de Web Apps — ERPs, Portais B2B, Sistemas',
    description:
      'Web apps críticos com performance real: ERPs, portais B2B, extranets e migração de legados. Core Web Vitals < 2.5s LCP. Desenvolvedor full stack sênior em BH.',
    h1: 'Desenvolvimento de Web Apps de Alta Performance',
  },
  consultoria: {
    title: 'Consultoria Técnica em Software — Arquitetura e Revisão',
    description:
      'Diagnóstico, arquitetura e code review para founders e CTOs. Roadmap técnico com critérios de aceite antes de gastar meses construindo. Belo Horizonte/MG.',
    h1: 'Consultoria Técnica em Software: Diagnóstico Antes do Código',
  },
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = SERVICE_META[slug]
  if (!meta) return {}

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/servicos/${slug}` },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `${SITE.url}/servicos/${slug}`,
      title: meta.title,
      description: meta.description,
      siteName: SITE.name,
    },
  }
}

const SERVICE_CONTENT: Record<string, {
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ q: string; a: string }>
}> = {
  saas: {
    intro:
      'Construir um SaaS do zero é diferente de construir um site ou um sistema interno. O erro mais comum é tratar como se fosse. A arquitetura multi-tenant exige isolamento de dados entre clientes, um modelo de billing que não quebre na upgrade, e painéis que escalam conforme o número de usuários cresce — sem refatoração de emergência às 2h da manhã.',
    sections: [
      {
        heading: 'O que entrego em um projeto SaaS',
        body: 'Autenticação e controle de acesso granular com roles e permissões por tenant. Integração com Stripe ou Asaas para billing recorrente, upgrades e cancelamentos. Onboarding com fluxo de trial e ativação. Dashboards em tempo real com WebSocket ou polling inteligente. Deploy em VPS com Docker, CI/CD e monitoramento desde o dia 1.',
      },
      {
        heading: 'Por que "diagnóstico antes do código"',
        body: 'Antes de abrir o editor, entendo o problema real: qual é o fluxo crítico do negócio, onde está o maior risco técnico, o que precisa funcionar no MVP versus o que pode esperar. Isso evita meses de retrabalho em funcionalidades que o usuário final nunca vai usar.',
      },
      {
        heading: 'Stack e infraestrutura',
        body: 'Next.js 16 no frontend, NestJS ou Node.js no backend, PostgreSQL com índices bem pensados, Redis para cache e sessão, RabbitMQ ou BullMQ para filas, Docker + Nginx + VPS Linux para deploy. Monitoramento com logs estruturados e alertas desde o primeiro deploy.',
      },
      {
        heading: 'Para quem faz sentido contratar',
        body: 'Founders de startups em fase de MVP ou pós-validação que precisam de um dev sênior PJ para construir o produto sem contratar uma equipe inteira. CTOs de empresas médias que precisam de reforço técnico especializado em SaaS. Donos de negócio que já têm um sistema legado e querem evoluí-lo para modelo SaaS.',
      },
    ],
    faqs: [
      {
        q: 'Quanto tempo leva para desenvolver um MVP SaaS?',
        a: 'Depende do escopo. Um MVP focado em 1-2 fluxos críticos pode ser entregue em 6 a 10 semanas. Escopos maiores, como billing completo + painel de admin + API pública, costumam levar 3 a 5 meses. O diagnóstico inicial define isso com precisão.',
      },
      {
        q: 'Você trabalha com contrato PJ e emite NFS-e?',
        a: 'Sim. Trabalho exclusivamente como PJ com emissão de NFS-e. Contratos por projeto ou por hora, com escopo definido antes de começar.',
      },
      {
        q: 'É possível trabalhar em um SaaS que já existe?',
        a: 'Sim. Faço revisão técnica do código atual, identifico gargalos de arquitetura, e construo novas funcionalidades ou refatoro partes críticas sem parar o produto.',
      },
      {
        q: 'Você faz deploy e infraestrutura também?',
        a: 'Sim. Configuro VPS Linux, Docker, Nginx, CI/CD (GitHub Actions ou similar), certificados SSL, backups automáticos e monitoramento. O produto fica em produção, não só no localhost.',
      },
    ],
  },
  apis: {
    intro:
      'Uma API mal projetada cria débito técnico que escala junto com o crescimento do produto. Rate limiting ausente resulta em abuso. Falta de versionamento quebra integrações de parceiros. Ausência de observabilidade significa descobrir problemas pelo cliente, não pelo monitoramento. A abordagem correta começa pelo contrato da API antes da primeira linha de código.',
    sections: [
      {
        heading: 'O que entrego em um projeto de API',
        body: 'Design RESTful ou GraphQL com documentação gerada automaticamente (Swagger/OpenAPI). Autenticação JWT ou OAuth 2.0. Rate limiting e throttling. Webhooks com retry automático e fila de mensagens (RabbitMQ/BullMQ). Versionamento de API para não quebrar integrações existentes. Monitoramento com logs estruturados e alertas.',
      },
      {
        heading: 'Integrações com terceiros',
        body: 'Gateways de pagamento (Stripe, Asaas, PagSeguro), emissão de NFS-e para 60+ municípios brasileiros, portais imobiliários, sistemas de ERP legados, APIs fiscais e Correios. Cada integração tem circuit breaker e fallback para não travar o sistema principal quando o serviço externo cai.',
      },
      {
        heading: 'Observabilidade desde o dia 1',
        body: 'Logs estruturados em JSON, rastreamento de requisições com correlation ID, métricas de latência por endpoint, alertas para erros 5xx e timeouts. Você vai saber o que está acontecendo na API antes que o usuário final perceba.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Startups que precisam de uma API pública para parceiros ou integradores. Empresas com sistemas legados que precisam de uma camada de API moderna por cima. Times de produto que precisam de um back-end sólido para um app mobile ou SPA.',
      },
    ],
    faqs: [
      {
        q: 'REST ou GraphQL: qual você recomenda?',
        a: 'Depende do caso de uso. REST é mais simples para integrações com parceiros externos. GraphQL brilha quando múltiplos clientes (web, mobile, dashboard) consomem dados com formatos diferentes. O diagnóstico inicial define qual faz mais sentido para o seu produto.',
      },
      {
        q: 'Quanto custa integrar um gateway de pagamento?',
        a: 'Uma integração básica com Stripe (checkout, webhooks de pagamento confirmado/recusado, portal do cliente) leva de 1 a 2 semanas. Billing recorrente com upgrades, downgrades e pro-rata leva de 3 a 5 semanas dependendo da complexidade.',
      },
      {
        q: 'É possível migrar uma API legada sem parar o sistema?',
        a: 'Sim. Uso a técnica de strangler fig: construo a nova API em paralelo, migro endpoints gradualmente e mantenho o legado funcionando até a migração estar completa e validada.',
      },
      {
        q: 'Como funciona o monitoramento pós-entrega?',
        a: 'Configuro alertas no Sentry ou similar, dashboards de métricas, e um runbook básico de operação. Para suporte contínuo pós-entrega, posso oferecer contrato mensal de manutenção.',
      },
    ],
  },
  'web-apps': {
    intro:
      'Performance real não é uma promessa de apresentação. Um ERP que trava com 50 usuários simultâneos, um portal B2B com LCP de 8 segundos, ou um sistema de gestão que perde dados em pico de carga são problemas de arquitetura, não de front-end. A solução começa pelo diagnóstico correto do gargalo.',
    sections: [
      {
        heading: 'Tipos de projeto que executo',
        body: 'ERPs e sistemas internos de gestão. Portais B2B e extranets para parceiros e distribuidores. Migração e refatoração de sistemas legados (PHP, jQuery, sistemas desktop para web). Dashboards administrativos com dados em tempo real. Aplicações com Core Web Vitals < 2.5s de LCP e < 100ms de INP.',
      },
      {
        heading: 'Abordagem técnica',
        body: 'Next.js 16 com App Router para aplicações React. Vue 3 com Composition API para sistemas internos. Server Components para eliminar JavaScript desnecessário no cliente. Otimização de banco de dados com índices, query analysis e connection pooling. Caching estratégico com Redis para dados que não mudam a cada requisição.',
      },
      {
        heading: 'Migração de legados',
        body: 'Sistemas legados em PHP, jQuery ou desktop não precisam ser reescritos do zero. O caminho mais seguro é uma migração incremental: identificar os módulos com maior impacto no negócio, reescrever primeiro, validar com usuários reais, e continuar módulo a módulo. Isso garante continuidade operacional durante a migração.',
      },
      {
        heading: 'Para quem faz sentido',
        body: 'Empresas com sistemas legados que estão limitando o crescimento. Startups que precisam de um sistema interno robusto sem contratar um time inteiro. Indústrias e distribuidores que precisam de portais B2B para parceiros.',
      },
    ],
    faqs: [
      {
        q: 'Qual é a diferença entre um web app e um site?',
        a: 'Um site apresenta conteúdo. Um web app tem estado, lógica de negócio, autenticação, e geralmente manipula dados. ERPs, CRMs, portais B2B e dashboards são web apps. A complexidade técnica é diferente e o orçamento reflete isso.',
      },
      {
        q: 'Como você garante performance com muitos usuários simultâneos?',
        a: 'Combinando: banco de dados com índices corretos e queries otimizadas, cache Redis para reduzir leitura do banco, connection pooling, e infraestrutura dimensionada para o pico esperado. Monitoro métricas reais em produção, não só em ambiente de desenvolvimento.',
      },
      {
        q: 'Quanto tempo leva migrar um sistema legado?',
        a: 'Depende do tamanho e complexidade. Um módulo específico (ex: gestão de pedidos) pode levar de 4 a 8 semanas. Um sistema completo pode levar de 3 a 12 meses dependendo do escopo. O diagnóstico inicial mapeia o esforço por módulo.',
      },
      {
        q: 'Você faz suporte pós-entrega?',
        a: 'Sim. Ofereço contratos mensais de manutenção e suporte técnico após a entrega do projeto. O sistema vai para produção com monitoramento configurado e documentação básica de operação.',
      },
    ],
  },
  consultoria: {
    intro:
      'O erro mais caro em desenvolvimento de software é construir a solução errada. Um mês de desenvolvimento baseado em premissas incorretas custa mais do que uma semana de diagnóstico correto. Consultoria técnica não é sobre dar uma opinião — é sobre reduzir o risco da próxima decisão técnica importante.',
    sections: [
      {
        heading: 'O que a consultoria cobre',
        body: 'Code review com plano de refatoração priorizado. Avaliação de arquitetura atual e identificação de gargalos. Análise de custos de infraestrutura e otimização. Roadmap técnico com critérios de aceite por entrega. Definição de stack para novos projetos. Handoff para time interno com documentação.',
      },
      {
        heading: 'Formato de trabalho',
        body: 'Reunião de diagnóstico de 1h (gratuita para projetos maiores). Análise do código e infraestrutura atual. Entrega de relatório técnico com findings, prioridades e recomendações. Sessões de acompanhamento para implementação das recomendações se necessário.',
      },
      {
        heading: 'Quando contratar consultoria',
        body: 'Quando o time está travado em uma decisão arquitetural importante. Quando o sistema está com problemas de performance mas a causa não está clara. Quando há intenção de migrar stack ou escalar um produto existente. Quando um investidor ou parceiro pediu uma revisão técnica independente do produto.',
      },
      {
        heading: 'Entregável',
        body: 'Relatório técnico com: diagnóstico do estado atual, lista de problemas ordenada por impacto, recomendações com custo estimado de implementação, e roadmap com critérios de aceite claros. Sem jargão desnecessário, direto ao ponto.',
      },
    ],
    faqs: [
      {
        q: 'Quanto custa uma consultoria técnica?',
        a: 'Cobro por hora ou por projeto. Para um diagnóstico com relatório escrito, o escopo é definido na reunião inicial gratuita. Entre em contato pelo WhatsApp para discutir o seu caso específico.',
      },
      {
        q: 'Você faz consultoria para times que já têm desenvolvedores?',
        a: 'Sim. Atuo como consultor externo que olha o código e a arquitetura com olhos frescos, sem viés interno. Frequentemente identifico problemas que o time interno não vê por estar muito perto do código.',
      },
      {
        q: 'Você pode ajudar a definir a stack para um novo produto?',
        a: 'Sim. Analiso os requisitos do produto, a capacidade do time, o orçamento de infraestrutura e o roadmap de crescimento esperado, e recomendo a stack mais adequada com justificativa técnica.',
      },
      {
        q: 'A consultoria inclui implementação?',
        a: 'A consultoria é separada da implementação. Após a entrega do relatório, posso executar as recomendações como projeto de desenvolvimento separado, ou o time interno pode executar com base no roadmap entregue.',
      },
    ],
  },
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.id === slug)
  if (!service) notFound()

  const meta = SERVICE_META[slug]
  const content = SERVICE_CONTENT[slug]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${SITE.url}/servicos` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE.url}/servicos/${slug}` },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${SITE.url}/servicos/${slug}`,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    serviceType: service.title,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb visual */}
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/servicos">Serviços</a></li>
          <li aria-current="page">{service.title}</li>
        </ol>
      </nav>

      <h1>{meta.h1}</h1>
      <p>{content.intro}</p>

      {content.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}

      {/* FAQ */}
      <section>
        <h2>Perguntas frequentes</h2>
        {content.faqs.map((faq) => (
          <div key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </section>

      {/* CTA WhatsApp */}
      <section>
        <h2>Pronto para começar?</h2>
        <p>Entre em contato pelo WhatsApp para uma conversa rápida sobre o seu projeto.</p>
        <a href="https://wa.me/5531972379038" target="_blank" rel="noreferrer">
          Falar no WhatsApp
        </a>
      </section>
    </main>
  )
}
```

**Nota:** Aplicar a identidade visual existente (classes do design system) nos elementos do layout acima.

- [ ] **Step 3: Verificar build e rotas**

```bash
pnpm build
```

Acessar:
- `http://localhost:3000/servicos`
- `http://localhost:3000/servicos/saas`
- `http://localhost:3000/servicos/apis`
- `http://localhost:3000/servicos/web-apps`
- `http://localhost:3000/servicos/consultoria`

Cada página deve ter `<title>` e JSON-LD corretos no view-source.

- [ ] **Step 4: Commit**

```bash
git add app/servicos/
git commit -m "feat(seo): add /servicos index and /servicos/[slug] with Service+FAQ+Breadcrumb schema"
```

---

## Task 9 — Criar `app/opengraph-image.tsx` (OG dinâmica da home)

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Criar o arquivo**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Marcus Fiuza — MF Desenvolvimento'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0F14',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', color: '#3DF2E0', fontSize: 22, letterSpacing: '0.2em', fontWeight: 900 }}>
          {'<MF/>'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ color: '#F7FAFC', fontSize: 80, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>
            Marcus Fiuza
          </div>
          <div style={{ color: '#9BA3AF', fontSize: 36, fontWeight: 700 }}>
            Desenvolvedor Full Stack Sênior
          </div>
          <div style={{ color: '#3DF2E0', fontSize: 24, letterSpacing: '0.1em' }}>
            Next.js · Vue.js · NestJS · SaaS · APIs · BH
          </div>
        </div>
        <div style={{ color: '#4B5563', fontSize: 20, letterSpacing: '0.1em' }}>
          mfdev.com.br
        </div>
      </div>
    ),
    { ...size }
  )
}
```

- [ ] **Step 2: Verificar rota**

Acessar `http://localhost:3000/opengraph-image` — deve retornar uma imagem PNG 1200×630.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx app/sobre/opengraph-image.tsx
git commit -m "feat(seo): add dynamic OG images for home and /sobre"
```

---

## Task 10 — Criar estrutura do blog

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `content/blog/quanto-custa-saas-2026.mdx`
- Create: `content/blog/vuejs-ou-react.mdx`
- Create: `content/blog/diagnostico-antes-do-codigo.mdx`

**Nota:** Esta task instala dependências. Confirmar com o usuário antes de executar.

- [ ] **Step 1: Instalar dependências de MDX**

```bash
pnpm add gray-matter remark remark-html
```

Esperado: dependências adicionadas ao `package.json` sem conflitos.

- [ ] **Step 2: Criar utilitário `lib/blog.ts`**

```typescript
// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}
```

- [ ] **Step 3: Criar os 3 posts MDX em `content/blog/`**

**`content/blog/quanto-custa-saas-2026.mdx`:**
```markdown
---
title: "Quanto custa desenvolver um SaaS sob medida em 2026?"
description: "Análise real dos custos de desenvolvimento de SaaS: MVP, billing, multi-tenant e infraestrutura. Sem jargão, sem ilusão."
date: "2026-03-15"
---

Essa é a pergunta que mais recebo de founders antes de iniciar um projeto. A resposta honesta é: depende — mas não de forma vaga. Depende de escopo definido, stack escolhida e nível de senioridade do desenvolvedor.

## O que compõe o custo de um SaaS

Um SaaS funcional tem pelo menos quatro camadas de complexidade:

**1. Autenticação e controle de acesso multi-tenant**
Não é só login. É isolamento de dados entre clientes, roles e permissões por organização, e um modelo de dados que não vire um problema quando o cliente número 500 entrar na plataforma.

**2. Billing integrado**
Stripe ou Asaas com planos, trials, upgrades, downgrades e pro-rata. Webhooks de evento de pagamento que não percam mensagens. Portal do cliente para gerenciar assinatura sem contato com suporte.

**3. A aplicação em si**
O que o produto realmente faz — dashboards, fluxos de trabalho, relatórios, integrações com terceiros. Essa é a parte que varia mais entre projetos.

**4. Infraestrutura e deploy**
VPS Linux, Docker, Nginx, CI/CD, backups automáticos, monitoramento, alertas. Um SaaS que só roda no localhost não é um SaaS.

## Faixas de custo reais (2026)

Para contratar um desenvolvedor PJ sênior freelancer:

- **MVP básico (autenticação + 2 fluxos principais + billing simples):** 6 a 10 semanas de desenvolvimento. Custo total entre R$ 18.000 e R$ 35.000 dependendo do desenvolvedor.
- **SaaS completo (multi-tenant + billing avançado + painel admin + API pública):** 3 a 5 meses. Custo entre R$ 50.000 e R$ 120.000.
- **Infraestrutura mensal:** VPS adequado a um SaaS pequeno custa entre R$ 200 e R$ 600/mês (DigitalOcean, Hetzner, ou AWS t3.medium).

## O que não está incluído nesses números

Design de UI/UX profissional, produção de conteúdo de marketing, SEO, suporte pós-lançamento, e funcionalidades "que aparecem no meio do projeto". Escopo definido no início é a melhor forma de controlar custo.

## A pergunta mais importante

Antes de quanto custa, a pergunta que importa é: qual é o fluxo crítico que precisa funcionar no MVP? Um SaaS com 2 fluxos bem feitos que gera receita é mais valioso do que um com 10 funcionalidades incompletas.

É exatamente isso que o processo de diagnóstico define antes de uma linha de código ser escrita.
```

**`content/blog/vuejs-ou-react.mdx`:**
```markdown
---
title: "Vue.js ou React: qual escolher pro seu próximo projeto?"
description: "Comparação técnica e prática entre Vue 3 e React 19 para quem precisa decidir a stack do próximo produto web."
date: "2026-02-20"
---

Essa discussão existe há anos e as respostas continuam sendo "depende". O problema é que "depende" sem critérios não ajuda ninguém a tomar uma decisão. Vou dar critérios concretos.

## O que importa na escolha de framework

Não é sobre qual é "melhor" em abstrato. É sobre qual serve melhor para o seu caso específico, considerando:

- Complexidade do produto
- Tamanho e senioridade do time
- Ecossistema de bibliotecas necessário
- Curva de aprendizado para onboarding de novos devs

## Vue 3: quando faz sentido

**Sistemas internos e ERPs:** A Composition API do Vue 3 é extremamente produtiva para formulários complexos, lógica de negócio densa e UIs orientadas a estado. O modelo de reatividade é mais intuitivo para devs vindos de outros paradigmas.

**Times com menos experiência em React:** Vue tem uma curva de aprendizado mais suave. A separação clara entre template, script e estilo no Single File Component (SFC) facilita o onboarding.

**Projetos que não precisam de SSR complexo:** Vue com Vite é extremamente rápido para SPAs e aplicações internas onde SEO não é crítico.

## React/Next.js: quando faz sentido

**Produtos SaaS com necessidade de SEO:** Next.js 16 com App Router e Server Components é a melhor opção para aplicações que precisam de bom SEO, carregamento rápido e renderização no servidor.

**Times maiores com múltiplos produtos:** O ecossistema React é maior. Há mais bibliotecas, mais componentes prontos, e mais devs disponíveis no mercado.

**Aplicações com muita lógica de UI complexa:** O modelo de componentes do React com hooks é extremamente poderoso para UIs com estado complexo e muitas interações.

## A resposta direta

Para **SaaS com SEO, blog, landing pages e rotas públicas:** Next.js.

Para **sistemas internos, ERPs, dashboards administrativos, e aplicações de gestão:** Vue 3.

Para **APIs e back-end:** Node.js com NestJS ou Express — independente do framework de front.

A melhor stack é a que o time domina e que serve o produto. Trocar de framework por modismo é mais caro do que qualquer vantagem técnica marginal que a mudança traria.
```

**`content/blog/diagnostico-antes-do-codigo.mdx`:**
```markdown
---
title: "Por que 'diagnóstico antes do código' economiza meses de retrabalho"
description: "Como uma semana de diagnóstico técnico evita meses de desenvolvimento na direção errada. Casos reais e metodologia."
date: "2026-01-10"
---

A frase que uso para descrever minha abordagem — "diagnóstico antes do código" — não é marketing. É a lição mais cara que aprendi construindo sistemas para clientes.

## O padrão que se repete

Um founder chega com uma ideia clara: "preciso de um painel de gestão para minha equipe". Após 3 meses de desenvolvimento, a equipe não usa o painel porque o problema real era outro: a falta de processo, não a falta de ferramenta. O sistema foi construído perfeitamente para a solução errada.

Esse padrão aparece em variações:
- API construída com arquitetura que não comporta o volume real de dados
- Funcionalidades desenvolvidas que nenhum usuário usa
- Stack escolhida por preferência do dev, não pela necessidade do produto
- MVP com 15 funcionalidades quando 3 teriam validado a hipótese

## O que um diagnóstico cobre

**1. Entendimento do problema real**
Qual é o fluxo crítico do negócio? O que acontece se esse fluxo quebrar? Quem são os usuários reais e como eles trabalham hoje?

**2. Análise dos riscos técnicos**
Quais são as partes mais incertas da solução? Onde está o maior risco de retrabalho? Existem integrações com terceiros que podem atrasar tudo?

**3. Definição do MVP mínimo viável real**
Não o MVP ideal, mas o mínimo que permite validar a hipótese central do produto com usuários reais. A diferença costuma ser de meses de desenvolvimento.

**4. Estimativa honesta de escopo e custo**
Com o diagnóstico feito, a estimativa é muito mais precisa do que um chute inicial. E surpresas de escopo no meio do projeto são reduzidas drasticamente.

## Quanto tempo leva e qual é o custo

Um diagnóstico completo para um projeto de médio porte leva de 1 a 5 dias. Para projetos menores, pode ser uma reunião de 2h com perguntas certas. O custo é uma fração do que seria gasto desenvolvendo na direção errada.

Para projetos acima de R$ 20.000, ofereço uma reunião de diagnóstico inicial gratuita. O valor está em chegar no projeto com clareza, não em começar a codar no primeiro call.

## A pergunta que muda tudo

No final do diagnóstico, a pergunta que define o projeto é: "se você só pudesse entregar uma coisa nos próximos 30 dias que geraria valor real para os usuários, o que seria?"

A resposta a essa pergunta é o ponto de partida correto para qualquer projeto.
```

- [ ] **Step 4: Criar `app/blog/page.tsx`**

```typescript
// app/blog/page.tsx
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
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <h1>Blog Técnico</h1>
      {posts.length === 0 ? (
        <p>Nenhum post publicado ainda.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
              </Link>
              <time dateTime={post.date}>{post.date}</time>
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
```

- [ ] **Step 5: Criar `app/blog/[slug]/page.tsx`**

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

**Nota:** O campo `content` do MDX está em Markdown bruto. Para renderizar corretamente com `remark`, substituir `dangerouslySetInnerHTML` por processamento via `remark().use(remarkHtml).process(post.content)` — ou usar um componente MDX quando `@next/mdx` for adicionado na Task 11.

- [ ] **Step 6: Verificar rotas do blog**

```bash
pnpm dev
```

Acessar:
- `http://localhost:3000/blog` — deve listar os 3 posts
- `http://localhost:3000/blog/quanto-custa-saas-2026` — deve renderizar o post
- Verificar `<script type="application/ld+json">` com `BlogPosting` schema no view-source

- [ ] **Step 7: Commit**

```bash
git add app/blog/ lib/blog.ts content/blog/
git commit -m "feat(seo): add blog structure with MDX posts and BlogPosting schema"
```

---

## Task 11 — Atualizar `next.config.mjs`

**Files:**
- Modify: `next.config.mjs`

**Pergunta para o usuário antes de executar:** O deploy é na Vercel ou é export estático (`next export`)? Se for Vercel, `images.unoptimized: true` pode ser removido. Se for export estático, deve ser mantido.

- [ ] **Step 1: Atualizar `next.config.mjs`** (versão para deploy na Vercel — ajustar se for export)

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // unoptimized: true, // descomente se usar next export
  },
}

export default nextConfig
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build
```

Esperado: build sem erros. Se falhar por `images.unoptimized`, reativar a flag.

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs
git commit -m "feat(seo): update next.config with compress, poweredByHeader:false, image formats"
```

---

## Task 12 — Criar assets de mídia em `/public/`

**Files:**
- Create: `public/favicon.ico` (placeholder)
- Create: `public/icon.svg`
- Create: `public/icon-192.png` (placeholder)
- Create: `public/icon-512.png` (placeholder)
- Create: `public/apple-icon.png` (placeholder)
- Create: `public/og-image.png` (placeholder)
- Create: `public/marcus-fiuza.jpg` (TODO: foto real)
- Create: `public/logo.png` (placeholder)

**Nota:** Esta task cria placeholders funcionais. Os assets reais (foto, logos em alta resolução) devem ser substituídos antes do deploy em produção.

- [ ] **Step 1: Criar `public/icon.svg`** — logo `<MF/>` em SVG

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
  <text
    x="10"
    y="48"
    font-family="monospace"
    font-size="48"
    font-weight="900"
    fill="#3DF2E0"
  >&lt;MF/&gt;</text>
</svg>
```

Salvar em `public/icon.svg`.

- [ ] **Step 2: Marcar TODOs para assets binários**

Criar `public/ASSETS_TODO.md` com:

```markdown
# Assets pendentes para produção

## Obrigatórios antes do deploy
- [ ] favicon.ico (32x32) — converter icon.svg
- [ ] icon-192.png (192x192) — versão PNG do logo
- [ ] icon-512.png (512x512) — versão PNG do logo
- [ ] apple-icon.png (180x180) — versão PNG do logo
- [ ] logo.png (512x512, fundo transparente) — para JSON-LD
- [ ] og-image.png (1200x630) — imagem estática fallback (OG dinâmica assumirá este papel)

## Foto profissional
- [ ] marcus-fiuza.jpg — foto profissional para JSON-LD @type:Person
  Especificação: formato quadrado ou 4:3, mínimo 800x800px, fundo neutro

## Ferramentas recomendadas
- Converter SVG→PNG: https://svgtopng.com/ ou Figma
- Gerar favicon.ico: https://favicon.io/
- Comprimir imagens: https://squoosh.app/
```

- [ ] **Step 3: Commit**

```bash
git add public/icon.svg public/ASSETS_TODO.md
git commit -m "feat(seo): add icon.svg and assets TODO list for production"
```

---

## Task 13 — Atualizar `app/not-found.tsx`

**Files:**
- Modify: `app/not-found.tsx`

- [ ] **Step 1: Adicionar `metadata` com `robots: noindex`**

Adicionar no topo do arquivo, após os imports existentes:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Página não encontrada',
  robots: {
    index: false,
    follow: false,
  },
}
```

- [ ] **Step 2: Verificar que a página ainda renderiza**

```bash
pnpm dev
```

Acessar `http://localhost:3000/rota-que-nao-existe` — deve renderizar o 404 com o design existente.

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat(seo): add noindex metadata to 404 page"
```

---

## Task 14 — Performance: auditar `use client` e `dynamic()`

**Files:**
- Modify: arquivos de seções que usam `'use client'` sem necessidade
- Modify: componentes pesados que devem usar `dynamic()`

- [ ] **Step 1: Identificar todos os `'use client'` no projeto**

```bash
grep -r "'use client'" components/ app/ --include="*.tsx" -l
```

Listar cada arquivo encontrado e verificar se o Framer Motion é de fato usado nele.

- [ ] **Step 2: Auditar `CustomCursor` e `LiveTerminal`**

Verificar se `CustomCursor` em `app/layout.tsx` usa `dynamic()`:

```typescript
// Se não estiver usando dynamic(), substituir o import em layout.tsx por:
import dynamic from 'next/dynamic'
const CustomCursor = dynamic(() => import('@/components/custom-cursor'), { ssr: false })
```

Fazer o mesmo para `LiveTerminal` se existir:
```typescript
const LiveTerminal = dynamic(() => import('@/components/terminal/live-terminal'), { ssr: false })
```

- [ ] **Step 3: Verificar que `next/font` tem `display: 'swap'`**

Em `app/layout.tsx`, confirmar que os fonts têm `display: 'swap'`:

```typescript
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap', // adicionar se não estiver presente
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap', // adicionar se não estiver presente
})
```

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/
git commit -m "perf: use dynamic() for CustomCursor, add font display:swap"
```

---

## Task 15 — Analytics: adicionar Speed Insights e placeholder GA4

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/google-tag.tsx`

- [ ] **Step 1: Instalar `@vercel/speed-insights`**

```bash
pnpm add @vercel/speed-insights
```

- [ ] **Step 2: Adicionar `SpeedInsights` em `app/layout.tsx`**

Adicionar o import:
```typescript
import { SpeedInsights } from '@vercel/speed-insights/next'
```

Adicionar no `<body>` ao lado do `<Analytics />`:
```tsx
{process.env.NODE_ENV === 'production' && <Analytics />}
{process.env.NODE_ENV === 'production' && <SpeedInsights />}
```

- [ ] **Step 3: Criar `app/google-tag.tsx`** — placeholder GA4

```tsx
// app/google-tag.tsx
// TODO: Adicionar o ID da propriedade GA4 quando disponível no Google Analytics
// Para ativar: importar <GoogleTag /> em app/layout.tsx e descomentar o código abaixo

// import Script from 'next/script'
//
// const GA_ID = process.env.NEXT_PUBLIC_GA_ID
//
// export function GoogleTag() {
//   if (!GA_ID) return null
//   return (
//     <>
//       <Script
//         src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
//         strategy="afterInteractive"
//       />
//       <Script id="google-analytics" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${GA_ID}');
//         `}
//       </Script>
//     </>
//   )
// }

export function GoogleTag() {
  return null
}
```

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/google-tag.tsx
git commit -m "feat(analytics): add SpeedInsights, add GA4 placeholder"
```

---

## Critérios de Aceitação

Ao final de todas as tasks, verificar:

- [ ] `pnpm build` sem erros nem warnings de metadata
- [ ] View source da home mostra: `<title>` com 58+ chars, todas meta tags OG, JSON-LD com 3 entidades
- [ ] `GET /sitemap.xml` → XML válido com todas as rotas
- [ ] `GET /robots.txt` → texto correto com Sitemap apontando para `https://mfdev.com.br`
- [ ] `GET /manifest.webmanifest` → JSON válido
- [ ] `GET /sobre` carrega com title e canonical próprios
- [ ] `GET /servicos/saas` carrega com title, canonical, JSON-LD de Service+FAQ+Breadcrumb
- [ ] `GET /blog/quanto-custa-saas-2026` carrega com BlogPosting schema
- [ ] `GET /opengraph-image` retorna imagem PNG 1200×630
- [ ] Validar JSON-LD em: https://search.google.com/test/rich-results
- [ ] Validar OG image em: https://www.opengraph.xyz/

---

## Perguntas Antes de Executar

1. **Deploy:** O deploy é na **Vercel** ou é **export estático** (`next export`)? Isso afeta a Task 11 (`images.unoptimized`).
2. **Blog:** Confirma a instalação de `gray-matter` e `remark` para o sistema de blog MDX?
3. **Pasta `/CEO`:** Confirma a renomeação para `/sobre`? Não há links internos quebrados — apenas URLs externas eventualmente bookmarkadas serão afetadas.
4. **Posts do blog:** Os 3 drafts gerados são um ponto de partida. Quer revisá-los antes do commit ou prefere que sejam publicados como draft (sem link no blog index) inicialmente?
