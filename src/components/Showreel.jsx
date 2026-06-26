import { Img, Reveal } from './ui';
import { IconArrow } from './icons';

const VK_CLIPS = 'https://vk.com/lafiesta_style';

// Превью-карточки ведут в группу ВК с клипами.
// Когда будут ссылки на конкретные клипы — заменить на <iframe> VK-эмбеда.
const TILES = [
  { img: 'img/nails-swatches.webp', label: 'Палитра гель-лаков' },
  { img: 'img/hair-curls.webp', label: 'Укладки и локоны' },
  { img: 'img/makeup-creative.webp', label: 'Creative-макияж' },
];

function PlayBadge({ size = 'lg' }) {
  const cls = size === 'lg' ? 'h-20 w-20' : 'h-12 w-12';
  const tri = size === 'lg' ? 28 : 18;
  return (
    <span
      className={`relative grid ${cls} place-items-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-110`}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta/30" />
      <svg width={tri} height={tri} viewBox="0 0 24 24" fill="#fff" className="relative ml-1">
        <path d="M5 3.5v17l15-8.5z" />
      </svg>
    </span>
  );
}

export default function Showreel() {
  return (
    <section id="video" className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">✦ Видео</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight">
            Атмосфера <span className="text-gradient">в движении</span>
          </h2>
          <p className="mt-4 text-grape-100/70">
            Клипы из жизни студии: процессы, результаты и немного праздника. Полная подборка —
            в нашей группе ВКонтакте.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <a
            href={VK_CLIPS}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-grape-300/15 sm:aspect-[21/9]"
          >
            <Img
              src="img/studio-chairs.webp"
              alt="Интерьер студии La Fiesta с диско-декором"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
            <div className="absolute inset-0 grid place-items-center">
              <PlayBadge />
            </div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <div className="font-display text-2xl font-semibold text-white sm:text-3xl">
                Showreel студии La&nbsp;Fiesta
              </div>
              <div className="mt-1 inline-flex items-center gap-2 text-sm text-grape-100/80">
                Смотреть клипы ВКонтакте <IconArrow width={16} height={16} />
              </div>
            </div>
          </a>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TILES.map((t, i) => (
            <Reveal key={t.img} delay={i * 0.08}>
              <a
                href={VK_CLIPS}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video overflow-hidden rounded-2xl border border-grape-300/12"
              >
                <Img
                  src={t.img}
                  alt={t.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/40 transition-colors group-hover:bg-ink/20" />
                <div className="absolute inset-0 grid place-items-center">
                  <PlayBadge size="sm" />
                </div>
                <span className="absolute bottom-3 left-3 font-medium text-white drop-shadow">
                  {t.label}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
