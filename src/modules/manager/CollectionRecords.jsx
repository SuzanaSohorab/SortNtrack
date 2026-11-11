import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { RECORDS } from "../../data/mockData";

const CollectionRecords = () => (
  // TODO: GET /api/records
  <>
    <PageHeader eyebrow="Collection Manager" title="Collection Records" description="Completed collections and their dispatch status." />
    <DataTable
      rows={RECORDS}
      columns={[
        { key: "id", label: "Record", render: (r) => <span className="font-semibold">{r.id}</span> },
        { key: "requestId", label: "Request" },
        { key: "collector", label: "Collector" },
        { key: "collectionTime", label: "Collected At" },
        { key: "dispatchStatus", label: "Dispatch", render: (r) => <StatusBadge status={r.dispatchStatus === "Dispatched" ? "Dispatched" : "Pending"} /> },
        { key: "remarks", label: "Remarks" },
      ]}
    />
  </>
);

export default CollectionRecords;
