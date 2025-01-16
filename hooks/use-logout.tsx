'use client';

import { useRouter, usePathname } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      // Redirect to the login page
      if (pathname.includes('/rewards')) {
        router.push('/rewards/signin');
      } else {
        router.push('/signin');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return logout;
}
