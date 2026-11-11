import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS } from "../../data/mockData";

const MY_COLLECTOR_ID = "c1"; // TODO: take from the authenticated user

const Dashboard = () => {
  const tasks = REQUESTS.filter((r) => r.collectorId === MY_COLLECTOR_ID);
  const open = tasks.filter((r) => ["Assigned", "InProgress"].includes(r.status));

  return (
    <>
      <PageHeader eyebrow="Collector Portal" title="Today's Work" description="Your assigned tasks and progress." />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Open Tasks" value={open.length} icon="📋" color="bg-blue-50 text-blue-700" />
        <StatCard label="In Progress" value={tasks.filter((r) => r.status === "InProgress").length} icon="🚛" color="bg-purple-50 text-purple-700" />
        <StatCard label="Completed" value={tasks.filter((r) => r.status === "Completed").length} icon="✅" color="bg-green-50 text-green-700" />
      </div>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Open Tasks</h2>
          <Link to="/collector/my-tasks" className="text-sm font-semibold text-green-700">View all</Link>
        </div>
        <DataTable
          rows={open}
          empty="No open tasks right now."
          columns={[
            { key: "id", label: "Task", render: (r) => <span className="font-semibold">{r.id}</span> },
            { key: "address", label: "Address" },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
            { key: "a", label: "", render: (r) => <Link to={`/collector/task/${r.id}`} className="font-semibold text-green-700">Open →</Link> },
          ]}
        />
      </section>
    </>
  );
};

export default Dashboard;
