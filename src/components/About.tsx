'use client'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const VALUES = [
  {
    number: '2019',
    label: 'Год основания',
    desc: 'Начинали с маленькой мастерской и большой мечты',
  },
  {
    number: '50+',
    label: 'Рецептов выпечки',
    desc: 'Каждый — результат долгих экспериментов',
  },
  {
    number: '4.9',
    label: 'Рейтинг гостей',
    desc: 'Более 600 отзывов на картах',
  },
]

export default function About() {
  const { ref: textRef, isVisible: textVisible } = useInView()
  const { ref: imageRef, isVisible: imageVisible } = useInView()
  const { ref: statsRef, isVisible: statsVisible } = useInView()

  return (
    <section id="about" className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Top row: text + image */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">

          {/* Text */}
          <div
            ref={textRef}
            className={`transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <span className="section-tag">О нас</span>
            <h2 className="section-title mb-6 text-balance">
              Кондитерская,<br />
              <span className="text-mama-pink">рождённая из любви</span>
            </h2>
            <div className="space-y-5 text-mama-navy/65 leading-relaxed text-base md:text-lg">
              <p>
                Мама — это не просто название. Это ощущение тепла, которое возникает,
                когда вы переступаете наш порог. Мы открылись в 2019 году с простой идеей:
                готовить так, как готовят дома — с душой, из свежих продуктов, с любовью к каждой детали.
              </p>
              <p>
                Наши кондитеры каждый день встают до рассвета, чтобы к вашему утренниму
                кофе были готовы свежие круассаны, хлеб на закваске и авторские десерты.
                Мы не замораживаем выпечку — всё делается здесь и сейчас.
              </p>
              <p>
                Мы верим, что хороший завтрак меняет весь день.
                Именно поэтому каждая чашка кофе готовится с вниманием, а каждый десерт —
                с уважением к вашему вкусу.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#menu" className="btn-primary">
                Наше меню
              </a>
              <a href="#contacts" className="btn-outline-navy">
                Посетить нас
              </a>
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className={`transition-all duration-700 delay-200 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-mama-navy/10">
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80&fit=crop"
                  alt="Интерьер кондитерской Мама"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 left-4 md:-left-6 bg-mama-blush rounded-2xl p-5 shadow-lg">
                <p className="text-3xl font-extrabold text-mama-navy">100%</p>
                <p className="text-sm text-mama-navy/70 font-medium mt-0.5">натуральные<br/>ингредиенты</p>
              </div>
              {/* Decorative dot */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-mama-blush opacity-60 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className={`grid sm:grid-cols-3 gap-8 border-t border-mama-blush pt-16 transition-all duration-700 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {VALUES.map((v, i) => (
            <div
              key={v.number}
              className="text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-display font-bold text-5xl md:text-6xl text-mama-navy mb-2 leading-none">
                {v.number}
              </p>
              <p className="text-mama-pink font-semibold text-[11px] uppercase tracking-[0.2em] mb-2">
                {v.label}
              </p>
              <p className="text-mama-navy/50 text-sm font-light">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
