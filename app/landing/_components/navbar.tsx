'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Menu, MoveRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  // Detect scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Shrink logo after scrolling 50px
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container relative mx-auto flex items-center justify-between gap-4">
        {/* Navigation Menu */}
        <div className="hidden gap-4 lg:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink>
                      <Button variant="ghost">{item.title}</Button>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="text-sm font-medium">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                            <Button size="sm" className="mt-10">
                              Book a call today
                            </Button>
                          </div>
                          <div className="flex h-full flex-col justify-end text-sm">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row items-center justify-between rounded px-4 py-2 hover:bg-muted"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="h-4 w-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Logo Section */}
        <div className="flex hidden items-center justify-center lg:block">
          <Link href="/">
            <img
              src="https://images.ctfassets.net/dho5s3z0t7k5/58Ryuo5v7tB18ttCyLEl3l/3483fa8b81ab779f5f897923a9339908/s917989311326017337_p5_i3_w640-removebg-preview.png"
              alt="Pizza Carrello Logo"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-12' : 'h-24'
              } w-auto object-contain`}
            />
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="ghost"
            className="hidden md:inline"
            asChild // Allows Button to inherit the behavior of the wrapped element
          >
            <a href="tel:+13073631743">(307) 363-1PIE</a>
          </Button>
          <Button variant="outline">Sign in</Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu */}
        <div className="fixed left-0 top-0 z-50 w-full bg-background lg:hidden">
          {/* Top Bar with Logo and Hamburger Menu */}
          <div className="flex items-center justify-between border-b border-primary px-4 py-4">
            {/* Logo on the left */}
            <Link href="/" className="flex items-center">
              <img
                src="https://images.ctfassets.net/dho5s3z0t7k5/58Ryuo5v7tB18ttCyLEl3l/3483fa8b81ab779f5f897923a9339908/s917989311326017337_p5_i3_w640-removebg-preview.png"
                alt="Pizza Carrello Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Hamburger Menu on the right */}
            <Button
              variant="ghost"
              className="p-2"
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
            absolute left-0 top-16 flex h-[calc(100vh-4rem)] w-full flex-col justify-between overflow-y-auto bg-background px-4 py-6 transition-transform duration-300
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            {/* Navigation Links */}
            <nav className="flex flex-col gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setOpen(false)} // Close menu when clicked
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Buttons at the bottom */}
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Button>
              <Button className="w-full" onClick={() => setOpen(false)}>
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
