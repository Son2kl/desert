'use client'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const BAKERY_ITEMS = [
  {
    id: 'croissants',
    name: 'Круассаны',
    description:
      'Слоёные, хрустящие, тающие во рту. Готовим каждое утро из масляного теста по французской технологии. Классические, с шоколадом и миндальным кремом.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&q=80&fit=crop',
    tag: 'Хит продаж',
    tagColor: 'bg-mama-pink text-white',
  },
  {
    id: 'bread',
    name: 'Хлеб',
    description:
      'Ремесленный хлеб на живой закваске с долгим брожением — пшеничный, ржаной, фокачча. Хрустящая корочка, воздушный мякиш и настоящий хлебный аромат.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=700&q=80&fit=crop',
    tag: 'Ежедневно',
    tagColor: 'bg-mama-navy text-white',
  },
  {
    id: 'desserts',
    name: 'Десерты',
    description:
      'Эклеры, тарты, брауни, чизкейки и торт дня от нашего кондитера. Французская школа, сезонные продукты, безупречный вкус в каждом кусочке.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=700&q=80&fit=crop',
    tag: 'Авторские',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
  },
  {
    id: 'seasonal',
    name: 'Сезонные предложения',
    description:
      'Каждый сезон мы создаём специальное меню с актуальными вкусами. Клубника весной, ягоды летом, яблоко и корица осенью, пряный имбирь зимой.',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=700&q=80&fit=crop',
    tag: 'Сезон',
    tagColor: 'bg-amber-100 text-amber-800',
  },
]

export default function Bakery() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: gridRef, isVisible: gridVisible } = useInView(0.05)

  return (
    <section id="bakery" className="py-24 md:py-32 bg-mama-blush overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Из печи — на стол</span>
          <h2 className="section-title mb-4">Наша выпечка</h2>
          <p className="section-subtitle mx-auto text-center">
            Каждое утро мы готовим свежую выпечку с нуля.
            Никаких полуфабрикатов — только натуральные ингредиенты и ручная работа.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {BAKERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${i * 120}ms`,
                transitionProperty: 'opacity, transform, box-shadow',
              }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-mama-navy mb-3">{item.name}</h3>
                <p className="text-mama-navy/60 text-sm leading-relaxed">{item.description}</p>
                <div className="mt-5 pt-5 border-t border-mama-blush">
                  <a
                    href="#menu"
                    className="text-mama-pink text-sm font-semibold hover:gap-2 flex items-center gap-1.5 transition-all duration-200 group/link"
                  >
                    Смотреть в меню
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
