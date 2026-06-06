import { useState, useEffect, useCallback } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SummaryPanel from './components/SummaryPanel';
import ExpenseChart from './components/ExpenseChart';
import Filters from './components/Filters';
import { getExpenses, getSummary, createExpense } from './services/api';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState({ category: '', from: '', to: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [expensesData, summaryData] = await Promise.all([
        getExpenses(filters),
        getSummary(),
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (err) {
      setError('Failed to load data. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddExpense = async (data) => {
    await createExpense(data);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 shadow">
        <h1 className="text-2xl font-bold">💰 Mini Expense Tracker</h1>
        <p className="text-blue-100 text-sm">Track your daily spending</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
            {error}
          </div>
        )}

        <SummaryPanel summary={summary} />

        {summary && Object.keys(summary.perCategory).length > 0 && (
          <ExpenseChart perCategory={summary.perCategory} />
        )}

        <ExpenseForm onSubmit={handleAddExpense} />

        <Filters filters={filters} onChange={setFilters} />

        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading expenses...</div>
        ) : (
          <ExpenseTable expenses={expenses} onRefresh={fetchData} />
        )}
      </main>
    </div>
  );
}