import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer id="footer" className="bg-secondary-foreground text-white">
      <hr className="w-11/12 mx-auto hidden lg:block" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-x-12 gap-y-8">
        {/* Newsletter Signup */}
        <div className="col-span-full xl:col-span-2 order-last xl:order-none">
          <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
          <p className="opacity-60 mb-4">
            Sign up for our newsletter to get the latest updates and exclusive deals!
          </p>
          <form className="flex flex-wrap items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-md bg-white text-secondary-foreground placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
              required
            />
            <Button
              type="submit"
              className="px-6 py-3 h-[48px] w-full sm:w-auto hover:bg-secondary/80 bg-secondary text-secondary-foreground"
            >
              Subscribe
            </Button>
          </form>
        </div>

        {/* Spacer Column */}
        <div className="hidden xl:block xl:col-span-1"></div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow Us</h3>
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
          <h3 className="font-bold text-lg">Hours</h3>
          <div className="opacity-60">Tues-Sat: 11am-9pm</div>
          <div className="opacity-60">(Closed on Mondays)</div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Contact</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="mailto:pizzacarrello@pizzacarrello.com"
              className="opacity-60 hover:opacity-100"
            >
              pizzacarrello@gmail.com
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              href="mailto:catering@pizzacarrello.com"
              className="opacity-60 hover:opacity-100"
            >
              catering@pizzacarrello.com
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          <span className="opacity-60">&copy; 2024 made by{" "}</span>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.highplainsmedia.com"
            className="text-white opacity-60 border-white border-b-2 hover:opacity-100 transition-all hover:border-secondary hover:border-b-2"
          >
            High Plains Media
          </a>
        </h3>
      </section>
    </footer>
  );
};
