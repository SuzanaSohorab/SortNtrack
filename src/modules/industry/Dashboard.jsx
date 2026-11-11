import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { LISTINGS } from "../../data/mockData";

const MY_INDUSTRY = "GreenTex Ltd."; // TODO: from authenticated user

const Dashboard = () => {
  const mine = LISTINGS.filter((l) => l.industry === MY_INDUSTRY);

  return (
    <>
      <PageHeader
        eyebrow="Industry Portal"
        title={`Welcome, ${MY_INDUSTRY}`}
        description="Publish recyclable material and propose deals to local scrap businesses."
        action={<Link to="/industry/upload-materials" className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">+ Upload Materials</Link>}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="My Listings" value={mine.length} icon="📦" color="bg-blue-50 text-blue-700" />
        <StatCard label="Open" value={mine.filter((l) => l.status === "Open").length} icon="🟢" color="bg-green-50 text-green-700" />
        <StatCard label="Negotiating" value={mine.filter((l) => l.status === "Negotiating").length} icon="🤝" color="bg-yellow-50 text-yellow-700" />
      </div>

      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-gray-900">Recent Listings</h2>
        <DataTable
          rows={mine}
          columns={[
            { key: "id", label: "Listing", render: (r) => <span className="font-semibold">{r.id}</span> },
            { key: "category", label: "Category" },
            { key: "quantity", label: "Quantity" },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          ]}
        />
      </section>

      <p className="mt-6 text-xs text-gray-400">Marketplace features are proposed and subject to scope confirmation (TBD-15).</p>
    </>
  );
};

export default Dashboard;
