// columns: [{ key, label, render?: (row) => node }]
const DataTable = ({ columns, rows, empty = "No records found." }) => (
  <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead className="bg-gray-50 text-gray-500">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="p-4 font-semibold">{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="p-8 text-center text-gray-400">{empty}</td>
          </tr>
        ) : (
          rows.map((row, i) => (
            <tr key={row.id ?? i} className="border-t border-gray-100">
              {columns.map((col) => (
                <td key={col.key} className="p-4">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;
