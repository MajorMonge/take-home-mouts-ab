# take-home-mouts-ab

Este é um monorepo gerenciado com [Turborepo](https://turbo.build/repo).

## Visão Geral

Este repositório contém:

*   Uma aplicação web frontend construída com Next.js (`apps/web`).
*   Uma API backend construída com NestJS (`apps/api`).
*   Pacotes compartilhados para configurações comuns (ESLint, TypeScript, Jest).

## Conteúdo do Monorepo

### Aplicações (`apps`)

*   `web`: Aplicação frontend Next.js.
    *   Para mais detalhes, veja o [`README.md` em `apps/web`](./apps/web/README.md).
*   `api`: Aplicação backend NestJS.
    *   Para mais detalhes, veja o [`README.md` em `apps/api`](./apps/api/README.md).

### Pacotes (`packages`)

*   `@repo/eslint-config`: Configurações ESLint compartilhadas.
*   `@repo/jest-config`: Configurações Jest compartilhadas.
*   `@repo/typescript-config`: Configurações TypeScript (`tsconfig.json`) compartilhadas.

## Começando

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão >=18, conforme especificado em `package.json`).
*   [npm](https://www.npmjs.com/) (versão >=10.9.2, conforme especificado em `package.json`).
*   [Docker](https://www.docker.com/) (Para execução dos serviços de banco de dados e cache).

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    cd take-home-mouts-ab
    ```

2.  Instale as dependências a partir da raiz do projeto:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    * Crie os arquivos `.env` necessários para cada aplicação baseado nos arquivos `.env.example`.

4.  Inicie o banco de dados (para a API):
    ```bash
    cd apps/api
    docker-compose up -d
    ```

5.  Execute a geração e migrações do banco de dados:
    ```bash
    cd apps/api
    npm run prisma:generate
    npm run prisma:migrate:dev
    npm run prisma:seed
    ```

Para garantir que tudo funcione corretamente, verifique:
*   A geração do Prisma foi realizada e as migrações foram aplicadas;
*   As variáveis de ambiente estão configuradas corretamente de acordo com os bancos de dados e serviços que você está utilizando e serviços de cache;
*   As dependências estão instaladas.
  
## Scripts Disponíveis

Os seguintes scripts podem ser executados a partir da raiz do monorepo:

*   **`npm run dev`**: Inicia todas as aplicações (`web` e `api`) em modo de desenvolvimento.
    *   A aplicação `web` geralmente estará disponível em `http://localhost:4100` (verifique `apps/web/package.json`).
    *   A aplicação `api` geralmente estará disponível em `http://localhost:3000` (verifique `apps/api/package.json` e `.env`).
*   **`npm run build`**: Compila todas as aplicações para produção.
*   **`npm run test`**: Executa os testes unitários e de integração para todas as aplicações e pacotes.
*   **`npm run test:e2e`**: Executa os testes end-to-end.
*   **`npm run lint`**: Executa o linter em todas as aplicações e pacotes.
*   **`npm run format`**: Formata o código em todo o monorepo usando Prettier.

Para executar scripts específicos de uma aplicação ou pacote, você pode usar os comandos do Turborepo diretamente ou navegar até o diretório respectivo. Por exemplo:

```bash
# Iniciar apenas a aplicação web em modo de desenvolvimento
npm run dev --filter=web

# Construir apenas a api
npm run build --filter=api
```

## Variáveis de Ambiente

Cada aplicação (`apps/web`, `apps/api`) pode requerer seu próprio arquivo `.env` para configuração. Consulte os arquivos `.env.example` dentro de cada diretório de aplicação para as variáveis necessárias.

*   `apps/api/.env.example`
*   `apps/web/.env.example`
