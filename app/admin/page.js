'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

const STATUS_COLORS = {
  pending: 'bg-yellow-500/15 text-yellow-400',
  confirmed: 'bg-blue-500/15 text-blue-400',
  shipped: 'bg-purple-500/15 text-purple-400',
  delivered: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); });
  }, []);

  const statCards = stats ? [
    { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'bg-blue-500/10 border-blue-500/20', textColor: 'text-blue-400', link: '/admin/products' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '🛒', color: 'bg-purple-500/10 border-purple-500/20', textColor: 'text-purple-400', link: '/admin/orders' },
    { label: 'Total Revenue', value: `₦${stats.revenue.toLocaleString()}`, icon: '💰', color: 'bg-[#c9a84c]/10 border-[#c9a84c]/20', textColor: 'text-[#c9a84c]', link: '/admin/orders' },
    { label: 'Pending Orders', value: stats.pending, icon: '⏳', color: 'bg-orange-500/10 border-orange-500/20', textColor: 'text-orange-400', link: '/admin/orders' },
  ] : [];

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-[#555] text-sm mt-1">Welcome back, Admin</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products/new"
              className="gold-btn px-5 py-2.5 rounded-xl text-[#1a1a1a] text-sm font-semibold">
              + Add Product
            </Link>
            <a href="/api/seed"
              className="border border-[#2a2a2a] text-[#888] px-5 py-2.5 rounded-xl text-sm hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
              Seed DB
            </a>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map(card => (
                <Link key={card.label} href={card.link}
                  className={`${card.color} border rounded-2xl p-5 hover:scale-[1.02] transition-transform`}>
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <div className={`text-2xl font-bold ${card.textColor}`}>{card.value}</div>
                  <div className="text-[#555] text-xs mt-1 font-medium">{card.label}</div>
                </Link>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
                <h2 className="text-white font-semibold">Recent Orders</h2>
                <Link href="/admin/orders" className="text-[#c9a84c] text-sm hover:underline">View all →</Link>
              </div>
              {stats.recentOrders.length === 0 ? (
                <div className="py-12 text-center text-[#444] text-sm">No orders yet</div>
              ) : (
                <div className="divide-y divide-[#1e1e1e]">
                  {stats.recentOrders.map(order => (
                    <div key={order._id} className="flex items-center justify-between px-6 py-4 hover:bg-[#161616] transition-colors">
                      <div>
                        <p className="text-white text-sm font-medium">{order.customer?.name || 'Unknown'}</p>
                        <p className="text-[#555] text-xs mt-0.5">
                          {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''} · {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#c9a84c] font-semibold text-sm">₦{order.total?.toLocaleString()}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] || STATUS_COLORS.pending}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
