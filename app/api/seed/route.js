import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

const products = [
  // Kitchen
  { name: '4pcs Luxury Stoneware Dinner Set', slug: '4pcs-stoneware-dinner-set', category: 'Kitchen', price: 7000, description: '1 mug, 1 Soup Bowl, 1 small Flat Plate, 1 Big Flat Plate. Elegant stoneware set for modern dining.', image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600', inStock: true, featured: true, isNew: true, rating: 4.8, reviewCount: 12 },
  { name: 'Premium Non-Stick Pot Set (5pcs)', slug: 'non-stick-pot-set-5pcs', category: 'Kitchen', price: 89000, description: 'Sizes: 20cm, 24cm, 28cm, 32cm + sauce pan. 5 Pots with 5 Glass Lids.', image: 'https://images.unsplash.com/photo-1584990347449-a5d9f800a783?w=600', inStock: true, featured: true, rating: 4.9, reviewCount: 28 },
  { name: '5.5L Electric Kettle', slug: 'electric-kettle-5l', category: 'Kitchen', price: 21700, description: 'High-capacity stainless steel electric kettle with auto shut-off.', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600', inStock: true, rating: 4.6, reviewCount: 19 },
  { name: '15L Oven Toaster Griller', slug: 'oven-toaster-griller-15l', category: 'Kitchen', price: 44000, description: 'Versatile countertop oven for toasting, grilling, and baking.', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600', inStock: true, rating: 5.0, reviewCount: 8, isNew: true },
  { name: 'Multicoloured Mug (24oz)', slug: 'multicoloured-mug-24oz', category: 'Kitchen', price: 3500, originalPrice: 4000, description: 'Vibrant 24oz ceramic mug, perfect for coffee, tea, or cocoa.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600', inStock: true, rating: 4.5, reviewCount: 34 },

  // Household
  { name: 'ES-515 Food Flask (900ML)', slug: 'food-flask-900ml', category: 'Household items', price: 10500, description: 'Premium 900ml insulated food flask. Keeps food hot for 6 hours.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', inStock: true, rating: 4.7, reviewCount: 22 },
  { name: 'Hand Dryer', slug: 'hand-dryer', category: 'Household items', price: 2700, description: 'Compact and powerful electric hand dryer for home use.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', inStock: true, rating: 4.2, reviewCount: 7 },
  { name: 'Shopping Basket (Large)', slug: 'shopping-basket-large', category: 'Household items', price: 3700, description: 'Durable woven shopping basket with comfortable handles.', image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=600', inStock: true, rating: 4.4, reviewCount: 15 },
  { name: 'Ice Cream Water Bottle', slug: 'ice-cream-water-bottle', category: 'Household items', price: 3000, description: 'Fun and stylish insulated water bottle with ice cream motif.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', inStock: true, isNew: true, rating: 4.3, reviewCount: 11 },
  { name: 'Mini Alarm Clock', slug: 'mini-alarm-clock', category: 'Household items', price: 3000, description: 'Compact digital alarm clock with LED display and snooze function.', image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600', inStock: true, rating: 5.0, reviewCount: 6 },

  // Essentials
  { name: 'Vitamin C Serum', slug: 'vitamin-c-serum', category: 'Essentials', price: 1400, originalPrice: 1700, description: 'Brightening Vitamin C serum for radiant, even-toned skin. Suitable for all skin types.', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600', inStock: true, featured: true, rating: 5.0, reviewCount: 44 },
  { name: '3-in-1 Hair Straightener', slug: '3in1-hair-straightener', category: 'Essentials', price: 3800, description: 'Straighten, curl, or wave your hair with one versatile tool.', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', inStock: true, rating: 5.0, reviewCount: 18 },
  { name: 'Silicon Foldable Kettle', slug: 'silicon-foldable-kettle', category: 'Essentials', price: 6000, description: 'Travel-friendly collapsible silicone kettle. Perfect for on-the-go.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600', inStock: true, rating: 5.0, reviewCount: 9 },

  // Fashion
  { name: 'Classic Leather Watch (Black)', slug: 'leather-watch-black', category: 'Fashion', price: 8500, description: 'Elegant black leather strap watch with minimalist dial. Perfect for all occasions.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', inStock: true, featured: true, isNew: true, rating: 4.8, reviewCount: 31, variants: [{ name: 'Style', options: ['Chain Watch', 'Leather Watch'] }] },
  { name: 'Gold Chain Bracelet', slug: 'gold-chain-bracelet', category: 'Fashion', price: 6000, description: 'Luxurious 18k gold-plated chain bracelet. Makes a bold statement.', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600', inStock: true, rating: 4.6, reviewCount: 20 },
  { name: 'Sunglasses (UV400)', slug: 'sunglasses-uv400', category: 'Fashion', price: 5500, description: 'Stylish UV400 protection sunglasses. Available in multiple frame styles.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600', inStock: true, rating: 4.4, reviewCount: 17 },

  // Bags
  { name: 'Tote Bag (019)', slug: 'tote-bag-019', category: 'Bags', price: 13000, description: 'Spacious and durable canvas tote bag. Ideal for shopping or everyday use.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', inStock: true, featured: true, rating: 4.7, reviewCount: 23 },
  { name: 'Crossbody Bag (021)', slug: 'crossbody-bag-021', category: 'Bags', price: 13000, description: 'Chic crossbody bag with adjustable strap and multiple compartments.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', inStock: false, rating: 4.5, reviewCount: 14 },
  { name: 'Gym Duffel Bag', slug: 'gym-duffel-bag', category: 'Bags', price: 15000, description: 'Heavy-duty gym bag with shoe compartment and wet pocket.', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600', inStock: true, rating: 4.6, reviewCount: 10 },

  // Shoes
  { name: 'Casual Sneakers (Unisex)', slug: 'casual-sneakers-unisex', category: 'Shoes', price: 6700, description: 'Lightweight and breathable casual sneakers. Available in sizes 25-37.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', inStock: true, featured: true, rating: 3.0, reviewCount: 8, variants: [{ name: 'Size', options: ['25','26','27','28','29','30','31','32','33','34','35','36','37'] }] },
  { name: 'Massage Slippers', slug: 'massage-slippers', category: 'Shoes', price: 6800, description: 'Acupressure massage slippers for relaxing foot relief after a long day.', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600', inStock: true, rating: 5.0, reviewCount: 25 },

  // Fitness
  { name: 'Resistance Bands Set', slug: 'resistance-bands-set', category: 'Fitness items', price: 5000, description: 'Set of 5 resistance bands with varying tension levels. Great for home workouts.', image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=600', inStock: true, isNew: true, rating: 4.7, reviewCount: 33 },
  { name: 'Jump Rope (Speed)', slug: 'jump-rope-speed', category: 'Fitness items', price: 2500, description: 'High-speed skipping rope with ball bearings for smooth rotation.', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600', inStock: true, rating: 4.5, reviewCount: 16 },
  { name: 'Yoga Mat (6mm)', slug: 'yoga-mat-6mm', category: 'Fitness items', price: 7500, description: 'Non-slip 6mm thick yoga mat with carrying strap. Suitable for yoga, pilates, and stretching.', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600', inStock: true, rating: 4.8, reviewCount: 21 },
];

export async function GET() {
  try {
    await dbConnect();
    await Product.deleteMany({});
    await Product.insertMany(products);
    return NextResponse.json({ message: `Seeded ${products.length} products successfully` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
