const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const today = new Date().toISOString().split('T')[0];
const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  .toISOString().split('T')[0];
const firstOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
  .toISOString().split('T')[0];
const lastOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0)
  .toISOString().split('T')[0];

export default function Filters({ filters, onChange }) {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const setPreset = (preset) => {
    if (preset === 'this-month') {
      onChange({ ...filters, from: firstOfMonth, to: today });
    } else if (preset === 'last-month') {
      onChange({ ...filters, from: firstOfLastMonth, to: lastOfLastMonth });
    } else {
      onChange({ ...filters, from: '', to: '' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleChange}
          max={today}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">To</label>
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleChange}
          max={today}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setPreset('this-month')}
          className="px-3 py-2 text-xs rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          This Month
        </button>
        <button
          onClick={() => setPreset('last-month')}
          className="px-3 py-2 text-xs rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          Last Month
        </button>
        <button
          onClick={() => setPreset('all')}
          className="px-3 py-2 text-xs rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          All Time
        </button>
      </div>
    </div>
  );
}