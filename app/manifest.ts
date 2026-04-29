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
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
