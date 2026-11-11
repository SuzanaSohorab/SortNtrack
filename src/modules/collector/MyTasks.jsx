import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { REQUESTS } from "../../data/mockData";

const MY_COLLECTOR_ID = "c1"; // TODO: take from the authenticated user

const MyTasks = () => {
  // Collectors can only see tasks assigned to them (NFR-SEC-06).
  // TODO: GET /api/collector/tasks
  const tasks = REQUESTS.filter((r) => r.collectorId === MY_COLLECTOR_ID);

  return (
    <>
      <PageHeader eyebrow="Collector Portal" title="My Tasks" />
      <DataTable
        rows={tasks}
        columns={[
          { key: "id", label: "Task", render: (r) => <span className="font-semibold">{r.id}</span> },
          { key: "category", label: "Category" },
          { key: "quantity", label: "Quantity" },
          { key: "address", label: "Address" },
          { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
          { key: "a", label: "", render: (r) => <Link to={`/collector/task/${r.id}`} className="font-semibold text-green-700">Details →</Link> },
        ]}
      />
    </>
  );
};

export default MyTasks;
