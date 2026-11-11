import { useState } from "react";
import { Link, NavLink } from "react-router";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "How It Works", to: "/#how-it-works" },
  { name: "Features", to: "/#features" },
  { name: "About", to: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition hover:text-green-600 ${
      isActive ? "text-green-600" : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl text-white">
            ♻
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Sort<span className="text-green-600">N</span>Track
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.to} end className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-600">
            Login
          </Link>
          <Link to="/register" className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.to} onClick={close} className="text-sm font-medium text-gray-700 hover:text-green-600">
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <Link to="/login" onClick={close} className="text-sm font-semibold text-gray-700">Login</Link>
            <Link to="/register" onClick={close} className="rounded-lg bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
