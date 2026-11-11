import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS, SERVICE_AREAS } from "../../data/mockData";

const ManageRequests = () => {
  // TODO: GET /api/manager/requests
  const [requests, setRequests] = useState(REQUESTS);
  const [status, setStatus] = useState("All");
  const [area, setArea] = useState("All");

  // Manager may reject an unserviceable request with a reason (UC-05 AF-03)
  const reject = (id) => {
    const reason = window.prompt(`Reason for rejecting ${id}:`);
    if (!reason?.trim()) return;
    // TODO: PATCH /api/requests/:id/reject { reason }
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r)));
  };

  const rows = requests.filter((r) => (status === "All" || r.status === status) && (area === "All" || r.area === area));
  const select = "rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm";

  return (
    <>
      <PageHeader eyebrow="Collection Manager" title="Manage Requests" />

      <div className="mb-5 flex flex-wrap gap-3">
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)} className={select}>
          {["All", "Pending", "Assigned", "InProgress", "Collected", "Dispatched", "Completed", "Failed", "Cancelled", "Rejected"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select aria-label="Filter by area" value={area} onChange={(e) => setArea(e.target.value)} className={select}>
          {["All", ...SERVICE_AREAS].map((a) => <option key={a}>{a}</option>)}
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
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions", label: "Actions",
            render: (r) => r.status === "Pending" ? (
              <div className="flex gap-3 text-sm font-semibold">
                <Link to={`/manager/assign-collector/${r.id}`} className="text-green-700">Assign</Link>
                <button onClick={() => reject(r.id)} className="text-red-600">Reject</button>
              </div>
            ) : r.status === "Assigned" ? (
              <Link to={`/manager/assign-collector/${r.id}`} className="text-sm font-semibold text-blue-700">Reassign</Link>
            ) : "—",
          },
        ]}
      />
    </>
  );
};

export default ManageRequests;
