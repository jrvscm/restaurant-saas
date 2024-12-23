'use client';

import { usePathname } from 'next/navigation';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Example: Apply different classes or behaviors based on route
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className={isDashboard ? 'dashboard-layout' : 'non-dashboard-layout'}>
      {children}
    </div>
  );
};

export default ClientWrapper;
