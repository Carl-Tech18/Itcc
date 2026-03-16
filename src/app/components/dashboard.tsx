import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Receipt, 
  Users,
  ArrowRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const cashFlowData = [
  { month: "Jan", income: 45000, expenses: 28000 },
  { month: "Feb", income: 52000, expenses: 31000 },
  { month: "Mar", income: 48000, expenses: 29000 },
  { month: "Apr", income: 61000, expenses: 34000 },
  { month: "May", income: 55000, expenses: 32000 },
  { month: "Jun", income: 67000, expenses: 38000 },
];

const recentTransactions = [
  { id: 1, name: "Client Payment - ABC Corp", amount: 12500, type: "income", date: "Mar 5, 2026" },
  { id: 2, name: "Office Supplies", amount: -450, type: "expense", date: "Mar 4, 2026" },
  { id: 3, name: "Consulting Fee - XYZ Ltd", amount: 8500, type: "income", date: "Mar 3, 2026" },
  { id: 4, name: "Software Subscription", amount: -299, type: "expense", date: "Mar 2, 2026" },
  { id: 5, name: "Marketing Campaign", amount: -1200, type: "expense", date: "Mar 1, 2026" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month");

  const quickActions = [
    { 
      label: "Create Invoice", 
      icon: FileText, 
      color: "#2CA01C",
      action: () => navigate("/app/invoices")
    },
    { 
      label: "Add Expense", 
      icon: Receipt, 
      color: "#F97316",
      action: () => navigate("/app/expenses")
    },
    { 
      label: "Run Payroll", 
      icon: Users, 
      color: "#3B82F6",
      action: () => navigate("/app/payroll")
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>
        
        {/* Period Selector */}
        <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          {(["week", "month", "year"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm capitalize transition-all ${
                selectedPeriod === period
                  ? "text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={selectedPeriod === period ? { backgroundColor: '#2CA01C' } : {}}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => navigate("/app/invoices")}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer text-left group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: '#E8F5E6' }}>
              <DollarSign size={24} style={{ color: '#2CA01C' }} />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp size={16} />
              <span>12.5%</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl">$67,450</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            This month
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </button>

        <button
          onClick={() => navigate("/app/expenses")}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer text-left group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-50 transition-transform group-hover:scale-110">
              <Receipt size={24} className="text-orange-500" />
            </div>
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <TrendingDown size={16} />
              <span>5.2%</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Monthly Expenses</p>
          <p className="text-3xl">$38,200</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            This month
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </button>

        <button
          onClick={() => navigate("/app/reports")}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer text-left group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50 transition-transform group-hover:scale-110">
              <TrendingUp size={24} className="text-blue-500" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp size={16} />
              <span>8.3%</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Net Profit</p>
          <p className="text-3xl">$29,250</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            This month
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </button>
      </div>

      {/* Cash Flow Chart */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl mb-6">Cash Flow</h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashboard-income-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2CA01C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2CA01C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dashboard-expenses-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="#888" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  stroke="#888" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e5e7eb',
                    fontSize: '14px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#2CA01C" 
                  strokeWidth={2}
                  fill="url(#dashboard-income-gradient)" 
                  name="Income"
                  animationDuration={300}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#F97316" 
                  strokeWidth={2}
                  fill="url(#dashboard-expenses-gradient)" 
                  name="Expenses"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp size={20} className="text-green-600" />
                    ) : (
                      <TrendingDown size={20} className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">{transaction.name}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <p 
                  className={`${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:shadow-md transition-all text-left"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <Icon size={20} style={{ color: action.color }} />
                  </div>
                  <span className="text-sm">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}