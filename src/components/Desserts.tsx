'use client'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const DESSERT_ITEMS: {
  id: string
  name: string
  description: string
  image: string | null
  tag: string | null
  tagColor: string
  orderable?: boolean
}[] = [
  {
    id: 'korpusnye',
    name: 'Корпусные пирожные',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
    orderable: true,
  },
  {
    id: 'kartoshka',
    name: 'Пирожное картошка',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
    orderable: true,
  },
  {
    id: 'shu',
    name: 'Шу',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
  },
  {
    id: 'tvorozhnye-koltsa',
    name: 'Заварные творожные кольца',
    description: 'Нежные заварные кольца с творожным кремом.',
    image: null,
    tag: null,
    tagColor: '',
  },
  {
    id: 'profiteroli',
    name: 'Профитроли в шоколадной глазури',
    description: 'С ванильным кремом, покрытые шоколадной глазурью.',
    image: null,
    tag: null,
    tagColor: '',
  },
  {
    id: 'finiky',
    name: 'Финики с орехами в шоколаде',
    description: 'Финики с ореховой начинкой в шоколаде.',
    image: null,
    tag: null,
    tagColor: '',
  },
  {
    id: 'macaron',
    name: 'Макарон',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
    orderable: true,
  },
  {
    id: 'tiramisu',
    name: 'Тирамису',
    description: 'Классический итальянский десерт с маскарпоне и кофейной пропиткой.',
    image: null,
    tag: null,
    tagColor: '',
  },
  {
    id: 'cheesecake',
    name: 'Чизкейки',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
    orderable: true,
  },
  {
    id: 'cake-slices',
    name: 'Торты по кусочкам',
    description: 'Авторские торты от кондитера — меняются регулярно.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-pink text-white',
  },
  {
    id: 'zefir',
    name: 'Зефир',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
    orderable: true,
  },
  {
    id: 'tartaletki',
    name: 'Тарталетки',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
    orderable: true,
  },
  {
    id: 'oreshki',
    name: 'Орешки со сгущёнкой',
    description: 'Разные вкусовые вариации — скоро подробнее.',
    image: null,
    tag: 'В асс.',
    tagColor: 'bg-mama-blush-deep text-mama-navy',
    orderable: true,
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

export default function Desserts() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: gridRef, isVisible: gridVisible } = useInView(0.05)

  return (
    <section id="desserts" className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div
          ref={headRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Витрина</span>
          <h2 className="section-title mb-4">Десерты</h2>
          <p className="section-subtitle mx-auto text-center">
            Всё готовится вручную из качественных ингредиентов. Большинство позиций также доступны под заказ — штучно или наборами.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {DESSERT_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`group bg-white border border-mama-blush rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${i * 60}ms`,
                transitionProperty: 'opacity, transform, box-shadow',
              }}
            >
              <div className="relative h-44 overflow-hidden bg-mama-blush/50">
                {item.image ? (
                  <>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </>
                ) : (
                  <PhotoPlaceholder />
                )}
                {item.tag && (
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${item.tagColor}`}>
                    {item.tag}
                  </span>
                )}
                {item.orderable && (
                  <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-mama-navy/80 text-white backdrop-blur-sm">
                    на заказ
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-mama-navy mb-1.5">{item.name}</h3>
                <p className="text-mama-navy/55 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-mama-navy/50 text-sm mb-4">
            Хотите заказать десерты для мероприятия или в подарок?
          </p>
          <a
            href="tel:+79615078100"
            className="inline-flex items-center gap-2 text-mama-pink font-semibold hover:text-mama-navy transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Позвонить и обсудить заказ
          </a>
        </div>

      </div>
    </section>
  )
}
