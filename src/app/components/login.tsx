import { useState } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // In a real app, this would call an API
    alert("Account created successfully!");
    setIsCreatingAccount(false);
    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setCompanyName("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login/Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl mb-2" style={{ color: '#2CA01C' }}>QuickBooks</h1>
            <p className="text-gray-600">
              {isCreatingAccount ? "Create your account" : "Sign in to manage your finances"}
            </p>
          </div>

          {!isCreatingAccount ? (
            // Login Form
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white transition-all transform active:scale-95 hover:shadow-lg"
                style={{ backgroundColor: '#2CA01C' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
              >
                Sign In
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsCreatingAccount(true)}
                  className="text-sm hover:underline transition-all"
                  style={{ color: '#2CA01C' }}
                >Create Account</button>
              </div>
            </form>
          ) : (
            // Create Account Form
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <button
                type="button"
                onClick={() => setIsCreatingAccount(false)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
              >
                <ArrowLeft size={16} />
                Back to Sign In
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm mb-2 text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm mb-2 text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm mb-2 text-gray-700">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Acme Inc."
                  required
                />
              </div>

              <div>
                <label htmlFor="signupEmail" className="block text-sm mb-2 text-gray-700">
                  Email
                </label>
                <input
                  id="signupEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="signupPassword" className="block text-sm mb-2 text-gray-700">
                  Password
                </label>
                <input
                  id="signupPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  minLength={8}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  minLength={8}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-white transition-all transform active:scale-95 hover:shadow-lg"
                style={{ backgroundColor: '#2CA01C' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#248517'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2CA01C'}
              >
                Create Account
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8" style={{ backgroundColor: '#F0FFF0' }}>
        <div className="max-w-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop"
            alt="Financial charts and analytics"
            className="w-full rounded-2xl shadow-xl"
          />
          <div className="mt-8 text-center">
            <h2 className="text-2xl mb-2 text-gray-800">
              {isCreatingAccount ? "Join Thousands of Businesses" : "Manage Your Finances"}
            </h2>
            <p className="text-gray-600">
              {isCreatingAccount 
                ? "Start tracking your revenue, expenses, and payroll today"
                : "Track revenue, expenses, and payroll all in one place"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}