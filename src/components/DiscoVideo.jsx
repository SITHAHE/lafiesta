import { useEffect, useRef } from 'react';
import { asset } from './ui';

// Фоновый диско-шар для Hero. На десктопе вращение привязано к скроллу
// (как на сайтах Apple): позиция кадра = прогресс прокрутки героя.
// На тач-устройствах (надёжная перемотка недоступна) — плавный авто-луп.
// При prefers-reduced-motion — статичный постер.
export default function DiscoVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // только постер

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) {
      video.loop = true;
      const play = () => video.play().catch(() => {});
      if (video.readyState >= 2) play();
      else video.addEventListener('canplay', play, { once: true });
      return () => video.removeEventListener('canplay', play);
    }

    // --- Desktop: скраб по скроллу ---
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
