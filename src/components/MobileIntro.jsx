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

    const TURNS = 1.15;

    const onMeta = () => {
      duration = video.duration || 0;
      ready = duration > 0;
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta);

    const update = () => {
      const vh = window.innerHeight || 1;
      if (content) {
        content.style.opacity = String(Math.max(0, 1 - window.scrollY / (vh * 0.55)));
      }
      if (ready && !reduce) {
        // Растягиваем оборот на ~1.5 высоты экрана — медленнее и премиальнее
        target = Math.min(1, Math.max(0, window.scrollY / (vh * 1.5))) * duration * TURNS;
      }
    };

    const loop = () => {
      if (!ready || reduce) {
        raf = 0;
        return;
      }
      // Мягче инерция (меньше коэффициент → плавнее «доводка», без рывков)
      current += (target - current) * 0.085;
      if (!video.seeking) {
        const t = ((current % duration) + duration) % duration;
        if (Math.abs(t - video.currentTime) > 1 / 60) video.currentTime = t;
      }
      if (Math.abs(target - current) < 0.002) {
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

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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

      <div ref={contentRef} className="absolute inset-0">
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
