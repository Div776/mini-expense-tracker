const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/expenses.json');

const readExpenses = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeExpenses = (expenses) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
};

// GET /api/expenses
router.get('/', (req, res) => {
  const { category, from, to } = req.query;
  let expenses = readExpenses();

  if (category) {
    expenses = expenses.filter(e => e.category === category);
  }
  if (from) {
    expenses = expenses.filter(e => e.date >= from);
  }
  if (to) {
    expenses = expenses.filter(e => e.date <= to);
  }

  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(expenses);
});

// GET /api/expenses/summary
router.get('/summary', (req, res) => {
  const expenses = readExpenses();
  const now = new Date();
  const thisMonth = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const totalThisMonth = thisMonth.reduce((sum, e) => sum + e.amount, 0);

  const perCategory = thisMonth.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const highest = expenses.reduce((max, e) => e.amount > (max?.amount || 0) ? e : max, null);

  res.json({ totalThisMonth, perCategory, highest });
});

// POST /api/expenses
router.post('/', (req, res) => {
  const { amount, category, date, note } = req.body;

  if (!amount || amount <= 0) return res.status(400).json({ error: 'Amount must be a positive number' });
  if (!category) return res.status(400).json({ error: 'Category is required' });
  if (!date) return res.status(400).json({ error: 'Date is required' });
  if (new Date(date) > new Date()) return res.status(400).json({ error: 'Date cannot be in the future' });

  const expense = { id: uuidv4(), amount: parseFloat(amount), category, date, note: note || '' };
  const expenses = readExpenses();
  expenses.push(expense);
  writeExpenses(expenses);

  res.status(201).json(expense);
});

// PUT /api/expenses/:id
router.put('/:id', (req, res) => {
  const expenses = readExpenses();
  const index = expenses.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Expense not found' });

  const { amount, category, date, note } = req.body;
  if (amount && amount <= 0) return res.status(400).json({ error: 'Amount must be a positive number' });
  if (date && new Date(date) > new Date()) return res.status(400).json({ error: 'Date cannot be in the future' });

  expenses[index] = { ...expenses[index], amount: parseFloat(amount), category, date, note };
  writeExpenses(expenses);

  res.json(expenses[index]);
});

// DELETE /api/expenses/:id
router.delete('/:id', (req, res) => {
  const expenses = readExpenses();
  const filtered = expenses.filter(e => e.id !== req.params.id);
  if (filtered.length === expenses.length) return res.status(404).json({ error: 'Expense not found' });

  writeExpenses(filtered);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;