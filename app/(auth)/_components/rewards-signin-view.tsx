'use client';

import { useState } from 'react';
import RewardsAuthForm from './rewards-user-auth-form';

export default function RewardsSigninView() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Section */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            className="lg:h-24"
            src="//images.ctfassets.net/dho5s3z0t7k5/39JXwo33YwseydUU1Izzdt/5e744498e883e3837ca91c48cd808c39/10219-removebg-preview.png"
            alt="Rewards Program Logo"
          />
          Rewards Program
        </div>
      </div>

      {/* Right Section */}
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignUp
                ? 'Join the Rewards Program'
                : 'Sign in to your account'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? 'Earn points and redeem rewards. Create your account below.'
                : 'Sign in to track your points and rewards.'}
            </p>
          </div>

          {/* Render the appropriate form */}
          {isSignUp ? (
            <RewardsAuthForm isSignUp={true} />
          ) : (
            <RewardsAuthForm isSignUp={false} />
          )}

          <p className="px-8 text-center text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
