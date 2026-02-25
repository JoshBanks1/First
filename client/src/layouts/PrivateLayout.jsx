import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const nav = ['dashboard', 'tasks', 'wallet', 'referrals', 'withdraw', 'settings', 'admin'];

export default function PrivateLayout() {
  const { logout } = useAuth();
  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-slate-100">
      <aside className="bg-primary p-5 text-white">
        <h2 className="mb-6 text-2xl font-bold">StripeCore</h2>
        <nav className="space-y-2">
          {nav.map((item) => (
            <Link key={item} to={`/${item}`} className="block rounded px-3 py-2 capitalize hover:bg-blue-800">{item}</Link>
          ))}
          <button type="button" onClick={logout} className="mt-4 w-full rounded bg-accent px-3 py-2">Logout</button>
        </nav>
      </aside>
      <main className="p-6"><Outlet /></main>
    </div>
  );
}
