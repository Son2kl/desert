'use client'
import { useInView } from '@/hooks/useInView'

const HOURS = [
  { days: 'Понедельник – Пятница', time: '9:00 – 20:00' },
  { days: 'Суббота – Воскресенье', time: '10:00 – 19:00' },
]

export default function Contacts() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: infoRef, isVisible: infoVisible } = useInView()
  const { ref: mapRef, isVisible: mapVisible } = useInView()

  return (
    <section id="contacts" className="py-14 md:py-20 bg-white overflow-hidden">
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
                  8 (961) 507-81-00
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
                  { name: 'Instagram', href: 'https://www.instagram.com/mama_desertov', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                  { name: 'ВКонтакте', href: 'https://vk.ru/mama_desertov', color: 'hover:bg-[#0077FF]',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.779.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg> },
                  { name: 'Telegram', href: 'https://t.me/mama_desertov', color: 'hover:bg-[#2AABEE]',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={`w-11 h-11 rounded-xl bg-mama-blush flex items-center justify-center text-mama-navy/60 hover:text-white ${s.color} transition-all duration-300`}
                  >
                    {s.icon}
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
