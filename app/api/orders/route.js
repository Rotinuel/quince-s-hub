// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import Order from '@/models/Order';

// export async function POST(request) {
//   try {
//     await dbConnect();
//     const body = await request.json();
//     const order = await Order.create(body);
//     return NextResponse.json(order, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     await dbConnect();
//     const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
//     return NextResponse.json(orders);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    // Generate unique order number with retry on collision
    let order;
    let attempts = 0;
    while (attempts < 5) {
      try {
        order = await Order.create(body);
        break;
      } catch (e) {
        if (e.code === 11000) { attempts++; continue; }
        throw e;
      }
    }
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
