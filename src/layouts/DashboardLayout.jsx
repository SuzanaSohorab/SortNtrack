import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { ROLE_CONFIG } from "../data/mockData";

// Shared shell (sidebar + content) for every logged-in role.
// TODO: add a route guard here once authentication is connected (NFR-SEC-01/02).
const DashboardLayout = ({ role }) => {
  const [open, setOpen] = useState(false);
  const config = ROLE_CONFIG[role];

  const itemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50 hover:text-green-700"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 lg:hidden">
        <Link to="/" className="font-extrabold text-gray-900">
          Sort<span className="text-green-600">N</span>Track
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-gray-200 px-3 py-1.5"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <aside
        className={`${open ? "block" : "hidden"} border-r border-gray-100 bg-white p-4 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0`}
      >
        <Link to="/" className="mb-1 hidden text-xl font-extrabold text-gray-900 lg:block">
          Sort<span className="text-green-600">N</span>Track
        </Link>
        <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-gray-400 lg:mt-1">
          {config.label}
        </p>

        <nav className="flex flex-col gap-1">
          {config.nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={itemClass} onClick={() => setOpen(false)}>
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/login"
          className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <span>🚪</span> Logout
        </Link>
      </aside>

      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
