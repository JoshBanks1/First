import { useEffect, useState } from 'react';
import api from '../api/http';

export default function Referrals() {
  const [data, setData] = useState({ referralLink: '', totalReferrals: 0 });
  useEffect(() => { api.get('/user/referrals').then((res) => setData(res.data)); }, []);
  return <div className="rounded bg-white p-6"><h1 className="mb-3 text-2xl font-bold">Referrals</h1><p>{data.referralLink}</p><p className="my-3">Total: {data.totalReferrals}</p><button onClick={() => navigator.clipboard.writeText(data.referralLink)} className="rounded bg-accent px-4 py-2 text-white">Copy Referral Link</button></div>;
}
