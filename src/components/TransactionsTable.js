import React, { useEffect, useState } from 'react';

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("https://tcscourierco.org/api/transactions.php")
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error("Error fetching transactions:", err));
  }, []);

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
        {transactions.map((row, i) => (
          <tr key={i} className="border-t">
            <td className="p-3">{new Date(row.timestamp).toLocaleString()}</td>
            <td className="p-3">{row.user_id}</td>
            <td className="p-3">${row.amount}</td>
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
