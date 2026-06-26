import { useEffect, useRef } from 'react';
import { asset } from './ui';
import { IconStar } from './icons';

// Мобильный интро-экран: шар во весь экран + название студии.
// Шар вращается ПО СКРОЛЛУ (как на десктопе), название плавно затухает
// по мере прокрутки, а поверх (в App) поднимается только стеклянная карточка Hero.
export default function MobileIntro() {
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const content = contentRef.current;
    if (!video) return;
    video.muted = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // «Прайм»: коротко запускаем и ставим на паузу, чтобы браузер (в т.ч. iOS)
    // рендерил кадры при последующей перемотке по скроллу.
    if (!reduce) {
      video
        .play()
        .then(() => {
          video.pause();
          try { video.currentTime = 0; } catch (e) { /* noop */ }
        })
        .catch(() => {});
    }

    let duration = 0;
    let ready = false;
    let current = 0;
    let target = 0;
    let raf = 0;
    let idle = 0;
    // Высоту вьюпорта кэшируем и обновляем ТОЛЬКО по resize.
    // На iOS innerHeight «дышит» при сворачивании адресной строки во время скролла —
    // если читать его на каждый scroll, надпись дёргается. Кэш убирает дрожь.
    let vh = window.innerHeight || 1;
    let cOpacity = 1; // сглаженная (покадровая) прозрачность надписи

    const TURNS = 1.15;

    // Если браузер умеет scroll-driven анимации — затуханием надписи рулит CSS
    // (.intro-content в index.css) на композиторном потоке. JS его НЕ трогает,
    // иначе перетрёт и снова посадит на main-thread/видео-jank.
    const cssScroll =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('animation-timeline: scroll()');

    if (content && !cssScroll) {
      // Композитим на GPU — затухание и увод вверх без релейаута
      content.style.willChange = 'opacity, transform';
    }

    const onMeta = () => {
      duration = video.duration || 0;
      ready = duration > 0;
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta);

    const update = () => {
      if (ready && !reduce) {
        // Растягиваем оборот на ~1.5 высоты экрана — медленнее и премиальнее
        target = Math.min(1, Math.max(0, window.scrollY / (vh * 1.5))) * duration * TURNS;
      }
      // Reduced motion (и нет CSS scroll-anim): затухаем мгновенно по скроллу
      if (reduce && content && !cssScroll) {
        content.style.opacity = String(Math.max(0, 1 - window.scrollY / (vh * 0.55)));
      }
    };

    // Затухание надписи считаем покадрово в rAF (а не по событиям scroll,
    // которые iOS прореживает при инерции) → плавно, без ступенек.
    // Используется только как фолбэк, когда CSS scroll-driven недоступен.
    const fadeContent = () => {
      if (!content || cssScroll) return true;
      const targetOpacity = Math.max(0, Math.min(1, 1 - window.scrollY / (vh * 0.5)));
      cOpacity += (targetOpacity - cOpacity) * 0.14;
      const settled = Math.abs(targetOpacity - cOpacity) < 0.002;
      if (settled) cOpacity = targetOpacity;
      content.style.opacity = cOpacity.toFixed(3);
      // Осознанный увод вверх по мере затухания — движение читается как намеренное,
      // а микро-дрейф адресной строки на его фоне незаметен.
      const up = (1 - cOpacity) * 34;
      content.style.transform = `translate3d(0, ${(-up).toFixed(1)}px, 0)`;
      return settled;
    };

    const loop = () => {
      if (reduce) {
        raf = 0;
        return;
      }
      const contentSettled = fadeContent();

      let ballSettled = true;
      if (ready) {
        // Мягче инерция (меньше коэффициент → плавнее «доводка», без рывков)
        current += (target - current) * 0.085;
        if (!video.seeking) {
          const t = ((current % duration) + duration) % duration;
          if (Math.abs(t - video.currentTime) > 1 / 60) video.currentTime = t;
        }
        ballSettled = Math.abs(target - current) < 0.002;
      }

      if (ballSettled && contentSettled) {
        if (++idle > 12) {
          raf = 0;
          return;
        }
      } else {
        idle = 0;
      }
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      update();
      idle = 0;
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      vh = window.innerHeight || 1;
      update();
      idle = 0;
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      video.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  return (
    <section
      className="fixed inset-0 z-0 overflow-hidden bg-ink bg-aurora lg:hidden"
      aria-hidden="true"
    >
      <span className="intro-ball-glow" />
      <video
        ref={videoRef}
        className="intro-ball"
        poster={asset('video/disco-poster.jpg')}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
      >
        <source src={asset('video/disco.mp4')} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/85 to-transparent" />

      <div ref={contentRef} className="intro-content absolute inset-0">
        <div className="absolute inset-x-0 bottom-28 px-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-grape-300/25 bg-white/5 px-3 py-1.5">
            <span className="flex text-champagne">
              {[0, 1, 2, 3, 4].map((i) => (
                <IconStar key={i} width={11} height={11} />
              ))}
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-grape-100">
              Рейтинг 5,0
            </span>
          </div>
          <div className="overflow-visible pb-2 font-script text-[clamp(2.2rem,11vw,3rem)] leading-[1.35] text-gradient">
            La&nbsp;Fiesta
          </div>
          <p className="mt-4 font-display text-2xl font-medium text-grape-50">
            Студия красоты
          </p>
          <p className="mt-2 text-sm text-grape-200/70">Санкт-Петербург · м. Лесная</p>
        </div>

        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-grape-200/70">
          <span className="text-[11px] uppercase tracking-[0.2em]">листайте вниз</span>
          <svg
            className="animate-bounce"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
