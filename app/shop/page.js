import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

async function getProducts({ category, search, featured }) {
  try {
    await dbConnect();
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) query.name = { $regex: search, $options: 'i' };
    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

const categories = ['All', 'Essentials', 'Fashion', 'Bags', 'Shoes', 'Fitness items', 'Household items', 'Kitchen', 'Home'];

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const category = params.category || 'All';
  const search = params.search || '';
  const featured = params.featured || '';

  const products = await getProducts({ category, search, featured });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-[#1a1a1a] mb-2">
          {search ? `Search: "${search}"` : category === 'All' ? 'All Products' : category}
        </h1>
        <p className="text-sm text-[#888]">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#888] mb-3">Categories</p>
            {categories.map(cat => (
              <Link
                key={cat}
                href={cat === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                  category === cat
                    ? 'bg-[#c9a84c] text-[#1a1a1a] font-semibold'
                    : 'text-[#555] hover:bg-[#f5f0e8] hover:text-[#1a1a1a]'
                }`}
              >
                <span>{cat}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {/* Mobile category pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden mb-6">
            {categories.map(cat => (
              <Link
                key={cat}
                href={cat === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  category === cat
                    ? 'bg-[#c9a84c] border-[#c9a84c] text-[#1a1a1a]'
                    : 'border-[#ddd] text-[#555] hover:border-[#c9a84c]'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-[#f5f0e8] rounded-2xl">
              <p className="text-4xl mb-4">🔍</p>
              <h2 className="font-display text-2xl font-bold text-[#555] mb-2">No products found</h2>
              <p className="text-sm text-[#888] mb-6">Try a different category or search term</p>
              <Link href="/shop" className="gold-btn px-6 py-2.5 rounded-full text-[#1a1a1a] font-semibold text-sm inline-block">
                Browse All
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
