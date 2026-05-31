'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'
import menuData from '@/data/menu.json'
import type { MenuCategory, MenuItem } from '@/types'

// ── Drinks ────────────────────────────────────────────────────────────────────

const _data = menuData as { categories: MenuCategory[] }
const allDrinks: MenuItem[] = [
  ...(_data.categories.find((c) => c.id === 'coffee')?.items ?? []),
  ...(_data.categories.find((c) => c.id === 'tea')?.items ?? []),
]

const FEATURED_IDS = ['raf', 'rum-cappuccino', 'bumble']
const FEATURED_IMAGES: Record<string, string> = {
  'raf':           'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=700&q=80&fit=crop',
  'rum-cappuccino':'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=80&fit=crop',
  'bumble':        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=80&fit=crop',
}

const featuredDrinks = FEATURED_IDS
  .map((id) => allDrinks.find((d) => d.id === id))
  .filter(Boolean) as MenuItem[]

const restDrinks = allDrinks.filter((d) => !FEATURED_IDS.includes(d.id))

// ── Bakery ────────────────────────────────────────────────────────────────────

interface ShowcaseItem {
  id: string; name: string; description: string
  image: string | null; tag: string | null; tagColor: string
  orderable?: boolean
}

const BAKERY_ITEMS: ShowcaseItem[] = [
  { id: 'croissants', name: 'Круассаны',        description: 'Слоёные, масляные, с хрустящей корочкой. Классические, с шоколадом и с миндальным кремом', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&q=80&fit=crop',   tag: 'В асс.', tagColor: 'bg-mama-pink text-white' },
  { id: 'sandwiches', name: 'Сэндвичи',         description: 'Свежая выпечка с разнообразными начинками — сытные и лёгкие варианты',                     image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=700&q=80&fit=crop',   tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy' },
  { id: 'rum-baba',   name: 'Ромовые бабы',     description: 'Нежное дрожжевое тесто, пропитанное ароматным ромовым сиропом',                             image: 'https://images.unsplash.com/photo-1571167336429-ea0e3bc6ff65?w=700&q=80&fit=crop',   tag: null,     tagColor: '' },
  { id: 'cupcakes',   name: 'Кексы',            description: 'Порционные кексы с разными начинками и глазурью',                                            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80&fit=crop',   tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy' },
  { id: 'cookies',    name: 'Кукисы',           description: 'Мягкие печенья с шоколадными чипсами, орехами и другими добавками',                         image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=80&fit=crop',   tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy' },
  { id: 'seasonal',   name: 'Сезонные новинки', description: 'Специальное меню каждый сезон — следите за обновлениями',                                    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=700&q=80&fit=crop',   tag: 'Сезон',  tagColor: 'bg-amber-100 text-amber-800' },
]

interface ShowcaseItemExt extends ShowcaseItem { authorski?: boolean }

const DESSERT_ITEMS: ShowcaseItemExt[] = [
  // ── Авторские (6) ──
  { id: 'korpusnye',        name: 'Корпусные пирожные',        description: 'Многослойные муссовые пирожные в шоколадной или зеркальной глазури', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', orderable: true,  authorski: true },
  { id: 'tartaletki',       name: 'Тарталетки',                description: 'Хрустящие корзинки с кремом, ягодами и фруктами',                    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', orderable: true,  authorski: true },
  { id: 'macaron',          name: 'Макарон',                   description: 'Нежное миндальное печенье с ганашем или кремом между половинками',    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', orderable: true,  authorski: true },
  { id: 'cheesecake',       name: 'Чизкейки',                  description: 'Нежный сливочный чизкейк — классический и авторские вариации',        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', orderable: true,  authorski: true },
  { id: 'tiramisu',         name: 'Тирамису',                  description: 'Итальянский десерт с маскарпоне и кофейной пропиткой',                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=700&q=80&fit=crop', tag: null,      tagColor: '',                               authorski: true },
  { id: 'shu',              name: 'Шу',                        description: 'Заварные пирожные с хрустящим штрейзелем и кремом внутри',            image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', authorski: true },
  // ── Также на витрине (6) ──
  { id: 'cake-slices',      name: 'Торты по кусочкам',         description: 'Авторский торт дня от кондитера — меняется регулярно',                image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-pink text-white' },
  { id: 'kartoshka',        name: 'Пирожное картошка',         description: 'Разные вкусовые вариации — скоро подробнее',                          image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', orderable: true },
  { id: 'profiteroli',      name: 'Профитроли',                description: 'Заварные шарики с ванильным кремом в шоколадной глазури',             image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=700&q=80&fit=crop', tag: null,      tagColor: '' },
  { id: 'tvorozhnye-koltsa',name: 'Заварные творожные кольца', description: 'Нежные кольца из заварного теста с творожным кремом',                 image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=80&fit=crop', tag: null,      tagColor: '' },
  { id: 'zefir',            name: 'Зефир',                     description: 'Воздушный домашний зефир, разные вкусовые вариации',                  image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', orderable: true },
  { id: 'oreshki',          name: 'Орешки со сгущёнкой',       description: 'Хрустящие ореховые печенья со сгущённым молоком',                     image: 'https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=700&q=80&fit=crop', tag: 'В асс.', tagColor: 'bg-mama-blush-deep text-mama-navy', orderable: true },
]

// ── Tabs ──────────────────────────────────────────────────────────────────────

const MENU_TABS = [
  { id: 'desserts', label: 'Десерты' },
  { id: 'bakery',   label: 'Выпечка' },
  { id: 'drinks',   label: 'Кофе и напитки' },
]

// ── Featured drink card (large, with photo) ───────────────────────────────────

function FeaturedDrinkCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-mama-navy/10 cursor-default">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={FEATURED_IMAGES[item.id]}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {item.tag && (
          <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full bg-mama-pink text-white">
            {item.tag}
          </span>
        )}
        {item.volume && (
          <span className="absolute top-4 right-4 text-[11px] font-medium text-white/70 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {item.volume}
          </span>
        )}
      </div>
      <div className="p-6">
        <h4 className="font-display font-bold text-2xl text-mama-navy mb-2 leading-tight">{item.name}</h4>
        <p className="text-mama-navy/55 text-sm font-light leading-relaxed mb-5">{item.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-mama-blush/60">
          <span className="font-bold text-mama-navy text-xl">{item.price} <span className="text-base font-normal text-mama-navy/40">₽</span></span>
          <a href="tel:+79615078100" className="text-xs font-semibold text-mama-pink hover:text-mama-navy transition-colors tracking-wide">
            Заказать →
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Compact drink row ─────────────────────────────────────────────────────────

function DrinkRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-mama-blush/40 last:border-0 hover:bg-mama-blush/20 -mx-4 px-4 rounded-xl transition-colors duration-150 cursor-default">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium text-mama-navy text-sm">{item.name}</span>
          {item.tag && (
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-mama-blush text-mama-pink">
              {item.tag}
            </span>
          )}
        </div>
        <p className="text-mama-navy/40 text-xs font-light truncate">
          {item.description}{item.volume ? ` · ${item.volume}` : ''}
        </p>
      </div>
      <span className="font-semibold text-mama-navy text-sm shrink-0 mt-0.5">{item.price} ₽</span>
    </div>
  )
}

// ── Showcase card (bakery / desserts) ─────────────────────────────────────────

function ShowcaseCard({ item, placeholderClass }: { item: ShowcaseItem; placeholderClass: string }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-mama-navy/10 cursor-default">
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image ? (
          <>
            <Image src={item.image} alt={item.name} fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </>
        ) : (
          <div className={`w-full h-full ${placeholderClass} flex items-end p-4`}>
            <span className="font-display font-bold text-4xl leading-none select-none text-white/10">
              {item.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.tag && (
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${item.tagColor}`}>
              {item.tag}
            </span>
          )}
          {item.orderable && (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-mama-navy text-white">
              на заказ
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-mama-navy text-base mb-1.5 leading-snug">{item.name}</h4>
        <p className="text-mama-navy/50 text-sm font-light leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

// ── Showcase carousel ─────────────────────────────────────────────────────────

import { useEffect } from 'react'

function usePerPage() {
  const [perPage, setPerPage] = useState(3)
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 768 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return perPage
}

function ShowcaseCarousel({ items, placeholderClass, resetKey }: {
  items: ShowcaseItem[]
  placeholderClass: string
  resetKey?: string
}) {
  const [page, setPage] = useState(0)
  const perPage = usePerPage()
  const totalPages = Math.ceil(items.length / perPage)
  const visible = items.slice(page * perPage, (page + 1) * perPage)

  useEffect(() => { setPage(0) }, [resetKey, perPage])

  const stableKey = resetKey

  return (
    <div key={stableKey}>
      <div className={`grid gap-4 md:gap-6 ${perPage === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {visible.map((item) => (
          <ShowcaseCard key={item.id} item={item} placeholderClass={placeholderClass} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-mama-blush flex items-center justify-center text-mama-navy disabled:opacity-25 hover:border-mama-pink hover:text-mama-pink transition-colors duration-200"
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
                  i === page ? 'w-5 h-2 bg-mama-navy' : 'w-2 h-2 bg-mama-blush hover:bg-mama-navy/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border border-mama-blush flex items-center justify-center text-mama-navy disabled:opacity-25 hover:border-mama-pink hover:text-mama-pink transition-colors duration-200"
            aria-label="Вперёд"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Menu() {
  const [activeTab, setActiveTab] = useState('desserts')
  const { ref, isVisible } = useInView()

  return (
    <section id="menu" className="py-14 md:py-20 bg-mama-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Section heading */}
        <div
          ref={ref}
          className={`mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Витрина</span>
          <h2 className="section-title">Меню</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-1 no-scrollbar">
          {MENU_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-mama-navy text-white shadow-lg shadow-mama-navy/20'
                  : 'bg-white text-mama-navy/60 border border-mama-blush hover:border-mama-pink/50 hover:text-mama-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── DRINKS TAB ── */}
        {activeTab === 'drinks' && (
          <div>

            {/* Featured signature drinks */}
            <div className="grid sm:grid-cols-3 gap-6 mb-14">
              {featuredDrinks.map((item) => (
                <FeaturedDrinkCard key={item.id} item={item} />
              ))}
            </div>

            {/* Full price list */}
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px flex-1 bg-mama-blush" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mama-navy/40">Всё меню</span>
              <span className="h-px flex-1 bg-mama-blush" />
            </div>

            <div className="bg-white rounded-3xl px-8 py-2 grid sm:grid-cols-2 gap-x-10">
              {restDrinks.map((item) => (
                <DrinkRow key={item.id} item={item} />
              ))}
            </div>

            <p className="text-center text-mama-navy/35 text-xs mt-6">
              Цены в рублях · состав и аллергены уточняйте у бариста
            </p>
          </div>
        )}

        {/* ── BAKERY TAB ── */}
        {activeTab === 'bakery' && (
          <ShowcaseCarousel
            items={BAKERY_ITEMS}
            placeholderClass="bg-gradient-to-br from-[#f5e6c8] via-[#fdf0dd] to-mama-blush"
            resetKey="bakery"
          />
        )}

        {/* ── DESSERTS TAB ── */}
        {activeTab === 'desserts' && (
          <div>
            {/* Авторские */}
            <ShowcaseCarousel
              items={DESSERT_ITEMS.filter((i) => (i as ShowcaseItemExt).authorski)}
              placeholderClass="bg-gradient-to-br from-mama-blush-deep via-mama-blush to-[#fce8f0]"
              resetKey="desserts-auth"
            />

            {/* Остальное */}
            <div className="flex items-center gap-4 my-8">
              <span className="h-px flex-1 bg-mama-blush" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mama-navy/40">Также на витрине</span>
              <span className="h-px flex-1 bg-mama-blush" />
            </div>
            <ShowcaseCarousel
              items={DESSERT_ITEMS.filter((i) => !(i as ShowcaseItemExt).authorski)}
              placeholderClass="bg-gradient-to-br from-mama-blush-deep via-mama-blush to-[#fce8f0]"
              resetKey="desserts-rest"
            />

            <div className="mt-10 text-center">
              <p className="text-mama-navy/50 text-sm font-light mb-4">
                Хотите заказать к мероприятию или в подарок?
              </p>
              <a href="tel:+79615078100" className="btn-outline-navy inline-flex">
                Позвонить и обсудить
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
