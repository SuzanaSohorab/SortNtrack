import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { USERS, USER_ROLES } from "../../data/mockData";

const ManageUsers = () => {
  // TODO: GET /api/admin/users. Sensitive actions should be audit-logged (UC-09 BR3).
  const [users, setUsers] = useState(USERS);
  const [query, setQuery] = useState("");

  const update = (id, patch) => setUsers((list) => list.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  const q = query.trim().toLowerCase();
  const rows = users.filter((u) => !q || `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(q));

  return (
    <>
      <PageHeader eyebrow="Administrator" title="Manage Users" description="Approve industry/scrap accounts and manage roles and access." />

      <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search users" placeholder="Search name, email or role…"
        className="mb-5 w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500" />

      <DataTable
        rows={rows}
        columns={[
          { key: "name", label: "Name", render: (u) => <span className="font-semibold">{u.name}</span> },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          {
            key: "role", label: "Role",
            render: (u) => (
              <select aria-label={`Role for ${u.name}`} value={u.role} onChange={(e) => update(u.id, { role: e.target.value })}
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm">
                {USER_ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            ),
          },
          { key: "status", label: "Status", render: (u) => <StatusBadge status={u.status} /> },
          {
            key: "a", label: "Actions",
            render: (u) => (
              <button onClick={() => update(u.id, { status: u.status === "Active" ? "Inactive" : "Active" })}
                className={`text-sm font-semibold ${u.status === "Active" ? "text-red-600" : "text-green-700"}`}>
                {u.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            ),
          },
        ]}
      />
    </>
  );
};

export default ManageUsers;
