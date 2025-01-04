import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the token cookie by matching all the attributes used when it was set
  response.cookies.set('token', '', {
    maxAge: -1, // Expire the cookie immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain:
      process.env.NODE_ENV === 'production'
        ? '.pizzalander.netlify.app'
        : undefined
  });

  return response;
}
