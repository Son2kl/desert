'use client'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const COFFEE_CATEGORIES = [
  {
    id: 'beans',
    title: 'Зерно',
    subtitle: 'Отборная арабика',
    description:
      'Работаем только с проверенными обжарщиками. Используем свежеобжаренную арабику с фруктовыми и ореховыми нотами. Меняем зерно каждые 2 недели, чтобы кофе всегда был на пике вкуса.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80&fit=crop',
    features: ['100% арабика', 'Свежая обжарка', 'Сезонный выбор'],
  },
  {
    id: 'signature',
    title: 'Авторские напитки',
    subtitle: 'Рецепты наших барист',
    description:
      'Раф с бурбонской ванилью, ромовый капучино, бамбл с апельсином, эспрессо тоник — мы постоянно экспериментируем и создаём то, чего нет в других кофейнях города.',
    image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=80&fit=crop',
    features: ['Раф ванильный', 'Ромовый капучино', 'Бамбл апельсин'],
  },
  {
    id: 'classic',
    title: 'Классические напитки',
    subtitle: 'Проверенные временем',
    description:
      'Эспрессо, американо, капучино, латте, флет уайт — готовим на профессиональном оборудании La Marzocco. Каждый напиток — идеальный баланс эспрессо и молочной текстуры.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80&fit=crop',
    features: ['Эспрессо', 'Капучино', 'Латте', 'Флет уайт'],
  },
]

export default function Coffee() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: cardsRef, isVisible: cardsVisible } = useInView(0.05)

  return (
    <section id="coffee" className="py-14 md:py-20 bg-mama-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-mama-pink mb-4">
            Для тех, кто понимает
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Кофе
          </h2>
          <p className="text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
            От выбора зерна до последнего глотка — мы думаем о качестве на каждом шаге
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {COFFEE_CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Background image */}
              <div className="relative h-72 md:h-80">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mama-navy via-mama-navy/60 to-transparent" />
              </div>

              {/* Content overlaid on image bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-mama-pink text-xs font-semibold tracking-wider uppercase mb-1">
                  {cat.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">{cat.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                  {cat.description}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs text-white/70 border border-white/20 px-3 py-1 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-white/70 hover:text-mama-pink text-sm font-medium transition-colors duration-200 group"
          >
            Смотреть всё кофейное меню
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
