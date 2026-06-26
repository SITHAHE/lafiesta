import Navbar from './components/Navbar';
import MobileIntro from './components/MobileIntro';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Works from './components/Works';
import Atmosphere from './components/Atmosphere';
import Reviews from './components/Reviews';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Мобильный интро-экран (фиксированный фон, только < lg) */}
      <MobileIntro />
      {/* распорка на один экран — сквозь неё виден интро-шар (только мобайл) */}
      <div aria-hidden className="h-screen lg:hidden" />

      <main>
        {/* Hero прозрачен на мобиле: сквозь него виден интро-шар,
            поверх поднимается только стеклянная карточка */}
        <Hero />

        {/* Непрозрачный слой: наезжает поверх интро-шара, полностью его перекрывая */}
        <div className="relative z-10 bg-ink">
          <Marquee />
          <Services />
          <Works />
          <Atmosphere />
          <Reviews />
          <Contacts />
          <Footer />
        </div>
      </main>
    </div>
  );
}
