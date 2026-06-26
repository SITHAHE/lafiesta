// Иконки в едином стиле (Lucide-подобные), 24x24, stroke currentColor.
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const IconScissors = (p) => (
  <svg {...base} {...p}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" /></svg>
);
export const IconSparkles = (p) => (
  <svg {...base} {...p}><path d="M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-2.06L8 4l1.94 5.94L16 12l-6.06 2.06Z" /><path d="M19 3v4M21 5h-4M18 17v2M19 18h-2" /></svg>
);
export const IconHand = (p) => (
  <svg {...base} {...p}><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" /><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>
);
export const IconBrush = (p) => (
  <svg {...base} {...p}><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" /><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02Z" /></svg>
);
export const IconEye = (p) => (
  <svg {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const IconHeart = (p) => (
  <svg {...base} {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
);
export const IconPhone = (p) => (
  <svg {...base} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
);
export const IconPin = (p) => (
  <svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const IconClock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconStar = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={p.width || 24} height={p.height || 24} {...p}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" /></svg>
);
export const IconArrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconMenu = (p) => (
  <svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
);
export const IconClose = (p) => (
  <svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const IconTelegram = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={p.width || 24} height={p.height || 24} {...p}><path d="M21.94 4.6 18.6 20.3c-.25 1.1-.9 1.38-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.16 9.4-8.49c.4-.36-.09-.57-.63-.2L5.16 13.1l-5-1.56c-1.08-.34-1.1-1.08.23-1.6L20.54 3.04c.9-.34 1.69.2 1.4 1.56Z" /></svg>
);
export const IconWhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={p.width || 24} height={p.height || 24} {...p}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.76.46 3.45 1.34 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.04-1.14.21-3.69-.78-3.1-1.22-5.1-4.4-5.25-4.6-.15-.2-1.25-1.66-1.25-3.18 0-1.51.79-2.25 1.07-2.56.28-.31.61-.39.81-.39.2 0 .41 0 .58.01.19.01.44-.07.69.53.24.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.61.18.3.78 1.29 1.68 2.09 1.16 1.03 2.13 1.35 2.43 1.5.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.57.35.07.13.07.73-.17 1.41Z" /></svg>
);
export const IconVK = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={p.width || 24} height={p.height || 24} {...p}><path d="M13.16 18.06c-6.34 0-9.96-4.35-10.11-11.58h3.18c.1 5.31 2.44 7.56 4.3 8.02V6.48h2.99v4.58c1.83-.2 3.76-2.29 4.41-4.58h2.99c-.5 2.82-2.58 4.9-4.06 5.76 1.48.7 3.85 2.51 4.75 5.82h-3.3c-.7-2.18-2.46-3.87-4.79-4.1v4.1h-.36Z" /></svg>
);
