import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=85&fit=crop"
          alt="Мама десертов"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mama-navy/65 via-mama-navy/45 to-mama-navy/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-mama-navy/30 via-transparent to-transparent" />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">

        <div
          className="inline-flex items-center gap-3 mb-8 opacity-0 animate-fade-in"
          style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}
        >
          <span className="w-10 h-px bg-mama-pink/70" />
          <span className="text-mama-pink/90 text-[11px] font-semibold tracking-[0.3em] uppercase">
            кондитерская · выпечка · кофе
          </span>
          <span className="w-10 h-px bg-mama-pink/70" />
        </div>

        <h1
          className="font-display font-bold text-[3.2rem] sm:text-[4.8rem] md:text-[6.5rem] leading-[0.92] text-white mb-6 opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '350ms' }}
        >
          Мама<br />
          <span className="italic text-mama-pink/90">десертов</span>
        </h1>

        <p
          className="text-lg md:text-xl text-white/80 font-light tracking-wide mb-3 opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '550ms' }}
        >
          Выпечка с любовью, кофе с характером
        </p>

        <p
          className="text-sm text-white/50 max-w-sm mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '700ms' }}
        >
          Авторские десерты и торты, свежая выпечка каждый день, отборный кофе
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '850ms' }}
        >
          <a href="#menu" className="btn-primary text-sm px-9 py-4">
            Смотреть меню
          </a>
          <a href="#contacts" className="btn-outline text-sm px-9 py-4">
            Как нас найти
          </a>
        </div>
      </div>

      {/* Scroll */}
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationFillMode: 'forwards', animationDelay: '1100ms' }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* Info strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/8 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-3.5 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {[
            {
              text: 'ул. Российская 255/9',
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
            {
              text: 'Пн–Пт 9:00–20:00 · Сб–Вс 10:00–19:00',
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              text: '8 (961) 507-81-00',
              icon: (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/60 text-xs tracking-wide">
              <span className="text-mama-pink/80">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
