import { Link } from 'react-router-dom';

const faqs = [
  'How do I earn? Complete advertiser-funded tasks.',
  'When are withdrawals processed? Weekly after review.',
  'Do I deposit money? No, earnings are task-based only.'
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-5 text-5xl font-bold text-primary">Complete Tasks. Earn Rewards. Powered by Real Brands.</h1>
        <p className="mb-8 max-w-2xl text-lg">StripeCore helps users complete verified brand tasks and earn secure wallet rewards.</p>
        <div className="flex gap-3">
          <Link to="/register" className="rounded bg-primary px-5 py-3 text-white">Create Account</Link>
          <Link to="/login" className="rounded border border-primary px-5 py-3 text-primary">Login</Link>
          <a href="#how" className="rounded border px-5 py-3">How It Works</a>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="mb-4 text-2xl font-semibold">How It Works</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Sign up</li><li>Complete advertiser tasks</li><li>Earn rewards</li><li>Withdraw weekly</li>
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-8 md:grid-cols-3">
        {['Anti-fraud monitoring', 'Verified advertisers', 'Secure wallet controls'].map((item) => (
          <div key={item} className="rounded bg-white p-5 shadow-sm">{item}</div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="mb-3 text-2xl font-semibold">FAQ</h2>
        <div className="space-y-2">{faqs.map((faq) => <p key={faq} className="rounded bg-white p-3">{faq}</p>)}</div>
      </section>

      <footer className="mt-8 bg-white p-6">
        <div className="mx-auto flex max-w-6xl justify-between text-sm">
          <div className="space-x-4"><Link to="/terms">Terms</Link><Link to="/privacy">Privacy Policy</Link><a href="mailto:support@stripecore.com">Contact</a></div>
          <p>support@stripecore.com</p>
        </div>
      </footer>
    </div>
  );
}
