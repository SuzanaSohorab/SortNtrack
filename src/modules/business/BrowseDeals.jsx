import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { DEALS } from "../../data/mockData";

const BrowseDeals = () => {
  // TODO: GET /api/deals?status=Open
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const deals = DEALS.filter((d) => !q || `${d.category} ${d.industry}`.toLowerCase().includes(q));

  return (
    <>
      <PageHeader eyebrow="Scrap Business Portal" title="Browse Deals" />

      <input
        type="search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search deals"
        placeholder="Search by category or industry…"
        className="mb-6 w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
      />

      {deals.length === 0 ? (
        <p className="rounded-2xl bg-white p-10 text-center text-gray-400">No deals match your search.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((d) => (
            <div key={d.id} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-gray-900">{d.category}</h3>
                <StatusBadge status={d.status} />
              </div>
              <p className="mt-1 text-sm text-gray-500">{d.industry}</p>
              <p className="mt-4 text-sm text-gray-600">Quantity: <strong>{d.quantity}</strong></p>
              <p className="text-sm text-gray-600">Asking: <strong>{d.price}</strong></p>
              <p className="text-xs text-gray-400">Valid until {d.validUntil}</p>
              <Link to={`/business/deal/${d.id}`} className="mt-5 rounded-xl bg-green-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-green-700">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BrowseDeals;
