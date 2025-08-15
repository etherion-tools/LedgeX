export default function TransactionTable() {
  return (
    <div className="w-full my-2 max-w-4xl mx-auto">
      <table className="w-full table-fixed border border-gray-200 rounded-lg bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
              Date
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
              Description
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
              Amount
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 w-1/4">
              Category
            </th>
          </tr>
        </thead>
        <TableBody />
        <TableBody />
      </table>
    </div>
  );
}

// Component for a placeholder row
function TableBody() {
  return (
    <tbody>
      <tr>
        <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">-</td>
        <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">-</td>
        <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">-</td>
        <td className="px-4 py-2 border-t border-gray-200 text-gray-500 text-center">-</td>
      </tr>
    </tbody>
  );
}
