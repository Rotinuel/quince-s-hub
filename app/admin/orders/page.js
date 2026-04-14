// 'use client';
// import { useEffect, useState } from 'react';
// import AdminSidebar from '@/components/AdminSidebar';

// const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

// const STATUS_STYLES = {
//   pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
//   confirmed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
//   shipped:   'bg-purple-500/15 text-purple-400 border-purple-500/30',
//   delivered: 'bg-green-500/15 text-green-400 border-green-500/30',
//   cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
// };

// const STATUS_NEXT = {
//   pending: 'confirmed',
//   confirmed: 'shipped',
//   shipped: 'delivered',
// };

// function OrderRow({ order, onStatusChange, onDelete }) {
//   const [expanded, setExpanded] = useState(false);
//   const [updating, setUpdating] = useState(false);

//   async function updateStatus(status) {
//     setUpdating(true);
//     await onStatusChange(order._id, status);
//     setUpdating(false);
//   }

//   const nextStatus = STATUS_NEXT[order.status];

//   return (
//     <>
//       <div
//         className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-4 hover:bg-[#161616] transition-colors cursor-pointer"
//         onClick={() => setExpanded(e => !e)}
//       >
//         {/* Customer */}
//         <div>
//           <p className="text-white text-sm font-medium">{order.customer?.name || 'Unknown'}</p>
//           <p className="text-[#555] text-xs mt-0.5">
//             {order.customer?.phone} · {new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
//           </p>
//         </div>

//         {/* Items */}
//         <span className="text-[#888] text-xs text-right whitespace-nowrap">
//           {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
//         </span>

//         {/* Total */}
//         <span className="text-[#c9a84c] font-semibold text-sm whitespace-nowrap">
//           ₦{order.total?.toLocaleString()}
//         </span>

//         {/* Status badge */}
//         <span className={`text-xs px-3 py-1 rounded-full font-medium border ${STATUS_STYLES[order.status] || STATUS_STYLES.pending} whitespace-nowrap`}>
//           {order.status}
//         </span>

//         {/* Actions */}
//         <div className="flex gap-2" onClick={e => e.stopPropagation()}>
//           {nextStatus && (
//             <button
//               onClick={() => updateStatus(nextStatus)}
//               disabled={updating}
//               className="text-xs px-3 py-1.5 bg-[#1e1e1e] text-[#888] rounded-lg hover:text-white hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 whitespace-nowrap capitalize"
//             >
//               {updating ? '…' : `→ ${nextStatus}`}
//             </button>
//           )}
//           {order.status !== 'cancelled' && order.status !== 'delivered' && (
//             <button
//               onClick={() => updateStatus('cancelled')}
//               disabled={updating}
//               className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           )}
//           <button
//             onClick={() => onDelete(order._id)}
//             className="text-xs px-3 py-1.5 bg-[#1e1e1e] text-[#555] rounded-lg hover:text-red-400 transition-colors"
//           >
//             Del
//           </button>
//         </div>
//       </div>

//       {/* Expanded detail */}
//       {expanded && (
//         <div className="px-6 pb-5 bg-[#0d0d0d] border-b border-[#1e1e1e]">
//           <div className="grid md:grid-cols-2 gap-6 pt-4">
//             {/* Customer info */}
//             <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 space-y-2">
//               <p className="text-[#555] text-xs uppercase tracking-widest font-medium mb-3">Customer Details</p>
//               {[
//                 ['Name', order.customer?.name],
//                 ['Email', order.customer?.email],
//                 ['Phone', order.customer?.phone],
//                 ['Address', order.customer?.address],
//                 ['City', order.customer?.city],
//                 ['State', order.customer?.state],
//               ].map(([label, val]) => val ? (
//                 <div key={label} className="flex gap-3 text-sm">
//                   <span className="text-[#555] w-16 flex-shrink-0">{label}:</span>
//                   <span className="text-white">{val}</span>
//                 </div>
//               ) : null)}
//             </div>

//             {/* Order items */}
//             <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4">
//               <p className="text-[#555] text-xs uppercase tracking-widest font-medium mb-3">Order Items</p>
//               <div className="space-y-2">
//                 {order.items?.map((item, i) => (
//                   <div key={i} className="flex items-center justify-between text-sm">
//                     <div className="flex items-center gap-2">
//                       <span className="text-[#555] text-xs w-5">{item.quantity}×</span>
//                       <span className="text-white line-clamp-1">{item.name}</span>
//                     </div>
//                     <span className="text-[#c9a84c] font-medium flex-shrink-0 ml-2">
//                       ₦{(item.price * item.quantity).toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="border-t border-[#1e1e1e] pt-2 flex justify-between font-semibold text-sm mt-3">
//                   <span className="text-[#888]">Total</span>
//                   <span className="text-[#c9a84c]">₦{order.total?.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Status history / change */}
//           <div className="mt-4 flex items-center gap-2 flex-wrap">
//             <span className="text-[#555] text-xs">Change status:</span>
//             {STATUSES.map(s => (
//               <button
//                 key={s}
//                 onClick={() => updateStatus(s)}
//                 className={`text-xs px-3 py-1 rounded-full border transition-all capitalize ${
//                   order.status === s
//                     ? (STATUS_STYLES[s] || STATUS_STYLES.pending)
//                     : 'border-[#2a2a2a] text-[#555] hover:border-[#c9a84c] hover:text-[#c9a84c]'
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     fetch('/api/orders')
//       .then(r => r.json())
//       .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); });
//   }, []);

//   async function handleStatusChange(id, status) {
//     const res = await fetch(`/api/orders/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });
//     const updated = await res.json();
//     setOrders(o => o.map(x => x._id === id ? { ...x, status: updated.status } : x));
//   }

//   async function handleDelete(id) {
//     if (!confirm('Delete this order?')) return;
//     await fetch(`/api/orders/${id}`, { method: 'DELETE' });
//     setOrders(o => o.filter(x => x._id !== id));
//   }

//   const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
//   const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: orders.filter(o => o.status === s).length }), {});
//   const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total || 0), 0);

//   return (
//     <div className="flex min-h-screen bg-[#0f0f0f]">
//       <AdminSidebar />
//       <main className="flex-1 p-8 overflow-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-white text-3xl font-display font-bold">Orders</h1>
//             <p className="text-[#555] text-sm mt-1">{orders.length} total · ₦{totalRevenue.toLocaleString()} revenue</p>
//           </div>
//         </div>

//         {/* Status filter tabs */}
//         <div className="flex gap-2 flex-wrap mb-6">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
//               filter === 'all' ? 'bg-[#c9a84c] text-[#1a1a1a]' : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c]'
//             }`}
//           >
//             All ({orders.length})
//           </button>
//           {STATUSES.map(s => (
//             <button
//               key={s}
//               onClick={() => setFilter(s)}
//               className={`px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
//                 filter === s
//                   ? `border ${STATUS_STYLES[s]}`
//                   : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-white'
//               }`}
//             >
//               {s} ({counts[s] || 0})
//             </button>
//           ))}
//         </div>

//         {/* Orders table */}
//         <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
//           <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-[#1e1e1e] text-[#555] text-xs uppercase tracking-widest font-medium">
//             <span>Customer</span>
//             <span className="text-right">Items</span>
//             <span>Total</span>
//             <span>Status</span>
//             <span>Actions</span>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="py-16 text-center">
//               <p className="text-4xl mb-3">📭</p>
//               <p className="text-[#444] text-sm">No {filter !== 'all' ? filter : ''} orders yet</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-[#1e1e1e]">
//               {filtered.map(order => (
//                 <OrderRow
//                   key={order._id}
//                   order={order}
//                   onStatusChange={handleStatusChange}
//                   onDelete={handleDelete}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Revenue breakdown */}
//         {orders.length > 0 && (
//           <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
//             {STATUSES.map(s => (
//               <div key={s} className={`border rounded-xl p-4 ${STATUS_STYLES[s]}`}>
//                 <p className="text-[10px] uppercase tracking-widest font-medium opacity-70 mb-1 capitalize">{s}</p>
//                 <p className="text-xl font-bold">{counts[s] || 0}</p>
//                 <p className="text-xs opacity-60 mt-0.5">
//                   ₦{orders.filter(o => o.status === s).reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const STATUS_STYLES = {
  pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  shipped:   'bg-purple-500/15 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/15 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const STATUS_NEXT = {
  pending: 'confirmed',
  confirmed: 'shipped',
  shipped: 'delivered',
};

function OrderRow({ order, onStatusChange, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function updateStatus(status) {
    setUpdating(true);
    await onStatusChange(order._id, status);
    setUpdating(false);
  }

  const nextStatus = STATUS_NEXT[order.status];

  return (
    <>
      <div
        className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-4 hover:bg-[#161616] transition-colors cursor-pointer"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Customer */}
        <div>
          <p className="text-white text-sm font-medium">{order.customer?.name || 'Unknown'}</p>
          <p className="text-[#555] text-xs mt-0.5">
            {order.customer?.phone} · {new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Items */}
        <span className="text-[#888] text-xs text-right whitespace-nowrap">
          {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
        </span>

        {/* Total */}
        <span className="text-[#c9a84c] font-semibold text-sm whitespace-nowrap">
          ₦{order.total?.toLocaleString()}
        </span>

        {/* Status badge */}
        <span className={`text-xs px-3 py-1 rounded-full font-medium border ${STATUS_STYLES[order.status] || STATUS_STYLES.pending} whitespace-nowrap`}>
          {order.status}
        </span>

        {/* Actions */}
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          {nextStatus && (
            <button
              onClick={() => updateStatus(nextStatus)}
              disabled={updating}
              className="text-xs px-3 py-1.5 bg-[#1e1e1e] text-[#888] rounded-lg hover:text-white hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 whitespace-nowrap capitalize"
            >
              {updating ? '…' : `→ ${nextStatus}`}
            </button>
          )}
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <button
              onClick={() => updateStatus('cancelled')}
              disabled={updating}
              className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => onDelete(order._id)}
            className="text-xs px-3 py-1.5 bg-[#1e1e1e] text-[#555] rounded-lg hover:text-red-400 transition-colors"
          >
            Del
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-6 pb-5 bg-[#0d0d0d] border-b border-[#1e1e1e]">
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            {/* Customer info */}
            <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 space-y-2">
              <p className="text-[#555] text-xs uppercase tracking-widest font-medium mb-3">Customer Details</p>
              {[
                ['Name', order.customer?.name],
                ['Email', order.customer?.email],
                ['Phone', order.customer?.phone],
                ['Address', order.customer?.address],
                ['City', order.customer?.city],
                ['State', order.customer?.state],
              ].map(([label, val]) => val ? (
                <div key={label} className="flex gap-3 text-sm">
                  <span className="text-[#555] w-16 shrink-0">{label}:</span>
                  <span className="text-white">{val}</span>
                </div>
              ) : null)}
            </div>

            {/* Order items */}
            <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4">
              <p className="text-[#555] text-xs uppercase tracking-widest font-medium mb-3">Order Items</p>
              <div className="space-y-2">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#555] text-xs w-5">{item.quantity}×</span>
                      <span className="text-white line-clamp-1">{item.name}</span>
                    </div>
                    <span className="text-[#c9a84c] font-medium shrink-0 ml-2">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#1e1e1e] pt-2 flex justify-between font-semibold text-sm mt-3">
                  <span className="text-[#888]">Total</span>
                  <span className="text-[#c9a84c]">₦{order.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status history / change */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-[#555] text-xs">Change status:</span>
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                className={`text-xs px-3 py-1 rounded-full border transition-all capitalize ${
                  order.status === s
                    ? (STATUS_STYLES[s] || STATUS_STYLES.pending)
                    : 'border-[#2a2a2a] text-[#555] hover:border-[#c9a84c] hover:text-[#c9a84c]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  async function handleStatusChange(id, status) {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setOrders(o => o.map(x => x._id === id ? { ...x, status: updated.status } : x));
  }

  async function handleDelete(id) {
    if (!confirm('Delete this order?')) return;
    await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    setOrders(o => o.filter(x => x._id !== id));
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: orders.filter(o => o.status === s).length }), {});
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total || 0), 0);

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-display font-bold">Orders</h1>
            <p className="text-[#555] text-sm mt-1">{orders.length} total · ₦{totalRevenue.toLocaleString()} revenue</p>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === 'all' ? 'bg-[#c9a84c] text-[#1a1a1a]' : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c]'
            }`}
          >
            All ({orders.length})
          </button>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                filter === s
                  ? `border ${STATUS_STYLES[s]}`
                  : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-white'
              }`}
            >
              {s} ({counts[s] || 0})
            </button>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-[#1e1e1e] text-[#555] text-xs uppercase tracking-widest font-medium">
            <span>Customer</span>
            <span className="text-right">Items</span>
            <span>Total</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-[#444] text-sm">No {filter !== 'all' ? filter : ''} orders yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1e1e1e]">
              {filtered.map(order => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Revenue breakdown */}
        {orders.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
            {STATUSES.map(s => (
              <div key={s} className={`border rounded-xl p-4 ${STATUS_STYLES[s]}`}>
                <p className="text-[10px] tracking-widest font-medium opacity-70 mb-1 capitalize">{s}</p>
                <p className="text-xl font-bold">{counts[s] || 0}</p>
                <p className="text-xs opacity-60 mt-0.5">
                  ₦{orders.filter(o => o.status === s).reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
