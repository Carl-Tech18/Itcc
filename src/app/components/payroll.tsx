import { useState } from "react";
import { Download, Calendar, Search, Eye } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  paySchedule: string;
  lastPaid: string;
}

export function Payroll() {
  const [searchQuery, setSearchQuery] = useState("");
  const [employees] = useState<Employee[]>([
    { id: 1, name: "Sarah Johnson", position: "Senior Developer", salary: 8500, paySchedule: "Monthly", lastPaid: "Mar 1, 2026" },
    { id: 2, name: "Michael Chen", position: "Product Manager", salary: 7500, paySchedule: "Monthly", lastPaid: "Mar 1, 2026" },
    { id: 3, name: "Emily Rodriguez", position: "UX Designer", salary: 6800, paySchedule: "Monthly", lastPaid: "Mar 1, 2026" },
    { id: 4, name: "David Kim", position: "Marketing Specialist", salary: 5500, paySchedule: "Bi-weekly", lastPaid: "Mar 5, 2026" },
    { id: 5, name: "Jessica Taylor", position: "Sales Executive", salary: 6200, paySchedule: "Monthly", lastPaid: "Mar 1, 2026" },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleGeneratePayStub = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMonthlyPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Payroll Management</h1>
        <p className="text-gray-600">Manage employee salaries and pay schedules</p>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8F5E6' }}>
              <Calendar size={24} style={{ color: '#2CA01C' }} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Monthly Payroll</p>
          <p className="text-3xl">${totalMonthlyPayroll.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
          <p className="text-gray-600 text-sm mb-1">Total Employees</p>
          <p className="text-3xl">{employees.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
          <p className="text-gray-600 text-sm mb-1">Next Pay Date</p>
          <p className="text-3xl text-sm">Apr 1, 2026</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl">Employees</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Name</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Position</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Salary</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Pay Schedule</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Last Paid</th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm">{employee.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{employee.position}</td>
                <td className="px-6 py-4 text-sm">${employee.salary.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    {employee.paySchedule}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{employee.lastPaid}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleGeneratePayStub(employee)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all text-sm"
                  >
                    <Eye size={16} />
                    View Pay Stub
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pay Stub Preview Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-2xl">Pay Stub Preview</h2>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-4" style={{ color: '#2CA01C' }}>QuickBooks</h3>
                <p className="text-sm text-gray-600">Pay Period: March 1-31, 2026</p>
                <p className="text-sm text-gray-600">Pay Date: March 31, 2026</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="mb-4">Employee Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p>{selectedEmployee.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Position</p>
                    <p>{selectedEmployee.position}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="mb-4">Earnings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Salary</span>
                    <span>${selectedEmployee.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span>Gross Pay</span>
                    <span>${selectedEmployee.salary.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="mb-4">Deductions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Federal Tax</span>
                    <span>${(selectedEmployee.salary * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">State Tax</span>
                    <span>${(selectedEmployee.salary * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Social Security</span>
                    <span>${(selectedEmployee.salary * 0.062).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span>Total Deductions</span>
                    <span>${(selectedEmployee.salary * 0.262).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Net Pay</span>
                  <span className="text-2xl" style={{ color: '#2CA01C' }}>
                    ${(selectedEmployee.salary * 0.738).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  className="flex-1 py-3 px-4 rounded-lg text-white flex items-center justify-center gap-2 transition-colors"
                  style={{ backgroundColor: '#2CA01C' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
                >
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}