// src/components/LiveMetricsChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,          // ← not strictly needed, but handy if you move to time-series
} from 'chart.js';

// 🔐 **MUST** register every element you use when you’re on chart.js v4+
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

export default function LiveMetricsChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Approved',
        data: [],
        borderColor: 'rgba(34,197,94,0.9)',   // Tailwind green-500
        backgroundColor: 'rgba(34,197,94,0.2)',
        tension: 0.3,
      },
      {
        label: 'Flagged',
        data: [],
        borderColor: 'rgba(234,179,8,0.9)',   // yellow-500
        backgroundColor: 'rgba(234,179,8,0.2)',
        tension: 0.3,
      },
      {
        label: 'Blocked',
        data: [],
        borderColor: 'rgba(239,68,68,0.9)',   // red-500
        backgroundColor: 'rgba(239,68,68,0.2)',
        tension: 0.3,
      },
    ],
  });

  /** Poll the backend every 10 s and push the latest metrics */
  useEffect(() => {
    const fetchMetrics = () => {
      fetch('https://tcscourierco.org/api/metrics.php')
        .then((res) => res.json())
        .then((data) => {
          const now = new Date().toLocaleTimeString();
          setChartData((prev) => ({
            ...prev,
            labels: [...prev.labels, now].slice(-10),
            datasets: prev.datasets.map((ds, i) => ({
              ...ds,
              data: [
                ...ds.data,
                i === 0 ? data.approved : i === 1 ? data.flagged : data.blocked,
              ].slice(-10),
            })),
          }));
        })
        .catch((err) => console.error('Chart fetch error', err));
    };

    fetchMetrics();                     // first call
    const id = setInterval(fetchMetrics, 10_000);
    return () => clearInterval(id);     // cleanup
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h2 className="text-lg font-semibold mb-4">Live Transaction Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
