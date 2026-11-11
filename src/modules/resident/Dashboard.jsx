import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS } from "../../data/mockData";

const actions = [
  { title: "AI Waste Classifier", desc: "Identify waste using an image.", icon: "🤖", link: "/resident/classifier" },
  { title: "Waste Sorting Guide", desc: "Learn how to separate waste.", icon: "📖", link: "/resident/sorting-guide" },
  { title: "Request Pickup", desc: "Schedule recyclable waste collection.", icon: "🚛", link: "/resident/request-pickup" },
  { title: "My Requests", desc: "Follow your collection requests.", icon: "📍", link: "/resident/my-requests" },
];

const Dashboard = () => {
  // TODO: GET /api/requests/mine
  const mine = REQUESTS.filter((r) => r.resident === "Rahim Uddin");
  const active = mine.find((r) => r.status === "InProgress");
  const count = (s) => mine.filter((r) => r.status === s).length;

  return (
    <>
      <PageHeader
        eyebrow="Resident Portal"
        title="Welcome to SortNTrack 👋"
        description="Manage your waste collection and recycling activities."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Requests" value={mine.length} icon="📋" color="bg-blue-50 text-blue-700" />
        <StatCard label="Pending Requests" value={count("Pending")} icon="⏳" color="bg-yellow-50 text-yellow-700" />
        <StatCard label="Completed Pickups" value={count("Completed")} icon="♻️" color="bg-green-50 text-green-700" />
        <StatCard label="Active Pickup" value={active ? 1 : 0} icon="🚛" color="bg-purple-50 text-purple-700" />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => (
            <Link key={a.title} to={a.link}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-3xl">{a.icon}</span>
              <h3 className="mt-4 font-bold text-gray-900">{a.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">{a.desc}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-green-700">Open page →</span>
            </Link>
          ))}
        </div>
      </section>

      {active && (
        <section className="mt-10 rounded-2xl border border-green-100 bg-green-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-green-700">Active Pickup</p>
              <h2 className="mt-2 text-xl font-bold text-gray-900">Request {active.id}</h2>
              <p className="mt-1 text-sm text-gray-600">{active.category} · {active.status}</p>
            </div>
            <Link to={`/resident/track-pickup/${active.id}`}
              className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">
              Track Pickup
            </Link>
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Requests</h2>
          <Link to="/resident/my-requests" className="text-sm font-semibold text-green-700">View all</Link>
        </div>
        <DataTable
          rows={mine.slice(0, 5)}
          columns={[
            { key: "id", label: "Request ID", render: (r) => <span className="font-semibold">{r.id}</span> },
            { key: "category", label: "Waste Category" },
            { key: "date", label: "Date" },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]}
        />
      </section>
    </>
  );
};

export default Dashboard;
