import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-primary">StripeCore</Link>
          <div className="space-x-4">
            <Link to="/login" className="rounded bg-primary px-4 py-2 text-white">Login</Link>
            <Link to="/register" className="rounded border border-primary px-4 py-2 text-primary">Create Account</Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
