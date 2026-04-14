import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';

export async function POST(request) {
  try {
    await dbConnect();
    const { orderId, email, amount } = await request.json();

    if (!PAYSTACK_SECRET) {
      return NextResponse.json({ error: 'Paystack not configured. Set PAYSTACK_SECRET_KEY in .env.local' }, { status: 503 });
    }

    // Initialize transaction with Paystack
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack uses kobo
        reference: `QZN-${orderId}-${Date.now()}`,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/verify`,
        metadata: { orderId },
      }),
    });

    const data = await response.json();
    if (!data.status) {
      return NextResponse.json({ error: data.message || 'Paystack error' }, { status: 400 });
    }

    // Save reference to order
    await Order.findByIdAndUpdate(orderId, { paystackRef: data.data.reference });

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
