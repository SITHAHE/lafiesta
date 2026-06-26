import { contacts, bookingUrl } from '../data';
import { Reveal } from './ui';
import {
  IconPhone,
  IconPin,
  IconClock,
  IconArrow,
  IconTelegram,
  IconWhatsApp,
  IconVK,
} from './icons';

const mapSrc = contacts.mapEmbed;

export default function Contacts() {
  return (
    <section id="contacts" className="relative py-20 sm:py-28">
      <div className="container-x">
        {/* CTA-плашка */}
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-magenta/30 p-8 text-center sm:p-14">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-grape-800 via-plum to-ink" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-magenta/30 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-grape-500/30 blur-[90px]" />

          <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-tight">
            Готовы устроить себе <span className="text-gradient">день красоты?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-grape-100/80">
            Запишитесь онлайн за минуту — выберите удобное время в Telegram или напишите нам.
            Мы ответим за 15 минут.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              <IconTelegram width={18} height={18} /> Записаться в Telegram
            </a>
            <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
              <IconWhatsApp width={18} height={18} /> Написать в WhatsApp
            </a>
          </div>
        </Reveal>

        {/* контакты + карта */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-4">
            <ContactRow icon={IconPin} title="Адрес" lines={[contacts.addressFull, contacts.metro]}
              href={contacts.mapLink} />
            <ContactRow icon={IconPhone} title="Телефон" lines={[contacts.phoneDisplay]} href={contacts.phoneHref} />
            <ContactRow icon={IconClock} title="Часы работы" lines={[contacts.hours]} />

            <div className="mt-2 flex gap-3">
              <Social icon={IconTelegram} href={contacts.telegram} label="Telegram" />
              <Social icon={IconWhatsApp} href={contacts.whatsapp} label="WhatsApp" />
              <Social icon={IconVK} href={contacts.vk} label="ВКонтакте" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-grape-300/15">
            <iframe
              title="Карта — La Fiesta на Маршала Блюхера 7к2"
              src={mapSrc}
              className="h-72 w-full lg:h-full lg:min-h-[20rem]"
              loading="lazy"
              style={{ border: 0, filter: 'invert(0.92) hue-rotate(190deg) saturate(0.7)' }}
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, title, lines, href }) {
  const inner = (
    <div className="glass flex items-start gap-4 rounded-2xl p-5 transition-colors hover:border-magenta/40">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-grape-600 to-magenta text-white">
        <Icon width={22} height={22} />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-grape-200/60">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-[15px] font-medium text-grape-50">{l}</div>
        ))}
      </div>
      {href && <IconArrow width={18} height={18} className="ml-auto mt-1 text-grape-300/60" />}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Social({ icon: Icon, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-grape-300/20 bg-white/5 text-grape-100 transition-all hover:border-magenta/50 hover:bg-magenta/15 hover:text-white"
    >
      <Icon width={20} height={20} />
    </a>
  );
}
