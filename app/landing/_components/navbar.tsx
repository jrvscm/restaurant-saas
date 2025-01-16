'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export const Navbar = () => {
  const navigationItems = [
    {
      title: 'Home',
      href: '/',
      description: ''
    },
    {
      title: 'About Us',
      href: '/about',
      description: ''
    },
    {
      title: 'Menu',
      href: '/menu',
      description: ''
    },
    {
      title: 'Contact',
      href: '/contact',
      description: ''
    }
  ];

  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 w-full border-b border-primary transition-all duration-300 ${
        isScrolled ? 'lg:bg-black/60 lg:py-2 lg:backdrop-blur-2xl' : 'lg:py-4'
      }`}
    >
      <div className="container relative mx-auto flex items-center justify-start gap-4">
        {/* Logo Section */}
        <div className="flex hidden items-center justify-center lg:block">
          <Link href="/">
            <img
              src="//images.ctfassets.net/dho5s3z0t7k5/39JXwo33YwseydUU1Izzdt/5e744498e883e3837ca91c48cd808c39/10219-removebg-preview.png"
              alt="Pizza Slice Logo"
              className={`transition-all duration-300 ${
                isScrolled ? 'lg:h-12' : 'lg:h-24'
              } w-auto object-contain`}
            />
          </Link>
        </div>
        {/* Navigation Menu */}
        <div className="hidden gap-4 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink>
                    <Button
                      onClick={() => toast.success('Site is in demo mode')}
                      variant="ghostMuted"
                    >
                      {item.title}
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Buttons */}
        <div className="ml-auto flex hidden gap-4 lg:block">
          <Button variant="ghostMuted" className="hidden lg:inline" asChild>
            <a href="tel:+13073631743">(333) PIZZA-PIE</a>
          </Button>
          <Link href={'/rewards/signin'}>
            <Button>Rewards</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="fixed left-0 top-0 z-50 w-full bg-secondary-foreground lg:hidden">
          {/* Top Bar with Logo and Hamburger Menu */}
          <div className="flex items-center justify-between border-b border-primary px-4 py-4">
            {/* Logo on the left */}
            <Link href="/" className="flex items-center">
              <img
                src="//images.ctfassets.net/dho5s3z0t7k5/39JXwo33YwseydUU1Izzdt/5e744498e883e3837ca91c48cd808c39/10219-removebg-preview.png"
                alt="Pizza slice Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Hamburger Menu on the right */}
            <Button
              className="p-2 text-white"
              onClick={() => setOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Content */}
          <div
            className={`
              absolute left-0 top-[81px] flex h-[calc(100vh-81px)] w-full flex-col justify-between bg-secondary-foreground px-4 py-6 transition-transform duration-300
              ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            {/* Navigation Links */}
            <nav className="flex flex-col gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  // href={item.href}
                  href={''}
                  className="text-lg font-medium text-white transition-colors hover:text-primary"
                  onClick={() => {
                    toast.success('Site is in demo mode');
                    setOpen(false);
                  }} // Close menu when clicked
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Buttons at the bottom */}
            <div className="flex flex-col gap-4">
              {
                <Link href="/rewards/signin">
                  <Button className="w-full" onClick={() => setOpen(false)}>
                    Sign In
                  </Button>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
