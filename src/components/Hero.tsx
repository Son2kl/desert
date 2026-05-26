import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=85&fit=crop"
          alt="Уютная атмосфера кофейни Мама"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — warm, moody */}
        <div className="absolute inset-0 bg-gradient-to-b from-mama-navy/70 via-mama-navy/50 to-mama-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-mama-navy/40 via-transparent to-transparent" />
      </div>

      {/* Decorative grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-6 opacity-0 animate-fade-in animate-stagger-1"
          style={{ animationFillMode: 'forwards', animationDelay: '200ms' }}>
          <span className="w-8 h-px bg-mama-pink" />
          <span className="text-mama-pink text-xs font-semibold tracking-[0.25em] uppercase">
            кондитерская · выпечка · кофе
          </span>
          <span className="w-8 h-px bg-mama-pink" />
        </div>

        {/* Brand name */}
        <h1
          className="font-extrabold text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-[0.9] text-white mb-2 opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '400ms' }}
        >
          Мама<br/>десертов
        </h1>

        {/* Tagline */}
        <p
          className="text-xl md:text-2xl text-white/85 font-light tracking-wide mb-4 opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '600ms' }}
        >
          Выпечка с любовью, кофе с характером
        </p>

        <p
          className="text-sm md:text-base text-white/60 max-w-md mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '750ms' }}
        >
          Свежая выпечка каждый день, авторские десерты и отборный кофе — всё, чтобы начать утро правильно
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationFillMode: 'forwards', animationDelay: '900ms' }}
        >
          <a href="#menu" className="btn-primary text-base px-8 py-4 shadow-lg shadow-mama-pink/40">
            Посмотреть меню
          </a>
          <a href="#contacts" className="btn-outline text-base px-8 py-4">
            Как нас найти
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationFillMode: 'forwards', animationDelay: '1200ms' }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Листайте</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* Bottom info strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-3 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { icon: '📍', text: 'ул. Российская 255/9' },
            { icon: '🕐', text: 'Пн–Пт 7:00–21:00' },
            { icon: '📞', text: '8-961-507-81-00' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/70 text-sm">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
