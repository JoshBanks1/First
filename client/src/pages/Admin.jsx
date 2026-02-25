import { useEffect, useState } from 'react';
import api from '../api/http';

export default function Admin() {
  const [overview, setOverview] = useState(null);
  useEffect(() => { api.get('/admin/overview').then((res) => setOverview(res.data)).catch(() => setOverview({ error: true })); }, []);

  const action = async (id, type) => {
    await api.patch(`/withdrawals/${id}/${type}`);
    const { data } = await api.get('/admin/overview');
    setOverview(data);
  };

  if (!overview) return <p>Loading...</p>;
  if (overview.error) return <p>Admin access required.</p>;

  return <div><h1 className="mb-4 text-3xl font-bold">Admin Panel</h1><div className="mb-6 rounded bg-white p-4"><p>Users: {overview.users.length}</p><p>Transactions: {overview.transactions.length}</p><p>Fraud logs: {overview.fraudLogs.length}</p></div><h2 className="mb-2 text-xl font-semibold">Pending Withdrawals</h2><div className="space-y-2">{overview.pendingWithdrawals.map((w) => <div key={w.id} className="flex items-center justify-between rounded bg-white p-3"><span>User #{w.userId} - {w.amount}</span><div className="space-x-2"><button onClick={() => action(w.id, 'approve')} className="rounded bg-green-600 px-3 py-1 text-white">Approve</button><button onClick={() => action(w.id, 'reject')} className="rounded bg-red-600 px-3 py-1 text-white">Reject</button></div></div>)}</div></div>;
}
