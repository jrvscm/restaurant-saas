import { NextRequest, NextResponse } from 'next/server';

export function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    return NextResponse.next(); // Allow public routes
  }

  try {
    const decoded = decodeJwt(token);
    if (!decoded) {
      throw new Error('Failed to decode token');
    }

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
      return NextResponse.next(); // Allow public routes
    }

    if (decoded.status !== 'verified') {
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/verification', req.url));
      }
      return NextResponse.next(); // Allow `/verification`
    }

    if (req.nextUrl.pathname === '/verification') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    return NextResponse.next(); // Allow public routes
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/verification'], // Apply middleware to dashboard and verification routes
};

