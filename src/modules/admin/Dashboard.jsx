import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { COLLECTORS, REQUESTS, USERS, WASTE_CATEGORIES } from "../../data/mockData";

const links = [
  { to: "/admin/users", icon: "👥", title: "Manage Users", desc: "Create, approve and deactivate accounts." },
  { to: "/admin/categories", icon: "🏷️", title: "Manage Categories", desc: "Edit waste categories and sorting instructions." },
  { to: "/admin/requests", icon: "📋", title: "All Requests", desc: "Monitor every pickup request on the platform." },
];

const Dashboard = () => (
  <>
    <PageHeader eyebrow="Administrator" title="Platform Overview" description="Monitor and manage SortNTrack." />

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Users" value={USERS.length} icon="👥" color="bg-blue-50 text-blue-700" />
      <StatCard label="Collectors" value={COLLECTORS.length} icon="🧑‍🔧" color="bg-green-50 text-green-700" />
      <StatCard label="Requests" value={REQUESTS.length} icon="📋" color="bg-yellow-50 text-yellow-700" />
      <StatCard label="Categories" value={WASTE_CATEGORIES.length} icon="🏷️" color="bg-purple-50 text-purple-700" />
    </div>

    <div className="mt-10 grid gap-5 sm:grid-cols-3">
      {links.map((l) => (
        <Link key={l.to} to={l.to} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <span className="text-3xl">{l.icon}</span>
          <h3 className="mt-4 font-bold text-gray-900">{l.title}</h3>
          <p className="mt-2 text-sm text-gray-500">{l.desc}</p>
        </Link>
      ))}
    </div>
  </>
);

export default Dashboard;
