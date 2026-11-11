import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { SERVICE_AREAS, WASTE_CATEGORIES } from "../../data/mockData";

const eligible = WASTE_CATEGORIES.filter((c) => c.eligible);
const initial = { category: "", quantity: "", unit: "kg", area: "", address: "", notes: "" };

const RequestPickup = () => {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setV({ ...v, [e.target.name]: e.target.value });
  const cls = (name) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 ${errors[name] ? "border-red-400" : "border-gray-200"}`;

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!v.category) found.category = "Select a waste category.";
    if (!(Number(v.quantity) > 0)) found.quantity = "Enter a quantity greater than 0.";
    if (!v.area) found.area = "Select your area (outside the service area, collection is unavailable).";
    if (!v.address.trim()) found.address = "Collection address is required.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      // TODO: POST /api/requests — server validates service area & eligibility and
      // returns the generated request ID with status "Pending" (UC-04).
      await new Promise((r) => setTimeout(r, 600));
      setCreated({ id: `ST-${1000 + Math.floor(Math.random() * 9000)}`, status: "Pending" });
      setV(initial);
    } catch {
      setErrors({ form: "Could not submit your request. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (created) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">✅</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Request submitted</h1>
        <p className="mt-2 text-gray-500">Your request ID is</p>
        <p className="mt-1 text-2xl font-extrabold text-green-700">{created.id}</p>
        <div className="mt-3"><StatusBadge status={created.status} /></div>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/resident/my-requests" className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">View My Requests</Link>
          <button onClick={() => setCreated(null)} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700">New Request</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Pickup" title="Request Pickup" description="Request collection of eligible recyclable or scrap materials." />

      <form onSubmit={onSubmit} noValidate className="max-w-2xl space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {errors.form && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600" role="alert">{errors.form}</p>}

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">Waste category *</label>
          <select id="category" name="category" value={v.category} onChange={onChange} className={cls("category")}>
            <option value="">Select category</option>
            {eligible.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-gray-700">Quantity *</label>
            <input id="quantity" name="quantity" type="number" min="0" step="any" value={v.quantity} onChange={onChange} className={cls("quantity")} />
            {errors.quantity && <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>}
          </div>
          <div>
            <label htmlFor="unit" className="mb-1 block text-sm font-medium text-gray-700">Unit</label>
            <select id="unit" name="unit" value={v.unit} onChange={onChange} className={cls("unit")}>
              <option value="kg">kg</option><option value="items">items</option><option value="sacks">sacks</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="area" className="mb-1 block text-sm font-medium text-gray-700">Area *</label>
          <select id="area" name="area" value={v.area} onChange={onChange} className={cls("area")}>
            <option value="">Select your area</option>
            {SERVICE_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          {errors.area && <p className="mt-1 text-xs text-red-600">{errors.area}</p>}
        </div>

        <div>
          <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">Collection address *</label>
          <input id="address" name="address" value={v.address} onChange={onChange} placeholder="House, road, building" className={cls("address")} />
          {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-700">Additional instructions</label>
          <textarea id="notes" name="notes" rows={3} value={v.notes} onChange={onChange} className={cls("notes")} />
        </div>

        <button type="submit" disabled={submitting}
          className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-300">
          {submitting ? "Submitting…" : "Submit Request"}
        </button>
      </form>
    </>
  );
};

export default RequestPickup;
