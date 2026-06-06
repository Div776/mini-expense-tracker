import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import { updateExpense, deleteExpense } from '../services/api';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function ExpenseTable({ expenses, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleEdit = async (data) => {
    await updateExpense(editingId, data);
    setEditingId(null);
    onRefresh();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setDeletingId(null);
    onRefresh();
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
        <p className="text-4xl mb-2">💸</p>
        <p className="text-lg font-medium">No expenses yet</p>
        <p className="text-sm">Add your first expense above</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Note</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map(expense => (
            <>
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{expense.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {expense.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{expense.note || '—'}</td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(expense.amount)}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setEditingId(expense.id)}
                    className="text-blue-500 hover:text-blue-700 mr-3 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingId(expense.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {editingId === expense.id && (
                <tr key={`edit-${expense.id}`}>
                  <td colSpan={5} className="px-4 py-3 bg-blue-50">
                    <ExpenseForm
                      initialData={expense}
                      onSubmit={handleEdit}
                      onCancel={() => setEditingId(null)}
                    />
                  </td>
                </tr>
              )}
              {deletingId === expense.id && (
                <tr key={`delete-${expense.id}`}>
                  <td colSpan={5} className="px-4 py-3 bg-red-50 text-center">
                    <p className="text-sm mb-2">Are you sure you want to delete this expense?</p>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg mr-2 hover:bg-red-700"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="px-3 py-1 border border-gray-300 text-xs rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}