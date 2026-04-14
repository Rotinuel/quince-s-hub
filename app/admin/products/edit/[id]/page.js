// 'use client';
// import { useEffect, useState } from 'react';
// import { use } from 'react';
// import ProductForm from '@/components/ProductForm';
// import AdminSidebar from '@/components/AdminSidebar';

// export default function EditProductPage({ params }) {
//   const { id } = use(params);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/products/id/${id}`)
//       .then(r => r.json())
//       .then(data => { setProduct(data); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-[#0f0f0f]">
//         <AdminSidebar />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="w-10 h-10 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
//         </main>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex min-h-screen bg-[#0f0f0f]">
//         <AdminSidebar />
//         <main className="flex-1 flex items-center justify-center text-[#555]">Product not found</main>
//       </div>
//     );
//   }

//   return <ProductForm initial={product} productId={id} />;
// }


'use client';
import { useEffect, useState } from 'react';
import { use } from 'react';
import ProductForm from '@/components/ProductForm';
import AdminSidebar from '@/components/AdminSidebar';

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/id/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0f0f0f]">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen bg-[#0f0f0f]">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center text-[#555]">Product not found</main>
      </div>
    );
  }

  return <ProductForm initial={product} productId={id} />;
}
