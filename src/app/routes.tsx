import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Login } from "./components/login";
import { Dashboard } from "./components/dashboard";
import { Invoices } from "./components/invoices";
import { Expenses } from "./components/expenses";
import { Payroll } from "./components/payroll";
import { Integrations } from "./components/integrations";
import { Settings } from "./components/settings";
import { Reports } from "./components/reports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "invoices", Component: Invoices },
      { path: "expenses", Component: Expenses },
      { path: "payroll", Component: Payroll },
      { path: "reports", Component: Reports },
      { path: "integrations", Component: Integrations },
      { path: "settings", Component: Settings },
    ],
  },
]);
