import { motion } from 'framer-motion';
import { reviews, contacts } from '../data';
import { Reveal, fadeStagger, fadeItem } from './ui';
import { IconStar, IconVK } from './icons';

export default function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-magenta/12 blur-[120px]" />
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">✦ Отзывы гостей</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight">
            <span className="text-gradient">5,0</span> из 5 — и это не случайно
          </h2>
          <p className="mt-4 text-grape-100/70">
            Настоящие отзывы из нашей группы ВКонтакте. Спасибо каждой гостье за тёплые слова!
          </p>
        </Reveal>

        <motion.div
          variants={fadeStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {reviews.map((r) => (
            <motion.figure
              key={r.name}
              variants={fadeItem}
              className="glass flex flex-col rounded-3xl p-7 shadow-card"
            >
              <div className="mb-4 flex text-champagne">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar key={i} width={16} height={16} />
                ))}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-grape-50/90">
                «{r.text}»
              </blockquote>
              <figcaption className="mt-6 border-t border-grape-300/12 pt-5">
                <div className="font-display text-lg font-semibold">{r.name}</div>
                <div className="mt-0.5 text-sm text-grape-200/70">{r.service}</div>
                <div className="mt-0.5 text-xs text-grape-200/50">{r.date}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <Reveal className="mt-10 text-center">
          <a
            href={contacts.vk}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <IconVK width={18} height={18} /> Все отзывы ВКонтакте
          </a>
        </Reveal>
      </div>
    </section>
  );
}
