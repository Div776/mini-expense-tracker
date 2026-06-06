const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function SummaryPanel({ summary }) {
  if (!summary) return null;

  const { totalThisMonth, perCategory, highest } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500 mb-1">Total This Month</p>
        <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalThisMonth)}</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500 mb-2">By Category (This Month)</p>
        {Object.keys(perCategory).length === 0 ? (
          <p className="text-gray-400 text-sm">No data</p>
        ) : (
          <ul className="space-y-1">
            {Object.entries(perCategory).map(([cat, amount]) => (
              <li key={cat} className="flex justify-between text-sm">
                <span className="text-gray-600">{cat}</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500 mb-1">Highest Single Expense</p>
        {highest ? (
          <>
            <p className="text-2xl font-bold text-red-500">{formatCurrency(highest.amount)}</p>
            <p className="text-xs text-gray-400 mt-1">{highest.category} — {highest.date}</p>
          </>
        ) : (
          <p className="text-gray-400 text-sm">No data</p>
        )}
      </div>
    </div>
  );
}