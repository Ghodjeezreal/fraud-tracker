import React, { useEffect, useState } from 'react';

export default function MetricsCards() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://tcscourierco.org/api/metrics.php")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setError(false);
      })
      .catch((err) => {
        console.error("Metrics fetch failed", err);
        setError(true);
        setMetrics({ total: 0, flagged: 0, blocked: 0, approved: 0 });
        setTimeout(() => setError(false), 4000); // Auto-hide toast
      });
  }, []);

  const metricCards = metrics
    ? [
        { label: "Total Transactions", value: metrics.total },
        { label: "Flagged", value: metrics.flagged, color: "text-red-500" },
        { label: "Blocked", value: metrics.blocked, color: "text-gray-600" },
        { label: "Approved", value: metrics.approved, color: "text-green-500" },
      ]
    : Array(4).fill({});

  return (
    <div>
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded shadow animate-fade-in z-50">
          🔥 Failed to load metrics. Check your connection or API.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metricCards.map((m, i) => (
          <div key={i} className="p-4 bg-white rounded shadow text-center animate-fade-in">
            <h3 className="text-sm text-gray-500">
              {metrics ? m.label : (
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
              )}
            </h3>
            <p className={`text-xl font-bold mt-2 ${m.color || "text-black"}`}>
              {metrics ? m.value : (
                <div className="h-6 bg-gray-300 rounded animate-pulse w-1/2 mx-auto" />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
