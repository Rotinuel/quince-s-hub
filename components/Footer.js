import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#aaa] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="font-display text-3xl font-bold text-white">
            Quinces Hub<span className="text-[#c9a84c]">.</span>
          </span>
          <p className="mt-4 text-sm leading-relaxed text-[#888]">
            Quality essentials for everyday living. Delivering across Nigeria with care and speed.
          </p>
          <div className="flex gap-4 mt-6">
            {['instagram', 'facebook', 'whatsapp'].map(s => (
              <a key={s} href="#" className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-xs capitalize">
                {s[0].toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Shop</h4>
          <ul className="space-y-2 text-sm">
            {['Essentials', 'Fashion', 'Bags', 'Shoes', 'Fitness items', 'Household items', 'Kitchen'].map(c => (
              <li key={c}><Link href={`/shop?category=${encodeURIComponent(c)}`} className="hover:text-[#c9a84c] transition-colors">{c}</Link></li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Information</h4>
          <ul className="space-y-2 text-sm">
            {['About Us', 'Contact Us', 'Shipping Policy', 'Returns & Refunds', 'Privacy Policy'].map(l => (
              <li key={l}><a href="#" className="hover:text-[#c9a84c] transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Delivery Info</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="text-[#c9a84c] mt-0.5">📍</span>
              <span>Lagos, Nigeria</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#c9a84c] mt-0.5">🚚</span>
              <span>Within Lagos: <strong className="text-white">24–72 hrs</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#c9a84c] mt-0.5">📦</span>
              <span>Outside Lagos: <strong className="text-white">3–5 working days</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#c9a84c] mt-0.5">💳</span>
              <span>Multiple payment options available</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a] py-5 text-center text-xs text-[#555]">
        © {new Date().getFullYear()} Bazzan Essentials. All rights reserved. Built with ❤️ in Nigeria.
      </div>
    </footer>
  );
}
