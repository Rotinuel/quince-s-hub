import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';

async function getFeaturedProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ featured: true }).limit(8).lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

async function getNewArrivals() {
  try {
    await dbConnect();
    const products = await Product.find({ isNew: true }).limit(4).lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

const categories = [
  { name: 'Essentials', icon: '✨', color: 'bg-[#fef9ec]', border: 'border-[#e8d5a0]', count: '69+' },
  { name: 'Fashion', icon: '👗', color: 'bg-[#fdf0f5]', border: 'border-[#f4c2d4]', count: '186+' },
  { name: 'Bags', icon: '👜', color: 'bg-[#f0f4ff]', border: 'border-[#c2d0f4]', count: '60+' },
  { name: 'Shoes', icon: '👟', color: 'bg-[#f0faf5]', border: 'border-[#b2e0c8]', count: '93+' },
  { name: 'Fitness items', icon: '💪', color: 'bg-[#fff4f0]', border: 'border-[#f4c8b2]', count: '23+' },
  { name: 'Household items', icon: '🏠', color: 'bg-[#f5f0ff]', border: 'border-[#d4c2f4]', count: '264+' },
  { name: 'Kitchen', icon: '🍳', color: 'bg-[#fffaf0]', border: 'border-[#f0e0b2]', count: '108+' },
  { name: 'Home', icon: '🛋️', color: 'bg-[#f0fbff]', border: 'border-[#b2d8f0]', count: '50+' },
];

export default async function HomePage() {
  const [featured, newArrivals] = await Promise.all([getFeaturedProducts(), getNewArrivals()]);
  const hasProducts = featured.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#1a1a1a] overflow-hidden min-h-130 flex items-center">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c9a84c 0%, transparent 40%)' }} />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a84c\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <div className="inline-block bg-[#c9a84c] text-[#1a1a1a] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest fade-up">
              Special Offer Available
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight fade-up-delay-1">
              Everything You<br />
              <span className="text-[#c9a84c]">Need,</span> Delivered.
            </h1>
            <p className="text-[#aaa] text-lg leading-relaxed max-w-md fade-up-delay-2">
              Shop quality essentials, fashion, kitchen, household items and more. Fast delivery across Nigeria.
            </p>
            <div className="flex flex-wrap gap-4 fade-up-delay-3">
              <Link href="/shop" className="gold-btn px-8 py-3.5 rounded-full text-[#1a1a1a] font-semibold text-sm tracking-wide">
                Shop Now
              </Link>
              <Link href="/shop?category=Essentials" className="border border-[#444] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                View Essentials
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-8 pt-4 fade-up-delay-3">
              {[['700+', 'Products'], ['24–72hr', 'Lagos Delivery'], ['5★', 'Rated']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-white">{n}</div>
                  <div className="text-xs text-[#888] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image collage */}
          <div className="hidden md:grid grid-cols-2 gap-3 h-100">
            {[
              'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
              'https://images.unsplash.com/photo-1584990347449-a5d9f800a783?w=400',
              'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
            ].map((src, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}>
                <Image src={src} alt="" fill className="object-cover" sizes="200px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery banner */}
      <div className="bg-[#f5f0e8] border-y border-[#e8d5a0]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-8 text-sm text-[#555]">
          {[
            ['🚚', 'Lagos delivery: 24–72 hours'],
            ['📦', 'Outside Lagos: 3–5 working days'],
            ['💳', 'Flexible payment options'],
            ['🔒', 'Secure checkout'],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-1">Browse</p>
            <h2 className="font-display text-3xl font-bold text-[#1a1a1a]">Shop by Category</h2>
          </div>
          <Link href="/shop" className="text-sm text-[#c9a84c] font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map(cat => (
            <Link key={cat.name} href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className={`${cat.color} ${cat.border} border rounded-2xl p-4 flex flex-col items-center gap-2 text-center hover:shadow-md transition-all duration-200 hover:-translate-y-1 group`}>
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
              <span className="text-xs font-semibold text-[#1a1a1a] leading-tight">{cat.name}</span>
              <span className="text-[10px] text-[#888]">{cat.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-1">Handpicked</p>
            <h2 className="font-display text-3xl font-bold text-[#1a1a1a]">Featured Products</h2>
          </div>
          <Link href="/shop?featured=true" className="text-sm text-[#c9a84c] font-medium hover:underline">See all →</Link>
        </div>

        {!hasProducts ? (
          <div className="text-center py-16 bg-[#f5f0e8] rounded-2xl">
            <p className="text-xl font-display text-[#555] mb-2">No products yet</p>
            <p className="text-sm text-[#888] mb-6">Seed the database to get started</p>
            <a href="/api/seed" className="gold-btn px-6 py-2.5 rounded-full text-[#1a1a1a] font-semibold text-sm inline-block">
              Seed Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-[#1a1a1a] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-1">Just In</p>
                <h2 className="font-display text-3xl font-bold text-white">New Arrivals</h2>
              </div>
              <Link href="/shop?new=true" className="text-sm text-[#c9a84c] font-medium hover:underline">See all →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="relative bg-linear-to-br from-[#c9a84c] to-[#8b6914] rounded-3xl overflow-hidden p-12 text-center">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 50%)' }} />
          <p className="text-[#1a1a1a]/70 text-xs uppercase tracking-widest font-semibold mb-3">Limited Time</p>
          <h2 className="font-display text-4xl font-bold text-[#1a1a1a] mb-4">Special Offers Await</h2>
          <p className="text-[#1a1a1a]/70 mb-8 max-w-md mx-auto">Browse our full collection and discover great deals on household essentials, fashion, and more.</p>
          <Link href="/shop" className="inline-block bg-[#1a1a1a] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#333] transition-colors">
            Shop All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
