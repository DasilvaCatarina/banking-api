# 📊 Financial Dashboard

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-43853D?style=flat-square&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4479A1?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

Dashboard financeiro pessoal full-stack — visualiza receitas, despesas e tendências mensais. Projeto de portfólio desenvolvido com **React**, **Node.js/Express** e **PostgreSQL**.

---

## ✨ Funcionalidades

- 📈 **Resumo Mensal** — Total de receitas, despesas e saldo
- 🥧 **Gráfico de Categorias** — Distribuição visual das despesas (PieChart)
- 📉 **Tendência 6 Meses** — Evolução ao longo do tempo (LineChart)
- 💳 **Transações Recentes** — Lista filtrada com categorias e cores
- 🔍 **Filtros** — Por tipo, categoria, período e conta

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Front-end | React 18, Recharts, Axios |
| Back-end | Node.js, Express 4 |
| Base de dados | PostgreSQL 15 |
| ORM / Query | pg (node-postgres) |
| Validação | express-validator |

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL 13+

### 1. Base de dados

```bash
# Criar base de dados e executar schema
psql -U postgres -c "CREATE DATABASE financial_dashboard;"
psql -U postgres -d financial_dashboard -f database/schema.sql
```

### 2. Back-end

```bash
cd backend
cp .env.example .env  # configurar variáveis de ambiente
npm install
npm run dev           # http://localhost:3001
```

### 3. Front-end

```bash
cd frontend
npm install
npm start             # http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
financial-dashboard/
├── database/
│   └── schema.sql              # Schema SQL completo
├── backend/
│   ├── src/
│   │   ├── server.js           # Entry point Express
│   │   ├── db.js               # Ligação PostgreSQL
│   │   └── routes/
│   │       ├── dashboard.js    # Endpoints de resumo e gráficos
│   │       ├── transactions.js # CRUD de transações
│   │       └── accounts.js     # Gestão de contas
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js              # Dashboard principal
    │   └── App.css
    └── package.json
```

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/dashboard/summary` | Resumo financeiro do mês |
| `GET` | `/api/dashboard/monthly-trend` | Tendência dos últimos 6 meses |
| `GET` | `/api/dashboard/expenses-by-category` | Despesas por categoria |
| `GET` | `/api/transactions` | Listar transações (com filtros) |
| `POST` | `/api/transactions` | Criar transação |
| `DELETE` | `/api/transactions/:id` | Eliminar transação |

---

## 📄 Licença

MIT License
