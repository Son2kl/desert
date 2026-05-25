'use client'
import { useInView } from '@/hooks/useInView'

const FEATURES = [
  {
    id: 'natural',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Натуральные ингредиенты',
    description:
      'Никаких улучшителей, консервантов и искусственных добавок. Только натуральное масло, настоящая ваниль, свежие яйца и сезонные продукты от проверенных поставщиков.',
  },
  {
    id: 'fresh',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Свежее каждый день',
    description:
      'Выпечка готовится каждое утро, начиная с 5 утра. К вашему приходу всё уже тёплое и ароматное. Нераспроданные остатки не переносятся на следующий день.',
  },
  {
    id: 'craft',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Ручная работа',
    description:
      'Каждый круассан раскатывается вручную, каждый торт собирается с заботой. Мы не используем промышленные линии — только мастерство и терпение наших кондитеров.',
  },
  {
    id: 'atmosphere',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Уютная атмосфера',
    description:
      'Наша кондитерская — это место, куда хочется вернуться. Тёплый интерьер, спокойная музыка, доброжелательный персонал. Здесь можно работать, встречаться с друзьями или просто побыть с собой.',
  },
]

export default function WhyUs() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: cardsRef, isVisible: cardsVisible } = useInView(0.05)

  return (
    <section id="why" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Наши ценности</span>
          <h2 className="section-title mb-4">
            Почему выбирают нас
          </h2>
          <p className="section-subtitle mx-auto text-center">
            За 5 лет работы мы сформировали стандарты, от которых не отступаем
          </p>
        </div>

        {/* Features grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.id}
              className={`group transition-all duration-700 ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-mama-blush text-mama-pink flex items-center justify-center mb-6 group-hover:bg-mama-pink group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-mama-navy mb-3">{feature.title}</h3>
              <p className="text-mama-navy/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-mama-blush rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-mama-navy mb-2">
              Убедитесь сами
            </h3>
            <p className="text-mama-navy/60 max-w-md">
              Приходите на завтрак или возьмите кофе с собой — мы открыты с 7 утра каждый будний день
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <a href="#contacts" className="btn-primary">
              Найти нас
            </a>
            <a href="tel:+79615078100" className="btn-outline-navy">
              Позвонить
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
