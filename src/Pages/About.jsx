const objectives = [
  "Help residents identify common waste categories using image-based AI classification.",
  "Provide sorting instructions so residents can separate waste appropriately.",
  "Allow residents to request pickup of eligible recyclable or scrap materials.",
  "Support area-wise collector assignment and collection management.",
  "Provide request status, collector location and estimated arrival time through live tracking.",
  "Explore a connection between industries and local scrap businesses.",
];

const About = () => (
  <div className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
    <p className="font-semibold text-green-700">About SortNTrack</p>
    <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
      Making waste segregation simple and recycling transparent
    </h1>
    <p className="mt-5 leading-8 text-gray-600">
      Many people in Bangladesh are not familiar with waste segregation or why it matters.
      Residents often struggle to identify recyclable materials, separate waste categories,
      and understand what happens after they request a collection. SortNTrack brings
      classification, sorting guidance, pickup requests and live tracking into one web platform.
    </p>

    <h2 className="mt-10 text-xl font-bold text-gray-900">Main Objectives</h2>
    <ul className="mt-4 space-y-3">
      {objectives.map((o) => (
        <li key={o} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 text-gray-700 shadow-sm">
          <span className="text-green-600">✔</span>
          {o}
        </li>
      ))}
    </ul>

    <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm leading-7 text-yellow-800">
      <strong>Please note:</strong> AI classifications are predictions and may be incorrect.
      Estimated arrival times are estimates, not guarantees. Service area and eligible
      materials are being confirmed with local stakeholders.
    </div>
  </div>
);

export default About;
