import { STATUS_STYLES } from "../data/mockData";

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
