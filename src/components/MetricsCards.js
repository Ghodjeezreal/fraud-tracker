import React, { useEffect, useState } from 'react';

export default function MetricsCards() {
  const [metrics, setMetrics] = useState(null); // null = not yet loaded

  useEffect(() => {
    fetch("https://tcscourierco.org/api/metrics.php")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => {
        console.error("Metrics fetch failed", err);
        setMetrics({ total: 0, flagged: 0, blocked: 0, approved: 0 });
      });
  }, []);

  const metricCards = metrics
    ? [
        { label: "Total Transactions", value: metrics.total },
        { label: "Flagged", value: metrics.flagged, color: "text-red-500" },
        { label: "Blocked", value: metrics.blocked, color: "text-gray-600" },
        { label: "Approved", value: metrics.approved, color: "text-green-500" },
      ]
    : Array(4).fill({}); // loading state placeholder

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metricCards.map((m, i) => (
        <div key={i} className="p-4 bg-white rounded shadow text-center animate-fade-in">
          <h3 className="text-sm text-gray-500">
            {metrics ? m.label : <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />}
          </h3>
          <p
            className={`text-xl font-bold mt-2 ${
              m.color || "text-black"
            }`}
          >
            {metrics ? m.value : <div className="h-6 bg-gray-300 rounded animate-pulse w-1/2 mx-auto" />}
          </p>
        </div>
      ))}
    </div>
  );
}
