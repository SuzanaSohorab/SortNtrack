import { useState } from "react";
import { Link, useParams } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { COLLECTORS, REQUESTS } from "../../data/mockData";

const AssignCollector = () => {
  const { id } = useParams();
  const assignable = REQUESTS.filter((r) => ["Pending", "Assigned"].includes(r.status));
  const [requestId, setRequestId] = useState(id || "");
  const [collectorId, setCollectorId] = useState("");
  const [message, setMessage] = useState("");

  const request = assignable.find((r) => r.id === requestId);
  // Prefer collectors in the request's service area (business rule 2)
  const sameArea = COLLECTORS.filter((c) => request && c.area === request.area);
  const others = COLLECTORS.filter((c) => !sameArea.includes(c));

  const confirm = () => {
    if (!request || !collectorId) return;
    const collector = COLLECTORS.find((c) => c.id === collectorId);
    if (collector.availability !== "Available") {
      setMessage(`${collector.name} is currently busy. Please choose another collector.`);
      return;
    }
    // TODO: POST /api/assignments { requestId, collectorId } — server sets status
    // "Assigned" and notifies collector + resident (UC-05).
    setMessage(`✅ ${request.id} assigned to ${collector.name}. The collector and resident have been notified.`);
    setCollectorId("");
  };

  const CollectorOption = ({ c }) => (
    <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 ${collectorId === c.id ? "border-green-600 bg-green-50" : "border-gray-100 bg-white"}`}>
      <div className="flex items-center gap-3">
        <input type="radio" name="collector" value={c.id} checked={collectorId === c.id} onChange={() => setCollectorId(c.id)} />
        <div>
          <p className="font-semibold text-gray-900">{c.name}</p>
          <p className="text-xs text-gray-500">{c.area} · {c.phone}</p>
        </div>
      </div>
      <StatusBadge status={c.availability} />
    </label>
  );

  return (
    <>
      <PageHeader eyebrow="Collection Manager" title="Assign Collector" description="Select a request, then choose an available collector." />

      <div className="max-w-3xl space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <label htmlFor="req" className="mb-1 block text-sm font-medium text-gray-700">Request</label>
          <select id="req" value={requestId} onChange={(e) => { setRequestId(e.target.value); setCollectorId(""); setMessage(""); }}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm">
            <option value="">Select a request</option>
            {assignable.map((r) => <option key={r.id} value={r.id}>{r.id} — {r.category} ({r.area})</option>)}
          </select>

          {request && (
            <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
              <p><strong>Resident:</strong> {request.resident}</p>
              <p><strong>Address:</strong> {request.address}</p>
              <p><strong>Quantity:</strong> {request.quantity}</p>
            </div>
          )}
        </div>

        {request && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-gray-900">Collectors in {request.area}</h2>
            <div className="mt-3 space-y-3">
              {sameArea.length ? sameArea.map((c) => <CollectorOption key={c.id} c={c} />) : (
                <p className="text-sm text-gray-400">No collector is registered for this area.</p>
              )}
            </div>

            <h2 className="mt-6 font-bold text-gray-900">Other areas</h2>
            <div className="mt-3 space-y-3">{others.map((c) => <CollectorOption key={c.id} c={c} />)}</div>

            <button onClick={confirm} disabled={!collectorId}
              className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-300">
              Confirm Assignment
            </button>
          </div>
        )}

        {message && <p className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800" role="status">{message}</p>}
        <Link to="/manager/requests" className="inline-block text-sm font-semibold text-green-700">← Back to requests</Link>
      </div>
    </>
  );
};

export default AssignCollector;
