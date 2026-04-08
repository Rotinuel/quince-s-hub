import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';

async function getProduct(slug) {
  await dbConnect();
  const p = await Product.findOne({ slug }).lean();
  return p ? JSON.parse(JSON.stringify(p)) : null;
}

async function getRelated(category, excludeSlug) {
  await dbConnect();
  const products = await Product.find({ category, slug: { $ne: excludeSlug } }).limit(4).lean();
  return JSON.parse(JSON.stringify(products));
}

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(s => (
          <svg key={s} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
            fill={s <= Math.round(rating) ? '#c9a84c' : 'none'}
            stroke={s <= Math.round(rating) ? '#c9a84c' : '#ddd'} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-[#888]">{rating.toFixed(1)} ({count} reviews)</span>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await getRelated(product.category, slug);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#888] mb-8">
        <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#c9a84c] transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#c9a84c] transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-[#1a1a1a] truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main product layout */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f5f0e8]">
            <Image
              src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white text-[#1a1a1a] font-bold px-6 py-3 rounded-full text-sm uppercase tracking-widest">Sold Out</span>
              </div>
            )}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <span className="bg-[#2d5016] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">New</span>}
              {discount && <span className="bg-[#c9a84c] text-white text-xs font-bold px-3 py-1 rounded-full">-{discount}%</span>}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] hover:underline">
              {product.category}
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-2 leading-tight">
              {product.name}
            </h1>
          </div>

          {product.rating > 0 && <StarRating rating={product.rating} count={product.reviewCount} />}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-[#1a1a1a]">₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xl text-[#aaa] line-through">₦{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-[#555] leading-relaxed text-[15px]">{product.description}</p>
          )}

          {/* Variants */}
          {product.variants?.map(variant => (
            <div key={variant.name}>
              <p className="text-sm font-semibold text-[#1a1a1a] mb-2">{variant.name}:</p>
              <div className="flex flex-wrap gap-2">
                {variant.options.map(opt => (
                  <span key={opt} className="px-3 py-1.5 border border-[#ddd] rounded-lg text-sm text-[#555] cursor-pointer hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock – Ready to ship' : 'Out of Stock'}
            </span>
          </div>

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* Delivery info */}
          <div className="bg-[#f5f0e8] rounded-2xl p-5 space-y-3">
            <p className="text-sm font-semibold text-[#1a1a1a]">Delivery Information</p>
            <div className="space-y-2 text-sm text-[#555]">
              <div className="flex items-center gap-2"><span>🚚</span><span>Lagos: 24–72 hours after payment</span></div>
              <div className="flex items-center gap-2"><span>📦</span><span>Outside Lagos: 3–5 working days</span></div>
              <div className="flex items-center gap-2"><span>💳</span><span>Multiple payment options available</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-1">More Like This</p>
              <h2 className="font-display text-2xl font-bold text-[#1a1a1a]">Related Products</h2>
            </div>
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="text-sm text-[#c9a84c] font-medium hover:underline">
              View all {product.category} →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
