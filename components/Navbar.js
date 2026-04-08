'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const categories = ['Essentials', 'Fashion', 'Bags', 'Shoes', 'Fitness items', 'Household items', 'Kitchen', 'Home'];

export default function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e8d5a0] shadow-sm">
      {/* Top bar */}
      <div className="bg-[#1a1a1a] text-[#e8d5a0] text-xs text-center py-1.5 tracking-widest uppercase font-medium">
        Same day delivery within Lagos on orders before 2:00p.m&nbsp;·&nbsp;
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="font-display text-2xl font-bold tracking-tight text-[#1a1a1a]">
            Quinces Hub<span className="text-[#c9a84c]">.</span>
          </span>
        </Link>

        {/* Search */}
        <form
          className="hidden md:flex flex-1 max-w-md items-center border border-[#ddd] rounded-full overflow-hidden"
          onSubmit={e => { e.preventDefault(); window.location.href = `/shop?search=${searchVal}`; }}
        >
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Search products…"
            className="flex-1 px-4 py-2 text-sm outline-none bg-white"
          />
          <button type="submit" className="px-4 py-2 bg-[#c9a84c] text-white text-sm hover:bg-[#b8933d] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <Link href="/shop" className="hidden md:block text-sm font-medium text-[#1a1a1a] hover:text-[#c9a84c] transition-colors">Shop</Link>
          <Link href="/cart" className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#1a1a1a] group-hover:text-[#c9a84c] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c9a84c] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Category nav bar */}
      <nav className="hidden md:block border-t border-[#f0ebe0] bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-10 overflow-x-auto">
          <Link href="/shop" className="text-xs font-semibold tracking-widest uppercase text-[#1a1a1a] hover:text-[#c9a84c] whitespace-nowrap transition-colors">All</Link>
          {categories.map(cat => (
            <Link key={cat} href={`/shop?category=${encodeURIComponent(cat)}`}
              className="text-xs font-medium tracking-widest uppercase text-[#555] hover:text-[#c9a84c] whitespace-nowrap transition-colors">
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#eee] px-4 py-4 space-y-3">
          <form onSubmit={e => { e.preventDefault(); window.location.href = `/shop?search=${searchVal}`; setMenuOpen(false); }}
            className="flex border border-[#ddd] rounded-full overflow-hidden">
            <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search…" className="flex-1 px-4 py-2 text-sm outline-none" />
            <button type="submit" className="px-3 bg-[#c9a84c] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          {['All', ...categories].map(cat => (
            <Link key={cat} href={cat === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#333] hover:text-[#c9a84c] border-b border-[#f0ebe0]">
              {cat}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
