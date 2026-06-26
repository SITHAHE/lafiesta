import { useEffect, useRef } from 'react';
import { asset } from './ui';

// Фоновый диско-шар для Hero. Вращение привязано к скроллу (как на сайтах Apple):
// позиция кадра = прогресс прокрутки героя. Работает и на тач-устройствах (iPad) —
// для этого декодер «праймится» коротким play→pause, иначе iOS не рендерит перемотку.
// При prefers-reduced-motion — статичный постер.
export default function DiscoVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // только постер

    // «Прайм»: разогреваем декодер, чтобы перемотка по скроллу рендерилась
    // и на тач/iOS (iPad). Паузу ставим по первому кадру + страховочный таймер,
    // чтобы шар не «самовращался» до скролла.
    let primed = false;
    let primeTimer = 0;
    const finishPrime = () => {
      if (primed) return;
      primed = true;
      clearTimeout(primeTimer);
      video.pause();
      try { video.currentTime = 0; } catch (e) { /* noop */ }
    };
    video
      .play()
      .then(() => {
        if (typeof video.requestVideoFrameCallback === 'function') {
          video.requestVideoFrameCallback(() => finishPrime());
        } else {
          finishPrime();
        }
      })
      .catch(() => finishPrime());
    primeTimer = setTimeout(finishPrime, 350);

    // --- Скраб по скроллу ---
    const section = video.closest('section');
    let duration = 0;
    let ready = false;
    let current = 0;
    let raf = 0;
    let idle = 0;

    const TURNS = 2; // полных оборотов на весь диапазон прокрутки героя

    const onMeta = () => {
      duration = video.duration || 0;
      ready = duration > 0;
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta);

    const progress = () => {
      const rect = (section || video).getBoundingClientRect();
      const vh = window.innerHeight || 1;
      return Math.min(1, Math.max(0, -rect.top / (vh * 1.1)));
    };

    const loop = () => {
      if (ready) {
        const target = progress() * duration * TURNS;
        current += (target - current) * 0.16; // плавное сглаживание
        if (!video.seeking) {
          const t = ((current % duration) + duration) % duration;
          if (Math.abs(t - video.currentTime) > 1 / 50) video.currentTime = t;
        }
        // останавливаем цикл, когда догнали цель (бережём ресурсы)
        if (Math.abs(target - current) < 0.002) {
          if (++idle > 8) {
            raf = 0;
            return;
          }
        } else {
          idle = 0;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      idle = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(primeTimer);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      video.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  return (
    <div className="disco-bg" aria-hidden="true">
      <span className="disco-bg__glow" />
      <video
        ref={videoRef}
        className="disco-bg__el"
        poster={asset('video/disco-poster.jpg')}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
      >
        <source src={asset('video/disco.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
