'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeProvider from './ThemeToggle/theme-provider';

export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const isDashboard = pathname?.startsWith('/dashboard');
    const isVerification = pathname === '/verification';
    const theme =
      isDashboard || isVerification ? 'theme-dashboard dark' : 'theme-landing';
    document.documentElement.className = theme;
    setMounted(true);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
