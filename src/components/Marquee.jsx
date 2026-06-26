const WORDS = [
  'Волосы',
  'Ногти',
  'Макияж',
  'Брови',
  'Ресницы',
  'SPA',
  'Массаж',
  'Солярий',
  'Окрашивание',
  'Сияние',
];

export default function Marquee() {
  const line = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-grape-300/15 bg-plum/40 py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl font-medium text-grape-100/80 sm:text-3xl">
              {w}
            </span>
            <span className="text-magenta">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
