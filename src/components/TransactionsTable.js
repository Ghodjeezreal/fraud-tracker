/* src/components/TransactionsTable.js */
import React, { useEffect, useState } from 'react';

import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const STATUS_STYLES = {
  approved: {
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircleIcon className="w-4 h-4" />,
  },
  flagged: {
    color: 'bg-yellow-100 text-yellow-800',
    icon: <ExclamationTriangleIcon className="w-4 h-4" />,
  },
  blocked: {
    color: 'bg-red-100 text-red-700',
    icon: <XCircleIcon className="w-4 h-4" />,
  },
};


export default function TransactionsTable() {
  const [rows, setRows]     = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError]   = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://tcscourierco.org/api/transactions.php')
        .then(res => res.json())
        .then(data => {
          setRows(data || []);
          setError(false);
        })
        .catch(err => {
          console.error('Error fetching transactions:', err);
          setError(true);
        });
    };

    fetchData();
    const id = setInterval(fetchData, 10000);
    return () => clearInterval(id);
  }, []);

  const displayed = rows.filter(r =>
    filter === 'all' ? true : r.status === filter
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All statuses</option>
          <option value="approved">Approved</option>
          <option value="flagged">Flagged</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-700 p-2 text-sm">
          🔴 Unable to load transactions — please try again later.
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-3">Time</th>
              <th className="p-3">User</th>
              <th className="p-3">Amount ($)</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayed.slice(0, 10).map(txn => {
              const key = txn.status?.toLowerCase().trim();
              const style = STATUS_STYLES[key] || {
                color: 'bg-gray-200 text-gray-700',
                icon: '❓',
              };
              return (
                <tr key={txn.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">
                    {new Date(txn.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3">{txn.recipient || '—'}</td>
                  <td className="p-3">{Number(txn.amount).toLocaleString()}</td>
                  <td className="p-3">
  {(() => {
    const key = txn.status?.toLowerCase().trim();
    const { color, icon } = STATUS_STYLES[key] || {
      color: 'bg-gray-200 text-gray-700',
      icon: <span className="w-4 h-4">?</span>,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium capitalize ${color}`}>
        {icon}
        {txn.status}
      </span>
    );
  })()}
</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
