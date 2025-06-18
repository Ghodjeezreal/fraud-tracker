import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LiveMetricsChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Approved',
        data: [],
        borderColor: 'green',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Flagged',
        data: [],
        borderColor: 'red',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Blocked',
        data: [],
        borderColor: 'gray',
        fill: false,
        tension: 0.3,
      },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      fetch('https://tcscourierco.org/api/metrics.php')
        .then((res) => res.json())
        .then((data) => {
          const now = new Date().toLocaleTimeString();
          setChartData((prev) => {
            const next = { ...prev };
            next.labels = [...prev.labels, now].slice(-10);
            next.datasets[0].data = [...prev.datasets[0].data, data.approved].slice(-10);
            next.datasets[1].data = [...prev.datasets[1].data, data.flagged].slice(-10);
            next.datasets[2].data = [...prev.datasets[2].data, data.blocked].slice(-10);
            return next;
          });
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Live Transaction Chart</h2>
      <Line data={chartData} />
    </div>
  );
}
