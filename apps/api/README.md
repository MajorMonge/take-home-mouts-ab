# API - Backend NestJS

Esta é a aplicação backend do monorepo, construída com NestJS.

## Tecnologias Utilizadas

- [NestJS 11](https://nestjs.com/) - Framework Node.js para construção de aplicações escaláveis
- [Prisma ORM 6](https://www.prisma.io/) - ORM para Node.js e TypeScript
- [PostgreSQL 16](https://www.postgresql.org/) - Banco de dados relacional
- [Redis](https://redis.io/) - Sistema de cache para melhorar performance
- [Swagger](https://swagger.io/) - Documentação de API automatizada
- [Winston](https://github.com/winstonjs/winston) - Sistema de logging
- [Docker](https://www.docker.com/) - Containerização
- [Jest](https://jestjs.io/) - Framework de teste

## Funcionalidades

A API oferece endpoints RESTful para gerenciar usuários, com as seguintes funcionalidades:

- **CRUD de Usuários**: Endpoints para criar, ler, atualizar e deletar informações de usuários
- **Cache com Redis**: Cacheamento de respostas para melhorar performance
- **Documentação Swagger**: Documentação interativa disponível em `/api/docs`
- **Validação de Dados**: Validação automática de entrada usando DTOs
- **Logging**: Sistema avançado de log para monitoramento
- **Tratamento de Exceções**: Manipulação de erros do Prisma e conversão para respostas HTTP adequadas

## Estrutura de Arquivos

```
src/
├── app.controller.ts        # Controlador principal 
├── app.module.ts            # Módulo raiz da aplicação
├── app.service.ts           # Serviço principal
├── main.ts                  # Ponto de entrada da aplicação
├── common/                  # Componentes comuns
│   ├── exceptions/          # Filtros de exceção
│   └── interceptors/        # Interceptadores
├── models/                  # Módulos de domínio
│   └── users/               # Módulo de usuários
│       ├── dto/             # Objetos de transferência de dados
│       ├── entities/        # Entidades
│       ├── users.controller.ts  # Controlador de usuários
│       ├── users.module.ts      # Módulo de usuários
│       └── users.service.ts     # Serviço de usuários
└── providers/               # Provedores de serviços
    ├── logger/              # Serviço de logging
    ├── prisma/              # Serviço do Prisma ORM
    └── swagger/             # Serviço de documentação Swagger
prisma/
├── schema.prisma           # Schema do Prisma
├── seed.ts                 # Script para popular o banco de dados
└── migrations/             # Migrações do banco de dados
```

## Começando

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão >=18)
* [npm](https://www.npmjs.com/) (versão >=10.9.2)
* [Docker](https://www.docker.com/) (para executar o banco de dados)

### Instalação e Execução

1. Configure as variáveis de ambiente:
   * Crie um arquivo `.env` baseado no `.env.example` 
   ```
   # Copie o arquivo .env.example
   cp .env.example .env
   # Edite as variáveis conforme necessário
   ```

2. Inicie o banco de dados e Redis usando Docker:
   ```bash
   docker-compose up -d
   ```

3. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate deploy
   ```

4. Opcionalmente, popular o banco de dados com dados iniciais:
   ```bash
   npx prisma db seed
   ```

5. Execute a API:
   ```bash
   # Na raiz do monorepo
   npm run dev -- --filter=api
   
   # OU, dentro do diretório da aplicação
   cd apps/api
   npm run dev
   ```

6. Acesse a API em [http://localhost:3000](http://localhost:3000) e a documentação Swagger em [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento com hot-reload
* `npm run build`: Compila a aplicação para produção
* `npm run start`: Inicia a versão compilada da aplicação
* `npm run start:debug`: Inicia o servidor com modo de debug
* `npm run start:prod`: Inicia a aplicação em modo de produção
* `npm run lint`: Executa o linter para verificar o código
* `npm run test`: Executa os testes unitários
* `npm run test:watch`: Executa os testes em modo observação
* `npm run test:e2e`: Executa os testes end-to-end

## Endpoints da API

A API oferece os seguintes endpoints para gerenciar usuários:

- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Obter um usuário específico por ID
- `POST /api/users` - Criar um novo usuário
- `PUT /api/users/:id` - Atualizar um usuário existente
- `DELETE /api/users/:id` - Remover um usuário

Todos os detalhes dos endpoints, parâmetros aceitos e formatos de resposta estão disponíveis na documentação Swagger em `/api/docs`.
