import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { COLLECTORS, REQUESTS } from "../../data/mockData";

const Dashboard = () => {
  const pending = REQUESTS.filter((r) => r.status === "Pending");
  const count = (s) => REQUESTS.filter((r) => r.status === s).length;

  return (
    <>
      <PageHeader eyebrow="Collection Manager" title="Operations Overview" description="Review incoming requests and keep collections moving." />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending Requests" value={pending.length} icon="⏳" color="bg-yellow-50 text-yellow-700" />
        <StatCard label="Assigned" value={count("Assigned")} icon="🧑‍🔧" color="bg-blue-50 text-blue-700" />
        <StatCard label="In Progress" value={count("InProgress")} icon="🚛" color="bg-purple-50 text-purple-700" />
        <StatCard label="Available Collectors" value={COLLECTORS.filter((c) => c.availability === "Available").length} icon="✅" color="bg-green-50 text-green-700" />
      </div>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Awaiting Assignment</h2>
          <Link to="/manager/requests" className="text-sm font-semibold text-green-700">All requests</Link>
        </div>
        <DataTable
          rows={pending}
          empty="No pending requests 🎉"
          columns={[
            { key: "id", label: "Request", render: (r) => <span className="font-semibold">{r.id}</span> },
            { key: "category", label: "Category" },
            { key: "area", label: "Area" },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
            { key: "a", label: "", render: (r) => <Link to={`/manager/assign-collector/${r.id}`} className="font-semibold text-green-700">Assign →</Link> },
          ]}
        />
      </section>
    </>
  );
};

export default Dashboard;
