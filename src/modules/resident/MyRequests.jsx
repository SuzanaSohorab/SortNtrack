import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS } from "../../data/mockData";

const FILTERS = ["All", "Pending", "Assigned", "InProgress", "Completed", "Cancelled"];

const MyRequests = () => {
  // TODO: GET /api/requests/mine
  const [requests, setRequests] = useState(REQUESTS.filter((r) => r.resident === "Rahim Uddin"));
  const [filter, setFilter] = useState("All");

  // Residents can cancel only before collection starts (UC-04 AF-04)
  const cancel = (id) => {
    if (!window.confirm(`Cancel request ${id}?`)) return;
    // TODO: PATCH /api/requests/:id/cancel
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r)));
  };

  const rows = filter === "All" ? requests : requests.filter((r) => r.status === filter);

  return (
    <>
      <PageHeader
        eyebrow="Pickup"
        title="My Pickup Requests"
        action={<Link to="/resident/request-pickup" className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">+ New Request</Link>}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${filter === f ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-green-50"}`}>
            {f}
          </button>
        ))}
      </div>

      <DataTable
        rows={rows}
        columns={[
          { key: "id", label: "Request ID", render: (r) => <span className="font-semibold">{r.id}</span> },
          { key: "category", label: "Category" },
          { key: "quantity", label: "Quantity" },
          { key: "date", label: "Date" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions", label: "Actions",
            render: (r) => (
              <div className="flex gap-3 text-sm font-semibold">
                <Link to={`/resident/track-pickup/${r.id}`} className="text-green-700">Track</Link>
                {["Pending", "Assigned"].includes(r.status) && (
                  <button onClick={() => cancel(r.id)} className="text-red-600">Cancel</button>
                )}
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default MyRequests;
