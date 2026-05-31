'use client'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const BAKERY_ITEMS: {
  id: string
  name: string
  description: string
  image: string | null
  tag: string | null
  tagColor: string
}[] = [
  {
    id: 'sandwiches',
    name: 'Сэндвичи',
    description: 'Свежая выпечка с разнообразными начинками. Сытные и лёгкие варианты.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
  },
  {
    id: 'croissants',
    name: 'Круассаны',
    description: 'Слоёные, хрустящие, тающие во рту. Каждое утро из масляного теста. Классические и с разными начинками.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&q=80&fit=crop',
    tag: 'В асс.',
    tagColor: 'bg-mama-pink text-white',
  },
  {
    id: 'rum-baba',
    name: 'Ромовые бабы',
    description: 'Нежное дрожжевое тесто, пропитанное ромовым сиропом. Воздушные и ароматные.',
    image: null,
    tag: null,
    tagColor: '',
  },
  {
    id: 'cupcakes',
    name: 'Кексы',
    description: 'Порционные кексы с разными начинками и глазурью.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
  },
  {
    id: 'cookies',
    name: 'Кукисы',
    description: 'Мягкие печенья с шоколадными чипсами, орехами и разными вкусовыми добавками.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
  },
  {
    id: 'seasonal',
    name: 'Сезонные предложения',
    description: 'Каждый сезон — специальное меню с актуальными вкусами. Следите за обновлениями.',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=700&q=80&fit=crop',
    tag: 'Сезон',
    tagColor: 'bg-amber-100 text-amber-800',
  },
]

function PhotoPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-mama-navy/25">
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-xs font-medium">Фото скоро</span>
    </div>
  )
}

export default function Bakery() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: gridRef, isVisible: gridVisible } = useInView(0.05)

  return (
    <section id="bakery" className="py-14 md:py-20 bg-mama-blush overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Из печи — на стол</span>
          <h2 className="section-title mb-4">Выпечка</h2>
          <p className="section-subtitle mx-auto text-center">
            Готовим каждое утро с нуля. Никаких полуфабрикатов — только натуральные ингредиенты и ручная работа.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {BAKERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                transitionProperty: 'opacity, transform, box-shadow',
              }}
            >
              <div className="relative h-52 overflow-hidden bg-mama-blush/60">
                {item.image ? (
                  <>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </>
                ) : (
                  <PhotoPlaceholder />
                )}
                {item.tag && (
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${item.tagColor}`}>
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-mama-navy mb-3">{item.name}</h3>
                <p className="text-mama-navy/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
