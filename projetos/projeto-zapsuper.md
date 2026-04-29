# ZapSuper v3.0 — Plataforma SaaS de Números Virtuais

> Plataforma SaaS de alta escala para gerenciamento de números virtuais destinados à verificação SMS, com suporte a ~10.000 clientes simultâneos via API e painel web.

---

## Visão Geral

O ZapSuper é uma plataforma B2B que disponibiliza números de telefone virtuais para clientes que precisam receber códigos SMS de verificação em serviços como WhatsApp, Telegram, entre outros. O sistema gerencia um parque de chips físicos instalados em computadores distribuídos, controlando disponibilidade, cooldown, verificação de WhatsApp e faturamento em tempo real.

---

## Stack Tecnológico

### Backend
| Tecnologia | Uso |
|---|---|
| **Node.js 18+** | Runtime principal |
| **TypeScript 5** | Tipagem estrita, interfaces de domínio, branded types |
| **Express 4** | Framework HTTP, middlewares, roteamento modular |
| **MySQL 8 + mysql2** | Banco relacional principal com connection pool |
| **Sequelize** | ORM auxiliar para migrações de schema |
| **Redis** | Cache, distributed locks, rate limiting, idempotency keys |
| **Winston** | Logging estruturado com níveis e metadados |
| **JWT (jsonwebtoken)** | Autenticação stateless com refresh token rotation |
| **bcryptjs** | Hash de senhas com custo configurável |
| **Helmet + CORS** | Hardening HTTP (CSP, X-Frame-Options, etc.) |
| **express-rate-limit** | Rate limiting por rota e por cliente |
| **Joi** | Validação e sanitização de inputs nas rotas |
| **Swagger (swagger-jsdoc + swagger-ui-express)** | Documentação da API em OpenAPI 3.0 |
| **node-cron** | Scheduler para jobs periódicos (cooldown, WA check, sync) |
| **@whiskeysockets/baileys** | Integração WhatsApp Web via WebSocket |
| **Nodemailer** | Envio de e-mails transacionais |
| **MercadoPago SDK** | Processamento de pagamentos e depósitos |
| **Multer** | Upload de arquivos (importação de listas) |
| **xlsx** | Geração e leitura de planilhas Excel |
| **socks-proxy-agent** | Suporte a proxy SOCKS5 para integrações externas |
| **Jest + Supertest** | Testes unitários e de integração |

### Frontend
| Tecnologia | Uso |
|---|---|
| **Vue 3** | Framework reativo (Composition API) |
| **JavaScript (ES2022+)** | Sem TypeScript no frontend por escolha pragmática |
| **Vite 5** | Build tool e dev server com HMR |
| **Vuetify 3** | Component library Material Design |
| **Pinia** | State management (substituto do Vuex) |
| **Vue Router 4** | Roteamento SPA com guards de autenticação |
| **Axios** | Cliente HTTP com interceptors de auth |
| **VueUse** | Composables utilitários (useStorage, useDebounceFn, etc.) |
| **GSAP 3** | Animações de alta performance |
| **SASS** | Pré-processamento de CSS |
| **Vitest + @vue/test-utils** | Testes unitários de componentes e composables |

### Infraestrutura
| Tecnologia | Uso |
|---|---|
| **Docker + Docker Compose** | Containerização de todos os serviços |
| **Nginx** | Reverse proxy, SSL termination, roteamento frontend/backend |
| **VPS Linux** | Hospedagem própria (controle total, custo otimizado) |
| **deploy.sh** | Script de CI/CD customizado com health checks |

---

## Arquitetura

### Padrão de Camadas (Backend)

```
HTTP Request
    ↓
Middleware (authenticate, isAdmin, validate, rateLimit)
    ↓
Route Handler (modules/)     ← orquestra, retorna resposta
    ↓
Service (services/)          ← lógica de negócio complexa
    ↓
Repository (repositories/)   ← queries SQL reutilizáveis
    ↓
pool.execute() / pool.query() ← MySQL connection pool
```

### Módulos Backend

```
backend/src/modules/
├── auth/          # JWT, login, registro, refresh token
├── numbers/       # CORE: getNumber, getStatus, cooldown
├── payments/      # Saldo, crédito, transações, MercadoPago
├── clients/       # Clientes API (role=api_client), tokens, markup
├── public-api/    # Endpoints externos para clientes API
├── admin/         # Dashboard, gestão, relatórios, monitoramento
└── heartbeat/     # Health check dos computadores com chips
```

### Workers e Services Background

| Serviço | Responsabilidade |
|---|---|
| `numerosSyncService` | Sincroniza NSD (disponibilidade por serviço), expira cooldowns |
| `autoExpire.service` | Expira solicitações abertas após 20 minutos de TTL |
| `waCheckerLocal.service` | Verifica se chips já têm WhatsApp ativo via Baileys |
| `waCheckerTelein.service` | Verificação WA via API externa Telein |
| `waEuatendoVerificacao.service` | Verificação WA via API EuAtendo |
| `waLoadBalancer.service` | Balanceia carga entre os canais de verificação WA |
| `waAutoRecheck.service` | Reagenda verificações WA periodicamente |
| `waAutoVerificacao.service` | Orquestra verificações automáticas no boot |
| `heartbeatMonitor.service` | Monitora online/offline dos computadores com chips |
| `euatendoMonitor.service` | Monitora saúde da integração EuAtendo |
| `waCleanup.service` | Limpeza de sessões WA órfãs |
| `numberblock.service` | Importação e gestão de listas de bloqueio |
| `smsValidation.service` | Validação e extração de códigos SMS |
| `adminLogger.service` | Auditoria de ações administrativas |
| `email.service` | Envio de relatórios e notificações |
| `cache.service` | Abstração Redis (cache-aside, locks, rate limiting) |

### Banco de Dados — Modelo Central

```
users                            → clientes painel + api_clients
servicos                         → WhatsApp, Telegram, etc.
paises                           → países com iso_numerico
numeros                          → chips físicos (vinculados a computador)
numero_servico_disponibilidade   → cooldown, bloqueio por serviço
numero_historico_cooldown        → cooldown permanente por telefone+serviço
user_requests                    → solicitações dos clientes
transactions                     → débitos e créditos de saldo
whatsapp_check_jobs              → fila de verificação WA
client_service_restrictions      → serviços bloqueados por cliente
client_service_prices            → preços customizados por cliente
```

---

## Funcionalidades Principais

### Para Clientes (Painel Web e API REST)
- Solicitação de número virtual por serviço e país
- Recebimento de SMS e extração automática do código
- Cancelamento e reutilização controlada por cooldown
- Dashboard com histórico de solicitações e gastos
- Saldo pré-pago com recarga via MercadoPago

### Para Clientes API (B2B)
- Endpoints REST documentados em Swagger
- Autenticação via token de API (hash SHA-256 no banco)
- Markup de preço configurável por cliente
- Preços fixos por serviço (client_service_prices)
- Rate limiting por cliente via Redis

### Para Administradores
- Dashboard de monitoramento em tempo real
- Gestão de chips: importação, bloqueio, verificação WA
- Gestão de usuários, saldos e limites de crédito
- Monitoramento de computadores com heartbeat
- Relatórios com exportação Excel
- Painel de verificação WhatsApp com multiple backends (Baileys, Telein, EuAtendo)
- Filtro de atividade por usuário com KPIs e top performers

---

## Fluxos de Negócio Críticos

### getNumber — Solicitação de Número
1. Valida saldo disponível (`saldo + limite_credito >= preco_final`)
2. Busca número com cooldown expirado e sem TTL ativo (últimos 20 min)
3. Ordenação por `ultimo_pedido_em ASC` (rotação justa entre chips)
4. Debita saldo + cria `user_request` em transação atômica
5. Idempotency key via Redis previne débito duplo em retentativas

### Sistema de Cooldown
- `numero_servico_disponibilidade` controla disponibilidade por serviço
- `bloqueado_validacao = 1` bloqueia chip apenas para WhatsApp (outros serviços livres)
- `numero_historico_cooldown` persiste cooldown mesmo após DELETE do número
- Job periódico a cada 60s: cria NSD faltante → expira cooldowns → agenda verificação WA

### Cálculo de Preço
```
Usuário painel:  preco_final = preco_base
Cliente API:     preco_final = preco_base + (preco_base × markup / 100)
Preço fixo:      preco_final = preco_fixo (ignora markup)
```

---

## Metodologias e Princípios

### SOLID aplicado
- **SRP**: Route handler apenas orquestra; service contém negócio; repository contém SQL
- **OCP**: Estratégias de preço extensíveis sem modificar código existente
- **LSP**: Repositórios com interfaces — substituíveis por mocks em testes
- **ISP**: Interfaces específicas por contexto, sem dependências forçadas
- **DIP**: Injeção de dependência via construtor em services

### Clean Code
- **DRY**: Lógica de validação, paginação e preço extraídas em helpers reutilizáveis
- **KISS**: Complexidade ciclomática máxima de 5 por função
- **YAGNI**: Nenhuma abstração antecipada sem requisito concreto
- **Early Return**: Zero nesting desnecessário nos handlers
- Funções com no máximo 30 linhas; extração obrigatória acima disso

### Segurança (OWASP)
- SQL Injection: `pool.execute()` com prepared statements em todas as queries
- Senhas: bcrypt com rounds configuráveis
- Tokens de API: hash SHA-256 — nunca plaintext no banco
- Headers HTTP: Helmet (CSP, X-Frame-Options, X-Content-Type-Options)
- CORS restrito ao domínio da aplicação
- Rate limiting diferenciado por endpoint sensível
- Dados sensíveis nunca logados (sanitização antes do logger)
- `.env` fora do controle de versão; variáveis de ambiente para tudo configurável

### Banco de Dados
- Migrations obrigatórias para qualquer alteração de schema (Sequelize)
- Sem `SELECT *` — colunas explícitas em todas as queries críticas
- Índices compostos em campos de WHERE + ORDER BY
- `Promise.all()` para queries independentes paralelas
- Paginação em todos os endpoints de lista (máx. 100 registros)
- Transações explícitas para qualquer operação multi-tabela

### Testes
- Pirâmide: unitários (Jest/Vitest) → integração (Supertest + banco real) → E2E
- Padrão AAA (Arrange, Act, Assert) em todos os testes
- Mocks via interface (LSP) — sem acoplar testes à implementação concreta
- Cobertura obrigatória em: services críticos, middlewares, workers

---

## Padrões Avançados

### Distributed Lock (Redis)
Previne race condition no `getNumber` quando múltiplas requisições simultâneas tentam reservar o mesmo chip.

### Idempotency Key
Header `X-Idempotency-Key` com TTL no Redis evita débito duplo por retry do cliente em falhas de rede.

### Cache-Aside
Lista de serviços, preços e configurações cacheadas com TTL explícito; invalidação pontual ao atualizar.

### Result Pattern
Erros de domínio retornados como valores (`{ ok: true, valor }` / `{ ok: false, erro }`) — sem exceções para controle de fluxo esperado.

### Hierarquia de Erros de Domínio
```
AppError (base)
├── ErroSaldoInsuficiente   → 402
├── ErroNumeroIndisponivel  → 404
└── ErroServicoRestrito     → 403
```
Middleware centralizado captura e formata todos os erros sem try/catch nos handlers.

### Async Handler Wrapper
`asyncHandler(fn)` elimina try/catch repetitivo nas rotas, propagando erros ao middleware centralizado.

### Branded Types (TypeScript)
`UsuarioId`, `Centavos`, etc. — segurança em tempo de compilação para evitar parâmetros trocados.

### Composables Vue 3
`useCarregarDados`, `usePaginacao`, `useFilters` — lógica reutilizável desacoplada das views; sem lógica de negócio nos templates.

---

## Possíveis Melhorias Futuras

### Performance e Escala
- **Horizontal scaling**: sessões JWT já são stateless; adicionar sticky sessions no Nginx para WebSocket do Baileys
- **Read replicas MySQL**: separar leituras (getNumber consultas) das escritas (transações)
- **Queue com Bull/BullMQ**: substituir cron jobs por filas Redis para workers de WA — retry, dead letter queue, concorrência controlada
- **gRPC interno**: substituir chamadas HTTP entre serviços internos por gRPC (latência menor, streaming)

### Observabilidade
- **OpenTelemetry**: traces distribuídos entre serviços (frontend → backend → workers)
- **Prometheus + Grafana**: métricas de negócio (taxa de sucesso getNumber, chips disponíveis, latência p95)
- **Alertas automáticos**: Discord/Telegram webhook para alertas de chip offline, saldo crítico, erro de WA checker
- **Structured logging**: correlação de logs por `request_id` end-to-end

### Arquitetura
- **Event-driven**: publicar eventos de domínio (NumeroUsado, SaldoDebaitado) via Redis Pub/Sub para desacoplar notificações, relatórios e auditoria
- **CQRS parcial**: separar leitura do dashboard (queries otimizadas, talvez views materializadas) da escrita transacional
- **Multi-tenancy melhorado**: isolamento de dados por cliente API em schemas separados para compliance
- **API Gateway**: centralizar auth, rate limit e logging numa camada dedicada (Kong, Traefik)

### Developer Experience
- **Migração completa para Zod**: substituir Joi por Zod para ter schemas unificados com inferência de tipos TypeScript
- **Playwright E2E**: cobertura do golden path (login → getNumber → confirmar SMS) em CI
- **GitHub Actions CI/CD**: substituir deploy.sh manual por pipeline automatizada com staging env
- **Swagger auto-gerado**: integrar `tsoa` ou `express-zod-api` para gerar contrato OpenAPI a partir dos tipos TypeScript

### Produto
- **Webhook para clientes API**: notificação push de SMS recebido (hoje o cliente faz polling)
- **Multi-país dinâmico**: chips com portabilidade automática de país via SIM virtual
- **Dashboard de ROI por serviço**: análise de taxa de sucesso, cooldown médio, rentabilidade por serviço
- **Planos de assinatura**: substituir crédito avulso por planos mensais com cotas e SLA

---

## Destaques Técnicos

- Sistema de cooldown com histórico persistente — chips reciclados mantêm cooldown mesmo sendo deletados e reimportados
- Load balancer próprio para verificação WhatsApp com 3 backends independentes (Baileys local, Telein API, EuAtendo API)
- Monitoramento de heartbeat com cálculo de online/offline em tempo real por computador
- Rotação justa de chips por `ultimo_pedido_em ASC` — evita desgaste concentrado em poucos números
- Arquitetura de preços multi-camada: preço base → markup percentual → preço fixo por cliente/serviço
- Proteção contra race condition no `getNumber` com distributed lock Redis — consistência sob carga alta

---

*Stack: Node.js · TypeScript · Express · MySQL · Redis · Vue 3 · Vite · Vuetify · Docker · Nginx*
