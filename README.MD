# Fullstack — Painel de Gestão Social

Sistema de monitoramento de crianças em situação de vulnerabilidade social, desenvolvido como projeto fullstack com arquitetura de monorepo.

## Stack

| Camada         | Tecnologia                 | Justificativa                                                                    |
| -------------- | -------------------------- | -------------------------------------------------------------------------------- |
| Frontend       | Next.js 14+ com TypeScript | App Router, SSR nativo, ecossistema maduro                                       |
| Estilização    | Tailwind CSS               | Produtividade, consistência e sem CSS externo                                    |
| Backend        | Fastify com TypeScript     | Performance superior ao Express, TypeScript nativo, validação de schema embutida |
| Banco de dados | MongoDB com Mongoose       | Flexibilidade de schema para dados sociais com campos opcionais                  |
| Infraestrutura | Docker + Docker Compose    | Ambiente reproduzível do zero em qualquer máquina                                |

## Estrutura do projeto

fullstack/
├── apps/
│ ├── api/ # Fastify — porta 3001
│ └── web/ # Next.js — porta 3000
├── packages/
│ └── types/ # Interfaces TypeScript compartilhadas
├── docker-compose.yml
└── .env.example

## Como rodar

### Pré-requisitos

- Docker e Docker Compose instalados
- Git

### Rodando do zero

```bash
git clone https://github.com/marcmec/fullstack.git
cd fullstack
cp .env.example .env
docker compose up --build
```

Acesse:

- Frontend: http://localhost:3000
- API: http://localhost:3001/

### Desenvolvimento local

```bash
# API
cd apps/api
npm install
npm run dev

# Frontend
cd apps/web
npm install
npm run dev
```

## Decisões técnicas

**Fastify em vez de Express**
Fastify oferece performance 2-3x superior ao Express, suporte nativo a TypeScript e validação de schema embutida via JSON Schema. Para um projeto novo em 2025/26, é a escolha natural para APIs Node.js.

**MongoDB em vez de banco relacional**
Os dados de crianças monitoradas têm campos opcionais por natureza — saúde, educação e assistência social podem estar ausentes. O schema flexível do MongoDB se adapta melhor a essa realidade do que tabelas relacionais com muitos NULLs.

**Monorepo com npm workspaces**
Permite compartilhar tipos TypeScript entre API e frontend via `packages/types` sem duplicação. Um único `docker compose up` sobe toda a infraestrutura.

**Next.js App Router**
Roteamento baseado em sistema de arquivos, Server Components para performance e layout aninhado nativo.

## Variáveis de ambiente

Veja `.env.example` para todas as variáveis necessárias.

## Autor

Seu Nome — [LinkedIn](https://linkedin.com/in/marcmec) — [GitHub](https://github.com/marcmec)
