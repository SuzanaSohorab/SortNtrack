
import { Link } from "react-router";

const stats = [
  { label: "Total Requests", value: "12", icon: "📋", color: "bg-blue-50 text-blue-700" },
  { label: "Pending Requests", value: "03", icon: "⏳", color: "bg-yellow-50 text-yellow-700" },
  { label: "Completed Pickups", value: "08", icon: "♻️", color: "bg-green-50 text-green-700" },
  { label: "Active Pickup", value: "01", icon: "🚛", color: "bg-purple-50 text-purple-700" },
];

const actions = [
  { title: "AI Waste Classifier", desc: "Identify waste using an image.", icon: "🤖", link: "/resident/classifier" },
  { title: "Waste Sorting Guide", desc: "Learn how to separate waste.", icon: "📖", link: "/resident/sorting-guide" },
  { title: "Request Pickup", desc: "Schedule recyclable waste collection.", icon: "🚛", link: "/resident/request-pickup" },
  { title: "Track Pickup", desc: "Follow your collection request.", icon: "📍", link: "/resident/my-requests" },
];

const requests = [
  { id: "ST-1001", category: "Plastic Bottles", date: "02 Nov 2026", status: "Completed" },
  { id: "ST-1002", category: "Paper & Cardboard", date: "03 Nov 2026", status: "In Progress" },
  { id: "ST-1003", category: "Electronic Waste", date: "04 Nov 2026", status: "Pending" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-semibold text-green-700">Resident Portal</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Welcome to SortNTrack 👋</h1>
          <p className="mt-2 text-gray-500">Manage your waste collection and recycling activities.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.color}`}>
                {item.icon}
              </div>
              <p className="mt-5 text-sm text-gray-500">{item.label}</p>
              <h2 className="mt-1 text-3xl font-bold text-gray-900">{item.value}</h2>
            </div>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((item) => (
              <Link key={item.title} to={item.link}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-4 font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{item.desc}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-green-700">Open page →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-green-100 bg-green-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-green-700">Active Pickup</p>
              <h2 className="mt-2 text-xl font-bold text-gray-900">Request ST-1002</h2>
              <p className="mt-1 text-sm text-gray-600">Paper & Cardboard · In Progress</p>
            </div>
            <Link to="/resident/track-pickup/ST-1002"
              className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">
              Track Pickup
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Requests</h2>
            <Link to="/resident/my-requests" className="text-sm font-semibold text-green-700">View all</Link>
          </div>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-100 bg-white">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="p-4">Request ID</th>
                  <th className="p-4">Waste Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-t border-gray-100">
                    <td className="p-4 font-semibold">{request.id}</td>
                    <td className="p-4">{request.category}</td>
                    <td className="p-4">{request.date}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        request.status === "Completed" ? "bg-green-100 text-green-700" :
                        request.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>{request.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
