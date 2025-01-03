import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import '@fontsource/fredericka-the-great';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Dynamic Theming Example',
  description: 'Landing and Dashboard Theming with Middleware'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = headers().get('X-Session'); // Get theme from middleware
  return (
    <html lang="en" className={`${lato.className}`} suppressHydrationWarning>
      <body>
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
