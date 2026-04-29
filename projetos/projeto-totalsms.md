# TotalSMS — Plataforma de Comunicação SMS

> Plataforma SaaS completa para gestão de campanhas SMS, ativações de número virtual e serviços de filtragem de contatos, com painel administrativo, sistema de pagamentos e API pública.

---

## Visão Geral

O TotalSMS é um sistema multitenant construído do zero para operação em produção real. Ele centraliza múltiplos serviços de comunicação SMS — campanhas em massa, ativação de números virtuais (estilo SMS-Activate) e filtragem de listas de contatos — em uma única plataforma com gestão financeira integrada, controle de usuários por papel e API pública compatível com protocolos do mercado.

O sistema é vendido como serviço (SaaS) com modelo de créditos pré-pago, cobrança por uso e integração com múltiplas formas de pagamento nacionais e internacionais.

---

## Stack Tecnológica

### Backend

| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | LTS | Runtime principal |
| TypeScript | 5.6 | Type safety end-to-end |
| Express.js | 4.21 | Framework HTTP |
| Prisma ORM | 6.9 | Acesso ao banco de dados |
| MySQL 8 | — | Banco de dados relacional |
| Zod | 3.23 | Validação de entrada (schemas) |
| JSON Web Token | 9.0 | Autenticação stateless |
| Helmet.js | 8.0 | Headers de segurança HTTP |
| express-rate-limit | 7.4 | Rate limiting por usuário |
| Vitest | 2.1 | Testes unitários |
| xlsx / csv-parse | — | Processamento de arquivos de número |
| uuid | 10.0 | Geração de identificadores únicos |

### Frontend

| Tecnologia | Versão | Função |
|---|---|---|
| Vue 3 | 3.5 | Framework reativo (Composition API) |
| TypeScript | 5.6 | Tipagem estática |
| Vite | 6.0 | Build tool e dev server |
| Vue Router | 4.4 | Roteamento com guards de autenticação |
| Pinia | 2.2 | Gerenciamento de estado global |
| Axios | 1.7 | Cliente HTTP com interceptors |
| Chart.js + vue-chartjs | 4.4 / 5.3 | Gráficos e dashboards |
| Sass | 1.80 | Pré-processador CSS |

### Infraestrutura e DevOps

| Tecnologia | Função |
|---|---|
| Docker + Docker Compose | Containerização (dev e produção) |
| Nginx | Servidor estático do frontend em produção |
| Dozzle | Visualização de logs Docker em produção |
| Python (SMTP service) | Serviço isolado de envio de e-mail |
| VPS Linux | Hospedagem em produção |

### Integrações Externas

| Serviço | Uso |
|---|---|
| ZapSuper API | Provedor principal: campanhas SMS, filtros, números |
| Mercado Pago | Pagamentos via cartão e PIX |
| Binance Pay | Pagamentos em criptomoeda |
| Google reCAPTCHA v2 | Proteção anti-bot no cadastro/login |

---

## Arquitetura

### Padrão em Camadas (Backend)

```
HTTP Request
    → Middleware (auth, rate-limit, logger, cors, helmet)
    → Router
    → Controller  — valida input com Zod, chama service, retorna response
    → Service     — orquestra regras de negócio, chama repository
    → Repository  — única camada com acesso ao Prisma/banco de dados
    → Database (MySQL 8)
```

Cada módulo de domínio é autocontido:

```
backend/src/modules/<domínio>/
├── <domínio>.controller.ts
├── <domínio>.service.ts
├── <domínio>.repository.ts
├── <domínio>.mapper.ts
├── <domínio>.validator.ts
├── <domínio>.routes.ts
└── <domínio>.types.ts
```

### Módulos de Domínio (16 módulos)

- **auth** — Cadastro, login, verificação de e-mail, recuperação de senha, refresh token
- **user** — CRUD de usuários, saldo, histórico de atividades, bloqueio
- **payment** — PIX, Mercado Pago, Binance Pay, crédito administrativo
- **finance** — Relatórios financeiros, extrato de transações, filtros por período
- **activation** — Ativação de números virtuais com polling de SMS recebido
- **virtual-number** — Gestão de serviços virtuais disponíveis (Telegram, WhatsApp, etc.)
- **service-order** — Campanhas SMS e filtros: criação, listagem, acompanhamento
- **pricing** — Preços globais e por usuário
- **sms-type** — Tipos de SMS (shortcode massivo, premium, bet)
- **external-api** — Integração com ZapSuper (proxy e adaptador)
- **blacklist** — Listas negras globais e por usuário
- **search** — Busca unificada em campanhas e números
- **number-generator** — Geração de listas de números por padrão/formato
- **country** — Países e DDDs disponíveis
- **public-api** — API pública com protocolo SMS-Activate
- **scheduler** — Job background para timeout de ativações (execução a cada 60s)

### Frontend — Arquitetura de Componentes

```
views/          — Páginas orquestradoras (composables + sub-componentes)
components/     — Componentes reutilizáveis por domínio
composables/    — Lógica reativa reutilizável (usePolling, usePagination, etc.)
services/       — Camada de chamada à API (uma por domínio)
stores/         — Estado global: auth, notificações, tema
utils/          — Formatadores puros: data, moeda, telefone, status
layouts/        — Estruturas de página (pública, autenticada, admin)
```

---

## Funcionalidades Principais

### Para Usuários

- **Ativação de Números Virtuais** — Aluguel de números temporários para receber SMS de verificação (Telegram, WhatsApp, bancos, etc.), com polling em tempo real do código recebido
- **Campanhas SMS em Massa** — Upload de lista via CSV/Excel, configuração de tipo (shortcode massivo, premium, bet), acompanhamento de status
- **Filtragem de Contatos** — Verificação de atividade de números em plataformas (WhatsApp, Facebook, etc.)
- **Gerador de Números** — Criação de listas de números por padrão customizado
- **Depósito de Créditos** — PIX, cartão via Mercado Pago, Binance Pay
- **Extrato Financeiro** — Histórico de transações com filtros
- **Lista Negra** — Bloqueio de números por conta
- **API Pública** — Integração via protocolo SMS-Activate com token por usuário
- **Documentação de API** — Docs interativos dentro do painel

### Para Administradores

- **Gestão de Usuários** — CRUD completo, ajuste de saldo, bloqueio de contas
- **Monitoramento de Pedidos** — Todos os pedidos de serviço com filtros por status, tipo e subtipo
- **Gestão Financeira** — Visão consolidada de depósitos, gastos e saldo por período
- **Precificação** — Tabelas globais com override por usuário
- **Serviços Virtuais** — Cadastro de novos serviços disponíveis para ativação
- **Lista Negra Global** — Gestão de números bloqueados na plataforma inteira
- **Log de Atividades** — Auditoria de ações dos usuários

---

## Segurança

- Autenticação com JWT (access token + refresh token)
- Middleware de autorização baseado em papel (ADMIN / USER / CLIENT)
- Rate limiting por usuário (express-rate-limit)
- Headers de segurança HTTP via Helmet.js
- Validação de todas as entradas com Zod (sem dados brutos chegando ao service)
- Verificação de e-mail obrigatória no cadastro
- Proteção anti-bot via Google reCAPTCHA v2
- Tokens de redefinição de senha com expiração
- CORS configurável por ambiente

---

## Banco de Dados

**Modelos principais (Prisma/MySQL 8):**

- `User` — dados de conta, papel, saldo, status de bloqueio
- `Transaction` — ledger financeiro (débitos e créditos)
- `Payment` — transações de depósito com status de pagamento
- `VirtualActivation` — ativações de número virtual (com código SMS recebido, status, expiração)
- `VirtualService` / `VirtualCountry` / `VirtualConfig` — catálogo de serviços de ativação
- `Blacklist` — números bloqueados (global e por usuário)
- `SmsType` — tipos de SMS disponíveis
- `ActivityLog` — auditoria de ações

**Tabelas legadas (integração read-only com sistema do provedor):**

- `EnvioCampanha` / `FiltroCampanha` — pedidos de campanha e filtragem
- `Servico` / `ServicoTarifaUsuario` — catálogo e tarifação de serviços
- `EnvioDocumento` / `FiltroNumeros` — itens individuais dos pedidos

---

## Formato de Resposta Padronizado da API

```typescript
// Sucesso simples
{ success: true, message: "...", data: { ... } }

// Sucesso paginado
{ success: true, data: [...], pagination: { total, page, perPage, totalPages, hasNext, hasPrev } }

// Erro
{ success: false, message: "...", errors?: [...] }
```

---

## Metodologias e Princípios

### Desenvolvimento

- **Clean Architecture** — separação estrita de responsabilidades em camadas (controller → service → repository)
- **Single Responsibility Principle (SRP)** — cada arquivo, função e componente com uma única razão para mudar
- **Domain-Driven Design (DDD)** — código organizado por domínio de negócio, não por tipo técnico
- **Composition API (Vue 3)** — lógica reativa encapsulada em composables reutilizáveis
- **Contract-First Validation** — toda entrada validada com Zod antes de atingir qualquer camada de negócio

### Qualidade e Processo

- **TypeScript Strict** — sem `any`, tipagem completa em frontend e backend
- **Commits Semânticos** — `feat`, `fix`, `refactor` com escopo claro
- **Separação de ambientes** — `docker-compose.yml` para dev, `docker-compose.prod.yml` para produção
- **Testes unitários** — Vitest para services críticos
- **Logs estruturados** — logger centralizado + Dozzle para visualização em produção

### Design de Interface

- **CSS puro** — sem frameworks de componente (design system próprio)
- **Design System próprio** — tokens de cor, espaçamento e tipografia consistentes
- **Dark mode** — suportado via classe `html.dark` + overrides
- **Responsividade** — layouts adaptáveis para desktop e mobile
- **UX orientada ao fluxo** — paginação, filtros cascata, feedback de status em tempo real

---

## Possíveis Melhorias

### Performance e Escalabilidade

- **Fila de mensagens (Bull/BullMQ + Redis)** — substituir o scheduler com `setInterval` por uma fila real para processamento de jobs (timeouts de ativação, envios em lote), com retry automático e dead-letter queue
- **Cache com Redis** — cache de consultas frequentes (preços, tipos de SMS, países) para reduzir carga no banco
- **Paginação cursor-based** — substituir paginação offset em tabelas grandes (EnvioCampanha pode ter milhões de registros) por cursor para melhor performance
- **Connection pooling** — configurar pool de conexões Prisma para alta concorrência

### Robustez

- **Webhook de pagamento com idempotência** — garantir que callbacks do Mercado Pago/Binance sejam processados exatamente uma vez com chave de idempotência
- **Retry automático nas chamadas ao ZapSuper** — implementar backoff exponencial para falhas de rede no provedor externo
- **Circuit breaker** — proteger o sistema quando o ZapSuper estiver indisponível, evitando cascata de erros
- **Health checks** — endpoint `/health` com verificação de banco, cache e provedores externos para monitoramento

### Observabilidade

- **OpenTelemetry** — rastreamento distribuído de requisições ponta a ponta
- **Métricas com Prometheus + Grafana** — monitoramento de latência, taxa de erros, throughput por endpoint
- **Alertas automáticos** — notificações em caso de falha de pagamento, erro em ativações ou indisponibilidade do provedor

### Produto e UX

- **Notificações em tempo real (WebSocket/SSE)** — avisar o usuário quando o SMS da ativação chegar, sem necessidade de polling manual
- **Relatórios exportáveis** — exportar extrato financeiro e histórico de campanhas em CSV/PDF
- **Sistema de afiliados** — comissão por indicação de novos usuários
- **Planos de assinatura** — precificação por volume/plano além do modelo pay-per-use

### Código e Manutenibilidade

- **Cobertura de testes** — expandir testes unitários para todos os services e adicionar testes de integração para fluxos de pagamento e ativação
- **Migration versionada explícita** — substituir migração automática no startup por comandos explícitos de `prisma migrate deploy` na pipeline CI/CD
- **API Gateway** — centralizar autenticação, rate limiting e logging em uma camada de gateway (ex: Kong, Traefik) para facilitar escalonamento horizontal
- **Multi-database** — migrar tabelas do sistema legado para o banco próprio, eliminando a dependência de leitura direta nas tabelas do provedor

---

## Estrutura do Repositório

```
TotalSMS/
├── backend/
│   ├── prisma/           # Schema e migrations do banco
│   ├── src/
│   │   ├── config/       # Configurações de ambiente
│   │   ├── modules/      # 16 módulos de domínio
│   │   └── shared/       # Middleware, utils, tipos globais
│   └── Dockerfile.prod
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes por domínio
│   │   ├── composables/  # Hooks reutilizáveis
│   │   ├── layouts/      # Layouts de página
│   │   ├── router/       # Rotas com guards
│   │   ├── services/     # Camada de API
│   │   ├── stores/       # Estado global (Pinia)
│   │   ├── utils/        # Formatadores e helpers
│   │   └── views/        # Páginas (32 views)
│   └── Dockerfile.prod
├── email-service/        # Serviço Python de e-mail
├── docker-compose.yml
├── docker-compose.prod.yml
└── deploy.sh
```

---

## Números do Projeto

| Métrica | Valor |
|---|---|
| Módulos de domínio (backend) | 16 |
| Páginas (views frontend) | 32 |
| Serviços de API frontend | 10 |
| Modelos de banco de dados | 20+ |
| Formas de pagamento integradas | 3 (PIX, Mercado Pago, Binance Pay) |
| Papéis de acesso | 3 (ADMIN, USER, CLIENT) |
| Containers em produção | 4 (backend, frontend, email, dozzle) |
