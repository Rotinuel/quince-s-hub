'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

function CartItem({ item }) {
  const { dispatch } = useCart();
  return (
    <div className="flex gap-4 py-5 border-b border-[#f0ebe0]">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#f5f0e8] flex-shrink-0">
        <Image src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'}
          alt={item.name} fill className="object-cover" sizes="80px" />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.slug}`} className="text-sm font-medium text-[#1a1a1a] hover:text-[#c9a84c] transition-colors line-clamp-2">
          {item.name}
        </Link>
        <p className="text-xs text-[#888] mt-0.5">{item.category}</p>
        <p className="text-sm font-bold text-[#1a1a1a] mt-1">₦{item.price.toLocaleString()}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center border border-[#eee] rounded-lg overflow-hidden">
          <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item._id, qty: item.qty - 1 })}
            className="px-2.5 py-1 text-sm font-bold hover:bg-[#f5f0e8] transition-colors">−</button>
          <span className="px-3 py-1 text-sm font-medium">{item.qty}</span>
          <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item._id, qty: item.qty + 1 })}
            className="px-2.5 py-1 text-sm font-bold hover:bg-[#f5f0e8] transition-colors">+</button>
        </div>
        <p className="text-sm font-bold text-[#c9a84c]">₦{(item.price * item.qty).toLocaleString()}</p>
        <button onClick={() => dispatch({ type: 'REMOVE', id: item._id })}
          className="text-xs text-[#bbb] hover:text-red-400 transition-colors">Remove</button>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, total, dispatch } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({ productId: i._id, name: i.name, price: i.price, quantity: i.qty, image: i.image })),
          total,
          customer: form,
        }),
      });
      if (!res.ok) throw new Error('Order failed');
      dispatch({ type: 'CLEAR' });
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-[#2d5016] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-[#1a1a1a] mb-3">Order Placed!</h1>
        <p className="text-[#555] mb-2">Thank you for your order. We'll confirm payment and process your delivery.</p>
        <p className="text-sm text-[#888] mb-8">Delivery in Lagos: 24–72 hrs · Outside Lagos: 3–5 working days</p>
        <Link href="/shop" className="gold-btn px-8 py-3.5 rounded-full text-[#1a1a1a] font-semibold inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="font-display text-3xl font-bold text-[#1a1a1a] mb-3">Your cart is empty</h1>
        <p className="text-[#888] mb-8">Explore our products and add items to your cart.</p>
        <Link href="/shop" className="gold-btn px-8 py-3.5 rounded-full text-[#1a1a1a] font-semibold inline-block">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-[#1a1a1a] mb-10">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-[#f0ebe0] px-6">
            {cart.map(item => <CartItem key={item._id} item={item} />)}
          </div>
          <button onClick={() => dispatch({ type: 'CLEAR' })}
            className="mt-4 text-sm text-[#bbb] hover:text-red-400 transition-colors">
            Clear cart
          </button>
        </div>

        {/* Checkout */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-3xl border border-[#f0ebe0] p-6 space-y-4">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>
            <div className="space-y-2 text-sm text-[#555]">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="font-medium text-[#1a1a1a]">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-[#2d5016] font-medium">Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-[#f0ebe0] pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-[#c9a84c]">₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Checkout form */}
          <form onSubmit={handleCheckout} className="bg-white rounded-3xl border border-[#f0ebe0] p-6 space-y-4">
            <h2 className="font-display text-xl font-bold">Delivery Details</h2>

            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@email.com' },
              { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '08012345678' },
              { key: 'address', label: 'Delivery Address', type: 'text', placeholder: '12 Awolowo Road, Ikoyi' },
              { key: 'city', label: 'City', type: 'text', placeholder: 'Lagos' },
              { key: 'state', label: 'State', type: 'text', placeholder: 'Lagos State' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide">{field.label}</label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  className="w-full border border-[#ddd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>
            ))}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button type="submit" disabled={submitting}
              className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
                submitting ? 'bg-[#ddd] text-[#888] cursor-not-allowed' : 'gold-btn text-[#1a1a1a]'
              }`}>
              {submitting ? 'Placing Order…' : `Place Order · ₦${total.toLocaleString()}`}
            </button>
            <p className="text-xs text-[#888] text-center">
              You'll be contacted with payment instructions after placing your order.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
