import { useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import { WASTE_CATEGORIES } from "../../data/mockData";

const initial = { category: "", details: "", quantity: "", unit: "kg" };

const UploadMaterials = () => {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const onChange = (e) => setV({ ...v, [e.target.name]: e.target.value });
  const cls = (n) => `w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 ${errors[n] ? "border-red-400" : "border-gray-200"}`;

  const onSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (!v.category) found.category = "Select a category.";
    if (!v.details.trim()) found.details = "Describe the material.";
    if (!(Number(v.quantity) > 0)) found.quantity = "Enter a quantity greater than 0.";
    setErrors(found);
    if (Object.keys(found).length) return;
    // TODO: POST /api/listings
    setDone(true);
    setV(initial);
  };

  return (
    <>
      <PageHeader eyebrow="Industry Portal" title="Upload Materials" description="Publish recyclable material details for scrap businesses to review." />

      {done && (
        <div className="mb-5 max-w-2xl rounded-xl bg-green-50 p-4 text-sm text-green-700" role="status">
          ✅ Listing published. <Link to="/industry/my-listings" className="font-semibold underline">View my listings</Link> or <Link to="/industry/create-deal" className="font-semibold underline">create a deal</Link>.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="max-w-2xl space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">Category *</label>
          <select id="category" name="category" value={v.category} onChange={onChange} className={cls("category")}>
            <option value="">Select category</option>
            {WASTE_CATEGORIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>
        <div>
          <label htmlFor="details" className="mb-1 block text-sm font-medium text-gray-700">Material details *</label>
          <textarea id="details" name="details" rows={3} value={v.details} onChange={onChange} className={cls("details")} />
          {errors.details && <p className="mt-1 text-xs text-red-600">{errors.details}</p>}
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
              <option>kg</option><option>tons</option><option>units</option>
            </select>
          </div>
        </div>
        <button type="submit" className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700">Publish Listing</button>
      </form>
    </>
  );
};

export default UploadMaterials;
