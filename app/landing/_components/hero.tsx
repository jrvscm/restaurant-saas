'use client';

import { MoveRight, Pizza } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/custom-icons';
import { toast } from 'sonner';

export const Hero = () => {
  const handleMenuScroll = () => {
    //TODO: make a ref work here
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative flex flex-col justify-between">
        <div className="flex min-h-[99vh] w-full items-center justify-center bg-hero-image bg-cover bg-center">
          <div
            className="
                container mx-auto flex h-full flex-col justify-between 
                pl-[1rem] pr-[1rem] 
                pt-[6rem] md:pl-[3rem]
                md:pr-[3rem] md:pt-[0rem]
            "
          >
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              {/* Dark Container */}
              <div
                className="
                    order-2
                    flex animate-fade-in
                    flex-col gap-4 rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none bg-black/75 px-8 py-8 
                    text-white md:order-1
                    md:rounded-bl-md md:rounded-br-none
                    md:rounded-tl-md md:rounded-tr-none 
                    md:py-12 lg:px-16 
                    lg:py-16
                  "
              >
                <h1 className="mx-auto max-w-lg text-center font-logo text-4xl tracking-tighter md:text-5xl lg:text-7xl">
                  Wood is Good!
                </h1>
                <p className="mx-auto max-w-md rounded-md py-2 text-center font-serif text-sm leading-relaxed tracking-tight md:text-base lg:text-lg">
                  At Pizza Slice, all of our food is made with the most fresh
                  and highest quality ingredients available, from our specialty
                  in-house artisan crust, to the wood we burn in our handmade
                  oven, to our ultra-simple and exquisite sauces, our passion
                  for good food comes through in every bite.
                </p>
                <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
                  <Button
                    onClick={handleMenuScroll}
                    size="lg"
                    className="w-full gap-4 md:w-auto"
                    variant="ghostMuted"
                  >
                    Menu <Pizza className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => toast.success('Site is in demo mode')}
                    size="lg"
                    className="w-full gap-4 border-secondary bg-secondary text-secondary-foreground hover:bg-secondary-95 hover:text-secondary-foreground md:w-auto"
                  >
                    Order Now <MoveRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Yellow Container */}
              <div
                className="
                    order-1
                    flex animate-fade-in
                    flex-col gap-4 rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md bg-secondary-95 px-8 py-8 
                    md:order-2
                    md:rounded-bl-none md:rounded-br-md
                    md:rounded-tl-none md:rounded-tr-md 
                    md:py-12 lg:px-16 
                    lg:py-16
                    "
              >
                <Icon
                  name="pizzaSlice"
                  className="mx-auto text-secondary-foreground"
                />
                <h2 className="text-center font-logo text-2xl font-semibold text-secondary-foreground">
                  Give the Gift of Pizza!
                </h2>
                <p className="hidden rounded-md py-2 text-center font-serif text-base leading-relaxed tracking-tight text-secondary-foreground md:block md:text-base lg:text-lg">
                  Treat your friends and family to the perfect gift. Purchase a
                  Pizza Slice gift card today and make someone's day extra
                  special!
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => toast.success('Site is in demo mode')}
                    variant="ghostMuted"
                    size="lg"
                    className="w-full gap-4 text-secondary-foreground underline md:w-auto"
                  >
                    Buy Gift Card
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
