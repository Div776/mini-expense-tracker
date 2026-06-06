import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function ExpenseChart({ perCategory }) {
  const data = Object.entries(perCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 mb-6 text-center text-gray-400">
        <p className="text-sm">No data to display chart</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}