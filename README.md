# Restaurante API

**Uma API REST para organizar o atendimento de mesas e acompanhar pedidos em um restaurante.**

Gerencie o catálogo de produtos, abra sessões por mesa, registre itens consumidos e consulte o total da conta. O projeto foi construído com Node.js e TypeScript, usando Express para as rotas, Knex para acesso a dados e SQLite como banco relacional.

> Projeto de portfólio desenvolvido por **Josué Filho**.

## O que a API oferece

- **Catálogo:** cadastre, consulte, pesquise, atualize e remova produtos.
- **Mesas:** mantenha o registro das mesas do restaurante.
- **Atendimento:** abra uma sessão para iniciar o consumo e feche-a ao terminar.
- **Pedidos:** registre produtos e quantidades em uma sessão aberta.
- **Conta:** consulte os itens, subtotais e total acumulado por sessão.
- **Validação:** valide os dados recebidos e trate erros em um middleware centralizado.

## Stack

`Node.js` · `TypeScript` · `Express` · `Knex.js` · `SQLite` · `Zod`

## Comece a usar

**Requisitos:** Node.js LTS e npm.

```bash
git clone <URL_DO_REPOSITORIO>
cd api-restaurante
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

A API estará disponível em `http://localhost:3333`. O banco SQLite é criado/configurado em `src/database/database.db`.

> Os seeds são voltados ao desenvolvimento: eles limpam os dados existentes de produtos e mesas antes de inserir os exemplos.

## Fluxo de atendimento

1. Cadastre uma mesa, ou use uma das mesas de exemplo carregadas pelos seeds.
2. Abra uma sessão para essa mesa.
3. Registre produtos na sessão usando seus IDs.
4. Consulte os itens e o total da conta.
5. Feche a sessão quando o atendimento terminar.

## Endpoints

Base URL: `http://localhost:3333` · Requisições e respostas em JSON.

| Método | Endpoint | Ação |
| --- | --- | --- |
| `GET` | `/products?name=nhoque` | Lista produtos; filtro `name` opcional. |
| `POST` | `/products` | Cadastra produto. |
| `PUT` | `/products/:id` | Atualiza nome e preço do produto. |
| `DELETE` | `/products/:id` | Remove produto. |
| `GET` | `/tables` | Lista mesas. |
| `POST` | `/tables` | Cadastra mesa. |
| `GET` | `/table-sessions` | Lista sessões. |
| `POST` | `/table-sessions` | Abre sessão para uma mesa. |
| `PATCH` | `/table-sessions/:id` | Fecha sessão. |
| `POST` | `/orders` | Registra item em uma sessão. |
| `GET` | `/orders/table-session/:table_session_id` | Lista itens e subtotais. |
| `GET` | `/orders/table-session/:table_session_id/total` | Consulta total e quantidade de unidades. |

## Exemplo rápido

### 1. Abrir sessão

```http
POST /table-sessions
Content-Type: application/json
```

```json
{
  "table_id": 1
}
```

### 2. Adicionar item

```http
POST /orders
Content-Type: application/json
```

```json
{
  "table_session_id": 1,
  "product_id": 1,
  "quantity": 2
}
```

O valor registrado no pedido corresponde ao preço atual do produto no momento da inclusão.

### 3. Consultar a conta

```http
GET /orders/table-session/1/total
```

### 4. Encerrar atendimento

```http
PATCH /table-sessions/1
```

## Validações e erros

A API valida os dados de entrada com Zod. Por exemplo, o nome do produto deve ter no mínimo seis caracteres e o preço deve ser maior que zero. Também impede abrir outra sessão enquanto a mesa já tiver uma em andamento e registrar pedidos em sessões fechadas.

- `400 Bad Request`: validação ou regra de negócio não atendida.
- `500 Internal Server Error`: erro inesperado.

Erros de validação incluem detalhes no campo `issues`.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento com recarga automática. |
| `npm run knex migrate:latest` | Aplica as migrations. |
| `npm run knex migrate:rollback` | Reverte a última execução de migrations. |
| `npm run knex seed:run` | Carrega os dados de exemplo. |

## Organização

```text
controllers/       Lógica das operações
middlewares/       Tratamento de erros
routes/            Rotas HTTP
src/database/      Configuração, migrations, seeds e tipos
src/server.ts      Inicialização da API
utils/             Classes utilitárias
knexfile.ts        Configuração do banco e migrations
```

## Sobre o projeto

Este projeto apresenta conceitos de desenvolvimento backend, incluindo criação de endpoints REST, persistência relacional, migrations, seeds, validação de payloads e regras de negócio para um fluxo de atendimento.

**Autor:** Josué Filho
