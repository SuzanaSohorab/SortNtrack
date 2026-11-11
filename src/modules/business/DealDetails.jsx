import { useState } from "react";
import { Link, useParams } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { DEALS } from "../../data/mockData";

const DealDetails = () => {
  const { id } = useParams();
  const deal = DEALS.find((d) => d.id === id);
  const [response, setResponse] = useState(deal?.myStatus ?? null);
  const [meeting, setMeeting] = useState("");

  if (!deal) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500">Deal not found.</p>
        <Link to="/business/browse-deals" className="mt-4 inline-block font-semibold text-green-700">← Browse deals</Link>
      </div>
    );
  }

  const respond = (type) => {
    // TODO: POST /api/deals/:id/respond { type, meeting } — acceptance/negotiation rules are TBD-16.
    setResponse(type);
  };

  const rows = [
    ["Industry", deal.industry], ["Category", deal.category], ["Quantity", deal.quantity],
    ["Asking price", deal.price], ["Valid until", deal.validUntil],
  ];

  return (
    <>
      <PageHeader eyebrow={`Deal ${deal.id}`} title={deal.category} action={<StatusBadge status={deal.status} />} />

      <div className="max-w-2xl space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <dl className="divide-y divide-gray-100 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between py-3"><dt className="text-gray-500">{k}</dt><dd className="font-medium text-gray-900">{v}</dd></div>
            ))}
          </dl>
          <h3 className="mt-5 text-sm font-semibold text-gray-900">Proposed terms</h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">{deal.terms}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {response && <p className="mb-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800" role="status">Your response: <strong>{response}</strong></p>}

          {!["Accepted", "Declined"].includes(response) && deal.status !== "Closed" && (
            <>
              <label htmlFor="meeting" className="mb-1 block text-sm font-medium text-gray-700">Preferred meeting date (optional)</label>
              <input id="meeting" type="date" value={meeting} onChange={(e) => setMeeting(e.target.value)} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={() => respond("Interested")} className="rounded-xl border border-green-600 px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50">Express Interest</button>
                <button onClick={() => respond("Accepted")} className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Accept Deal</button>
                <button onClick={() => respond("Declined")} className="rounded-xl px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Decline</button>
              </div>
            </>
          )}
        </div>

        <Link to="/business/browse-deals" className="inline-block text-sm font-semibold text-green-700">← Back to deals</Link>
      </div>
    </>
  );
};

export default DealDetails;
