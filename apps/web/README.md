# Web - Aplicação Frontend

Esta é a aplicação frontend do monorepo, construída com Next.js.

## Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/) - Framework React para desenvolvimento web
- [React 19](https://react.dev/) - Biblioteca JavaScript para construção de interfaces
- [TailwindCSS 4](https://tailwindcss.com/) - Framework CSS utilitário
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado do JavaScript
- [React Query](https://tanstack.com/query/latest) - Biblioteca para gerenciamento de estado e requisições

## Funcionalidades

A aplicação web oferece uma interface para gerenciar usuários, com as seguintes funcionalidades:

- **Listagem de Usuários**: Visualização de todos os usuários cadastrados
- **Criação de Usuários**: Formulário para adicionar novos usuários
- **Edição de Usuários**: Possibilidade de modificar dados de usuários existentes
- **Visualização de Detalhes**: Exibição das informações completas de cada usuário

## Estrutura de Arquivos

```
src/
├── app/                  # Diretório de rotas Next.js (App Router)
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal 
│   └── page.tsx          # Página de entrada e listagem de usuários
├── components/           # Componentes reutilizáveis
│   ├── Button/           # Botão customizado
│   ├── Input/            # Campo de entrada customizado
│   ├── UserListItem/     # Item de listagem de usuário
│   └── UserModal/        # Modal para criação/edição de usuário
├── connections/          # Funções para comunicação com a API
│   └── api.ts            # Métodos para requisições HTTP
└── types/                # Definições de tipos TypeScript
    └── user.d.ts         # Interface do tipo User
```

## Componentes

- **Button**: Botão customizado com suporte para estados como carregamento e desabilitado
- **Input**: Campo de entrada com suporte para label, ícone e mensagens de erro
- **UserListItem**: Item de lista para mostrar informações resumidas do usuário
- **UserModal**: Modal para criar ou editar informações do usuário

## Começando

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão >=18)
* [npm](https://www.npmjs.com/) (versão >=10.9.2)

### Instalação e Execução

1. Certifique-se de que o servidor API esteja em execução antes de iniciar a aplicação web:
   ```bash
   # Na raiz do monorepo, execute a API primeiro (ou use o filtro do Turborepo)
   npm run dev -- --filter=api
   ```

2. Configure as variáveis de ambiente:
   * Crie um arquivo `.env` baseado no `.env.example` 
   * Por padrão, a aplicação espera que a API esteja rodando em `http://localhost:3000/api`

3. Execute a aplicação web:
   ```bash
   # Na raiz do monorepo
   npm run dev -- --filter=web
   
   # OU, dentro do diretório da aplicação
   cd apps/web
   npm run dev
   ```

4. Acesse a aplicação em [http://localhost:4100](http://localhost:4100)

## Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento
* `npm run build`: Compila a aplicação para produção
* `npm run start`: Inicia a versão de produção da aplicação
* `npm run lint`: Executa o linter para verificar o código
* `npm run test`: Executa os testes unitários
* `npm run test:watch`: Executa os testes em modo observação
* `npm run test:e2e`: Executa os testes end-to-end

## Conexão com a API

A aplicação se comunica com a API para realizar operações CRUD nos usuários. As funções de conexão estão no arquivo `src/connections/api.ts`:

- `getAllUsers()`: Busca todos os usuários
- `getUserById(id)`: Busca um usuário específico
- `createUser(user)`: Cria um novo usuário
- `updateUser(user)`: Atualiza um usuário existente
