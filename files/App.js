import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import './App.css';

// ─── Componente de Card de Resumo ───────────────────────────────────────────
function SummaryCard({ title, value, type }) {
  const colors = {
    income:  { bg: '#f0fdf4', border: '#86efac', text: '#16a34a' },
    expense: { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626' },
    balance: { bg: '#eff6ff', border: '#93c5fd', text: '#2563eb' },
  };
  const c = colors[type];

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: '12px',
      padding: '20px 24px',
      minWidth: '200px',
    }}>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
      <p style={{ color: c.text, fontSize: '28px', fontWeight: 700 }}>
        €{parseFloat(value || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

// ─── Componente de Linha de Transação ────────────────────────────────────────
function TransactionRow({ transaction }) {
  const isIncome = transaction.type === 'income';
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f3f4f6',
    }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%',
          background: transaction.category_color || '#6366f1',
        }} />
        <div>
          <p style={{ fontWeight: 500, marginBottom: '2px' }}>
            {transaction.description || transaction.category_name}
          </p>
          <p style={{ color: '#9ca3af', fontSize: '13px' }}>
            {new Date(transaction.date).toLocaleDateString('pt-PT')} · {transaction.category_name}
          </p>
        </div>
      </div>
      <span style={{
        fontWeight: 600,
        color: isIncome ? '#16a34a' : '#dc2626',
      }}>
        {isIncome ? '+' : '-'}€{parseFloat(transaction.amount).toFixed(2)}
      </span>
    </div>
  );
}

// ─── App Principal ───────────────────────────────────────────────────────────
export default function App() {
  const [summary, setSummary]          = useState({ income: 0, expense: 0, balance: 0 });
  const [trend, setTrend]              = useState([]);
  const [byCategory, setByCategory]   = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]          = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, t, c, tx] = await Promise.all([
          axios.get('/api/dashboard/summary'),
          axios.get('/api/dashboard/monthly-trend'),
          axios.get('/api/dashboard/expenses-by-category'),
          axios.get('/api/transactions?limit=5'),
        ]);
        setSummary(s.data);
        setTrend(t.data);
        setByCategory(c.data);
        setTransactions(tx.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ color: '#6b7280' }}>A carregar dashboard...</p>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f9fafb', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>
            💳 Dashboard Financeiro
          </h1>
          <p style={{ color: '#6b7280', marginTop: '4px' }}>
            Resumo do mês atual
          </p>
        </div>

        {/* Cards de resumo */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <SummaryCard title="Receita Total" value={summary.income}   type="income"  />
          <SummaryCard title="Despesa Total" value={summary.expense}  type="expense" />
          <SummaryCard title="Saldo"         value={summary.balance}  type="balance" />
        </div>

        {/* Gráficos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>

          {/* Tendência mensal */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.08)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#374151' }}>
              Tendência nos últimos 6 meses
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v) => `€${v}`} />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} dot={false} name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Despesas por categoria */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.08)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#374151' }}>
              Despesas por Categoria
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={byCategory}
                  dataKey="total"
                  nameKey="category"
                  cx="50%" cy="50%"
                  outerRadius={80}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                >
                  {byCategory.map((entry, i) => (
                    <Cell key={i} fill={entry.color || '#6366f1'} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `€${v}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transações recentes */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,.08)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#374151' }}>
            Transações Recentes
          </h2>
          {transactions.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '32px 0' }}>
              Nenhuma transação encontrada.
            </p>
          ) : (
            transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
          )}
        </div>
      </div>
    </div>
  );
}
