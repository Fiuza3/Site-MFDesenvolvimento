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
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE.url}/sobre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/servicos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/servicos/saas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/servicos/apis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/servicos/web-apps`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/servicos/consultoria`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...projectRoutes,
  ]
}
