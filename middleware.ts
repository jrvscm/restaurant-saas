import { NextRequest, NextResponse } from 'next/server';

export function decodeJwt(token: string) {
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

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isVerificationRoute = pathname === '/verification';
  const isSigninRoute = pathname === '/signin';

  const response = NextResponse.next();

  if (token) {
    try {
      const decoded = decodeJwt(token);

      // Check token expiration
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        if (isDashboardRoute || isVerificationRoute) {
          return NextResponse.redirect(new URL('/signin', req.url));
        }
        return response;
      }

      // Redirect logged-in users away from `/signin`
      if (isSigninRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // Redirect verified users away from `/verification`
      if (isVerificationRoute && decoded.status === 'verified') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // Attach session to the response
      response.headers.set('X-Session', JSON.stringify(decoded));
    } catch (error) {
      console.error('Middleware Error:', error.message);
      if (isDashboardRoute || isVerificationRoute) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
    }
  } else {
    // Redirect unauthenticated users away from `/dashboard` or `/verification`
    if (isDashboardRoute || isVerificationRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/verification', '/signin'], // Apply to relevant routes
};
