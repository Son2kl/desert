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
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">

        <p className="text-mama-pink/90 text-[11px] font-semibold tracking-[0.3em] uppercase mb-6">
          кондитерская · Краснодар
        </p>

        <h1 className="font-display font-bold text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] leading-[0.95] text-white mb-8">
          Мама<br />
          <span className="italic">десертов</span>
        </h1>

        <a href="#menu" className="btn-primary text-sm px-10 py-4">
          Смотреть меню
        </a>

      </div>

    </section>
  )
}
