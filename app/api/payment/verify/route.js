import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref');
    const ref = reference || trxref;

    if (!ref) {
      return NextResponse.redirect(new URL('/cart?payment=failed', request.url));
    }

    await dbConnect();

    // Verify with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${ref}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const data = await response.json();

    if (data.data?.status === 'success') {
      const orderId = data.data.metadata?.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'paid',
          status: 'confirmed',
        });
      }
      return NextResponse.redirect(new URL(`/order-success?ref=${ref}&orderId=${orderId || ''}`, request.url));
    } else {
      return NextResponse.redirect(new URL('/cart?payment=failed', request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/cart?payment=error', request.url));
  }
}

// Webhook for server-side confirmation
export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    // Verify webhook signature
    const crypto = await import('crypto');
    const hash = crypto.createHmac('sha512', PAYSTACK_SECRET).update(body).digest('hex');
    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    if (event.event === 'charge.success') {
      await dbConnect();
      const ref = event.data.reference;
      const orderId = event.data.metadata?.orderId;
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'paid',
          status: 'confirmed',
          paystackRef: ref,
        });
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
