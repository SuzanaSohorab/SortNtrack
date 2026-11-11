import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { WASTE_CATEGORIES } from "../../data/mockData";

const SortingGuide = () => {
  // TODO: GET /api/categories
  const [selectedId, setSelectedId] = useState(WASTE_CATEGORIES[0].id);
  const selected = WASTE_CATEGORIES.find((c) => c.id === selectedId);

  return (
    <>
      <PageHeader
        eyebrow="Learn"
        title="Waste Sorting Guide"
        description="Select a category to see how to separate and prepare it."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {WASTE_CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setSelectedId(c.id)} aria-pressed={c.id === selectedId}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                c.id === selectedId ? "border-green-600 bg-green-50" : "border-gray-100 bg-white hover:border-green-300"
              }`}>
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm font-semibold text-gray-800">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{selected.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
              <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${selected.eligible ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                {selected.eligible ? "Eligible for pickup" : "Not collected by this service"}
              </span>
            </div>
          </div>

          <p className="mt-5 text-gray-600">{selected.description}</p>

          <h3 className="mt-6 font-bold text-gray-900">Sorting instructions</h3>
          <ol className="mt-3 space-y-3">
            {selected.instructions.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default SortingGuide;
