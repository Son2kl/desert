'use client'
import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { sendTelegramMessage } from '@/lib/telegram-client'

// ── Shared data ──────────────────────────────────────────────────────────────

const SIZES = [
  { id: '1kg', label: '1 кг', desc: '6–8 порций', price: 2500 },
  { id: '1.5kg', label: '1,5 кг', desc: '10–12 порций', price: 3750 },
  { id: '2kg', label: '2 кг', desc: '14–16 порций', price: 5000 },
  { id: '2.5kg', label: '2,5 кг', desc: '18–20 порций', price: 6250 },
  { id: '3kg', label: '3 кг', desc: '22–24 порции', price: 7500 },
]

const FLAVORS: {
  id: string
  label: string
  description: string
  image: string | null
}[] = [
  {
    id: 'milky-girl-raspberry',
    label: 'Молочная девочка с малиной',
    description: 'Коржи на сгущённом молоке, крем на основе сливок и творожного сыра, малиновый конфитюр',
    image: null,
  },
  {
    id: 'milky-girl-blackcurrant',
    label: 'Молочная девочка с чёрной смородиной',
    description: 'Коржи на сгущённом молоке, крем на основе сливок и творожного сыра, черносмородиновый конфитюр',
    image: null,
  },
  {
    id: 'medovik-caramel',
    label: 'Медовик с солёной карамелью',
    description: 'Коржи на гречишном меду, крем на основе сливок и сметаны, сливочная карамель с розовой солью',
    image: null,
  },
  {
    id: 'pistachio-raspberry',
    label: 'Фисташковая девочка с малиной',
    description: 'Коржи на сгущённом молоке с дроблёными фисташками и пастой фисташки, крем на основе сливок и творожного сыра, малиновый конфитюр',
    image: null,
  },
  {
    id: 'caramel-girl',
    label: 'Карамельная девочка',
    description: 'Коржи на варёном сгущённом молоке, воздушный карамельный крем на основе сливок',
    image: null,
  },
  {
    id: 'red-velvet-cherry',
    label: 'Красный бархат с вишней',
    description: 'Влажные красные коржи с нотой какао, крем на основе творожного сыра, вишнёвый конфитюр с кусочками вишни',
    image: null,
  },
  {
    id: 'chocolate-truffle',
    label: 'Шоколадный трюфель',
    description: 'Насыщенный влажный шоколадный бисквит, прослойка из ганаша на тёмном шоколаде',
    image: null,
  },
  {
    id: 'snickers',
    label: 'Сникерс',
    description: 'Шоколадный бисквит с пропиткой, сливочная карамель с розовой солью, цельный арахис, воздушный ганаш на молочном шоколаде',
    image: null,
  },
  {
    id: 'chocolate-cherry',
    label: 'Шоколадный с вишней',
    description: 'Шоколадный бисквит с пропиткой, сливочный крем, вишнёвый конфитюр с кусочками вишни, воздушный ганаш на молочном шоколаде',
    image: null,
  },
  {
    id: 'banana',
    label: 'Банановый',
    description: 'Воздушный бисквит на основе тростникового сахара, ванильный крем на основе творожного сыра, сливочная карамель с розовой солью, свежие ломтики банана, хрустящий слой с фундуком',
    image: null,
  },
]

const DECORS: {
  id: string
  label: string
  desc: string
  price: number
  image: string | null
}[] = [
  { id: 'minimal', label: 'Минималистичный декор', desc: 'Кремовая надпись, простые контурные рисунки, украшение мелкими элементами', price: 0, image: null },
  { id: 'lambeth', label: 'Ламбет', desc: 'Кремовые рюши', price: 700, image: null },
  { id: 'lambeth-bows', label: 'Ламбет с бантиками', desc: 'Кремовые рюши + бантики из атласных лент', price: 700, image: null },
  { id: 'lambeth-sugar', label: 'Ламбет + сахарная картинка', desc: 'Ламбет с сахарной картинкой', price: 1000, image: null },
  { id: 'cream-drawing', label: 'С кремовым рисунком', desc: 'Авторский кремовый рисунок', price: 800, image: null },
  { id: 'chocolate-figure', label: 'С шоколадной фигуркой', desc: 'Шоколадная фигурка ручной работы', price: 1000, image: null },
  { id: 'sugar-print', label: 'С картинкой на сахарной бумаге', desc: 'Печать вашего фото или изображения', price: 600, image: null },
  { id: 'minimal-berries', label: 'Минимализм с ягодами', desc: 'Лаконичное оформление со свежими ягодами', price: 1000, image: null },
]

const STEPS = ['Размер', 'Начинка', 'Декор', 'Контакты']

// ── Helper components ─────────────────────────────────────────────────────────

function SelectCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
        selected
          ? 'border-mama-pink bg-mama-blush shadow-md shadow-mama-pink/10'
          : 'border-mama-blush bg-white hover:border-mama-pink/40'
      }`}
    >
      {children}
    </button>
  )
}

function PhotoPlaceholder({ initial }: { initial: string }) {
  return (
    <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-mama-blush via-[#fcecea] to-mama-cream flex items-center justify-center">
      <span className="font-display font-bold text-5xl text-mama-pink/15 select-none">{initial}</span>
    </div>
  )
}

// ── Tab: Order (4-step configurator) ─────────────────────────────────────────

interface Config {
  size: typeof SIZES[0] | null
  flavor: typeof FLAVORS[0] | null
  decor: typeof DECORS[0] | null
  name: string
  phone: string
  date: string
  wishes: string
}

const EMPTY_CONFIG: Config = {
  size: null, flavor: null, decor: null,
  name: '', phone: '', date: '', wishes: '',
}

function getMinDate() {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  return d.toISOString().split('T')[0]
}

function OrderTab() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [config, setConfig] = useState<Config>(EMPTY_CONFIG)

  const total = (config.size?.price ?? 0) + (config.decor?.price ?? 0)

  const canNext = [
    !!config.size,
    !!config.flavor,
    !!config.decor,
    !!(config.name && config.phone && config.date),
  ]

  const handleSubmit = async () => {
    setStatus('loading')
    try {
      const text = [
        '🎂 <b>Новый заказ торта!</b>',
        '',
        `👤 <b>Имя:</b> ${config.name}`,
        `📞 <b>Телефон:</b> ${config.phone}`,
        `📅 <b>Дата получения:</b> ${config.date}`,
        '',
        '🎂 <b>Параметры торта:</b>',
        `  • Размер: ${config.size?.label} (${config.size?.price?.toLocaleString('ru-RU')}₽)`,
        `  • Начинка: ${config.flavor?.label}`,
        `  • Декор: ${config.decor?.label}${config.decor?.price ? ` (+${config.decor.price}₽)` : ''}`,
        '',
        `💰 <b>Итого:</b> от ${total.toLocaleString('ru-RU')}₽`,
        config.wishes ? `\n💬 <b>Пожелания:</b> ${config.wishes}` : '',
      ].filter(Boolean).join('\n')

      await sendTelegramMessage(text)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
        <div className="text-6xl mb-5">🎂</div>
        <h3 className="text-2xl font-bold text-mama-navy mb-3">Заказ отправлен!</h3>
        <p className="text-mama-navy/60 mb-6">
          Свяжемся с вами в течение 2 часов для подтверждения и уточнения деталей
        </p>
        <button
          onClick={() => { setStatus('idle'); setStep(0); setConfig(EMPTY_CONFIG) }}
          className="btn-outline-navy"
        >
          Сделать ещё один заказ
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* Progress */}
      <div className="px-6 pt-6 pb-4 border-b border-mama-blush">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step && setStep(i)}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${i <= step ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < step ? 'bg-mama-pink text-white' : i === step ? 'bg-mama-navy text-white' : 'bg-mama-blush text-mama-navy/40'
              }`}>
                {i < step ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block ${i === step ? 'text-mama-navy' : 'text-mama-navy/40'}`}>
                {s}
              </span>
            </button>
          ))}
        </div>
        <div className="h-1 bg-mama-blush rounded-full">
          <div
            className="h-full bg-mama-pink rounded-full transition-all duration-500"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 min-h-[320px]">
        {step === 0 && (
          <div>
            <h3 className="font-bold text-mama-navy text-lg mb-5">Выберите размер</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SIZES.map((s) => (
                <SelectCard key={s.id} selected={config.size?.id === s.id} onClick={() => setConfig((c) => ({ ...c, size: s }))}>
                  <p className="text-xl font-extrabold text-mama-navy">{s.label}</p>
                  <p className="text-mama-navy/50 text-sm mt-0.5">{s.desc}</p>
                  <p className="text-mama-pink font-bold text-lg mt-2">{s.price.toLocaleString('ru-RU')}₽</p>
                </SelectCard>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="font-bold text-mama-navy text-lg mb-5">Выберите начинку</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FLAVORS.map((f) => (
                <SelectCard key={f.id} selected={config.flavor?.id === f.id} onClick={() => setConfig((c) => ({ ...c, flavor: f }))}>
                  <p className="text-mama-navy font-semibold text-sm">{f.label}</p>
                </SelectCard>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-bold text-mama-navy text-lg mb-5">Оформление</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DECORS.map((d) => (
                <SelectCard key={d.id} selected={config.decor?.id === d.id} onClick={() => setConfig((c) => ({ ...c, decor: d }))}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-mama-navy font-semibold text-sm">{d.label}</p>
                      <p className="text-mama-navy/50 text-xs mt-0.5">{d.desc}</p>
                    </div>
                    <span className={`text-sm font-bold shrink-0 ${d.price > 0 ? 'text-mama-pink' : 'text-mama-navy/30'}`}>
                      {d.price > 0 ? `+${d.price}₽` : 'включено'}
                    </span>
                  </div>
                </SelectCard>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-mama-navy text-lg mb-2">Ваши данные</h3>
            <div className="bg-mama-blush rounded-2xl p-4 text-sm space-y-1">
              {[
                { k: 'Размер', v: config.size?.label },
                { k: 'Начинка', v: config.flavor?.label },
                { k: 'Декор', v: config.decor?.label },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-mama-navy/50 shrink-0">{k}</span>
                  <span className="font-medium text-mama-navy text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Имя *</label>
                <input
                  value={config.name}
                  onChange={(e) => setConfig((c) => ({ ...c, name: e.target.value }))}
                  placeholder="Ваше имя"
                  className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink placeholder:text-mama-navy/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Телефон *</label>
                <input
                  value={config.phone}
                  onChange={(e) => setConfig((c) => ({ ...c, phone: e.target.value }))}
                  placeholder="+7 (___) ___-__-__"
                  type="tel"
                  className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink placeholder:text-mama-navy/30"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">
                Дата получения * <span className="normal-case font-normal text-mama-navy/40">(минимум за 3 дня)</span>
              </label>
              <input
                value={config.date}
                onChange={(e) => setConfig((c) => ({ ...c, date: e.target.value }))}
                type="date"
                min={getMinDate()}
                className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Пожелания</label>
              <textarea
                value={config.wishes}
                onChange={(e) => setConfig((c) => ({ ...c, wishes: e.target.value }))}
                placeholder="Надпись, любимые цвета, особые пожелания..."
                rows={3}
                className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink placeholder:text-mama-navy/30 resize-none"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-500 text-sm">Ошибка. Попробуйте ещё раз или позвоните нам.</p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-mama-blush flex items-center justify-between gap-4">
        <div>
          {total > 0 && (
            <div>
              <p className="text-xs text-mama-navy/40 uppercase tracking-wide">Итого</p>
              <p className="text-xl font-extrabold text-mama-navy">от {total.toLocaleString('ru-RU')}₽</p>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="w-11 h-11 rounded-xl border border-mama-blush flex items-center justify-center text-mama-navy/60 hover:border-mama-pink hover:text-mama-pink transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext[step]}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Далее
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canNext[3] || status === 'loading'}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {status === 'loading' ? 'Отправляем...' : 'Отправить заказ'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Tab: Flavors ──────────────────────────────────────────────────────────────

function FlavorsTab() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {FLAVORS.map((flavor) => (
        <div
          key={flavor.id}
          className="bg-white border border-mama-blush/60 rounded-3xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-mama-navy/8"
        >
          {flavor.image ? (
            <img src={flavor.image} alt={flavor.label} className="w-full aspect-square object-cover" />
          ) : (
            <PhotoPlaceholder initial={flavor.label.charAt(0)} />
          )}
          <div className="p-5">
            <h4 className="font-semibold text-mama-navy text-base mb-2 leading-snug">{flavor.label}</h4>
            <p className="text-mama-navy/50 text-sm leading-relaxed font-light">{flavor.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Tab: Decors ───────────────────────────────────────────────────────────────

function DecorsTab() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {DECORS.map((decor) => (
        <div
          key={decor.id}
          className="bg-white border border-mama-blush/60 rounded-3xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-mama-navy/8"
        >
          {decor.image ? (
            <img src={decor.image} alt={decor.label} className="w-full aspect-square object-cover" />
          ) : (
            <PhotoPlaceholder initial={decor.label.charAt(0)} />
          )}
          <div className="p-4">
            <h4 className="font-semibold text-mama-navy text-sm mb-1 leading-snug">{decor.label}</h4>
            <p className="text-mama-navy/45 text-xs mb-2 font-light leading-relaxed">{decor.desc}</p>
            <span className={`text-sm font-bold ${decor.price > 0 ? 'text-mama-pink' : 'text-mama-navy/30'}`}>
              {decor.price > 0 ? `+${decor.price} ₽` : 'включено'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Tab: Bento ────────────────────────────────────────────────────────────────

function BentoTab() {
  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <div className="bg-white rounded-3xl p-10 shadow-sm">
        <PhotoPlaceholder initial="Б" />
        <h3 className="text-xl font-bold text-mama-navy mt-6 mb-3">Бенто-торты</h3>
        <p className="text-mama-navy/60 text-sm leading-relaxed mb-6">
          Маленький авторский торт на 1–2 персоны. Идеально для признания в любви, небольшого праздника или просто так.
          Фотографии работ и описания появятся совсем скоро.
        </p>
        <a
          href="tel:+79615078100"
          className="btn-primary inline-flex"
        >
          Обсудить заказ
        </a>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'order', label: 'Конструктор' },
  { id: 'flavors', label: 'Начинки' },
  { id: 'decors', label: 'Декоры тортов' },
  { id: 'bento', label: 'Бенто-торты' },
]

export default function Cakes() {
  const { ref, isVisible } = useInView()
  const [activeTab, setActiveTab] = useState('order')

  return (
    <section id="cakes" className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">На заказ</span>
          <h2 className="section-title mb-5">Торты на заказ</h2>
          <p className="section-subtitle mx-auto text-center">
            Авторские торты с индивидуальным декором. Выберите вкус и оформление — свяжемся в течение 2 часов
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-mama-navy text-white shadow-md shadow-mama-navy/20'
                  : 'bg-white text-mama-navy/70 border border-mama-blush hover:border-mama-pink/40 hover:text-mama-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className={activeTab === 'order' ? 'max-w-3xl mx-auto' : ''}>
          {activeTab === 'order' && <OrderTab />}
          {activeTab === 'flavors' && <FlavorsTab />}
          {activeTab === 'decors' && <DecorsTab />}
          {activeTab === 'bento' && <BentoTab />}
        </div>

      </div>
    </section>
  )
}
