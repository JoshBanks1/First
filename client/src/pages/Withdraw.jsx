import { useState } from 'react';
import api from '../api/http';

export default function Withdraw() {
  const [form, setForm] = useState({ amount: '', bankName: '', accountNumber: '', accountName: '' });
  const [message, setMessage] = useState('');
  const submit = async (e) => { e.preventDefault(); const { data } = await api.post('/withdrawals', form); setMessage(data.message); };
  return <form onSubmit={submit} className="max-w-xl space-y-3 rounded bg-white p-6"><h1 className="text-2xl font-bold">Withdraw</h1><input className="w-full border p-2" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} /><input className="w-full border p-2" placeholder="Bank Name" onChange={(e) => setForm({ ...form, bankName: e.target.value })} /><input className="w-full border p-2" placeholder="Account Number" onChange={(e) => setForm({ ...form, accountNumber: e.target.value })} /><input className="w-full border p-2" placeholder="Account Name" onChange={(e) => setForm({ ...form, accountName: e.target.value })} /><button className="rounded bg-primary px-4 py-2 text-white">Request Withdrawal</button>{message && <p className="text-green-700">{message}</p>}</form>;
}
