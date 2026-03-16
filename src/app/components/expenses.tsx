import { useState } from "react";
import { Plus, Search, X, Upload, Filter } from "lucide-react";

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  receipt: boolean;
}

const categories = ["Office Supplies", "Software", "Marketing", "Travel", "Utilities", "Other"];

export function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, name: "Office Supplies", amount: 450, category: "Office Supplies", date: "Mar 4, 2026", receipt: true },
    { id: 2, name: "Adobe Creative Cloud", amount: 299, category: "Software", date: "Mar 2, 2026", receipt: true },
    { id: 3, name: "Google Ads Campaign", amount: 1200, category: "Marketing", date: "Mar 1, 2026", receipt: false },
    { id: 4, name: "Flight to Conference", amount: 650, category: "Travel", date: "Feb 28, 2026", receipt: true },
    { id: 5, name: "Electricity Bill", amount: 285, category: "Utilities", date: "Feb 27, 2026", receipt: true },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const [hasReceipt, setHasReceipt] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: expenses.length + 1,
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      receipt: hasReceipt,
    };
    setExpenses([newExpense, ...expenses]);
    setFormData({ name: "", amount: "", category: "" });
    setHasReceipt(false);
    setShowModal(false);
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Office Supplies": "bg-blue-100 text-blue-700",
      "Software": "bg-purple-100 text-purple-700",
      "Marketing": "bg-pink-100 text-pink-700",
      "Travel": "bg-green-100 text-green-700",
      "Utilities": "bg-yellow-100 text-yellow-700",
      "Other": "bg-gray-100 text-gray-700",
    };
    return colors[category] || colors["Other"];
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Expenses</h1>
          <p className="text-gray-600">Track and categorize your expenses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors"
          style={{ backgroundColor: '#2CA01C' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
        >
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2 items-center">
          <Filter size={20} className="text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Total Summary */}
      <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
          </span>
          <span className="text-lg">
            Total: <span className="text-red-600">${totalExpenses.toLocaleString()}</span>
          </span>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Expense</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Amount</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Category</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Date</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 text-sm">{expense.name}</td>
                <td className="px-6 py-4 text-sm text-red-600">${expense.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{expense.date}</td>
                <td className="px-6 py-4 text-sm">
                  {expense.receipt ? (
                    <span className="text-green-600">✓ Attached</span>
                  ) : (
                    <span className="text-gray-400">No receipt</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Add New Expense</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                  Expense Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter expense name"
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm mb-2 text-gray-700">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm mb-2 text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Upload Receipt</label>
                <button
                  type="button"
                  onClick={() => setHasReceipt(!hasReceipt)}
                  className={`w-full px-4 py-3 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    hasReceipt 
                      ? "border-green-500 bg-green-50 text-green-700" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Upload size={20} />
                  <span>{hasReceipt ? "Receipt uploaded" : "Click to upload receipt"}</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white transition-colors"
                style={{ backgroundColor: '#2CA01C' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}