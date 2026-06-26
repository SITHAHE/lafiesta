import { motion } from 'framer-motion';
import { gallery } from '../data';
import { Img, Reveal } from './ui';

export default function Works() {
  return (
    <section id="works" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-grape-600/15 blur-[120px]" />
      <div className="container-x">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">✦ Наши работы</span>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight">
              Результаты, которыми <span className="text-gradient">хочется хвастаться</span>
            </h2>
          </div>
          <p className="max-w-sm text-grape-100/65">
            Окрашивания, маникюр и образы наших мастеров. Листайте — вдохновляйтесь и
            забирайте идею на свою следующую запись.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {gallery.map((g, i) => (
            <motion.figure
              key={g.img}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-grape-300/12"
            >
              <Img
                src={g.img}
                alt={g.label}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="font-display text-lg font-medium text-white drop-shadow">
                  {g.label}
                </span>
                <span className="rounded-full bg-magenta/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {g.cat}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
