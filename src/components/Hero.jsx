import { motion } from 'framer-motion';
import DiscoVideo from './DiscoVideo';
import { bookingUrl, contacts, stats } from '../data';
import { IconArrow, IconStar, IconPin } from './icons';

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-screen flex-col overflow-hidden"
    >
      {/* фон-градиент только на десктопе; на мобиле сквозь Hero виден интро-шар */}
      <div className="absolute inset-0 -z-10 hidden bg-aurora lg:block" />

      {/* фон: диско-шар (вращается по скроллу) — только десктоп (.disco-bg скрыт на мобиле) */}
      <DiscoVideo />

      {/* матовая вуаль для читаемости текста (десктоп) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            'linear-gradient(105deg, rgba(8,5,16,0.92) 0%, rgba(8,5,16,0.72) 34%, rgba(8,5,16,0.25) 62%, rgba(8,5,16,0) 80%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-40 bg-gradient-to-t from-ink to-transparent lg:block" />

      {/* контент */}
      <div className="container-x relative z-10 flex flex-1 items-center pt-28 pb-8 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="glass max-w-xl rounded-[2rem] bg-ink/55 p-7 shadow-card sm:p-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-grape-300/25 bg-white/5 px-4 py-1.5">
            <span className="flex text-champagne">
              {[0, 1, 2, 3, 4].map((i) => (
                <IconStar key={i} width={13} height={13} />
              ))}
            </span>
            <span className="text-xs font-semibold tracking-wide text-grape-100">
              Рейтинг 5,0 · {contacts.metro}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.98]">
            Студия красоты
            <br />
            <span className="text-gradient">и&nbsp;праздника</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-grape-100/85">
            <span className="font-script text-3xl text-magenta">La&nbsp;Fiesta</span> — уютное
            пространство в Санкт-Петербурге, где волосы, ногти, макияж и SPA превращаются
            в приятный ритуал. Каждый раз вы уходите сияющей.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              Записаться онлайн <IconArrow width={16} height={16} />
            </a>
            <a href="#services" className="btn-ghost w-full sm:w-auto">
              Услуги и цены
            </a>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-grape-200/75">
            <IconPin width={16} height={16} className="text-magenta" />
            {contacts.addressShort} · {contacts.hours}
          </div>
        </motion.div>
      </div>

      {/* статистика — только десктоп (на мобиле мешает наезду стекла на шар) */}
      <div className="container-x relative z-10 hidden pb-10 lg:block">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-grape-300/15 bg-grape-300/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink/60 px-5 py-6 text-center backdrop-blur">
              <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-grape-200/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
