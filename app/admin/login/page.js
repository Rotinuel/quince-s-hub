'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 70% 60%, #c9a84c 0%, transparent 50%)' }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-4xl font-bold text-white">
            Quinces Hub<span className="text-[#c9a84c]">.</span>
          </span>
          <p className="text-[#666] text-sm mt-2 tracking-widest uppercase">Admin Panel</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-8 shadow-2xl">
          <h1 className="text-white font-semibold text-xl mb-6">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[#888] uppercase tracking-widest font-medium block mb-1.5">Username</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="admin"
                className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#c9a84c] transition-colors placeholder-[#444]"
              />
            </div>
            <div>
              <label className="text-xs text-[#888] uppercase tracking-widest font-medium block mb-1.5">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#c9a84c] transition-colors placeholder-[#444]"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2.5 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all mt-2 ${
                loading ? 'bg-[#333] text-[#666] cursor-not-allowed' : 'gold-btn text-[#1a1a1a]'
              }`}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-[#444] text-xs text-center mt-6">
            Default: admin / quinces2024
          </p>
        </div>
      </div>
    </div>
  );
}
