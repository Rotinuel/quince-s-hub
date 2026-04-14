import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'quinces2024';
const JWT_SECRET = process.env.JWT_SECRET || 'bazzan-secret-key-change-in-production';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
