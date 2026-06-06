import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const today = new Date().toISOString().split('T')[0];

export default function ExpenseForm({ onSubmit, initialData = null, onCancel }) {
  const [form, setForm] = useState({
    amount: initialData?.amount || '',
    category: initialData?.category || '',
    date: initialData?.date || today,
    note: initialData?.note || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.amount || parseFloat(form.amount) <= 0) {
      return setError('Amount must be a positive number');
    }
    if (!form.category) {
      return setError('Category is required');
    }
    if (!form.date) {
      return setError('Date is required');
    }
    if (form.date > today) {
      return setError('Date cannot be in the future');
    }

    try {
      await onSubmit({ ...form, amount: parseFloat(form.amount) });
      setForm({ amount: '', category: '', date: today, note: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {initialData ? 'Edit Expense' : 'Add Expense'}
      </h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            max={today}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <input
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Add a note..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:col-span-2 flex gap-2 justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {initialData ? 'Update' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
}