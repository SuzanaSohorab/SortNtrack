import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { LOCATION_INTERVAL_MS, REQUESTS } from "../../data/mockData";

const UpdateCollectionStatus = () => {
  const { id } = useParams();
  const task = REQUESTS.find((r) => r.id === id);

  const [status, setStatus] = useState(task?.status ?? "Assigned");
  const [remarks, setRemarks] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [sharing, setSharing] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [position, setPosition] = useState(null);

  const watchId = useRef(null);
  const lastSent = useRef(0);

  const stopSharing = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setSharing(false);
  }, []);

  // Make sure the GPS watcher never outlives this page
  useEffect(() => () => {
    if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
  }, []);

  // Browser geolocation only works while this page stays open (SRS 2.5 #5)
  const startSharing = () => {
    if (!("geolocation" in navigator)) {
      setGeoError("Location is not supported on this device. The resident will see that live location is unavailable.");
      return;
    }
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const t = Date.now();
        if (t - lastSent.current < LOCATION_INTERVAL_MS) return; // send ~every 10 s
        lastSent.current = t;
        const point = { lat: pos.coords.latitude, lng: pos.coords.longitude, timestamp: t };
        setPosition(point);
        // TODO: POST /api/requests/:id/location  (point)
      },
      (err) => setGeoError(err.code === err.PERMISSION_DENIED
        ? "Location permission denied. The trip can continue, but residents will not see your live location."
        : "Unable to read your location right now."),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
    setSharing(true);
    setGeoError("");
  };

  if (!task) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500">Task not found.</p>
        <Link to="/collector/my-tasks" className="mt-4 inline-block font-semibold text-green-700">← Back to tasks</Link>
      </div>
    );
  }

  // Transitions follow SRS Appendix B.2
  const move = (next) => {
    // TODO: PATCH /api/requests/:id/status { status: next, remarks, reason }
    if (next !== "InProgress") stopSharing();
    setStatus(next);
    setError("");
  };

  const startTrip = () => { startSharing(); move("InProgress"); };

  const reportFailure = () => {
    if (!reason.trim()) return setError("Please enter a reason why the collection could not be completed.");
    move("Failed");
  };

  const finalState = ["Completed", "Failed", "Cancelled", "Rejected"].includes(status);

  return (
    <>
      <PageHeader eyebrow={`Task ${task.id}`} title="Update Collection Status" action={<StatusBadge status={status} />} />

      <div className="max-w-2xl space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-semibold text-gray-900">{task.address}</p>
          <p className="mt-3 text-sm text-gray-500">{task.category} · {task.quantity}</p>
        </div>

        {status === "Assigned" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">
              Starting the trip shares your location with the resident until you confirm collection. Keep this page open during the trip.
            </p>
            <button onClick={startTrip} className="mt-4 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
              🚛 Start Trip & Share Location
            </button>
          </div>
        )}

        {status === "InProgress" && (
          <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className={`rounded-xl p-3 text-sm ${sharing && !geoError ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}>
              {sharing && !geoError ? "● Sharing live location" : "Location sharing is off"}
              {position && <span className="block text-xs">Last sent: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}</span>}
            </div>
            {geoError && <p className="rounded-xl bg-yellow-50 p-3 text-sm text-yellow-800">{geoError}</p>}

            <button onClick={() => move("Collected")} className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
              ✅ Confirm Collection Completed
            </button>

            <div className="border-t border-gray-100 pt-4">
              <label htmlFor="reason" className="mb-1 block text-sm font-medium text-gray-700">Can't complete this pickup? Give a reason</label>
              <textarea id="reason" rows={2} value={reason} onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
              <button onClick={reportFailure} className="mt-3 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                Report Collection Failed
              </button>
            </div>
          </div>
        )}

        {status === "Collected" && (
          <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Dispatch remarks (optional)</label>
            <textarea id="remarks" rows={2} value={remarks} onChange={(e) => setRemarks(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm" />
            <button onClick={() => move("Dispatched")} className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
              Mark Waste as Dispatched
            </button>
          </div>
        )}

        {status === "Dispatched" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <button onClick={() => move("Completed")} className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
              Close Record
            </button>
          </div>
        )}

        {finalState && (
          <p className={`rounded-xl p-4 text-sm ${status === "Completed" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`} role="status">
            {status === "Completed" ? "✅ Record closed. Great work!" : `This task is ${status.toLowerCase()}.`}
            {status === "Failed" && " The resident and manager have been notified."}
          </p>
        )}

        {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600" role="alert">{error}</p>}

        <Link to="/collector/my-tasks" className="inline-block text-sm font-semibold text-green-700">← Back to tasks</Link>
      </div>
    </>
  );
};

export default UpdateCollectionStatus;
