import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { LISTINGS } from "../../data/mockData";

const MY_INDUSTRY = "GreenTex Ltd."; // TODO: from authenticated user
const initial = { listingId: "", price: "", validUntil: "", terms: "" };

const CreateDeal = () => {
  const options = LISTINGS.filter((l) => l.industry === MY_INDUSTRY && l.status !== "Closed");
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const onChange = (e) => setV({ ...v, [e.target.name]: e.target.value });
  const cls = (n) => `w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 ${errors[n] ? "border-red-400" : "border-gray-200"}`;

  const onSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (!v.listingId) found.listingId = "Select a listing.";
    if (!(Number(v.price) > 0)) found.price = "Enter an asking price greater than 0.";
    if (!v.validUntil) found.validUntil = "Choose a validity date.";
    if (!v.terms.trim()) found.terms = "Enter the proposed terms.";
    setErrors(found);
    if (Object.keys(found).length) return;
    // TODO: POST /api/deals — tender/negotiation rules are TBD-16.
    setDone(true);
    setV(initial);
  };

  return (
    <>
      <PageHeader eyebrow="Industry Portal" title="Create Deal" description="Propose terms for one of your listings. Deal rules are still being confirmed." />

      {done && <div className="mb-5 max-w-2xl rounded-xl bg-green-50 p-4 text-sm text-green-700" role="status">✅ Deal proposal sent to scrap businesses.</div>}

      <form onSubmit={onSubmit} noValidate className="max-w-2xl space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="listingId" className="mb-1 block text-sm font-medium text-gray-700">Listing *</label>
          <select id="listingId" name="listingId" value={v.listingId} onChange={onChange} className={cls("listingId")}>
            <option value="">Select listing</option>
            {options.map((l) => <option key={l.id} value={l.id}>{l.id} — {l.category} ({l.quantity})</option>)}
          </select>
          {errors.listingId && <p className="mt-1 text-xs text-red-600">{errors.listingId}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">Asking price (BDT) *</label>
            <input id="price" name="price" type="number" min="0" value={v.price} onChange={onChange} className={cls("price")} />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="validUntil" className="mb-1 block text-sm font-medium text-gray-700">Valid until *</label>
            <input id="validUntil" name="validUntil" type="date" value={v.validUntil} onChange={onChange} className={cls("validUntil")} />
            {errors.validUntil && <p className="mt-1 text-xs text-red-600">{errors.validUntil}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="terms" className="mb-1 block text-sm font-medium text-gray-700">Proposed terms *</label>
          <textarea id="terms" name="terms" rows={4} value={v.terms} onChange={onChange} className={cls("terms")} />
          {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
        </div>
        <button type="submit" className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700">Send Proposal</button>
      </form>
    </>
  );
};

export default CreateDeal;
