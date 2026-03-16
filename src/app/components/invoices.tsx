import { useState } from "react";
import { Plus, Search, X, Filter, Edit, Trash2 } from "lucide-react";

interface Invoice {
  id: number;
  client: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

export function Invoices() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, client: "ABC Corporation", amount: 12500, dueDate: "Mar 15, 2026", status: "paid" },
    { id: 2, client: "XYZ Industries", amount: 8500, dueDate: "Mar 20, 2026", status: "pending" },
    { id: 3, client: "Tech Solutions Inc", amount: 15000, dueDate: "Mar 10, 2026", status: "overdue" },
    { id: 4, client: "Global Enterprises", amount: 9750, dueDate: "Mar 25, 2026", status: "pending" },
    { id: 5, client: "Acme Corp", amount: 6200, dueDate: "Mar 8, 2026", status: "paid" },
  ]);

  const [formData, setFormData] = useState({
    client: "",
    amount: "",
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice: Invoice = {
      id: invoices.length + 1,
      client: formData.client,
      amount: parseFloat(formData.amount),
      dueDate: new Date(formData.dueDate).toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      status: "pending",
    };
    setInvoices([newInvoice, ...invoices]);
    setFormData({ client: "", amount: "", dueDate: "" });
    setShowModal(false);
  };

  const deleteInvoice = (id: number) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        const statusCycle: Record<Invoice["status"], Invoice["status"]> = {
          pending: "paid",
          paid: "overdue",
          overdue: "pending"
        };
        return { ...inv, status: statusCycle[inv.status] };
      }
      return inv;
    }));
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Invoices</h1>
          <p className="text-gray-600">Manage and track your invoices</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors"
          style={{ backgroundColor: '#2CA01C' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
        >
          <Plus size={20} />
          Create New Invoice
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "paid" | "pending" | "overdue")}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Invoice ID</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Client</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Amount</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Due Date</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm">#{invoice.id.toString().padStart(4, '0')}</td>
                <td className="px-6 py-4 text-sm">{invoice.client}</td>
                <td className="px-6 py-4 text-sm">${invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">{invoice.dueDate}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(invoice.id)}
                    className={`px-3 py-1 rounded-full text-xs capitalize transition-all hover:shadow-md ${getStatusColor(invoice.status)}`}
                  >
                    {invoice.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteInvoice(invoice.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Create New Invoice</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="client" className="block text-sm mb-2 text-gray-700">
                  Client Name
                </label>
                <input
                  id="client"
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter client name"
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
                <label htmlFor="dueDate" className="block text-sm mb-2 text-gray-700">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white transition-colors"
                style={{ backgroundColor: '#2CA01C' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
              >
                Send Invoice
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}