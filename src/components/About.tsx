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
  const { ref: photoRef, isVisible: photoVisible } = useInView()
  const { ref: text2Ref, isVisible: text2Visible } = useInView()
  const { ref: statsRef, isVisible: statsVisible } = useInView()

  return (
    <section id="about" className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Part 1: heading + intro text + portrait image */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-14 md:mb-16">

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
                Мы верим, что самые ценные моменты жизни складываются из деталей, и создаём
                не просто сладости и выпечку, а важную часть ваших воспоминаний. Жизнь складывается
                из сотен маленьких моментов: утреннего кофе перед работой, встречи с близкими,
                неспешного разговора, прогулки по городу или нескольких минут, которые человек
                посвящает себе.
              </p>
              <p>
                «Мама десертов» появилась из желания создавать десерты, которым можно доверить
                самые важные события и моменты жизни. Это пространство, где можно сделать обычный
                день немного лучше.
              </p>
              <p>
                Наша работа строится на сочетании заботы о человеке и профессионального подхода
                к созданию десертов. Каждое изделие, созданное в нашем цеху, проходит через
                технологический контроль, а каждое решение принимается с мыслью о том, чтобы
                результат полностью соответствовал ожиданиям клиента.
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

        {/* Horizontal photo break */}
        <div
          ref={photoRef}
          className={`relative h-[280px] md:h-[360px] rounded-3xl overflow-hidden shadow-xl shadow-mama-navy/10 mb-14 md:mb-16 transition-all duration-700 ${
            photoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Image
            src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=1600&q=85&fit=crop"
            alt="Цех кондитерской Мама десертов"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Part 2: continuation text */}
        <div
          ref={text2Ref}
          className={`max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            text2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 text-mama-navy/65 leading-relaxed text-base">
            <p>
              Наши десерты на витрине помогают радовать себя без особого повода. Свежая выпечка
              создаёт ощущение тепла и заботы. Чашка кофе становится маленьким ежедневным ритуалом,
              который помогает замедлиться среди суеты.
            </p>
            <p>
              Наши заказные торты становятся частью значимых событий и воспоминаний. За каждым
              заказом стоит история: день рождения ребёнка, семейный праздник, свадьба, годовщина,
              встреча с близкими, долгожданное признание — именно из таких моментов формируются
              воспоминания, которые остаются с нами на долгие годы.
            </p>
            <p>
              Мы понимаем, что за каждым заказом стоят ожидания, волнение и желание сделать
              особенный день по-настоящему красивым и счастливым. Именно поэтому мы уделяем
              внимание каждой детали — от выбора ингредиентов и разработки начинки до декора
              и финальной подачи.
            </p>
            <p>
              Десерт для нас — это гораздо больше, чем просто сладость. Он становится частью
              истории, частью эмоций, частью события, которое хочется запомнить. Мы создаём
              десерты для важных моментов жизни — больших и маленьких. Потому что именно из них
              складывается счастье.
            </p>
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
              <p className="font-display text-5xl md:text-6xl text-mama-navy mb-2 leading-none">
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
