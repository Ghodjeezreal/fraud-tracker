import React from 'react';

export default function MetricsCards() {
  const metrics = [
    { label: "Total Transactions", value: 1540 },
    { label: "Flagged", value: 23, color: "text-red-500" },
    { label: "Blocked", value: 7, color: "text-gray-600" },
    { label: "Approved", value: 1510, color: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((m, i) => (
        <div key={i} className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-sm text-gray-500">{m.label}</h3>
          <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
        </div>
      ))}
    </div>
  );
}