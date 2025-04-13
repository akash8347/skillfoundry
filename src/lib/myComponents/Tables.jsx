export default function Table({ columns, data }) {
    return (
      <div className="overflow-x-auto my-6 rounded-lg shadow border border-gray-300">
        <table className="min-w-full border-collapse table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-gray-800 dark:text-gray-200"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="even:bg-white odd:bg-gray-50 dark:even:bg-gray-900 dark:odd:bg-gray-800">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  