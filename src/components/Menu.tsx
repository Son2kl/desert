'use client'
import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import menuData from '@/data/menu.json'
import type { MenuCategory, MenuItem } from '@/types'

const data = menuData as { categories: MenuCategory[] }

function PriceDisplay({ item }: { item: MenuItem }) {
  if (item.priceUnit === 'по запросу') {
    return <span className="text-mama-navy/50 text-sm font-medium">по запросу</span>
  }
  if (item.priceUnit) {
    return (
      <span className="text-mama-navy font-bold text-lg">
        {item.price.toLocaleString('ru-RU')} <span className="text-sm font-normal text-mama-navy/50">{item.priceUnit}</span>
      </span>
    )
  }
  return (
    <span className="text-mama-navy font-bold text-lg">
      {item.price} <span className="text-mama-navy/50 text-sm font-normal">₽</span>
    </span>
  )
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-white border border-mama-blush rounded-2xl p-5 hover:border-mama-pink/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-semibold text-mama-navy text-base leading-snug flex-1">
          {item.name}
        </h4>
        {item.tag && (
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-mama-blush text-mama-pink">
            {item.tag}
          </span>
        )}
      </div>
      <p className="text-mama-navy/55 text-sm leading-relaxed mb-4 line-clamp-2">
        {item.description}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-mama-blush/60">
        <PriceDisplay item={item} />
        {item.volume && (
          <span className="text-xs text-mama-navy/40">{item.volume}</span>
        )}
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('coffee')
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: contentRef, isVisible: contentVisible } = useInView(0.05)

  const activeCategory = data.categories.find((c) => c.id === activeTab)

  return (
    <section id="menu" className="py-24 md:py-32 bg-mama-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Всё самое вкусное</span>
          <h2 className="section-title mb-4">Меню</h2>
          <p className="section-subtitle mx-auto text-center">
            Актуальные цены и весь ассортимент. Состав и аллергены — уточняйте у бариста
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-mama-navy text-white shadow-md shadow-mama-navy/20'
                  : 'bg-white text-mama-navy/70 border border-mama-blush hover:border-mama-pink/40 hover:text-mama-navy'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {activeCategory && (
          <div
            ref={contentRef}
            className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            key={activeTab}
          >
            {activeCategory.items.map((item, i) => (
              <div
                key={item.id}
                className="opacity-0 animate-fade-up"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 50}ms` }}
              >
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Allergens note */}
        <p className="text-center text-mama-navy/40 text-sm mt-10">
          * Цены указаны в рублях. Возможны изменения — уточняйте актуальное меню у бариста
        </p>

        {/* Custom orders CTA */}
        <div className="mt-12 bg-mama-navy rounded-3xl p-8 md:p-12 text-center">
          <p className="text-mama-pink text-sm font-semibold tracking-wider uppercase mb-3">Торты и десерты на заказ</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Сделаем торт мечты для вашего праздника
          </h3>
          <p className="text-white/60 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Свадьбы, дни рождения, корпоративы — создадим уникальный торт или набор сладостей под ваш стиль. Срок изготовления от 3 дней.
          </p>
          <a
            href="tel:+79615078100"
            className="btn-primary text-base px-8 py-4 shadow-lg shadow-mama-pink/30"
          >
            Позвонить и заказать
          </a>
        </div>

      </div>
    </section>
  )
}
