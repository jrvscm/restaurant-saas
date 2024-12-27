'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function VerificationPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const failed = params.get('failed');

    if (success) {
      // Verified users redirect to `/dashboard`
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else if (failed) {
      // Show error message
      alert('Verification failed. Please try again.');
    }
  }, [router]);

  const handleResend = async () => {
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Verification email resent successfully!');
      } else {
        alert('Failed to resend verification email.');
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <Badge variant="outline">Almost there!</Badge>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-regular max-w-2xl text-center text-5xl tracking-tighter md:text-7xl">
              We need to verify your account.
            </h1>
            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              We&apos;ve sent an email to your registered address. Please check your inbox and confirm your account.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button onClick={handleResend}>Resend Email</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
