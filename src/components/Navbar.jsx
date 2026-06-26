import { useEffect, useState } from 'react';
import { nav, bookingUrl } from '../data';
import { IconMenu, IconClose, IconArrow } from './icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`container-x flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass shadow-card' : 'border border-transparent'
        }`}
      >
        <a href="#top" className="flex items-baseline gap-2 leading-none">
          <span className="font-script text-3xl text-gradient sm:text-4xl">La Fiesta</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-grape-100/80 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden sm:inline-flex"
          >
            Записаться <IconArrow width={16} height={16} />
          </a>
          <button
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-grape-300/25 bg-white/5 text-grape-50 lg:hidden"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* мобильное меню */}
      <div
        className={`fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-7 px-8 text-center">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-grape-50 transition-colors hover:text-magenta"
            >
              {n.label}
            </a>
          ))}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4"
          >
            Записаться онлайн <IconArrow width={16} height={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
