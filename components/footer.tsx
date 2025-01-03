'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Footer = () => {
  const [email, setEmail] = useState('');
  return (
    <footer id="footer" className="bg-secondary-foreground text-white">
      <hr className="mx-auto hidden w-11/12 lg:block" />

      <section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-7">
        {/* Newsletter Signup */}
        <div className="order-last col-span-full xl:order-none xl:col-span-2">
          <h3 className="mb-4 text-lg font-bold">Stay Updated</h3>
          <p className="mb-4 opacity-60">
            Sign up for our newsletter to get the latest updates and exclusive
            deals!
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('Site is in demo mode');
              setEmail('');
            }}
            className="flex flex-wrap items-center gap-4"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="flex-grow rounded-md bg-white px-4 py-3 text-secondary-foreground placeholder-opacity-70 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
            <Button
              type="submit"
              className="h-[48px] w-full bg-secondary px-6 py-3 text-secondary-foreground hover:bg-secondary-50 sm:w-auto"
            >
              Subscribe
            </Button>
          </form>
        </div>

        {/* Spacer Column */}
        <div className="hidden xl:col-span-1 xl:block"></div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="//www.instagram.com/pizzacarrello/"
              className="opacity-60 hover:opacity-100"
            >
              Instagram
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="//www.facebook.com/pizzacarrello"
              className="opacity-60 hover:opacity-100"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Hours</h3>
          <div className="opacity-60">Tues-Sat: 11am-9pm</div>
          <div className="opacity-60">(Closed on Mondays)</div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Contact</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="mailto:pizzacarrello@pizzacarrello.com"
              className="opacity-60 hover:opacity-100"
            >
              pizzacslice@gmail.com
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              href="mailto:catering@pizzacarrello.com"
              className="opacity-60 hover:opacity-100"
            >
              catering@pizzaslice.com
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          <span className="opacity-60">&copy; 2024 made by </span>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.highplainsmedia.com"
            className="border-b-2 border-white text-white opacity-60 transition-all hover:border-b-2 hover:border-secondary hover:opacity-100"
          >
            High Plains Media
          </a>
        </h3>
      </section>
    </footer>
  );
};
