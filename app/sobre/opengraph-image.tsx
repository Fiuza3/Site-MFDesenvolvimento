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
          mfdesenvolvimento.online/sobre
        </div>
      </div>
    ),
    { ...size }
  )
}
