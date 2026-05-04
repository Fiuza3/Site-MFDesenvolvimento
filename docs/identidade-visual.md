# Identidade Visual — MF Desenvolvimento

## Logo

### SVG Completo (código exato do componente)

O logo é renderizado como SVG com texto Geist Mono. Três elementos de texto compartilham a mesma linha de base:

```svg
<svg
  viewBox="0 0 68 30"
  height="2em"
  style="width: auto; overflow: visible;"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- < (opacidade 58% normal / 28% compacto) -->
  <text
    x="1"
    y="15"
    dominant-baseline="central"
    font-family="var(--font-geist-mono, ui-monospace, 'Courier New', monospace)"
    font-weight="700"
    font-size="22"
    fill="rgb(61,242,224)"
    fill-opacity="0.58"
  >&lt;</text>

  <!-- MF (opacidade total) -->
  <text
    x="14.2"
    y="15"
    dominant-baseline="central"
    font-family="var(--font-geist-mono, ui-monospace, 'Courier New', monospace)"
    font-weight="700"
    font-size="22"
    fill="rgb(61,242,224)"
  >MF</text>

  <!-- /> (opacidade 58% normal / 28% compacto) -->
  <text
    x="40.6"
    y="15"
    dominant-baseline="central"
    font-family="var(--font-geist-mono, ui-monospace, 'Courier New', monospace)"
    font-weight="700"
    font-size="22"
    fill="rgb(61,242,224)"
    fill-opacity="0.58"
  >/&gt;</text>
</svg>
```

### Métricas do Logo

| Propriedade | Valor |
|---|---|
| ViewBox | `0 0 68 30` |
| Height | `2em` (relativo ao font-size do contexto) |
| Font-size | `22px` |
| Avanço por caractere (Geist Mono) | `13.2px` |
| Altura total | `30px` |
| Posição `<` | x=1 |
| Posição `MF` | x=14.2 (1 + 13.2) |
| Posição `/>` | x=40.6 (1 + 13.2 × 3) |

### Variantes

| Estado | Opacidade dos colchetes |
|---|---|
| Normal | 0.58 (58%) |
| Compacto (navbar ao scroll) | 0.28 (28%) |

### Hover

```css
filter: drop-shadow(0 0 9px rgba(61, 242, 224, 0.6));
transition: filter 300ms;
```

### Animação de entrada (Framer Motion)

```js
const ease = [0.16, 1, 0.3, 1]  // cubic-bezier expo-out

// <  → delay: 0ms
// MF → delay: 80ms
// /> → delay: 160ms

initial: { opacity: 0, y: 5 }
animate: { opacity: 1, y: 0 }
transition: { delay, duration: 0.42, ease }
```

---

## Paleta de Cores

### Cores primárias

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--cyan` | Ciano primário | `#3DF2E0` | Acentos, links, logo, CTAs, bordas de destaque |
| `--background` | Fundo base | `#0B0F14` | Background de todas as páginas |
| `--foreground` | Texto principal | `#F7FAFC` | Títulos, texto de alto contraste |
| `--surface` | Superfície elevada | `#0F1520` | Cards, painéis, inputs |
| `--surface-raised` | Superfície mais elevada | `#141C26` | Hover states, layering |
| `--line` | Bordas / divisórias | `#1E2A38` | Borders, separadores |
| `--gray-text` | Texto secundário | `#A0AEC0` | Parágrafos, labels, metadados |

### Variações do ciano

| Token | Valor | Uso |
|---|---|---|
| `--cyan` | `#3DF2E0` | Cor sólida (texto, bordas) |
| `--cyan-dim` | `rgba(61, 242, 224, 0.1)` | Fundos sutis com toque ciano |
| `--cyan-glow` | `rgba(61, 242, 224, 0.25)` | Glows, sombras, seleção de texto |

### Classes Tailwind mapeadas

```css
text-cyan       → color: #3DF2E0
bg-cyan         → background: #3DF2E0
border-cyan     → border-color: #3DF2E0
text-gray-text  → color: #A0AEC0
bg-background   → background: #0B0F14
bg-surface      → background: #0F1520
border-line     → border-color: #1E2A38
text-foreground → color: #F7FAFC
```

---

## Tipografia

### Famílias

| Fonte | Variável CSS | Uso |
|---|---|---|
| **Geist Sans** | `--font-geist-sans` | Corpo, headings, UI geral |
| **Geist Mono** | `--font-geist-mono` | Labels técnicos, código, nav links, terminal cards |

Ambas carregadas via `next/font/google` com `display: 'swap'` e `subsets: ['latin']`.

### Escala de tamanhos fluidos (clamp)

| Elemento | Classe / Valor |
|---|---|
| Hero heading (home) | `text-[clamp(4rem,13vw,11rem)]` |
| Blog hero heading | `text-[clamp(3rem,10vw,8rem)]` |
| Post heading | `text-[clamp(2rem,6vw,5rem)]` |
| Section heading | `text-[clamp(2.5rem,8vw,7rem)]` |

### Pesos

| Peso | Uso |
|---|---|
| `font-black` (900) | Todos os headings, números de destaque, logo watermark |
| `font-bold` (700) | Botões, labels importantes |
| Regular (400) | Corpo do texto |

### Letter-spacing

| Classe | Valor | Uso |
|---|---|---|
| `tracking-tighter` | `-0.05em` | Headings grandes |
| `tracking-[0.34em]` | Custom | Labels mono em uppercase (seção eyebrow) |
| `tracking-[0.28em]` | Custom | Labels mono menores |
| `tracking-wide` | `0.025em` | Nav links |

### Leading

| Classe | Uso |
|---|---|
| `leading-[0.88]` | Headings hero (muito compacto) |
| `leading-[0.9]` | Headings menores |
| `leading-relaxed` | Corpo do texto |

---

## Espaçamento e Layout

### Padding horizontal padrão (full-bleed)

```
px-5 sm:px-8 lg:px-10 2xl:px-14
```

### Seções principais

- `py-20` — padding vertical padrão de seção
- `pt-36` — padding top em páginas com Navbar fixa (compensação do header)
- `pb-16` / `pb-20` — padding bottom de hero

---

## Animações

### Easing principal

```js
const ease = [0.16, 1, 0.3, 1]
// cubic-bezier(0.16, 1, 0.3, 1) — expo-out suave
```

### Durações padrão

| Contexto | Duração |
|---|---|
| Transições UI (hover, focus) | `200ms` |
| Transições de estado (navbar scroll) | `300ms` |
| Animações de entrada (Framer Motion) | `420ms` |
| Fade-in de conteúdo | `600ms–800ms` |

### Padrão de entrada escalonada

```js
// items de lista / cards
container: { staggerChildren: 0.06 }
item: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
```

### Suporte a `prefers-reduced-motion`

```js
const reduced = useReducedMotion()
const anim = !reduced
// Quando reduced=true, skip all animations (no initial/animate props)
```

---

## Efeitos de Fundo

### Hero Shell (hero-shell)

```css
.hero-shell {
  background:
    radial-gradient(circle at 0% 0%, rgba(61, 242, 224, 0.08), transparent 34%),
    linear-gradient(180deg, rgba(11, 15, 20, 0.88), #0B0F14 72%);
}

/* Grid sutil sobre o hero */
.hero-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(30, 42, 56, 0.28) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 42, 56, 0.22) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, black 0%, black 62%, transparent 100%);
  pointer-events: none;
}
```

### Hero Noise (hero-noise)

```css
.hero-noise {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  /* SVG fractalNoise aplicado via background-image */
}
```

### Dot Grid (dot-grid)

```css
.dot-grid {
  background-image: radial-gradient(circle, #1E2A38 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### Glow

```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(61,242,224,0.25), 0 0 60px rgba(61,242,224,0.08);
}
.text-glow {
  text-shadow: 0 0 20px rgba(61,242,224,0.25);
}
```

---

## Padrões de Componente

### Eyebrow label (label de seção)

```tsx
<p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan mb-6">
  {'// nome-da-seção'}
</p>
```

### Card padrão

```tsx
<div className="rounded border border-line bg-surface/80 p-6 hover:border-cyan/50 transition-colors">
  ...
</div>
```

### Botão primário (borda cyan)

```tsx
<a
  href="..."
  className="rounded border border-cyan px-4 py-1.5 font-mono text-sm text-cyan hover:bg-cyan hover:text-background transition-all duration-200"
>
  Fale comigo
</a>
```

### Botão ghost

```tsx
<a
  href="..."
  className="rounded border border-line px-3 py-2 text-xs text-gray-text hover:border-cyan/60 hover:text-foreground transition-colors font-mono"
>
  ...
</a>
```

### Terminal card (runtime summary)

```tsx
<div className="rounded border border-line bg-surface p-5">
  <p className="text-[10px] uppercase tracking-[0.28em] text-gray-text">
    runtime summary
  </p>
  <div className="mt-5 grid gap-3 text-sm">
    <p className="flex items-center justify-between gap-4 border-b border-line pb-2">
      <span className="text-gray-text">chave</span>
      <span className="text-foreground">valor</span>
    </p>
  </div>
</div>
```

### Separador horizontal com gradiente

```tsx
<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
```

### Watermark `<MF/>`

```tsx
<p
  aria-hidden="true"
  className="select-none font-mono text-[clamp(5rem,24vw,24rem)] font-black leading-[0.76] tracking-tighter text-cyan/10"
>
  {'<MF/>'}
</p>
```

---

## Focus & Acessibilidade

### Focus ring padrão

```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70"
```

### Skip link

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:border focus:border-cyan focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-cyan focus:outline-none"
>
  Ir para o conteúdo principal
</a>
```

---

## Scrollbar customizada

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0B0F14; }
::-webkit-scrollbar-thumb { background: #1E2A38; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #3DF2E0; }
```

## Seleção de texto

```css
::selection {
  background: rgba(61, 242, 224, 0.25);
  color: #3DF2E0;
}
```

---

## Theme / Viewport

```typescript
export const viewport: Viewport = {
  themeColor: '#0B0F14',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}
```
