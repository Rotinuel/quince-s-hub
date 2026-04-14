// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import { useCart } from '@/context/CartContext';

// function CartItem({ item }) {
//   const { dispatch } = useCart();
//   return (
//     <div className="flex gap-4 py-5 border-b border-[#f0ebe0]">
//       <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#f5f0e8] flex-shrink-0">
//         <Image src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'}
//           alt={item.name} fill className="object-cover" sizes="80px" />
//       </div>
//       <div className="flex-1 min-w-0">
//         <Link href={`/product/${item.slug}`} className="text-sm font-medium text-[#1a1a1a] hover:text-[#c9a84c] transition-colors line-clamp-2">
//           {item.name}
//         </Link>
//         <p className="text-xs text-[#888] mt-0.5">{item.category}</p>
//         <p className="text-sm font-bold text-[#1a1a1a] mt-1">₦{item.price.toLocaleString()}</p>
//       </div>
//       <div className="flex flex-col items-end gap-2">
//         <div className="flex items-center border border-[#eee] rounded-lg overflow-hidden">
//           <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item._id, qty: item.qty - 1 })}
//             className="px-2.5 py-1 text-sm font-bold hover:bg-[#f5f0e8] transition-colors">−</button>
//           <span className="px-3 py-1 text-sm font-medium">{item.qty}</span>
//           <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item._id, qty: item.qty + 1 })}
//             className="px-2.5 py-1 text-sm font-bold hover:bg-[#f5f0e8] transition-colors">+</button>
//         </div>
//         <p className="text-sm font-bold text-[#c9a84c]">₦{(item.price * item.qty).toLocaleString()}</p>
//         <button onClick={() => dispatch({ type: 'REMOVE', id: item._id })}
//           className="text-xs text-[#bbb] hover:text-red-400 transition-colors">Remove</button>
//       </div>
//     </div>
//   );
// }

// export default function CartPage() {
//   const { cart, total, dispatch } = useCart();
//   const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '' });
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   async function handleCheckout(e) {
//     e.preventDefault();
//     if (cart.length === 0) return;
//     setSubmitting(true);
//     setError('');
//     try {
//       const res = await fetch('/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           items: cart.map(i => ({ productId: i._id, name: i.name, price: i.price, quantity: i.qty, image: i.image })),
//           total,
//           customer: form,
//         }),
//       });
//       if (!res.ok) throw new Error('Order failed');
//       dispatch({ type: 'CLEAR' });
//       setSuccess(true);
//     } catch {
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   if (success) {
//     return (
//       <div className="max-w-lg mx-auto px-4 py-24 text-center">
//         <div className="w-20 h-20 bg-[#2d5016] rounded-full flex items-center justify-center mx-auto mb-6">
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         </div>
//         <h1 className="font-display text-3xl font-bold text-[#1a1a1a] mb-3">Order Placed!</h1>
//         <p className="text-[#555] mb-2">Thank you for your order. We'll confirm payment and process your delivery.</p>
//         <p className="text-sm text-[#888] mb-8">Delivery in Lagos: 24–72 hrs · Outside Lagos: 3–5 working days</p>
//         <Link href="/shop" className="gold-btn px-8 py-3.5 rounded-full text-[#1a1a1a] font-semibold inline-block">
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-lg mx-auto px-4 py-24 text-center">
//         <div className="text-6xl mb-6">🛒</div>
//         <h1 className="font-display text-3xl font-bold text-[#1a1a1a] mb-3">Your cart is empty</h1>
//         <p className="text-[#888] mb-8">Explore our products and add items to your cart.</p>
//         <Link href="/shop" className="gold-btn px-8 py-3.5 rounded-full text-[#1a1a1a] font-semibold inline-block">
//           Shop Now
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="font-display text-4xl font-bold text-[#1a1a1a] mb-10">Your Cart</h1>

//       <div className="grid lg:grid-cols-3 gap-10">
//         {/* Cart items */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-3xl border border-[#f0ebe0] px-6">
//             {cart.map(item => <CartItem key={item._id} item={item} />)}
//           </div>
//           <button onClick={() => dispatch({ type: 'CLEAR' })}
//             className="mt-4 text-sm text-[#bbb] hover:text-red-400 transition-colors">
//             Clear cart
//           </button>
//         </div>

//         {/* Checkout */}
//         <div className="space-y-6">
//           {/* Summary */}
//           <div className="bg-white rounded-3xl border border-[#f0ebe0] p-6 space-y-4">
//             <h2 className="font-display text-xl font-bold">Order Summary</h2>
//             <div className="space-y-2 text-sm text-[#555]">
//               <div className="flex justify-between">
//                 <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
//                 <span className="font-medium text-[#1a1a1a]">₦{total.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery</span>
//                 <span className="text-[#2d5016] font-medium">Calculated at checkout</span>
//               </div>
//             </div>
//             <div className="border-t border-[#f0ebe0] pt-3 flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span className="text-[#c9a84c]">₦{total.toLocaleString()}</span>
//             </div>
//           </div>

//           {/* Checkout form */}
//           <form onSubmit={handleCheckout} className="bg-white rounded-3xl border border-[#f0ebe0] p-6 space-y-4">
//             <h2 className="font-display text-xl font-bold">Delivery Details</h2>

//             {[
//               { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
//               { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@email.com' },
//               { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '08012345678' },
//               { key: 'address', label: 'Delivery Address', type: 'text', placeholder: '12 Awolowo Road, Ikoyi' },
//               { key: 'city', label: 'City', type: 'text', placeholder: 'Lagos' },
//               { key: 'state', label: 'State', type: 'text', placeholder: 'Lagos State' },
//             ].map(field => (
//               <div key={field.key}>
//                 <label className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide">{field.label}</label>
//                 <input
//                   type={field.type}
//                   required
//                   placeholder={field.placeholder}
//                   value={form[field.key]}
//                   onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
//                   className="w-full border border-[#ddd] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
//                 />
//               </div>
//             ))}

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <button type="submit" disabled={submitting}
//               className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
//                 submitting ? 'bg-[#ddd] text-[#888] cursor-not-allowed' : 'gold-btn text-[#1a1a1a]'
//               }`}>
//               {submitting ? 'Placing Order…' : `Place Order · ₦${total.toLocaleString()}`}
//             </button>
//             <p className="text-xs text-[#888] text-center">
//               You'll be contacted with payment instructions after placing your order.
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// ── Cart item row ────────────────────────────────────────────────────────────
function CartItem({ item }) {
  const { dispatch } = useCart();
  return (
    <div className="flex gap-4 py-5 border-b border-[#f0ebe0]">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#f5f0e8] shrink-0">
        <Image
          src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'}
          alt={item.name} fill className="object-cover" sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#1a1a1a] line-clamp-2">{item.name}</p>
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

// ── Step indicator ───────────────────────────────────────────────────────────
function Steps({ step }) {
  const steps = ['Cart', 'Delivery', 'Payment'];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-[#1a1a1a]' : 'text-[#bbb]'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i + 1 < step ? 'bg-[#2d5016] text-white' :
              i + 1 === step ? 'bg-[#c9a84c] text-[#1a1a1a]' :
              'bg-[#f0ebe0] text-[#bbb]'
            }`}>
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span className="text-sm font-medium hidden sm:block">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-8 sm:w-16 ${i + 1 < step ? 'bg-[#2d5016]' : 'bg-[#ddd]'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Bank details card ────────────────────────────────────────────────────────
function BankDetails({ orderNumber, total }) {
  const [copied, setCopied] = useState(null);

  const bankName = process.env.NEXT_PUBLIC_BANK_NAME || 'Zenith Bank';
  const accountNumber = process.env.NEXT_PUBLIC_ACCOUNT_NUMBER || '1234567890';
  const accountName = process.env.NEXT_PUBLIC_ACCOUNT_NAME || 'Bazzan Essentials Ltd';

  function copy(text, field) {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="bg-[#f5f0e8] border border-[#e8d5a0] rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">🏦</span>
        <h3 className="font-semibold text-[#1a1a1a]">Bank Transfer Details</h3>
      </div>
      <p className="text-sm text-[#666]">Transfer the exact amount and use your order number as the payment reference.</p>

      {[
        { label: 'Bank', value: bankName, field: 'bank' },
        { label: 'Account Number', value: accountNumber, field: 'acc' },
        { label: 'Account Name', value: accountName, field: 'name' },
        { label: 'Amount', value: `₦${total.toLocaleString()}`, field: 'amount' },
        { label: 'Reference / Order No.', value: orderNumber, field: 'ref' },
      ].map(({ label, value, field }) => (
        <div key={field} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-[#e8d5a0]">
          <div>
            <p className="text-[10px] text-[#999] uppercase tracking-widest font-medium">{label}</p>
            <p className="text-sm font-semibold text-[#1a1a1a] mt-0.5">{value}</p>
          </div>
          <button
            onClick={() => copy(value.replace('₦', '').replace(/,/g, ''), field)}
            className="text-xs text-[#c9a84c] hover:text-[#b8933d] font-medium transition-colors ml-3 shrink-0"
          >
            {copied === field ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      ))}

      <div className="bg-[#fff9ec] border border-[#f0d080] rounded-xl p-3 text-xs text-[#7a6020]">
        ⚠️ Your order will be confirmed within 1–2 hours after payment is received. Screenshot your receipt for reference.
      </div>
    </div>
  );
}

// ── Main cart page ───────────────────────────────────────────────────────────
function CartContent() {
  const { cart, total, dispatch } = useCart();
  const searchParams = useSearchParams();
  const paymentFailed = searchParams.get('payment') === 'failed';

  const [step, setStep] = useState(1); // 1=cart, 2=delivery, 3=payment
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '' });
  const [payMethod, setPayMethod] = useState('paystack'); // 'paystack' | 'bank_transfer'
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(paymentFailed ? 'Payment was not completed. Please try again.' : '');
  const [order, setOrder] = useState(null); // { _id, orderNumber }
  const [transferConfirmed, setTransferConfirmed] = useState(false);

  const hasPaystack = !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  // Step 1 → 2: validate cart non-empty
  function proceedToDelivery(e) {
    e.preventDefault();
    setStep(2);
  }

  // Step 2 → 3: create the order, decide payment
  async function proceedToPayment(e) {
    e.preventDefault();
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
          paymentMethod: payMethod,
          paymentStatus: 'pending',
          status: 'pending',
        }),
      });
      if (!res.ok) throw new Error('Could not create order');
      const created = await res.json();
      setOrder(created);
      dispatch({ type: 'CLEAR' });
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Step 3 Paystack: redirect to Paystack
  async function handlePaystack() {
    if (!order) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order._id, email: form.email, amount: order.total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Paystack error');
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  // Success screen (bank transfer confirmed by customer)
  if (step === 3 && transferConfirmed) {
    return <SuccessScreen order={order} method="bank_transfer" />;
  }

  // Empty cart
  if (cart.length === 0 && step === 1) {
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
      <div className="mb-6">
        <h1 className="font-display text-4xl font-bold text-[#1a1a1a] mb-4">Checkout</h1>
        <Steps step={step} />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left column — changes per step */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── STEP 1: Cart review ── */}
          {step === 1 && (
            <div>
              <div className="bg-white rounded-3xl border border-[#f0ebe0] px-6">
                {cart.map(item => <CartItem key={item._id} item={item} />)}
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={() => dispatch({ type: 'CLEAR' })}
                  className="text-sm text-[#bbb] hover:text-red-400 transition-colors">
                  Clear cart
                </button>
                <button onClick={proceedToDelivery}
                  className="gold-btn px-8 py-3.5 rounded-2xl font-semibold text-[#1a1a1a] text-sm">
                  Continue to Delivery →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Delivery details ── */}
          {step === 2 && (
            <form onSubmit={proceedToPayment} className="bg-white rounded-3xl border border-[#f0ebe0] p-8 space-y-5">
              <h2 className="font-display text-2xl font-bold mb-2">Delivery Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', span: 2 },
                  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'john@email.com' },
                  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '08012345678' },
                  { key: 'address', label: 'Delivery Address', type: 'text', placeholder: '12 Awolowo Road, Ikoyi', span: 2 },
                  { key: 'city', label: 'City', type: 'text', placeholder: 'Lagos' },
                  { key: 'state', label: 'State', type: 'text', placeholder: 'Lagos State' },
                ].map(field => (
                  <div key={field.key} className={field.span === 2 ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-[#555] mb-1.5 uppercase tracking-wide">{field.label}</label>
                    <input
                      type={field.type} required
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full border border-[#ddd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Payment method selection */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-[#555] mb-3 uppercase tracking-wide">Payment Method</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'paystack',
                      label: 'Pay with Paystack',
                      sub: 'Card, Bank Transfer, USSD & more',
                      icon: '💳',
                    },
                    {
                      id: 'bank_transfer',
                      label: 'Direct Bank Transfer',
                      sub: 'Transfer to our account manually',
                      icon: '🏦',
                    },
                  ].map(opt => (
                    <label key={opt.id}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        payMethod === opt.id
                          ? 'border-[#c9a84c] bg-[#fef9ec]'
                          : 'border-[#eee] hover:border-[#ddd]'
                      }`}
                    >
                      <input type="radio" name="payMethod" value={opt.id} checked={payMethod === opt.id}
                        onChange={() => setPayMethod(opt.id)} className="mt-0.5 accent-[#c9a84c]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{opt.icon}</span>
                          <span className="font-semibold text-sm text-[#1a1a1a]">{opt.label}</span>
                        </div>
                        <p className="text-xs text-[#888] mt-0.5">{opt.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)}
                  className="px-6 py-3.5 rounded-2xl border border-[#ddd] text-sm text-[#555] hover:border-[#c9a84c] transition-colors">
                  ← Back
                </button>
                <button type="submit" disabled={submitting}
                  className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                    submitting ? 'bg-[#ddd] text-[#888] cursor-not-allowed' : 'gold-btn text-[#1a1a1a]'
                  }`}>
                  {submitting ? 'Creating order…' : 'Continue to Payment →'}
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 3: Payment ── */}
          {step === 3 && order && (
            <div className="space-y-4">
              {/* Order created banner */}
              <div className="bg-[#2d5016]/10 border border-[#2d5016]/20 rounded-2xl px-6 py-4 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-[#2d5016]">Order Created!</p>
                  <p className="text-sm text-[#555]">
                    Order number: <strong className="text-[#1a1a1a] font-mono">{order.orderNumber}</strong>
                  </p>
                </div>
              </div>

              {order.paymentMethod === 'bank_transfer' ? (
                <>
                  <BankDetails orderNumber={order.orderNumber} total={order.total} />
                  <div className="bg-white rounded-3xl border border-[#f0ebe0] p-6 space-y-4">
                    <h3 className="font-semibold text-[#1a1a1a]">Confirm your transfer</h3>
                    <p className="text-sm text-[#666]">
                      Once you've made the transfer, click below to let us know. We'll verify and confirm your order within 1–2 hours.
                    </p>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      onClick={() => setTransferConfirmed(true)}
                      className="w-full gold-btn py-4 rounded-2xl font-semibold text-[#1a1a1a] text-sm"
                    >
                      I've Completed the Transfer ✓
                    </button>
                    <p className="text-xs text-[#aaa] text-center">
                      Don't worry — if you haven't transferred yet, you can always reference your order number {order.orderNumber} later.
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl border border-[#f0ebe0] p-8 space-y-5 text-center">
                  <div className="text-5xl">💳</div>
                  <h3 className="font-display text-2xl font-bold text-[#1a1a1a]">Pay with Paystack</h3>
                  <p className="text-sm text-[#666] max-w-sm mx-auto">
                    You'll be redirected to Paystack's secure payment page to complete your ₦{order.total.toLocaleString()} payment.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-[#888]">
                    {['Visa', 'Mastercard', 'Verve', 'USSD', 'Bank', 'QR'].map(m => (
                      <span key={m} className="bg-[#f5f0e8] px-3 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    onClick={handlePaystack}
                    disabled={submitting}
                    className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
                      submitting ? 'bg-[#ddd] text-[#888] cursor-not-allowed' : 'gold-btn text-[#1a1a1a]'
                    }`}
                  >
                    {submitting ? 'Redirecting to Paystack…' : `Pay ₦${order.total.toLocaleString()} via Paystack`}
                  </button>
                  <p className="text-xs text-[#aaa]">Secured by Paystack · 256-bit SSL encryption</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Order summary (always visible) */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#f0ebe0] p-6 space-y-4 sticky top-24">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>

            {step < 3 && cart.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item._id} className="flex gap-3 items-center">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#f5f0e8] shrink-0">
                      <Image src={item.image || ''} alt={item.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#555] truncate">{item.name}</p>
                      <p className="text-xs text-[#888]">{item.qty} × ₦{item.price.toLocaleString()}</p>
                    </div>
                    <p className="text-xs font-semibold shrink-0">₦{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && order && (
              <div className="bg-[#f5f0e8] rounded-xl p-3 text-xs">
                <p className="text-[#888] mb-1">Order number</p>
                <p className="font-mono font-bold text-[#1a1a1a]">{order.orderNumber}</p>
              </div>
            )}

            <div className="space-y-2 text-sm text-[#555] border-t border-[#f0ebe0] pt-3">
              <div className="flex justify-between">
                <span>Subtotal ({step < 3 ? cart.reduce((s,i)=>s+i.qty,0) : (order?.items?.reduce((s,i)=>s+i.quantity,0) || 0)} items)</span>
                <span className="font-medium text-[#1a1a1a]">₦{(step < 3 ? total : order?.total || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-[#2d5016] font-medium text-xs">Calculated after order</span>
              </div>
            </div>

            <div className="border-t border-[#f0ebe0] pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-[#c9a84c]">₦{(step < 3 ? total : order?.total || 0).toLocaleString()}</span>
            </div>

            {step === 2 && (
              <div className="bg-[#f5f0e8] rounded-xl p-3 space-y-1.5 text-xs text-[#666]">
                <div className="flex gap-2"><span>🚚</span><span>Lagos: 24–72 hours</span></div>
                <div className="flex gap-2"><span>📦</span><span>Outside Lagos: 3–5 working days</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen({ order, method }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-[#2d5016] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="font-display text-3xl font-bold text-[#1a1a1a] mb-2">
        {method === 'bank_transfer' ? 'Transfer Noted!' : 'Payment Successful!'}
      </h1>
      {order?.orderNumber && (
        <div className="inline-block bg-[#f5f0e8] border border-[#e8d5a0] rounded-xl px-6 py-3 my-4">
          <p className="text-xs text-[#888] uppercase tracking-widest mb-1">Your Order Number</p>
          <p className="font-mono font-bold text-xl text-[#1a1a1a]">{order.orderNumber}</p>
        </div>
      )}
      <p className="text-[#555] text-sm mb-2 mt-3">
        {method === 'bank_transfer'
          ? "We'll confirm your payment within 1–2 hours and begin processing your order."
          : 'Your payment has been received and your order is confirmed.'}
      </p>
      <p className="text-xs text-[#888] mb-8">
        📧 A confirmation will be sent to your email · Lagos delivery: 24–72 hrs
      </p>
      <Link href="/shop" className="gold-btn px-8 py-3.5 rounded-full text-[#1a1a1a] font-semibold inline-block">
        Continue Shopping
      </Link>
    </div>
  );
}

// ── Page export ──────────────────────────────────────────────────────────────
export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <CartContent />
    </Suspense>
  );
}
