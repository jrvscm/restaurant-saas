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

  // Determine if the request is for the dashboard
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');
  const isVerificationRoute = req.nextUrl.pathname === '/verification';

  // Set theme headers for SSR
  const response = NextResponse.next();
  response.headers.set('X-Theme', isDashboardRoute ? 'theme-dashboard' : 'theme-landing');

  // Handle authentication logic
  if (!token) {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    return response; // Allow public routes
  }

  try {
    const decoded = decodeJwt(token);
    if (!decoded) {
      throw new Error('Failed to decode token');
    }

    // Check if the token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      if (isDashboardRoute) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
      return response; // Allow public routes
    }

    // Check verification status
    if (decoded.status !== 'verified') {
      if (isDashboardRoute) {
        return NextResponse.redirect(new URL('/verification', req.url));
      }
      return response; // Allow `/verification`
    }

    // Redirect verified users away from `/verification`
    if (isVerificationRoute) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return response;
  } catch (err) {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    return response; // Allow public routes
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/verification'], // Apply middleware to dashboard and verification routes
};
