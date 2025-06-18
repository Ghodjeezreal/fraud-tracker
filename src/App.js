import React from 'react';
import Sidebar from './components/Sidebar';
import MetricsCards from './components/MetricsCards';
import TransactionsTable from './components/TransactionsTable';
import LiveMetricsChart from './components/LiveMetricsChart'; // 👈 import the chart

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <MetricsCards />
        <LiveMetricsChart /> {/* 👈 add chart here */}
        <TransactionsTable />
      </main>
    </div>
  );
}

export default App;
