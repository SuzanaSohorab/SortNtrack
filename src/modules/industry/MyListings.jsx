import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { LISTINGS } from "../../data/mockData";

const MY_INDUSTRY = "GreenTex Ltd."; // TODO: from authenticated user

const MyListings = () => {
  // TODO: GET /api/listings/mine
  const [listings, setListings] = useState(LISTINGS.filter((l) => l.industry === MY_INDUSTRY));

  const close = (id) => {
    // TODO: PATCH /api/listings/:id { status: "Closed" }
    setListings((list) => list.map((l) => (l.id === id ? { ...l, status: "Closed" } : l)));
  };

  return (
    <>
      <PageHeader
        eyebrow="Industry Portal"
        title="My Material Listings"
        action={<Link to="/industry/upload-materials" className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">+ New Listing</Link>}
      />
      <DataTable
        rows={listings}
        columns={[
          { key: "id", label: "Listing", render: (r) => <span className="font-semibold">{r.id}</span> },
          { key: "category", label: "Category" },
          { key: "details", label: "Details" },
          { key: "quantity", label: "Quantity" },
          { key: "date", label: "Posted" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          {
            key: "actions", label: "Actions",
            render: (r) => r.status === "Closed" ? "—" : (
              <div className="flex gap-3 text-sm font-semibold">
                <Link to="/industry/create-deal" className="text-green-700">Create deal</Link>
                <button onClick={() => close(r.id)} className="text-red-600">Close</button>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default MyListings;
