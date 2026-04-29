# BRIEFING - MFDesenvolvimento Award-Level Interactive Website

## Ambicao

Competir em nivel Awwwards / Site of the Day / Site of the Month.

Nao criar uma landing comum. Criar uma experiencia digital autoral, interativa, memoravel e tecnicamente impecavel.

O site deve parecer um produto editorial/interativo sobre engenharia de software sob medida.

Conceito central:

```txt
<MF/> nao e so uma marca.
E uma linguagem de execucao.
```

O usuario nao navega pelo site. Ele executa uma jornada.

## Stack

Stack atual do projeto:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Vercel Analytics

Pode adicionar, se fizer sentido para nivel award:

- GSAP
- ScrollTrigger
- Lenis
- SplitType ou implementacao propria de split text
- @gsap/react

Nao usar:

- Three.js
- WebGL
- Lottie pesado
- Canvas pesado sem necessidade
- Bibliotecas visuais genericas
- Templates prontos

Meta:

- Experiencia rica
- Performance alta
- Mobile funcional
- Lighthouse mobile idealmente 90+
- Sem sacrificar identidade por benchmark artificial

## Identidade Visual

Marca:

```txt
<MF/>
```

Paleta:

```txt
Background: #0B0F14
Surface: #0F1520
Surface raised: #141C26
Accent: #3DF2E0
Text: #E8EEF2
Muted: #6B7280
Border: #1E2A38
```

Fonte:

- Principal: Geist Sans ou Inter
- Codigo: Geist Mono ou JetBrains Mono

Estetica:

- Dark nativo
- Tecnico
- Preciso
- Editorial
- Cinematico
- Minimalista, mas com tensao
- Nada de visual SaaS generico
- Nada de glassmorphism saturado
- Nada de IA pattern background
- Nada de hero igual Linear/Vercel

## Direcao Criativa

Metafora forte:

```txt
contratar software e executar um sistema confiavel.
```

Cada secao deve parecer parte de um fluxo:

1. Boot
2. Diagnose
3. Build
4. Ship
5. Handoff
6. Start project

O usuario deve sentir que esta dentro de uma interface viva, mas elegante.

A experiencia precisa ter:

- Uma assinatura de motion reconhecivel
- Transicoes entre secoes
- Tipografia cinetica
- Microinteracoes com intencao
- Scroll narrativo
- Terminal funcional como linguagem
- Assimetria visual
- Rupturas controladas de grid
- Ritmo: silencio -> tensao -> acao -> resolucao

## Principios Inegociaveis

1. Restraint > showoff. O site pode ser ousado, mas nao pode parecer demo de biblioteca.
2. Motion tem que ter funcao. Cada animacao guia atencao, confirma acao ou conecta narrativa.
3. Tipografia e interface. Headline nao e texto estatico. Ela reage, revela, executa.
4. Terminal e produto. Terminal nao e decoracao. Ele controla, explica, converte.
5. A marca `<MF/>` e sistema. Ela aparece como assinatura, loader, hover, transicao e estado de execucao.
6. Mobile nao e versao pior. Mobile deve ser uma experiencia propria, mais direta e tatil.
7. Performance ainda importa. Award-level nao significa pesado. Significa memoravel e bem executado.

## Estrutura Da Experiencia

### 0. Boot / Preloader

Antes do hero, criar um boot loader curto.

Duração maxima:

- 1.4s no primeiro acesso
- Pode ser ignorado/reduzido em visitas seguintes

Visual:

```bash
<MF/> booting...
loading scope
checking constraints
ready
```

Comportamento:

- Texto aparece como terminal.
- Barra fina cyan carrega.
- Ao terminar, o loader se transforma no logo da navbar.
- Se `prefers-reduced-motion`, mostrar estado final direto.
- Nao usar loader longo.
- Nao bloquear LCP desnecessariamente.

### 1. Hero - A Virada De Jogo

O hero deve ser a secao mais forte do site.

Layout desktop:

- Headline ocupa 60-65% da largura.
- Terminal ocupa 35-40%.
- Terminal fica deslocado para baixo, quebrando a linha do grid.
- Stats ficam no rodape do hero.
- Navbar minima, quase invisivel antes do scroll.

Layout mobile:

- Headline domina.
- Terminal vira bloco interativo compacto.
- Stats aparecem em grid 2x2.

Headline:

```txt
Software que funciona de verdade.
```

Animacao:

- `Software`: entra letra por letra, stagger 35-45ms, cada letra parece compilar no lugar.
- `que funciona`: entra com mask reveal vertical, leve blur -> sharp.
- `de verdade.`: digitacao real, cursor piscando em 530ms, cursor vira ponto final cyan por 300ms ao terminar.

Hover nas palavras:

- Letras ganham peso visual.
- Pequena distorcao tipografica controlada.
- O efeito deve parecer variable font, nao bagunca.
- Sem layout shift.

Terminal vivo:

O terminal executa loops narrativos.

```bash
$ git clone cliente/problema
> escopo recebido
> risco detectado: integracao fiscal

$ npm run diagnose
> gargalo: fluxo manual
> solucao: sistema web sob medida

$ npm run build
> api criada
> dashboard pronto
> testes passando

$ deploy --prod
> producao online
> handoff entregue
```

Comportamento:

- Cada cena dura 3s.
- Transicao entre cenas: 300ms.
- Cursor pisca em 530ms.
- Hover pausa o loop.
- Click abre modal: "O que esse terminal realmente representa".
- O modal explica processo, diagnostico, construcao e entrega.

Stats:

```txt
8+ anos
47 projetos
100% PJ/NFS-e
03 fusos
```

Animacao:

- Count-up quando entram no viewport.
- 1.2s.
- easing expoOut.
- Em reduced motion, aparecem estaticos.

Background:

- Grid sutil existente.
- Noise texture 3%.
- Radial accent no canto superior esquerdo, 8% opacity.
- Sem blobs decorativos grandes.
- O background deve parecer infraestrutura, nao decoracao.

### 2. Assinatura De Motion - `<MF/>`

O logo precisa virar a assinatura do site.

Estados:

Load:

```txt
<
<M
<MF
<MF/
<MF/>
```

Scroll:

- Navbar fixa.
- Logo compacta.
- `<` e `>` aproximam levemente.
- Sensacao de funcao sendo chamada.

Hover:

- Barra cyan atravessa o logo.
- Duracao 400ms.
- Parece execucao de comando.
- Pequeno flash de cursor no final.

Active:

- Ao clicar, scrolla para topo.
- Executa uma microanimacao de reset.

Essa assinatura deve se repetir em:

- Preloader
- Navbar
- Terminal
- CTA final
- Footer
- 404 futuramente

### 3. Transicao Hero -> Sobre

Criar uma transicao rara e memoravel.

No final do hero, o terminal digita:

```bash
$ cd sobre/
```

Enquanto o usuario scrolla:

- O terminal do hero fica sticky/fixed por alguns frames.
- Ele migra visualmente para a secao Sobre.
- A headline sai por mask.
- A secao Sobre entra como se fosse resultado do comando.

Implementacao:

- Preferencial: GSAP + ScrollTrigger + Flip se instalado.
- Alternativa: Framer Motion com `layoutId`, `useScroll`, `useTransform`.
- A transicao precisa ser elegante, nao travada.

Mobile:

- Simplificar para fade/slide.
- Sem pin complexo.

### 4. Sobre - Diagnostico Antes Do Codigo

A secao Sobre nao deve ser "sobre mim" comum.

Direcao:

- Mostrar mentalidade de engenharia.
- Mostrar processo de decisao.
- Mostrar senioridade sem parecer arrogante.

Layout:

- Texto editorial a esquerda.
- Terminal migrado/compactado a direita.
- Blocos de dados tecnicos abaixo.

Conteudo sugerido:

```txt
Antes de escrever codigo, eu reduzo ambiguidade.

Produto, regra de negocio, legado, prazo, risco, orcamento.
Tudo entra no diagnostico antes da primeira linha.
```

Interacoes:

- Palavras-chave podem revelar notas tecnicas no hover.
- Pequenos callouts em monospace aparecem como comentarios de codigo.

### 5. Servicos - Bento Grid Quebrado

Criar um bento grid assimetrico.

Cards:

1. SaaS
2. APIs & Integracoes
3. Web Apps / Sistemas Internos
4. Consultoria Tecnica

Layout:

- Desktop: 2x2 quebrado.
- Card 1 sobe 40px.
- Card 4 desce 40px.
- Card 2 pode ser mais largo.
- Card 3 pode ser mais vertical.
- Mobile: lista vertical.

Microinteracoes:

- SaaS: mini grafico SVG cresce no hover.
- APIs: nos conectam pontos, pequena simulacao de request/response.
- Web Apps: skeleton de layout se preenche.
- Consultoria: linhas de texto recebem marks de revisao, como code review visual.

Regras:

- SVG/CSS inline.
- Sem libs pesadas.
- Nada que pareca ilustracao generica.
- Interacao deve reforcar competencia tecnica.

### 6. Projetos - Scroll Horizontal Cinematico

Desktop:

- Container sticky.
- Scroll vertical controla movimento horizontal.
- 3 a 5 cases.
- Cards grandes, quase como frames de filme.
- Transicao lateral suave.
- Depois do ultimo card, scroll vertical retoma.

Mobile:

- Carrossel horizontal com scroll-snap.
- Sem pinning pesado.

Cada case:

- Mockup visual.
- Tech stack.
- Problema resolvido.
- Metrica forte.
- Resultado claro.

Interacao:

- Hover revela detalhes tecnicos.
- Click abre case expandido/modal.
- Modal pode parecer arquivo tecnico/case log.

### 7. Processo - Timeline De Execucao

Nao fazer timeline comum. Criar uma timeline como pipeline de execucao.

Passos:

1. Diagnostico
2. Proposta tecnica
3. Desenvolvimento
4. Revisao & ajustes
5. Entrega & handoff

Visual:

- Linha cyan vertical ou diagonal.
- A linha desenha no scroll.
- Cada passo e revelado por mask.
- Microcopy em formato de commit/log.

Exemplo:

```bash
commit 01 - diagnostico
scope locked
risks mapped
acceptance criteria defined
```

### 8. Stack - Nao Uma Lista, Um Mapa

A secao stack nao deve ser so marquee. Criar mapa tecnico por camadas:

```txt
interface
application
data
infra
observability
```

Interacao:

- Hover em uma camada destaca as tecnologias.
- Clique mostra "quando eu uso isso".
- Pequeno texto editorial explica que stack e decisao, nao vitrine.

### 9. CTA Final - Terminal Interativo Real

Nao usar formulario tradicional.

CTA precisa ser o climax da experiencia.

Comando inicial:

```bash
$ iniciar-projeto --briefing
```

Fluxo:

1. Qual tipo de projeto? `[SaaS] [API] [Web App] [Sistema interno] [Outro]`
2. Prazo estimado? `[1-3 meses] [3-6 meses] [6m+]`
3. Orcamento aproximado? `[ate 10k] [10k-30k] [30k+] [quero conversar]`
4. Seu WhatsApp ou email: `_`

Final:

- Gera briefing pre-formatado.
- Abre WhatsApp com mensagem pronta.
- Mostra confirmacao visual.

Regras:

- Chips clicaveis.
- Navegavel por teclado.
- Campo digitavel.
- Sem backend obrigatorio.
- Conversao por WhatsApp.
- Visual precisa parecer ferramenta, nao formulario fantasiado.

### 10. Footer - Assinatura Final

Footer minimalista e marcante.

Visual:

- `<MF/>` gigante.
- Pode ocupar 40-60vh.
- Deve parecer assinatura final da experiencia.

Conteudo pequeno:

```txt
Belo Horizonte, MG
PJ com NFS-e
marcus@mfdev.com.br
GitHub
LinkedIn
```

Opcional award-level:

- Ultimo commit publico do GitHub.
- Status "active".
- Buscar server-side quando possivel.
- Se falhar, esconder silenciosamente.

Final do site:

```bash
process.exit(0)
```

Ou:

```bash
ship it.
```

## Motion System

Timing:

- Microinteracoes: 180-300ms
- Transicoes medias: 400-700ms
- Transicoes de secao: 800-1200ms
- Cursor blink: 530ms

Easing:

- `expo.out` para entrada forte
- `power3.out` para reveals
- `power2.inOut` para transicoes
- Spring leve somente em elementos interativos

Assinatura:

```txt
type -> compile -> reveal -> ship
```

Ou seja:

- texto digita
- elementos compilam no lugar
- conteudo revela por mask
- CTA executa

## Performance

Obrigatorio:

- Sem WebGL.
- Sem Three.js.
- Sem Lottie.
- Animacoes em `transform`, `opacity`, `clip-path`, `stroke-dashoffset`.
- Evitar animar layout em loop.
- Lazy load de secoes abaixo do hero.
- Separar client components apenas onde necessario.
- Imagens otimizadas.
- SVGs inline leves.
- Fonts com `display: swap`.
- Preload apenas do essencial.
- Monitorar bundle.

Aceito:

- GSAP + ScrollTrigger se usado para transicoes principais.
- Lenis se o smooth scroll nao prejudicar acessibilidade/performance.
- SplitType se necessario para tipografia cinetica.

Nao aceito:

- Biblioteca pesada para um unico efeito.
- Dependencia visual generica.
- 200 animacoes competindo.
- Layout instavel.
- Travamento no mobile.

## Acessibilidade

Obrigatorio:

- `prefers-reduced-motion`.
- Foco visivel.
- Modal com Escape.
- Trap focus em modal.
- Botoes reais, nao div clicavel.
- ARIA nos terminais interativos.
- Terminal decorativo com `aria-hidden`.
- CTA terminal utilizavel no teclado.
- Contraste AA.
- Mobile touch-friendly.

## Arquitetura Sugerida

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  not-found.tsx

components/
  navbar.tsx
  site-footer.tsx

components/brand/
  mf-logo.tsx
  mf-loader.tsx

components/motion/
  reveal.tsx
  split-headline.tsx
  count-up-stat.tsx
  scroll-progress.tsx

components/terminal/
  live-terminal.tsx
  terminal-modal.tsx
  briefing-terminal.tsx

components/sections/
  hero-section.tsx
  about-section.tsx
  services-section.tsx
  projects-section.tsx
  process-section.tsx
  stack-section.tsx
  cta-section.tsx

hooks/
  use-prefers-reduced-motion.ts
  use-terminal-loop.ts
  use-count-up.ts
  use-lock-body-scroll.ts

lib/
  constants.ts
  utils.ts
  motion.ts

content/
  projects.ts
  services.ts
  process.ts
  stack.ts
  testimonials.ts
```

## Ordem De Execucao

### Fase 1 - Fundamento Award

Implementar primeiro:

1. Motion system
2. `<MF/>` animado
3. Hero cinetico
4. Terminal vivo
5. Count-up stats
6. Preloader curto
7. Navbar com assinatura de motion

Criterio:

- O hero sozinho ja precisa parecer award-level.

### Fase 2 - Narrativa

Implementar:

1. Transicao Hero -> Sobre
2. Sobre editorial
3. Servicos bento quebrado
4. Processo pipeline

Criterio:

- O site precisa deixar de parecer colecao de secoes e virar jornada.

### Fase 3 - Interacao Forte

Implementar:

1. Projetos horizontal cinematografico
2. Stack como mapa tecnico
3. CTA terminal interativo
4. Modal de case/projeto

Criterio:

- O usuario precisa brincar com o site sem perder o objetivo comercial.

### Fase 4 - Polimento

Implementar:

1. Footer assinatura
2. 404 com `<MF/>`
3. Reduced motion completo
4. Lighthouse/performance
5. Acessibilidade
6. Responsivo fino
7. Microcopy final

## Primeiro Entregavel

Gerar e implementar:

1. Arquitetura inicial dos componentes.
2. Sistema de tokens/motion em CSS/TS.
3. `MFLogo` animado.
4. `LiveTerminal`.
5. `SplitHeadline`.
6. `CountUpStat`.
7. `HeroSection` completo.
8. Navbar adaptada para usar a assinatura `<MF/>`.

O resultado precisa:

- Rodar com `npm run dev`.
- Funcionar em desktop e mobile.
- Ter fallback para `prefers-reduced-motion`.
- Ter visual claramente superior ao site atual.
- Nao parecer template.
- Ter personalidade de site award/interativo.
