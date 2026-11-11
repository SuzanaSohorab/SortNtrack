import { useEffect } from "react";
import { Link, useLocation } from "react-router";

const steps = [
  { n: "1", title: "Snap & Identify", text: "Upload a photo of your waste and let AI suggest its category." },
  { n: "2", title: "Sort Correctly", text: "Follow simple, category-specific instructions to separate waste." },
  { n: "3", title: "Request Pickup", text: "Submit a pickup request for eligible recyclable or scrap items." },
  { n: "4", title: "Track Live", text: "Follow the collector on a map with an estimated arrival time." },
];

const features = [
  { icon: "🤖", title: "AI Waste Classification", text: "Image-based predictions with a clear note that results may need your verification." },
  { icon: "📖", title: "Sorting Guide", text: "Easy handling instructions for plastic, paper, glass, metal, e-waste and more." },
  { icon: "🚛", title: "Pickup Requests", text: "Request collection of recyclables from your address within the service area." },
  { icon: "📍", title: "Live Tracking", text: "See request status, collector location and ETA until collection is confirmed." },
  { icon: "🧑‍🔧", title: "Collector Management", text: "Managers assign collectors by area and monitor every collection record." },
  { icon: "🤝", title: "Industry & Scrap Deals", text: "A proposed marketplace linking industries with local scrap businesses." },
];

const Home = () => {
  const { hash } = useLocation();

  // Scroll to #how-it-works / #features when arriving from the navbar
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [hash]);

  return (
    <>
      <section id="home" className="bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-700">
              ♻ Smarter waste sorting for Bangladesh
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              Sort smarter. <span className="text-green-600">Track every pickup.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
              SortNTrack helps you identify recyclable waste, learn how to separate it, and
              request collection — with live visibility until it is picked up.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-sm hover:bg-green-700">
                Get Started
              </Link>
              <Link to="/#how-it-works" className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 hover:border-green-600 hover:text-green-700">
                How It Works
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[["🧴", "Plastic"], ["📦", "Paper"], ["🍾", "Glass"], ["🔌", "E-waste"]].map(([icon, name]) => (
              <div key={name} className="rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
                <div className="text-5xl">{icon}</div>
                <p className="mt-3 font-semibold text-gray-800">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white">{s.n}</div>
                <h3 className="mt-4 font-bold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">Features</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-4 font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-700 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to start sorting?</h2>
        <p className="mx-auto mt-3 max-w-xl text-green-100">Create a free resident account and make your first pickup request.</p>
        <Link to="/register" className="mt-6 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-green-700 hover:bg-green-50">
          Create Account
        </Link>
      </section>
    </>
  );
};

export default Home;
