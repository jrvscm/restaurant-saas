import { NextRequest, NextResponse } from 'next/server';

export function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error.message);
    return null;
  }
}

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isVerificationRoute = pathname === '/verification';
  const isSigninRoute = pathname === '/signin';

  const response = NextResponse.next();

  if (token) {
    const decoded = decodeJwt(token);

    if (!decoded) {
      console.error('Token is invalid. Redirecting to /signin.');
      if (isDashboardRoute || isVerificationRoute) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
      return response; // Allow public routes
    }

    // Redirect verified users away from /verification
    if (isVerificationRoute && decoded.status === 'verified') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Redirect logged-in users from /signin
    if (isSigninRoute) {
      if (decoded.status === 'verified') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/verification', req.url));
      }
    }

    // Redirect unverified users from /dashboard to /verification
    if (isDashboardRoute && decoded.status !== 'verified') {
      return NextResponse.redirect(new URL('/verification', req.url));
    }

    // Attach the encoded token to the response headers
    response.headers.set('X-Session', JSON.stringify({ token })); // Include raw token
  }

  // If not authenticated and trying to access dashboard or verification
  if (!token) {
    if (isDashboardRoute || isVerificationRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/verification', '/signin'], // Apply to relevant routes
};
