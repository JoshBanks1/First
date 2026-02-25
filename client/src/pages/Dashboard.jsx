import { useEffect, useState } from 'react';
import api from '../api/http';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/user/dashboard').then((res) => setData(res.data));
  }, []);

  const card = (title, value) => <div className="rounded bg-white p-4 shadow"><p className="text-sm text-slate-500">{title}</p><p className="text-2xl font-bold">{value ?? 0}</p></div>;
  return <div><h1 className="mb-4 text-3xl font-bold">Dashboard</h1><div className="grid gap-4 md:grid-cols-3">{card('Current balance', data?.wallet?.balance)}{card('Total earned', data?.wallet?.totalEarned)}{card('Total withdrawn', data?.wallet?.totalWithdrawn)}{card('Pending earnings', data?.pendingEarnings)}{card('Referral count', data?.referralCount)}</div></div>;
}
