'use client'
import { useInView } from '@/hooks/useInView'

const HOURS = [
  { days: 'Понедельник – Пятница', time: '07:00 – 21:00' },
  { days: 'Суббота', time: '08:00 – 22:00' },
  { days: 'Воскресенье', time: '08:00 – 21:00' },
]

export default function Contacts() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: infoRef, isVisible: infoVisible } = useInView()
  const { ref: mapRef, isVisible: mapVisible } = useInView()

  return (
    <section id="contacts" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Мы вас ждём</span>
          <h2 className="section-title mb-4">Контакты</h2>
          <p className="section-subtitle mx-auto text-center">
            Заходите на чашку кофе — найти нас просто
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Info column */}
          <div
            ref={infoRef}
            className={`space-y-8 transition-all duration-700 ${
              infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Address */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-mama-blush text-mama-pink flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-mama-navy/40 mb-1">Адрес</p>
                <p className="font-semibold text-mama-navy text-lg">ул. Российская 255/9</p>
                <a
                  href="https://yandex.ru/maps/?text=%D1%83%D0%BB.%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F+255%2F9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mama-pink text-sm hover:underline mt-1 inline-block"
                >
                  Открыть в Яндекс.Картах →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-mama-blush text-mama-pink flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-mama-navy/40 mb-1">Телефон</p>
                <a
                  href="tel:+79615078100"
                  className="font-semibold text-mama-navy text-lg hover:text-mama-pink transition-colors"
                >
                  8-961-507-81-00
                </a>
                <p className="text-mama-navy/50 text-sm mt-0.5">Торты и корпоративные заказы</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-mama-blush text-mama-pink flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-wider uppercase text-mama-navy/40 mb-3">Часы работы</p>
                <div className="space-y-2">
                  {HOURS.map((h) => (
                    <div key={h.days} className="flex justify-between items-center text-sm">
                      <span className="text-mama-navy/70">{h.days}</span>
                      <span className="font-semibold text-mama-navy">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-mama-navy/40 mb-4">Мы в соцсетях</p>
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', href: '#', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
                  { name: 'ВКонтакте', href: '#', color: 'hover:bg-[#0077FF]' },
                  { name: 'Telegram', href: '#', color: 'hover:bg-[#2AABEE]' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className={`w-11 h-11 rounded-xl bg-mama-blush flex items-center justify-center text-mama-navy/60 hover:text-white ${s.color} transition-all duration-300`}
                  >
                    <span className="text-xs font-bold">{s.name[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map column */}
          <div
            ref={mapRef}
            className={`transition-all duration-700 delay-200 ${
              mapVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-xl shadow-mama-navy/10">
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=%D1%83%D0%BB.%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%B0%D1%8F+255%2F9&z=16&l=map"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Карта — Мама кондитерская"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
