import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/http';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', username: '', recaptchaToken: 'placeholder-token', referralCode: '' });
  const [error, setError] = useState('');
  const [params] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const referralCode = form.referralCode || params.get('ref') || '';
      const { data } = await api.post('/auth/register', { ...form, referralCode });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return <form onSubmit={submit} className="mx-auto mt-16 max-w-md space-y-4 rounded bg-white p-6 shadow"><h1 className="text-2xl font-bold">Create Account</h1><input className="w-full border p-2" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} /><input className="w-full border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><input type="password" className="w-full border p-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><input className="w-full border p-2" placeholder="Referral code (optional)" onChange={(e) => setForm({ ...form, referralCode: e.target.value })} />{error && <p className="text-red-600">{error}</p>}<button className="w-full rounded bg-primary p-2 text-white">Create Account</button></form>;
}
