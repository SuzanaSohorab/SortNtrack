import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS, STATUS_FLOW } from "../../data/mockData";

const STALE_AFTER_S = 30; // location older than this is not shown as "live"

const TrackPickup = () => {
  const { id } = useParams();
  const request = REQUESTS.find((r) => r.id === id);
  const live = request?.status === "InProgress";

  // --- Simulated collector movement (replace with real location updates) ---
  // TODO: poll GET /api/requests/:id/location every few seconds, or subscribe
  // via WebSocket (TBD-09 / TBD-11). Collector sends updates about every 10 s.
  const [progress, setProgress] = useState(0.25);
  const [updatedAt, setUpdatedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      setProgress((p) => Math.min(p + 0.05, 0.95));
      setUpdatedAt(Date.now());
    }, 5000);
    return () => clearInterval(t);
  }, [live]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!request) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500">Request not found.</p>
        <Link to="/resident/my-requests" className="mt-4 inline-block font-semibold text-green-700">← Back to my requests</Link>
      </div>
    );
  }

  const ageSeconds = Math.round((now - updatedAt) / 1000);
  const stale = ageSeconds > STALE_AFTER_S;
  const etaMinutes = Math.max(1, Math.round((1 - progress) * 18));

  // Map positions (percent of the map box)
  const start = { x: 12, y: 80 };
  const home = { x: 86, y: 22 };
  const pos = { x: start.x + (home.x - start.x) * progress, y: start.y + (home.y - start.y) * progress };

  const stepIndex = STATUS_FLOW.indexOf(request.status);
  const terminalBad = ["Cancelled", "Rejected", "Failed"].includes(request.status);

  return (
    <>
      <PageHeader
        eyebrow={`Request ${request.id}`}
        title="Track Pickup"
        action={<Link to="/resident/my-requests" className="text-sm font-semibold text-green-700">← My requests</Link>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">{request.category}</h2>
              <StatusBadge status={request.status} />
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Quantity</dt><dd>{request.quantity}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Collector</dt><dd>{request.collector || "Not assigned yet"}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-500">Address</dt><dd className="text-right">{request.address}</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-gray-900">Status timeline</h2>
            {terminalBad ? (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">This request is {request.status.toLowerCase()}.</p>
            ) : (
              <ol className="mt-4 space-y-3">
                {STATUS_FLOW.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${i <= stepIndex ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                      {i <= stepIndex ? "✓" : i + 1}
                    </span>
                    <span className={i <= stepIndex ? "font-semibold text-gray-900" : "text-gray-400"}>{s}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-bold text-gray-900">Live location</h2>
            {live && (
              <span className="text-sm text-gray-500">
                ETA: <strong className="text-gray-900">~{etaMinutes} min</strong> <span className="text-xs">(estimate)</span>
              </span>
            )}
          </div>

          {live ? (
            <>
              {/* Placeholder map. Swap for Leaflet / Google Maps once the provider is chosen (TBD-11). */}
              <div className="relative mt-4 h-72 overflow-hidden rounded-xl bg-green-50 sm:h-96" role="img" aria-label="Map showing the collector approaching your address">
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#bbf7d0" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <line x1={`${start.x}%`} y1={`${start.y}%`} x2={`${home.x}%`} y2={`${home.y}%`} stroke="#16a34a" strokeWidth="4" strokeDasharray="8 8" />
                </svg>
                <span className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl" style={{ left: `${home.x}%`, top: `${home.y}%` }} title="Your address">🏠</span>
                <span className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl transition-all duration-1000" style={{ left: `${pos.x}%`, top: `${pos.y}%` }} title="Collector">🚛</span>
              </div>

              <p className={`mt-3 text-sm ${stale ? "text-orange-600" : "text-gray-500"}`}>
                {stale ? "⚠️ Location may be outdated — " : "● Live — "}last updated {ageSeconds}s ago
              </p>
            </>
          ) : (
            <div className="mt-4 flex h-48 items-center justify-center rounded-xl bg-gray-50 text-center text-sm text-gray-400">
              {request.status === "Pending" && "Waiting for a collector to be assigned. Live location is not available yet."}
              {request.status === "Assigned" && "A collector is assigned. Live tracking starts when the trip begins."}
              {["Collected", "Dispatched", "Completed"].includes(request.status) && "Collection confirmed. Live tracking has ended."}
              {terminalBad && "Live tracking is not available for this request."}
            </div>
          )}

          {["Collected", "Dispatched", "Completed"].includes(request.status) && (
            <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
              ✅ Collection confirmed on {request.date}. Status: {request.status}.
            </p>
          )}

          <p className="mt-4 text-xs text-gray-400">Estimated arrival times are estimates only and not a guaranteed arrival time.</p>
        </div>
      </div>
    </>
  );
};

export default TrackPickup;
