'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(s => (
          <svg key={s} xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5"
            fill={s <= Math.round(rating) ? '#c9a84c' : 'none'}
            stroke={s <= Math.round(rating) ? '#c9a84c' : '#ccc'}
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
      {count > 0 && <span className="text-[10px] text-[#888]">({count})</span>}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    dispatch({ type: 'ADD', product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="product-card bg-white rounded-2xl overflow-hidden border border-[#f0ebe0]">
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden bg-[#f5f0e8]">
          <Image
            src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-[#2d5016] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
            )}
            {discount && (
              <span className="bg-[#c9a84c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
            )}
            {!product.inStock && (
              <span className="bg-[#666] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Sold out</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">{product.category}</p>
          <h3 className="text-sm font-medium text-[#1a1a1a] leading-snug line-clamp-2">{product.name}</h3>
          {product.rating > 0 && <StarRating rating={product.rating} count={product.reviewCount} />}

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="font-semibold text-[#1a1a1a]">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-[#aaa] line-through ml-1.5">₦{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            {product.inStock ? (
              <button
                onClick={handleAdd}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-200 ${
                  added
                    ? 'bg-[#2d5016] text-white scale-95'
                    : 'gold-btn text-[#1a1a1a] hover:scale-105'
                }`}
              >
                {added ? '✓ Added' : 'Add'}
              </button>
            ) : (
              <span className="text-xs text-[#aaa] italic">Unavailable</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
