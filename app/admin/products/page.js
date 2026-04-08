'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

const CATEGORIES = ['All', 'Essentials', 'Fashion', 'Bags', 'Shoes', 'Fitness items', 'Household items', 'Kitchen', 'Home'];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [deleting, setDeleting] = useState(null);

  function fetchProducts() {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'All') params.set('category', category);
    if (search) params.set('search', search);
    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); });
  }

  useEffect(() => { fetchProducts(); }, [category]);

  function handleSearch(e) {
    e.preventDefault();
    fetchProducts();
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeleting(id);
    await fetch(`/api/products/id/${id}`, { method: 'DELETE' });
    setProducts(p => p.filter(x => x._id !== id));
    setDeleting(null);
  }

  async function toggleStock(id, current) {
    const res = await fetch(`/api/products/id/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: !current }),
    });
    const updated = await res.json();
    setProducts(p => p.map(x => x._id === id ? { ...x, inStock: updated.inStock } : x));
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl font-display font-bold">Products</h1>
            <p className="text-[#555] text-sm mt-1">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/products/new"
            className="gold-btn px-5 py-2.5 rounded-xl text-[#1a1a1a] text-sm font-semibold">
            + Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <form onSubmit={handleSearch} className="flex border border-[#2a2a2a] rounded-xl overflow-hidden flex-1 min-w-[200px] max-w-xs">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              className="flex-1 bg-[#111] text-white text-sm px-4 py-2.5 outline-none placeholder-[#444]"
            />
            <button type="submit" className="px-4 bg-[#1e1e1e] text-[#888] hover:text-white transition-colors text-sm">
              🔍
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  category === cat ? 'bg-[#c9a84c] text-[#1a1a1a]' : 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c]'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-[#1e1e1e] text-[#555] text-xs uppercase tracking-widest font-medium">
            <span>Image</span><span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Actions</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center text-[#444]">No products found</div>
          ) : (
            <div className="divide-y divide-[#1e1e1e]">
              {products.map(product => (
                <div key={product._id}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-3 hover:bg-[#161616] transition-colors">
                  {/* Image */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#1e1e1e]">
                    <Image
                      src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'}
                      alt={product.name}
                      fill className="object-cover" sizes="48px"
                    />
                  </div>
                  {/* Name */}
                  <div>
                    <p className="text-white text-sm font-medium line-clamp-1">{product.name}</p>
                    <p className="text-[#444] text-xs mt-0.5">{product.slug}</p>
                  </div>
                  {/* Category */}
                  <span className="text-[#888] text-xs bg-[#1e1e1e] px-2.5 py-1 rounded-full whitespace-nowrap">
                    {product.category}
                  </span>
                  {/* Price */}
                  <span className="text-[#c9a84c] text-sm font-semibold whitespace-nowrap">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {/* Stock toggle */}
                  <button onClick={() => toggleStock(product._id, product.inStock)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                      product.inStock ? 'bg-green-500/15 text-green-400 hover:bg-green-500/30' : 'bg-red-500/15 text-red-400 hover:bg-red-500/30'
                    }`}>
                    {product.inStock ? 'In Stock' : 'Sold Out'}
                  </button>
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/admin/products/edit/${product._id}`}
                      className="text-xs px-3 py-1.5 bg-[#1e1e1e] text-[#888] rounded-lg hover:text-white transition-colors">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      disabled={deleting === product._id}
                      className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50">
                      {deleting === product._id ? '…' : 'Del'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
