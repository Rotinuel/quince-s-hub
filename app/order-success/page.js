'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/products/id/${orderId}`)
        .catch(() => null);
      // Fetch the order directly
      fetch(`/api/orders/${orderId}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => data && setOrder(data))
        .catch(() => null);
    }
  }, [orderId]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-[#2d5016] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-display text-3xl font-bold text-[#1a1a1a] mb-2">Payment Successful!</h1>

      {order?.orderNumber && (
        <div className="inline-block bg-[#f5f0e8] border border-[#e8d5a0] rounded-xl px-6 py-3 my-4">
          <p className="text-xs text-[#888] uppercase tracking-widest mb-1">Your Order Number</p>
          <p className="font-mono font-bold text-xl text-[#1a1a1a]">{order.orderNumber}</p>
        </div>
      )}

      {ref && (
        <p className="text-xs text-[#888] mt-2 font-mono">Paystack ref: {ref}</p>
      )}

      <p className="text-[#555] text-sm my-4">
        Your payment has been confirmed and your order is now being processed.
      </p>
      <p className="text-xs text-[#888] mb-10">
        Lagos delivery: 24–72 hrs · Outside Lagos: 3–5 working days
      </p>

      <Link href="/shop" className="gold-btn px-8 py-3.5 rounded-full text-[#1a1a1a] font-semibold inline-block">
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
