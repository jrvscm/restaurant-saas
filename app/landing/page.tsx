import { Navbar } from './_components/navbar';
import { Hero } from './_components/hero';
import { Menu } from './_components/menu';
import { Footer } from '@/components/footer';

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Menu />
      <Footer />
    </>
  );
}
