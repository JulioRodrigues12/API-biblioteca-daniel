# API para Sistema de Gerenciamento de Biblioteca

## 1. Autor

- Julio Rodrigues

## 2. Descrição Resumida

Este projeto consiste na criação de uma API (Application Programming Interface) RESTful para gerenciar o funcionamento de uma biblioteca. A API permite o cadastro e a consulta de autores, livros, usuários e o controle de empréstimos[cite: 8].

A persistência dos dados é feita utilizando um banco de dados não relacional, o **MongoDB**, através da biblioteca **Mongoose**. O servidor web é construído com **Fastify**, focando em performance e utilizando o padrão **ES Modules** (`type: "module"`).

## 3. Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **Fastify**: Framework web para construção das rotas da API[cite: 11].
- **Mongoose**: Biblioteca de modelagem para comunicação com o MongoDB[cite: 12].
- **MongoDB**: Banco de dados não relacional[cite: 8].
- **Dotenv**: Módulo para gerenciar variáveis de ambiente[cite: 13].

## 4. Estrutura de Pastas e Arquivos

O projeto segue uma estrutura modular para facilitar a manutenção e organização:

/TRABALHO-MONGODB
├── src/
│ ├── database/ # Conexão (index.js)
│ ├── http/ # Lógica de HTTP
│ │ ├── controllers/ # Lógica de Negócio (ex: UserController.js)
│ │ └── routes/ # Definição das Rotas (ex: index.js)
│ ├── models/ # Schemas (Author.js, Book.js, etc.)
│ ├── scripts/ # Scripts Auxiliares
│ └── server.js # Ponto de entrada (npm run dev)
├──.env # Configuração de variáveis de Ambiente
├──.env.example # Modelo de variáveis de Ambiente
├──package.json # Arquivo de configurações do projeto
├──routes.http # Arquivo de rotas REST Client

## 5. Como Iniciar a Aplicação

### 5.1 Pré-requisitos

- Node.js (versão 18+ ou superior)
- MongoDB (local ou via Atlas/serviço)

### 5.2 Instalação e Configuração

1.  **Instale as dependências:**
    ```bash
    npm install
    ```
2.  **Configurar Variáveis de Ambiente:**
    Crie o arquivo `.env` na raiz, preenchendo as propriedades necessárias, conforme o `.env.example`.

    ```
    MONGO_URL=mongodb://localhost:27017/ (MongoDB Compass) ou
    MONGO_URL=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/ (MongoDB Atlas)
    MONGO_DATABASE=nome do seu banco
    MONGO_OPTIONS=?retryWrites=true&w=majority (Caso usado o MongoDB Atlas)
    PORT=3333
    ```

3.  **Iniciar o Servidor:**
    A API deverá ser capaz de funcionar a partir de um único comando, preferencialmente `npm run dev`

    ```bash
    npm run dev
    # A API estará acessível em http://localhost:3333/
    ```

## 6. Endpoints da API

| Recurso         | Método | Rota           | Descrição                                                                       |
| :-------------- | :----- | :------------- | :------------------------------------------------------------------------------ |
| **Usuários**    | `POST` | `/api/users`   | Cadastra um novo usuário. O nome não pode ser duplicado.                        |
|                 | `GET`  | `/api/users`   | Lista todos os usuários cadastrados.                                            |
| **Autores**     | `POST` | `/api/authors` | Cadastra um novo autor. O nome não pode ser duplicado.                          |
|                 | `GET`  | `/api/authors` | Lista todos os autores cadastrados.                                             |
| **Livros**      | `POST` | `/api/books`   | Cadastra um novo livro, associando-o a um autor existente.                      |
|                 | `GET`  | `/api/books`   | Lista todos os livros cadastrados.                                              |
| **Empréstimos** | `POST` | `/api/loans`   | Cria um registro de empréstimo. A requisição requer o ID do livro e do usuário. |

## 7. Regra de Negócio de Empréstimo

A rota `POST /loans` aplica as seguintes regras:

- **Disponibilidade Imediata**: O empréstimo é concedido se o campo `isAvailable` do livro for `true`.
- **Exceção de Atraso**: Caso `isAvailable` seja `false` , mas a `expectedReturnDate` for **anterior à data atual**, o empréstimo é liberado.
- **Ação em Caso de Sucesso**: O status do livro é atualizado para `isAvailable: false`, e o campo `expectedReturnDate` é preenchido com a data de devolução prevista (3 dias a partir da data atual). Um novo documento de empréstimo é criado na coleção "Loans".
- **Negação**: Se o livro não estiver disponível e a data prevista de devolução ainda não tiver passado, o empréstimo é negado.

## 8. Script de Manutenção

### `npm run collections`

Este script é usado para redefinir o estado do banco de dados.

```bash
npm run collections
```
