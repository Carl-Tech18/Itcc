import { Outlet, NavLink } from "react-router";
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  Users, 
  BarChart3, 
  Grid3x3, 
  Settings 
} from "lucide-react";

export function Layout() {
  const navItems = [
    { path: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/app/invoices", label: "Invoices", icon: FileText },
    { path: "/app/expenses", label: "Expenses", icon: Receipt },
    { path: "/app/payroll", label: "Payroll", icon: Users },
    { path: "/app/reports", label: "Reports", icon: BarChart3 },
    { path: "/app/integrations", label: "Integrations", icon: Grid3x3 },
    { path: "/app/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl" style={{ color: '#2CA01C' }}>QuickBooks</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    style={({ isActive }) =>
                      isActive ? { backgroundColor: '#2CA01C' } : {}
                    }
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#2CA01C' }}>
              JD
            </div>
            <div>
              <p className="text-sm">John Doe</p>
              <p className="text-xs text-gray-500">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
