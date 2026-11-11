import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { WASTE_CATEGORIES } from "../../data/mockData";

const blank = { id: "", name: "", icon: "♻️", description: "", instructions: "", eligible: true };

const ManageCategories = () => {
  // TODO: GET/POST/PUT/DELETE /api/admin/categories
  const [categories, setCategories] = useState(WASTE_CATEGORIES);
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const edit = (c) => setForm({ ...c, instructions: c.instructions.join("\n") });

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return setError("Name and description are required.");
    const steps = form.instructions.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!steps.length) return setError("Add at least one sorting instruction (one per line).");

    const saved = { ...form, name: form.name.trim(), instructions: steps };
    setCategories((list) =>
      form.id ? list.map((c) => (c.id === form.id ? saved : c)) : [...list, { ...saved, id: `cat-${Date.now()}` }]
    );
    setForm(blank);
    setError("");
  };

  const remove = (id) => {
    if (window.confirm("Delete this category?")) setCategories((list) => list.filter((c) => c.id !== id));
  };

  const input = "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500";

  return (
    <>
      <PageHeader eyebrow="Administrator" title="Manage Waste Categories" />

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={save} noValidate className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="font-bold text-gray-900">{form.id ? "Edit category" : "Add category"}</h2>
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600" role="alert">{error}</p>}

          <div className="grid grid-cols-4 gap-3">
            <div>
              <label htmlFor="icon" className="mb-1 block text-xs font-medium text-gray-600">Icon</label>
              <input id="icon" name="icon" value={form.icon} onChange={onChange} className={input} />
            </div>
            <div className="col-span-3">
              <label htmlFor="name" className="mb-1 block text-xs font-medium text-gray-600">Name *</label>
              <input id="name" name="name" value={form.name} onChange={onChange} className={input} />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="mb-1 block text-xs font-medium text-gray-600">Description *</label>
            <textarea id="description" name="description" rows={2} value={form.description} onChange={onChange} className={input} />
          </div>
          <div>
            <label htmlFor="instructions" className="mb-1 block text-xs font-medium text-gray-600">Sorting instructions * (one per line)</label>
            <textarea id="instructions" name="instructions" rows={5} value={form.instructions} onChange={onChange} className={input} />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="eligible" checked={form.eligible} onChange={onChange} /> Eligible for pickup
          </label>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
              {form.id ? "Update" : "Add"}
            </button>
            {form.id && <button type="button" onClick={() => { setForm(blank); setError(""); }} className="rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700">Cancel</button>}
          </div>
        </form>

        <div className="space-y-3 lg:col-span-2">
          {categories.map((c) => (
            <div key={c.id} className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.description}</p>
                  <p className="mt-1 text-xs text-gray-400">{c.instructions.length} instructions · {c.eligible ? "Eligible for pickup" : "Not eligible"}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-3 text-sm font-semibold">
                <button onClick={() => edit(c)} className="text-green-700">Edit</button>
                <button onClick={() => remove(c.id)} className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
