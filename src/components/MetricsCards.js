import React, { useEffect, useState } from 'react';

function useCountUp(to, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const value = Math.min(Math.round((progress / duration) * to), to);
      setCount(value);
      if (progress < duration) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [to, duration]);

  return count;
}

export default function MetricsCards() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    let interval;

    const fetchMetrics = (isInitial = false) => {
      if (isInitial) setIsLoading(true);
      fetch("https://tcscourierco.org/api/metrics.php")
        .then((res) => res.json())
        .then((data) => {
          setMetrics(data);
          setError(false);
          setIsLoading(false);
          setHasLoadedOnce(true);
        })
        .catch((err) => {
          console.error("Metrics fetch failed", err);
          if (!hasLoadedOnce) setError(true);
          setIsLoading(false);
          setMetrics({ total: 0, flagged: 0, blocked: 0, approved: 0 });
          setTimeout(() => setError(false), 4000);
        });
    };

    fetchMetrics(true);
    interval = setInterval(() => fetchMetrics(false), 10000);

    return () => clearInterval(interval);
  }, [hasLoadedOnce]);

  // 🧠 FIX: Move hooks outside of array
  const total = useCountUp(metrics?.total || 0);
  const flagged = useCountUp(metrics?.flagged || 0);
  const blocked = useCountUp(metrics?.blocked || 0);
  const approved = useCountUp(metrics?.approved || 0);

  const metricCards = metrics
    ? [
        { label: "Total Transactions", value: total, color: "text-blue-600" },
        { label: "Flagged", value: flagged, color: "text-red-500" },
        { label: "Blocked", value: blocked, color: "text-gray-600" },
        { label: "Approved", value: approved, color: "text-green-500" },
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
              {!isLoading ? m.label : (
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
              )}
            </h3>
            <p className={`text-xl font-bold mt-2 ${m.color || "text-black"}`}>
              {!isLoading ? m.value : (
                <div className="h-6 bg-gray-300 rounded animate-pulse w-1/2 mx-auto" />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
