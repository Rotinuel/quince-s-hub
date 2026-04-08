'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  { href: '/admin/orders', label: 'Orders', icon: '🛒' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <aside className="w-60 bg-[#111] min-h-screen flex flex-col border-r border-[#1e1e1e]">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#1e1e1e]">
        <Link href="/admin">
          <span className="font-display text-2xl font-bold text-white">
            Bazzan<span className="text-[#c9a84c]">.</span>
          </span>
        </Link>
        <p className="text-[#555] text-[10px] tracking-widest uppercase mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#c9a84c] text-[#1a1a1a]'
                  : 'text-[#888] hover:text-white hover:bg-[#1e1e1e]'
              }`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[#1e1e1e] space-y-1">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#888] hover:text-white hover:bg-[#1e1e1e] transition-all">
          <span>🌐</span><span>View Site</span>
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#888] hover:text-red-400 hover:bg-[#1e1e1e] transition-all">
          <span>🚪</span><span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
