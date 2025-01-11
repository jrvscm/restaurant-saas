// import { NextResponse, NextRequest } from 'next/server';
// import { decodeJwt } from './lib/utils';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;
//   const { pathname } = req.nextUrl;

//   const isDashboardRoute = pathname.startsWith('/dashboard');
//   const isVerificationRoute = pathname === '/verification';
//   const isSigninRoute = pathname === '/signin';

//   const response = NextResponse.next();

//   if (token) {
//     const decoded = decodeJwt(token);

//     if (!decoded) {
//       console.error('Token is invalid. Redirecting to /signin.');
//       if (isDashboardRoute || isVerificationRoute) {
//         return NextResponse.redirect(new URL('/signin', req.url));
//       }
//       return response; // Allow public routes
//     }

//     // Redirect verified users away from /verification
//     if (isVerificationRoute && decoded.status === 'verified') {
//       return NextResponse.redirect(new URL('/dashboard', req.url));
//     }

//     // Redirect logged-in users from /signin
//     if (isSigninRoute) {
//       if (decoded.status === 'verified') {
//         return NextResponse.redirect(new URL('/dashboard', req.url));
//       } else {
//         return NextResponse.redirect(new URL('/verification', req.url));
//       }
//     }

//     // Redirect unverified users from /dashboard to /verification
//     if (isDashboardRoute && decoded.status !== 'verified') {
//       return NextResponse.redirect(new URL('/verification', req.url));
//     }

//     // Attach the encoded token to the response headers
//     response.headers.set('X-Session', JSON.stringify({ token })); // Include raw token
//   }

//   // If not authenticated and trying to access dashboard or verification
//   if (!token) {
//     if (isDashboardRoute || isVerificationRoute) {
//       return NextResponse.redirect(new URL('/signin', req.url));
//     }
//   }

//   return response;
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/verification', '/signin'] // Apply to relevant routes
// };

import { NextResponse, NextRequest } from 'next/server';
import { decodeJwt } from './lib/utils';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isRewardsRoute =
    pathname.startsWith('/rewards') && pathname !== '/rewards/signin';
  const isVerificationRoute = pathname === '/verification';
  const isSigninRoute = pathname === '/signin';
  const isRewardsSigninRoute = pathname === '/rewards/signin';

  // Handle unauthenticated users
  if (!token) {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    if (isRewardsRoute && !isRewardsSigninRoute) {
      return NextResponse.redirect(new URL('/rewards/signin', req.url));
    }
    // Allow access to sign-in routes
    return NextResponse.next();
  }

  // Decode the token
  const decoded = decodeJwt(token);

  if (!decoded) {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    if (isRewardsRoute) {
      return NextResponse.redirect(new URL('/rewards/signin', req.url));
    }
    // Allow users to stay on the sign-in page even if their token is invalid
    if (isSigninRoute || isRewardsSigninRoute) {
      return NextResponse.next();
    }
    return NextResponse.next();
  }

  // Rewards User Logic
  if (decoded.role === 'rewards_user') {
    if (
      isRewardsRoute &&
      !isVerificationRoute &&
      decoded.status !== 'verified'
    ) {
      return NextResponse.redirect(new URL('/verification', req.url));
    }
    if (isRewardsSigninRoute && decoded.status === 'verified') {
      return NextResponse.redirect(new URL(`/rewards/${decoded.id}`, req.url));
    }
    if (isVerificationRoute && decoded.status === 'verified') {
      return NextResponse.redirect(new URL(`/rewards/${decoded.id}`, req.url));
    }
  }

  // Admin User Logic
  if (decoded.role !== 'rewards_user') {
    if (isDashboardRoute && decoded.status !== 'verified') {
      return NextResponse.redirect(new URL('/verification', req.url));
    }
    if (isSigninRoute && decoded.status === 'verified') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (isVerificationRoute && decoded.status === 'verified') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Allow access if no conditions match
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/verification', '/signin', '/rewards/:path*']
};
