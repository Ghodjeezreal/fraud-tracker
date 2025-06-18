import React from 'react';

const sampleData = [
  { time: "12:34 PM", user: "U001", amount: "$1,200", status: "Flagged" },
  { time: "12:36 PM", user: "U057", amount: "$5,800", status: "Blocked" },
  { time: "12:37 PM", user: "U018", amount: "$150", status: "Approved" },
];

export default function TransactionsTable() {
  return (
    <table className="w-full bg-white rounded shadow text-sm">
      <thead>
        <tr className="text-left text-gray-600 border-b">
          <th className="p-3">Time</th>
          <th className="p-3">User</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {sampleData.map((row, i) => (
          <tr key={i} className="border-t">
            <td className="p-3">{row.time}</td>
            <td className="p-3">{row.user}</td>
            <td className="p-3">{row.amount}</td>
            <td className="p-3">
              <span className={`px-2 py-1 rounded text-white text-xs ${
                row.status === "Flagged" ? "bg-red-500" :
                row.status === "Blocked" ? "bg-gray-600" : "bg-green-500"
              }`}>
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}