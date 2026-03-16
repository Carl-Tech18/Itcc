import { useState } from "react";
import { User, Bell, Shield, CreditCard, Building, Check } from "lucide-react";

type TabType = "profile" | "company" | "notifications" | "security" | "billing";

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    role: "Business Owner",
  });
  const [notifications, setNotifications] = useState({
    emailInvoices: true,
    emailPayments: true,
    emailReports: false,
    pushExpenses: true,
    pushPayroll: false,
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const navItems = [
    { id: "profile" as TabType, icon: User, label: "Profile" },
    { id: "company" as TabType, icon: Building, label: "Company" },
    { id: "notifications" as TabType, icon: Bell, label: "Notifications" },
    { id: "security" as TabType, icon: Shield, label: "Security" },
    { id: "billing" as TabType, icon: CreditCard, label: "Billing" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Success Message */}
      {showSaveSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2CA01C' }}>
            <Check size={16} className="text-white" />
          </div>
          <p className="text-green-800">Settings saved successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left transform hover:scale-102 ${
                      activeTab === item.id
                        ? "text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    style={activeTab === item.id ? { backgroundColor: '#2CA01C' } : {}}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {activeTab === "profile" && (
              <>
                <h2 className="text-2xl mb-6">Profile Settings</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl" style={{ backgroundColor: '#2CA01C' }}>
                      {formData.firstName && formData.lastName 
                        ? `${formData.firstName[0]}${formData.lastName[0]}` 
                        : <User size={32} />
                      }
                    </div>
                    <div>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all text-sm transform active:scale-95"
                      >
                        Change Photo
                      </button>
                      <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter company name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Role</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    >
                      <option>Business Owner</option>
                      <option>Accountant</option>
                      <option>Bookkeeper</option>
                      <option>Finance Manager</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setFormData({
                        firstName: "John",
                        lastName: "Doe",
                        email: "john@company.com",
                        phone: "+1 (555) 123-4567",
                        companyName: "Acme Inc.",
                        role: "Business Owner",
                      })}
                      className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all transform active:scale-95"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg text-white transition-all transform active:scale-95 hover:shadow-lg"
                      style={{ backgroundColor: '#2CA01C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === "company" && (
              <>
                <h2 className="text-2xl mb-6">Company Settings</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Company Name</label>
                    <input
                      type="text"
                      defaultValue="Acme Inc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Industry</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all">
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Retail</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Company Size</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all">
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Tax ID</label>
                    <input
                      type="text"
                      defaultValue="XX-XXXXXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all transform active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg text-white transition-all transform active:scale-95 hover:shadow-lg"
                      style={{ backgroundColor: '#2CA01C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === "notifications" && (
              <>
                <h2 className="text-2xl mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-gray-900">Email Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: "emailInvoices", label: "Invoice updates", desc: "Get notified when invoices are paid or overdue" },
                        { key: "emailPayments", label: "Payment confirmations", desc: "Receive confirmations for all payments" },
                        { key: "emailReports", label: "Weekly reports", desc: "Get weekly financial summary reports" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                          <div>
                            <p className="text-sm text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNotificationToggle(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-gray-900">Push Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: "pushExpenses", label: "Expense alerts", desc: "Get notified about new expense submissions" },
                        { key: "pushPayroll", label: "Payroll reminders", desc: "Receive reminders for payroll processing" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                          <div>
                            <p className="text-sm text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNotificationToggle(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <h2 className="text-2xl mb-6">Security Settings</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="mb-4 text-gray-900">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div>
                        <p className="text-sm text-gray-900">Enable 2FA</p>
                        <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 hover:shadow-md transition-all text-sm transform active:scale-95"
                      >
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all transform active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg text-white transition-all transform active:scale-95 hover:shadow-lg"
                      style={{ backgroundColor: '#2CA01C' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === "billing" && (
              <>
                <h2 className="text-2xl mb-6">Billing & Subscription</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg text-gray-900">Pro Plan</h3>
                        <p className="text-sm text-gray-600">Billed monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl text-gray-900">$49</p>
                        <p className="text-sm text-gray-600">/month</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 rounded-lg border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all transform active:scale-95"
                    >
                      Upgrade to Enterprise
                    </button>
                  </div>

                  <div>
                    <h3 className="mb-4 text-gray-900">Payment Method</h3>
                    <div className="p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs">
                          VISA
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/2026</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all text-sm transform active:scale-95"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-gray-900">Billing History</h3>
                    <div className="space-y-2">
                      {[
                        { date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
                        { date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
                        { date: "Dec 1, 2025", amount: "$49.00", status: "Paid" },
                      ].map((invoice, idx) => (
                        <div key={idx} className="p-4 rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
                          <div>
                            <p className="text-sm text-gray-900">{invoice.date}</p>
                            <p className="text-xs text-gray-500">{invoice.amount}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                              {invoice.status}
                            </span>
                            <button className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}