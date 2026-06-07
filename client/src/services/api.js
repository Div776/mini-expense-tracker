const BASE_URL = 'https://mini-expense-tracker-api-2ubk.onrender.com/api';

export const getExpenses = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.from) params.append('from', filters.from);
  if (filters.to) params.append('to', filters.to);

  const res = await fetch(`${BASE_URL}/expenses?${params}`);
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
};

export const getSummary = async () => {
  const res = await fetch(`${BASE_URL}/expenses/summary`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
};

export const createExpense = async (data) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create expense');
  }
  return res.json();
};

export const updateExpense = async (id, data) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update expense');
  }
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete expense');
  return res.json();
};