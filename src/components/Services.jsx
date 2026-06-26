import { motion } from 'framer-motion';
import { services, bookingUrl } from '../data';
import { Img, Reveal, fadeStagger, fadeItem } from './ui';
import {
  IconScissors,
  IconSparkles,
  IconHand,
  IconBrush,
  IconEye,
  IconHeart,
  IconArrow,
} from './icons';

const ICONS = {
  'hair-color': IconSparkles,
  'hair-cut': IconScissors,
  nails: IconHand,
  makeup: IconBrush,
  'brows-lashes': IconEye,
  spa: IconHeart,
};

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">✦ Услуги студии</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight">
            Красота от макушки <span className="text-gradient">до кончиков ногтей</span>
          </h2>
          <p className="mt-4 text-grape-100/70">
            Более 10 направлений красоты под одной крышей — от окрашивания до SPA.
            Прозрачные цены и результат, за которым возвращаются снова и снова.
          </p>
        </Reveal>

        <motion.div
          variants={fadeStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((s) => {
            const Icon = ICONS[s.id] || IconSparkles;
            return (
              <motion.article
                key={s.id}
                variants={fadeItem}
                className="group flex flex-col overflow-hidden rounded-3xl border border-grape-300/15 bg-ink-soft/60 transition-all duration-500 hover:border-magenta/40 hover:shadow-glow-sm"
              >
                <div className="relative h-44 overflow-hidden">
                  <Img
                    src={s.img}
                    alt={s.title}
                    style={s.imgPos ? { objectPosition: s.imgPos } : undefined}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/30 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold tracking-wide text-grape-100 backdrop-blur">
                    {s.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-grape-500 to-magenta text-white shadow-glow-sm">
                    <Icon width={22} height={22} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-grape-100/65">{s.blurb}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-grape-300/10 pt-5">
                    {s.items.map((it) => (
                      <li key={it.name} className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="text-grape-100/85">{it.name}</span>
                        <span className="shrink-0 whitespace-nowrap font-semibold text-champagne">
                          {it.price}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-magenta transition-colors hover:text-orchid"
                  >
                    Записаться на услугу
                    <IconArrow width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
