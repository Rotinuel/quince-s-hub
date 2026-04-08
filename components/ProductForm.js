'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import Image from 'next/image';

const CATEGORIES = ['Essentials', 'Fashion', 'Bags', 'Shoes', 'Fitness items', 'Household items', 'Kitchen', 'Home'];

const EMPTY = {
  name: '', slug: '', category: 'Essentials', price: '', originalPrice: '',
  description: '', image: '', inStock: true, featured: false, isNew: false,
  rating: '', reviewCount: '',
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProductForm({ initial, productId }) {
  const router = useRouter();
  const [form, setForm] = useState(initial || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key, val) {
    setForm(f => {
      const next = { ...f, [key]: val };
      if (key === 'name' && !productId) next.slug = slugify(val);
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        rating: form.rating ? Number(form.rating) : 0,
        reviewCount: form.reviewCount ? Number(form.reviewCount) : 0,
      };
      const url = productId ? `/api/products/id/${productId}` : '/api/products';
      const method = productId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Save failed');
      }
      router.push('/admin/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#c9a84c] transition-colors placeholder-[#444]";
  const labelCls = "block text-xs text-[#666] uppercase tracking-widest font-medium mb-1.5";

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="text-[#555] hover:text-white transition-colors text-sm">← Back</button>
            <div>
              <h1 className="text-white text-3xl font-display font-bold">
                {productId ? 'Edit Product' : 'New Product'}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-5">
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
                  <h3 className="text-white font-semibold text-sm">Basic Info</h3>
                  <div>
                    <label className={labelCls}>Product Name *</label>
                    <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Product name" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Slug *</label>
                    <input required value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="product-slug" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Category *</label>
                    <select required value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Description</label>
                    <textarea value={form.description} onChange={e => set('description', e.target.value)}
                      rows={4} placeholder="Product description…" className={inputCls + ' resize-none'} />
                  </div>
                </div>

                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
                  <h3 className="text-white font-semibold text-sm">Pricing</h3>
                  <div>
                    <label className={labelCls}>Price (₦) *</label>
                    <input required type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} placeholder="5000" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Original Price (₦) – for sale badge</label>
                    <input type="number" min="0" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="Leave empty if not on sale" className={inputCls} />
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
                  <h3 className="text-white font-semibold text-sm">Media</h3>
                  <div>
                    <label className={labelCls}>Image URL</label>
                    <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/…" className={inputCls} />
                  </div>
                  {form.image && (
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#1e1e1e]">
                      <Image src={form.image} alt="Preview" fill className="object-cover" sizes="300px"
                        onError={() => set('image', '')} />
                    </div>
                  )}
                </div>

                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
                  <h3 className="text-white font-semibold text-sm">Status & Badges</h3>
                  {[
                    { key: 'inStock', label: 'In Stock' },
                    { key: 'featured', label: 'Featured on Homepage' },
                    { key: 'isNew', label: 'Show "New" Badge' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center justify-between cursor-pointer">
                      <span className="text-[#888] text-sm">{label}</span>
                      <div className="relative">
                        <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} className="sr-only" />
                        <div onClick={() => set(key, !form[key])}
                          className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${form[key] ? 'bg-[#c9a84c]' : 'bg-[#2a2a2a]'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 space-y-4">
                  <h3 className="text-white font-semibold text-sm">Rating</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Rating (0–5)</label>
                      <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => set('rating', e.target.value)} placeholder="4.5" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Review Count</label>
                      <input type="number" min="0" value={form.reviewCount} onChange={e => set('reviewCount', e.target.value)} placeholder="12" className={inputCls} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button type="submit" disabled={saving}
                className={`px-8 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  saving ? 'bg-[#2a2a2a] text-[#666] cursor-not-allowed' : 'gold-btn text-[#1a1a1a]'
                }`}>
                {saving ? 'Saving…' : productId ? 'Update Product' : 'Create Product'}
              </button>
              <button type="button" onClick={() => router.back()}
                className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-white transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
