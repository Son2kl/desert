'use client'
import { useState, useEffect } from 'react'
import { useInView } from '@/hooks/useInView'

const REVIEWS = [
  { id: 1, name: 'Анна К.', date: 'Март 2025', rating: 5, source: 'Яндекс.Карты', text: 'Лучшие круассаны в городе! Хожу каждое утро — это уже стало ритуалом перед работой. Миндальный круассан с латте — абсолютное счастье.' },
  { id: 2, name: 'Мария Д.', date: 'Февраль 2025', rating: 5, source: '2ГИС', text: 'Заказывала торт на день рождения дочки — все гости были в восторге! Красиво оформили, вкус потрясающий. Буду заказывать снова.' },
  { id: 3, name: 'Светлана П.', date: 'Апрель 2025', rating: 5, source: 'Яндекс.Карты', text: 'Наконец-то нашла кофе, как в Европе. Раф здесь просто волшебный — с настоящей ванилью, не приторный. Теперь только сюда.' },
  { id: 4, name: 'Дмитрий В.', date: 'Январь 2025', rating: 5, source: 'Google', text: 'Уютная атмосфера, приветливый персонал, быстрое обслуживание. Работаю здесь по утрам с ноутбуком — идеальное место.' },
  { id: 5, name: 'Игорь С.', date: 'Март 2025', rating: 5, source: '2ГИС', text: 'Макарон — это что-то особенное. Беру каждые выходные. Дети уже не воспринимают никакие другие десерты.' },
  { id: 6, name: 'Елена Т.', date: 'Февраль 2025', rating: 5, source: 'Яндекс.Карты', text: 'Заказывали корпоративные подарки коллегам на праздник. Красиво упаковали, всё очень вкусно. Коллеги были приятно удивлены. Рекомендую!' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-mama-navy/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
      <div className="text-4xl text-mama-pink/30 font-display leading-none mb-3 select-none">&ldquo;</div>
      <p className="text-mama-navy/75 text-sm leading-relaxed flex-1 mb-5">{review.text}</p>
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
  )
}

export default function Reviews() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(3)

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 640 ? 1 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => { setPage(0) }, [perPage])

  const totalPages = Math.ceil(REVIEWS.length / perPage)
  const visible = REVIEWS.slice(page * perPage, (page + 1) * perPage)
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <section id="reviews" className="py-14 md:py-20 bg-mama-blush overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div
          ref={headRef}
          className={`text-center mb-10 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Мнения гостей</span>
          <h2 className="section-title mb-4">Отзывы</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="font-display font-bold text-5xl text-mama-navy">{avg}</span>
            <div className="flex flex-col items-start gap-1">
              <StarRating rating={5} />
              <span className="text-mama-navy/50 text-sm">на основе {REVIEWS.length * 100}+ отзывов</span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className={`grid gap-5 ${perPage === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-mama-blush-deep flex items-center justify-center text-mama-navy disabled:opacity-25 hover:border-mama-pink hover:text-mama-pink transition-colors duration-200"
            aria-label="Назад"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === page ? 'w-5 h-2 bg-mama-navy' : 'w-2 h-2 bg-mama-blush-deep hover:bg-mama-navy/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border border-mama-blush-deep flex items-center justify-center text-mama-navy disabled:opacity-25 hover:border-mama-pink hover:text-mama-pink transition-colors duration-200"
            aria-label="Вперёд"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-10">
          <p className="text-mama-navy/50 text-sm mb-4">Делитесь впечатлениями — это важно для нас</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-mama-navy/70 hover:text-mama-pink border border-mama-navy/20 hover:border-mama-pink/40 px-5 py-2.5 rounded-full transition-all duration-200">
              Оставить отзыв на Яндексе
            </a>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-mama-navy/70 hover:text-mama-pink border border-mama-navy/20 hover:border-mama-pink/40 px-5 py-2.5 rounded-full transition-all duration-200">
              Написать в 2ГИС
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
