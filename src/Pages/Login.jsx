import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ROLE_CONFIG } from "../data/mockData";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident"); // demo only
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || !password) {
      setError("Please enter a valid email and password.");
      return;
    }
    setError("");

    // TODO: POST /api/auth/login — the server verifies credentials, sets a secure
    // httpOnly JWT cookie and returns the user's role (NFR-SEC-10).
    // For now the role comes from the demo selector below.
    navigate(ROLE_CONFIG[role].home);
  };

  return (
    <div className="mx-auto max-w-md px-5 py-12">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-500">Login to continue to SortNTrack.</p>

        {error && <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600" role="alert">{error}</div>}

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="rounded-xl border border-dashed border-yellow-300 bg-yellow-50 p-3">
            <label htmlFor="role" className="mb-1 block text-xs font-semibold text-yellow-800">
              Demo mode — open portal as (remove once backend auth is connected)
            </label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-yellow-200 bg-white px-3 py-2 text-sm">
              {Object.entries(ROLE_CONFIG).map(([key, cfg]) => (
                <option key={key} value={key}>{cfg.label}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          New here? <Link to="/register" className="font-semibold text-green-700">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
