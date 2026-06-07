import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=85&fit=crop"
          alt="Мама десертов"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        {/* Extra overlay on mobile so title stays readable */}
        <div className="absolute inset-0 bg-black/30 md:hidden" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        <p className="font-display text-white/85 text-sm md:text-base tracking-[0.25em] uppercase mb-5">
          Мама десертов
        </p>

        <h1 className="font-display text-[2.3rem] sm:text-[3.4rem] md:text-[4.6rem] leading-[1.1] text-white mb-6">
          Для важных моментов жизни
        </h1>

        <p className="text-white/70 text-sm md:text-base font-light max-w-xl mx-auto mb-9 leading-relaxed">
          От праздничных событий до повседневных радостей — создаём десерты, которые дарят уверенность в важные дни и делают счастливее обычные.
        </p>

        <a href="#menu" className="btn-primary text-sm px-10 py-4">
          Смотреть меню
        </a>

      </div>

    </section>
  )
}
