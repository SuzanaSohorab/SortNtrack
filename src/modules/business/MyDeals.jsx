import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { DEALS } from "../../data/mockData";

const MyDeals = () => {
  // TODO: GET /api/deals/mine
  const mine = DEALS.filter((d) => d.myStatus);

  return (
    <>
      <PageHeader eyebrow="Scrap Business Portal" title="My Deals" />
      <DataTable
        rows={mine}
        empty="You have not responded to any deals yet."
        columns={[
          { key: "id", label: "Deal", render: (r) => <span className="font-semibold">{r.id}</span> },
          { key: "industry", label: "Industry" },
          { key: "category", label: "Category" },
          { key: "price", label: "Price" },
          { key: "myStatus", label: "My Response", render: (r) => <StatusBadge status={r.myStatus} /> },
          { key: "status", label: "Deal Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "a", label: "", render: (r) => <Link to={`/business/deal/${r.id}`} className="font-semibold text-green-700">View →</Link> },
        ]}
      />
    </>
  );
};

export default MyDeals;
