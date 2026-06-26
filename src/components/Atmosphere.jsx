import { Img, Reveal } from './ui';
import { IconHeart, IconSparkles, IconStar } from './icons';

const FEATURES = [
  { icon: IconSparkles, title: 'Особенная атмосфера', text: 'Тёплый свет, музыка и хорошее настроение — у нас красиво не только в зеркале, но и вокруг.' },
  { icon: IconHeart, title: 'Душевный сервис', text: 'Чай, кофе и внимание к деталям. Гости отмечают это в каждом отзыве.' },
  { icon: IconStar, title: 'Профи-косметика', text: 'Moroccanoil и L’Oréal Professionnel — уход, который виден и через месяц.' },
];

export default function Atmosphere() {
  return (
    <section id="atmosphere" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* коллаж */}
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <Img
                src="img/studio-love.webp"
                alt="Декор студии La Fiesta — буквы LOVE и воздушные шары"
                className="aspect-[3/4] w-full rounded-2xl border border-grape-300/15 object-cover"
              />
              <div className="grid gap-4 pt-8">
                <Img
                  src="img/studio-vanity.webp"
                  alt="Гримёрный столик с подсветкой"
                  className="aspect-square w-full rounded-2xl border border-grape-300/15 object-cover"
                />
                <Img
                  src="img/studio-lounge.webp"
                  alt="Уютная зона ожидания студии"
                  className="aspect-square w-full rounded-2xl border border-grape-300/15 object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* текст */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">✦ О студии</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight">
                Место, куда хочется <span className="text-gradient">возвращаться</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-grape-100/75">
                La Fiesta — это не просто салон, а пространство красоты и хорошего настроения.
                Мы продумали каждую деталь: от мягкого света и уютного интерьера до чашки
                кофе в руках, пока мастер творит вашу красоту.
              </p>
            </Reveal>

            <div className="mt-9 space-y-5">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-grape-600 to-magenta text-white shadow-glow-sm">
                      <f.icon width={22} height={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-grape-100/65">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
