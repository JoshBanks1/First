import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/http';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return <form onSubmit={submit} className="mx-auto mt-16 max-w-md space-y-4 rounded bg-white p-6 shadow"><h1 className="text-2xl font-bold">Login</h1><input className="w-full border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><input type="password" className="w-full border p-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />{error && <p className="text-red-600">{error}</p>}<button className="w-full rounded bg-primary p-2 text-white">Login</button></form>;
}
