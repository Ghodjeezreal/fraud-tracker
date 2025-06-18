import React, { useEffect, useState } from 'react';

export default function MetricsCards() {
  const [metrics, setMetrics] = useState({
    total: 0,
    flagged: 0,
    blocked: 0,
    approved: 0,
  });

  useEffect(() => {
    fetch("https://tcscourierco.org/api/metrics.php")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error("Metrics fetch failed", err));
  }, []);

  const metricCards = [
    { label: "Total Transactions", value: metrics.total },
    { label: "Flagged", value: metrics.flagged, color: "text-red-500" },
    { label: "Blocked", value: metrics.blocked, color: "text-gray-600" },
    { label: "Approved", value: metrics.approved, color: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metricCards.map((m, i) => (
        <div key={i} className="p-4 bg-white rounded shadow text-center">
          <h3 className="text-sm text-gray-500">{m.label}</h3>
          <p className={`text-xl font-bold ${m.color || "text-black"}`}>{m.value}</p>
        </div>
      ))}
    </div>
  );
}
