'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function AddToCartButton({ product }) {
  const { dispatch, cart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inCart = cart.find(i => i._id === product._id);

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      dispatch({ type: 'ADD', product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!product.inStock) {
    return (
      <button disabled className="w-full py-4 rounded-2xl bg-[#f0ebe0] text-[#999] font-semibold text-sm cursor-not-allowed">
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[#555]">Quantity:</span>
        <div className="flex items-center border border-[#ddd] rounded-xl overflow-hidden">
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            className="px-4 py-2 text-lg font-bold text-[#555] hover:bg-[#f5f0e8] transition-colors">−</button>
          <span className="px-5 py-2 text-sm font-semibold min-w-[3rem] text-center">{qty}</span>
          <button onClick={() => setQty(q => q + 1)}
            className="px-4 py-2 text-lg font-bold text-[#555] hover:bg-[#f5f0e8] transition-colors">+</button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className={`flex-1 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${
            added
              ? 'bg-[#2d5016] text-white scale-[0.98]'
              : 'gold-btn text-[#1a1a1a]'
          }`}
        >
          {added ? '✓ Added to Cart!' : 'Add to Cart'}
        </button>
        {inCart && (
          <Link href="/cart"
            className="px-5 py-4 rounded-2xl border-2 border-[#c9a84c] text-[#c9a84c] font-semibold text-sm hover:bg-[#c9a84c] hover:text-[#1a1a1a] transition-colors">
            View Cart
          </Link>
        )}
      </div>

      <p className="text-xs text-[#888] text-center">
        Total: <strong className="text-[#1a1a1a]">₦{(product.price * qty).toLocaleString()}</strong>
      </p>
    </div>
  );
}
