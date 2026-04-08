import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';

export async function GET() {
  try {
    await dbConnect();
    const [totalProducts, totalOrders, orders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find({}).lean(),
    ]);
    const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const pending = orders.filter(o => o.status === 'pending').length;
    const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5).lean();
    return NextResponse.json({ totalProducts, totalOrders, revenue, pending, recentOrders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
