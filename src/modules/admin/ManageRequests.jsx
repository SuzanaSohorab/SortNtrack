import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS } from "../../data/mockData";

const STATUSES = ["All", "Pending", "Assigned", "InProgress", "Collected", "Dispatched", "Completed", "Failed", "Cancelled", "Rejected"];

const ManageRequests = () => {
  // TODO: GET /api/admin/requests
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const rows = REQUESTS.filter(
    (r) => (status === "All" || r.status === status) && (!q || `${r.id} ${r.resident} ${r.category}`.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHeader eyebrow="Administrator" title="All Pickup Requests" />

      <div className="mb-5 flex flex-wrap gap-3">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search requests" placeholder="Search ID, resident or category…"
          className="w-full max-w-xs rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm" />
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <DataTable
        rows={rows}
        columns={[
          { key: "id", label: "Request", render: (r) => <span className="font-semibold">{r.id}</span> },
          { key: "resident", label: "Resident" },
          { key: "category", label: "Category" },
          { key: "area", label: "Area" },
          { key: "collector", label: "Collector", render: (r) => r.collector || "—" },
          { key: "date", label: "Date" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </>
  );
};

export default ManageRequests;
