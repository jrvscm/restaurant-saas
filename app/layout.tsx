import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import '@fontsource/fredericka-the-great';
// import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // const isDashboard = pathname === '/dashboard'; // Check if the current route is '/dashboard'

  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body className={''}>
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
