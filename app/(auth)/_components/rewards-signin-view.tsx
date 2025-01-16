'use client';

import { useState } from 'react';
import RewardsAuthForm from './rewards-user-auth-form';
import { Coins, CircleDollarSign } from 'lucide-react';

export default function RewardsSigninView() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Section */}
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-secondary" />
        <div className="relative z-20 flex items-center text-lg font-medium text-secondary-foreground">
          <div className="mr-[1rem] w-[fit-content] rounded-lg bg-black/10 p-1">
            <Coins className="h-6 w-6" />
          </div>
          <span>Rewardable</span>
        </div>

        <div className="relative z-20 mb-16 mt-24 flex items-center text-lg font-medium text-secondary-foreground">
          <h2 className="font-heading text-5xl">
            Sign up for exclusive <br />
            rewards and discounts
          </h2>
        </div>
        <div className="relative z-20 flex-col items-center text-lg font-medium text-secondary-foreground">
          <h2 className="mb-4 text-xl font-bold">Earn more when you spend</h2>
          <div className="relative flex flex-col items-start">
            {/* Step 1 */}
            <div className="relative flex items-start">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/50 text-lg font-bold text-secondary-foreground">
                  1
                </div>
                <div className="h-12 w-[1px] bg-black/50"></div>
              </div>
              <p className="text-md ml-4 mt-4">Spend money in our stores</p>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/50 text-lg font-bold text-secondary-foreground">
                  2
                </div>
                <div className="h-12 w-[1px] bg-black/50"></div>
              </div>
              <p className="text-md ml-4 mt-4">
                Enter your rewards id at checkout
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/50 text-lg font-bold text-secondary-foreground">
                  3
                </div>
              </div>
              <p className="text-md ml-4 mt-4">
                Points are added automatically
              </p>
            </div>
          </div>
          <div className="flex w-12 flex-col items-center">
            <div className="h-12 w-[1px] bg-black/50"></div>
          </div>
          <div className="rounded-lg rounded-bl-none rounded-br-none border border-b-0 border-black/50 p-4">
            <div className="flex flex-row items-center justify-start">
              <CircleDollarSign className="mr-1 h-6 w-6 text-secondary-foreground" />
              <p className="text-sm">1 Dollar</p>
            </div>
            <h3 className="mb-4 mt-1 text-lg font-bold">10 Points</h3>
            <p className="text-lg">Points deducted automatically at checkout</p>
          </div>
          <div className="rounded-lg rounded-tl-none rounded-tr-none border border-black/50 bg-black/10 p-4">
            <p className="text-secondary-foreground">
              Refer 5 friends and get extra rewards!
            </p>
          </div>
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
