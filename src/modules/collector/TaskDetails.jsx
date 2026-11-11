import { Link, useParams } from "react-router";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS } from "../../data/mockData";

const ACTIVE = ["Assigned", "InProgress", "Collected", "Dispatched"];

const TaskDetails = () => {
  const { id } = useParams();
  const task = REQUESTS.find((r) => r.id === id);

  if (!task) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-500">Task not found.</p>
        <Link to="/collector/my-tasks" className="mt-4 inline-block font-semibold text-green-700">← Back to tasks</Link>
      </div>
    );
  }

  const rows = [
    ["Collection ID", task.id],
    ["Resident", task.resident],
    ["Category", task.category],
    ["Quantity", task.quantity],
    ["Area", task.area],
    ["Address", task.address],
    ["Request date", task.date],
  ];

  return (
    <>
      <PageHeader eyebrow="Task Details" title={`Task ${task.id}`} action={<StatusBadge status={task.status} />} />

      <div className="max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <dl className="divide-y divide-gray-100 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3">
              <dt className="text-gray-500">{k}</dt>
              <dd className="text-right font-medium text-gray-900">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {ACTIVE.includes(task.status) && (
            <Link to={`/collector/update-status/${task.id}`} className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
              Update Collection Status
            </Link>
          )}
          <Link to="/collector/my-tasks" className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700">Back</Link>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
