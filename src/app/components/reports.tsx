import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";

const monthlyRevenue = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
];

const expensesByCategory = [
  { name: "Office Supplies", value: 4500, id: "office", color: "#3B82F6" },
  { name: "Software", value: 8900, id: "software", color: "#8B5CF6" },
  { name: "Marketing", value: 12000, id: "marketing", color: "#EC4899" },
  { name: "Travel", value: 6500, id: "travel", color: "#2CA01C" },
  { name: "Utilities", value: 2850, id: "utilities", color: "#F59E0B" },
];

export function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("Jun");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Reports</h1>
          <p className="text-gray-600">Analyze your financial performance</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all transform active:scale-95 hover:shadow-lg"
          style={{ backgroundColor: '#2CA01C' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
        >
          <Download size={20} />
          Export Reports
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">YTD Revenue</p>
            <TrendingUp size={20} className="text-green-600" />
          </div>
          <p className="text-2xl mb-1">$328,000</p>
          <p className="text-xs text-green-600">+18.5% vs last year</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">YTD Expenses</p>
          </div>
          <p className="text-2xl mb-1">$193,200</p>
          <p className="text-xs text-gray-600">Average: $32,200/mo</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">YTD Profit</p>
          </div>
          <p className="text-2xl mb-1">$134,800</p>
          <p className="text-xs text-green-600">Profit margin: 41%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Outstanding</p>
          </div>
          <p className="text-2xl mb-1">$24,250</p>
          <p className="text-xs text-gray-600">3 unpaid invoices</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl mb-6">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#888" axisLine={{ stroke: '#e5e7eb' }} />
              <YAxis stroke="#888" tickFormatter={(value) => `$${value / 1000}k`} axisLine={{ stroke: '#e5e7eb' }} />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e5e7eb',
                  fontSize: '14px'
                }}
              />
              <Bar dataKey="revenue" fill="#2CA01C" radius={[8, 8, 0, 0]} name="Revenue" animationDuration={300} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses by Category */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl mb-6">Expenses by Category</h2>
          <div className="space-y-4">
            {expensesByCategory.map((category) => {
              const total = expensesByCategory.reduce((sum, cat) => sum + cat.value, 0);
              const percentage = ((category.value / total) * 100).toFixed(1);
              return (
                <div key={category.id} className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm group-hover:text-gray-900 transition-colors">{category.name}</span>
                    <span className="text-sm">${category.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-500 group-hover:brightness-110"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
                </div>
              );
            })}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Expenses</span>
                <span className="text-sm">
                  ${expensesByCategory.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl">Month-by-Month Breakdown</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Month</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Revenue</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Expenses</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Profit</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Margin</th>
            </tr>
          </thead>
          <tbody>
            {[
              { month: "January", revenue: 45000, expenses: 28000 },
              { month: "February", revenue: 52000, expenses: 31000 },
              { month: "March", revenue: 48000, expenses: 29000 },
              { month: "April", revenue: 61000, expenses: 34000 },
              { month: "May", revenue: 55000, expenses: 32000 },
              { month: "June", revenue: 67000, expenses: 38000 },
            ].map((row) => {
              const profit = row.revenue - row.expenses;
              const margin = ((profit / row.revenue) * 100).toFixed(1);
              return (
                <tr key={row.month} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{row.month}</td>
                  <td className="px-6 py-4 text-sm text-green-600">${row.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-red-600">${row.expenses.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">${profit.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">{margin}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}