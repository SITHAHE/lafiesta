import { nav, contacts } from '../data';
import { IconTelegram, IconWhatsApp, IconVK } from './icons';

export default function Footer() {
  return (
    <footer className="border-t border-grape-300/12 bg-ink-soft/50">
      <div className="container-x py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <span className="font-script text-4xl text-gradient">La Fiesta</span>
            <p className="mt-3 text-sm leading-relaxed text-grape-100/60">
              Студия красоты и праздника в Санкт-Петербурге. {contacts.metro}.
              Уютное пространство, где вы становитесь собой — только сияющей.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="grid h-10 w-10 place-items-center rounded-full border border-grape-300/20 text-grape-100 transition-colors hover:bg-magenta/15 hover:text-white">
                <IconTelegram width={18} height={18} />
              </a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-grape-300/20 text-grape-100 transition-colors hover:bg-magenta/15 hover:text-white">
                <IconWhatsApp width={18} height={18} />
              </a>
              <a href={contacts.vk} target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте" className="grid h-10 w-10 place-items-center rounded-full border border-grape-300/20 text-grape-100 transition-colors hover:bg-magenta/15 hover:text-white">
                <IconVK width={18} height={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-grape-200/50">Меню</div>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-sm text-grape-100/75 transition-colors hover:text-white">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-grape-200/50">Контакты</div>
              <ul className="mt-4 space-y-2.5 text-sm text-grape-100/75">
                <li>
                  <a href={contacts.phoneHref} className="transition-colors hover:text-white">{contacts.phoneDisplay}</a>
                </li>
                <li>{contacts.addressShort}</li>
                <li>{contacts.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-grape-300/10 pt-6 text-xs text-grape-200/50 sm:flex-row">
          <span>© {new Date().getFullYear()} La Fiesta · Студия красоты, Санкт-Петербург</span>
          <span>Сделано с любовью к деталям ✦</span>
        </div>
      </div>
    </footer>
  );
}
