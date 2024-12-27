'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const isDashboard = pathname?.startsWith('/dashboard');
    const theme = isDashboard ? 'theme-dashboard' : 'theme-landing';
    document.documentElement.className = theme;
  }, [pathname]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
}
