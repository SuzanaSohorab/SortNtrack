import { useEffect, useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import { CONFIDENCE_THRESHOLD, MAX_IMAGE_MB, WASTE_CATEGORIES } from "../../data/mockData";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const WasteClassifier = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  // Free the object URL when it changes / on unmount
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    setResult(null);
    setConfirmed(null);
    if (!f) return;
    if (!ALLOWED.includes(f.type)) return setError("Unsupported file. Please upload a JPG, PNG or WEBP image.");
    if (f.size > MAX_IMAGE_MB * 1024 * 1024) return setError(`Image is too large. Maximum size is ${MAX_IMAGE_MB} MB.`);
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const classify = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      // TODO: POST the image (FormData) to /api/classify; the backend calls the AI
      // service (TBD-12). Result should arrive within ~10 s (NFR-P-02).
      await new Promise((r) => setTimeout(r, 1500));
      const pick = WASTE_CATEGORIES.filter((c) => c.eligible)[Math.floor(Math.random() * 6)];
      setResult({ category: pick, confidence: +(0.4 + Math.random() * 0.55).toFixed(2) });
    } catch {
      setError("Classification failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const uncertain = result && result.confidence < CONFIDENCE_THRESHOLD;
  const shown = confirmed || result?.category;

  return (
    <>
      <PageHeader
        eyebrow="AI Assistant"
        title="AI Waste Classifier"
        description="Upload or capture a photo of a waste item to get a predicted category."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <label htmlFor="image" className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-8 text-center hover:bg-green-100">
            {preview ? (
              <img src={preview} alt="Selected waste item preview" className="max-h-64 rounded-lg object-contain" />
            ) : (
              <>
                <span className="text-5xl">📷</span>
                <span className="mt-3 font-semibold text-green-800">Click to upload or take a photo</span>
                <span className="mt-1 text-xs text-gray-500">JPG, PNG or WEBP · max {MAX_IMAGE_MB} MB</span>
              </>
            )}
          </label>
          <input id="image" type="file" accept="image/*" capture="environment" onChange={onSelect} className="sr-only" />

          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600" role="alert">{error}</p>}

          <button onClick={classify} disabled={!file || loading}
            className="mt-5 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300">
            {loading ? "Analysing image…" : "Classify Waste"}
          </button>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-gray-900">Result</h2>

          {!result && <p className="mt-4 text-sm text-gray-400">Your prediction will appear here.</p>}

          {result && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4">
                <span className="text-4xl">{shown.icon}</span>
                <div>
                  <p className="text-lg font-bold text-gray-900">{shown.name}</p>
                  {confirmed ? (
                    <p className="text-xs text-green-700">Confirmed by you</p>
                  ) : (
                    <p className="text-xs text-gray-500">Confidence: {Math.round(result.confidence * 100)}%</p>
                  )}
                </div>
              </div>

              {uncertain && !confirmed && (
                <p className="rounded-xl bg-yellow-50 p-3 text-sm text-yellow-800">
                  ⚠️ The result is uncertain. Please choose the correct category below or consult the sorting guide.
                </p>
              )}

              <div>
                <label htmlFor="correct" className="mb-1 block text-sm font-medium text-gray-700">Not right? Choose the correct category</label>
                <select id="correct" value={confirmed?.id || ""}
                  onChange={(e) => setConfirmed(WASTE_CATEGORIES.find((c) => c.id === e.target.value) || null)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm">
                  <option value="">Keep AI prediction</option>
                  {WASTE_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">How to sort it</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                  {shown.instructions.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>

              {shown.eligible && (
                <Link to="/resident/request-pickup" className="inline-block rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800">
                  Request pickup for this
                </Link>
              )}
            </div>
          )}

          <p className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-400">
            AI predictions may be incorrect — please verify before sorting.
          </p>
        </div>
      </div>
    </>
  );
};

export default WasteClassifier;
