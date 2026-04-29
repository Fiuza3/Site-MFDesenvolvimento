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
          mfdesenvolvimento.online
        </div>
      </div>
    ),
    { ...size }
  )
}
