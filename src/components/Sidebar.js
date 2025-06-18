import React from 'react';

export default function Sidebar() {
  return (
    <div className="bg-slate-800 text-white h-screen w-64 p-6">
      <h2 className="text-xl font-bold mb-6">🚨 FRAUD DASHBOARD</h2>
      <nav className="space-y-4">
        <a href="#" className="block hover:text-accent">Transactions</a>
        <a href="#" className="block">Flagged Only</a>
        <a href="#" className="block">Blocked</a>
        <a href="#" className="block">Rules Engine</a>
        <a href="#" className="block">Settings</a>
      </nav>
    </div>
  );
}