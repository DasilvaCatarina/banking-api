-- ============================================
-- Financial Dashboard - Schema SQL
-- Compatível com PostgreSQL e MySQL
-- ============================================

-- Utilizadores
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categorias de transação
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
    color VARCHAR(7) DEFAULT '#6366f1',
    icon VARCHAR(50)
);

-- Inserir categorias padrão
INSERT INTO categories (name, type, color, icon) VALUES
    ('Salário', 'income', '#22c55e', 'briefcase'),
    ('Investimentos', 'income', '#3b82f6', 'trending-up'),
    ('Freelance', 'income', '#8b5cf6', 'code'),
    ('Alimentação', 'expense', '#ef4444', 'utensils'),
    ('Transporte', 'expense', '#f97316', 'car'),
    ('Habitação', 'expense', '#eab308', 'home'),
    ('Saúde', 'expense', '#ec4899', 'heart'),
    ('Lazer', 'expense', '#06b6d4', 'smile'),
    ('Educação', 'expense', '#6366f1', 'book');

-- Contas do utilizador
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('checking', 'savings', 'investment', 'credit')),
    balance DECIMAL(15,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'EUR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transações financeiras
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    account_id INTEGER REFERENCES accounts(id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense', 'transfer')),
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    description VARCHAR(255),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orçamentos mensais
CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INTEGER NOT NULL,
    UNIQUE (user_id, category_id, month, year)
);

-- Índices para performance
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX idx_transactions_category ON transactions(category_id);
CREATE INDEX idx_transactions_account ON transactions(account_id);

-- View: resumo mensal por categoria
CREATE VIEW monthly_summary AS
SELECT
    t.user_id,
    EXTRACT(YEAR FROM t.date) AS year,
    EXTRACT(MONTH FROM t.date) AS month,
    c.name AS category,
    c.type,
    SUM(t.amount) AS total
FROM transactions t
JOIN categories c ON t.category_id = c.id
GROUP BY t.user_id, year, month, c.name, c.type;
