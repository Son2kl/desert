'use client'
import { useInView } from '@/hooks/useInView'

const REVIEWS = [
  {
    id: 1,
    name: 'Анна К.',
    date: 'Март 2025',
    rating: 5,
    text: 'Лучшие круассаны в городе! Хожу каждое утро — это уже стало ритуалом перед работой. Миндальный круассан с латте — абсолютное счастье.',
    source: 'Яндекс.Карты',
  },
  {
    id: 2,
    name: 'Мария Д.',
    date: 'Февраль 2025',
    rating: 5,
    text: 'Заказывала торт на день рождения дочки — все гости были в восторге! Красиво оформили, вкус потрясающий. Буду заказывать снова.',
    source: '2ГИС',
  },
  {
    id: 3,
    name: 'Светлана П.',
    date: 'Апрель 2025',
    rating: 5,
    text: 'Наконец-то нашла кофе, как в Европе. Раф здесь просто волшебный — с настоящей ванилью, не приторный. Теперь только сюда.',
    source: 'Яндекс.Карты',
  },
  {
    id: 4,
    name: 'Дмитрий В.',
    date: 'Январь 2025',
    rating: 5,
    text: 'Уютная атмосфера, приветливый персонал, быстрое обслуживание. Работаю здесь по утрам с ноутбуком — идеальное место. Хлеб на закваске беру домой регулярно.',
    source: 'Google',
  },
  {
    id: 5,
    name: 'Игорь С.',
    date: 'Март 2025',
    rating: 5,
    text: 'Хлеб на закваске — это нечто особенное. Беру каждую субботу для семейных завтраков. Дети уже не воспринимают никакой другой хлеб.',
    source: '2ГИС',
  },
  {
    id: 6,
    name: 'Елена Т.',
    date: 'Февраль 2025',
    rating: 5,
    text: 'Заказывали корпоративные подарки коллегам на праздник. Красиво упаковали, всё очень вкусно. Коллеги были приятно удивлены. Рекомендую!',
    source: 'Яндекс.Карты',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-mama-navy/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: gridRef, isVisible: gridVisible } = useInView(0.05)

  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <section id="reviews" className="py-24 md:py-32 bg-mama-blush overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Мнения гостей</span>
          <h2 className="section-title mb-4">Отзывы</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl font-extrabold text-mama-navy">{avg}</span>
            <div className="flex flex-col items-start gap-1">
              <StarRating rating={5} />
              <span className="text-mama-navy/50 text-sm">на основе {REVIEWS.length * 100}+ отзывов</span>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-0.5 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Quote mark */}
              <div className="text-4xl text-mama-pink/30 font-display leading-none mb-3 select-none">
                "
              </div>

              <p className="text-mama-navy/75 text-sm leading-relaxed mb-5 flex-1">
                {review.text}
              </p>

              <div className="pt-4 border-t border-mama-blush/60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-mama-navy text-sm">{review.name}</p>
                    <p className="text-mama-navy/40 text-xs mt-0.5">{review.date} · {review.source}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave review CTA */}
        <div className="text-center mt-10">
          <p className="text-mama-navy/50 text-sm mb-4">Делитесь впечатлениями — это важно для нас</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-mama-navy/70 hover:text-mama-pink border border-mama-navy/20 hover:border-mama-pink/40 px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Оставить отзыв на Яндексе
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-mama-navy/70 hover:text-mama-pink border border-mama-navy/20 hover:border-mama-pink/40 px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Написать в 2ГИС
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
