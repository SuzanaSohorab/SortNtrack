const StatCard = ({ label, value, icon, color = "bg-green-50 text-green-700" }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${color}`}>
      {icon}
    </div>
    <p className="mt-5 text-sm text-gray-500">{label}</p>
    <h2 className="mt-1 text-3xl font-bold text-gray-900">{value}</h2>
  </div>
);

export default StatCard;
