import React from 'react';
import ReactDOM from 'react-dom/client';
import LiveMetricsChart from './components/LiveMetricsChart';

const rootElement = document.getElementById('chart-container');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<LiveMetricsChart />);
}
