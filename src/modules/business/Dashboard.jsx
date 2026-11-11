import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { DEALS } from "../../data/mockData";

const Dashboard = () => {
  const open = DEALS.filter((d) => d.status === "Open");
  const mine = DEALS.filter((d) => d.myStatus);

  return (
    <>
      <PageHeader
        eyebrow="Scrap Business Portal"
        title="Find recyclable material deals"
        description="Browse industry listings, express interest and arrange meetings."
        action={<Link to="/business/browse-deals" className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Browse Deals</Link>}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Open Deals" value={open.length} icon="🔍" color="bg-green-50 text-green-700" />
        <StatCard label="My Responses" value={mine.length} icon="🤝" color="bg-blue-50 text-blue-700" />
        <StatCard label="Accepted" value={mine.filter((d) => d.myStatus === "Accepted").length} icon="✅" color="bg-purple-50 text-purple-700" />
      </div>

      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-gray-900">Latest Deals</h2>
        <DataTable
          rows={DEALS}
          columns={[
            { key: "id", label: "Deal", render: (r) => <span className="font-semibold">{r.id}</span> },
            { key: "industry", label: "Industry" },
            { key: "category", label: "Category" },
            { key: "price", label: "Price" },
            { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
            { key: "a", label: "", render: (r) => <Link to={`/business/deal/${r.id}`} className="font-semibold text-green-700">View →</Link> },
          ]}
        />
      </section>
    </>
  );
};

export default Dashboard;
