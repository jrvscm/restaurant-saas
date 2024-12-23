import { MoveRight, Pizza, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReservationForm } from './reservation-form';

export const Hero = () => {
  return (
    <>
      <section className="relative flex min-h-[85vh] flex-col justify-between">
        <div className="flex min-h-screen w-full items-center justify-center bg-hero-image bg-cover bg-center">
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
                    flex-col gap-4 rounded-bl-md rounded-br-md rounded-tl-none rounded-tr-none bg-black/50 px-8 py-8 
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
                  At Pizza Carrello, all of our food is made with the most fresh
                  and highest quality ingredients available, from our specialty
                  in-house artisan crust, to the wood we burn in our handmade
                  oven, to our ultra-simple and exquisite sauces, our passion
                  for good food comes through in every bite.
                </p>
                <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
                  <Button
                    size="lg"
                    className="w-full gap-4 md:w-auto"
                    variant="outline"
                  >
                    Menu <Pizza className="h-4 w-4" />
                  </Button>
                  <Button size="lg" className="w-full gap-4 md:w-auto">
                    Order Now <MoveRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Red Container */}
              <div
                className="
                    order-1
                    flex animate-fade-in
                    flex-col gap-4 rounded-bl-none rounded-br-none rounded-tl-md rounded-tr-md bg-primary px-8 py-8 
                    text-white md:order-2
                    md:rounded-bl-none md:rounded-br-md
                    md:rounded-tl-none md:rounded-tr-md 
                    md:py-12 lg:px-16 
                    lg:py-16
                    "
              >
                <Gift className="mx-auto mb-4 hidden h-8 w-8 text-white md:block" />
                <h2 className="text-center font-logo text-2xl font-semibold">
                  Give the Gift of Pizza!
                </h2>
                <p className="hidden rounded-md py-2 text-center font-serif text-sm leading-relaxed tracking-tight md:block md:text-base lg:text-lg">
                  Treat your friends and family to the perfect gift. Purchase a
                  Pizza Carrello gift card today and make someone's day extra
                  special!
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="w-full gap-4 bg-white text-primary hover:bg-white/90 md:w-auto"
                  >
                    Buy Gift Card
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reservation Bar */}
        <div className="mt-[0rem] w-full md:mt-[-1rem]">
          <ReservationForm />
        </div>
      </section>
    </>
  );
};
