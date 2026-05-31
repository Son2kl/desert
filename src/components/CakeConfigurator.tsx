'use client'
import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { sendTelegramMessage } from '@/lib/telegram-client'

const SIZES = [
  { id: '1kg', label: '1 кг', desc: '6–8 порций', price: 2500 },
  { id: '1.5kg', label: '1,5 кг', desc: '10–12 порций', price: 3750 },
  { id: '2kg', label: '2 кг', desc: '14–16 порций', price: 5000 },
  { id: '2.5kg', label: '2,5 кг', desc: '18–20 порций', price: 6250 },
  { id: '3kg', label: '3 кг', desc: '22–24 порции', price: 7500 },
]

const FLAVORS = [
  { id: 'milky-girl-raspberry', label: 'Молочная девочка с малиной' },
  { id: 'milky-girl-blackcurrant', label: 'Молочная девочка с чёрной смородиной' },
  { id: 'red-velvet-cherry', label: 'Красный бархат с вишней' },
  { id: 'chocolate-truffle', label: 'Шоколадный трюфель' },
  { id: 'snickers', label: 'Сникерс' },
  { id: 'chocolate-cherry', label: 'Шоколадный с вишней' },
  { id: 'caramel-girl', label: 'Карамельная девочка' },
  { id: 'pistachio-raspberry', label: 'Фисташковая девочка с малиной' },
  { id: 'banana', label: 'Банановый' },
  { id: 'medovik-caramel', label: 'Медовик с солёной карамелью' },
]

const DECORS = [
  { id: 'minimal', label: 'Минималистичный декор', desc: 'Кремовая надпись, простые контурные рисунки, украшение мелкими элементами', price: 0 },
  { id: 'lambeth', label: 'Ламбет', desc: 'Кремовые рюши', price: 700 },
  { id: 'lambeth-bows', label: 'Ламбет с бантиками', desc: 'Кремовые рюши + бантики из атласных лент', price: 700 },
  { id: 'lambeth-sugar', label: 'Ламбет + сахарная картинка', desc: 'Ламбет с сахарной картинкой', price: 1000 },
  { id: 'cream-drawing', label: 'С кремовым рисунком', desc: 'Авторский кремовый рисунок', price: 800 },
  { id: 'chocolate-figure', label: 'С шоколадной фигуркой', desc: 'Шоколадная фигурка ручной работы', price: 1000 },
  { id: 'sugar-print', label: 'С картинкой на сахарной бумаге', desc: 'Печать вашего фото или изображения', price: 600 },
  { id: 'minimal-berries', label: 'Минимализм с ягодами', desc: 'Лаконичное оформление со свежими ягодами', price: 1000 },
]

const STEPS = ['Размер', 'Начинка', 'Декор', 'Контакты']

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

export default function CakeConfigurator() {
  const { ref, isVisible } = useInView()
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

  return (
    <section id="cake" className="py-14 md:py-20 bg-mama-cream overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 md:px-10">

        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag">Экспресс-заказ</span>
          <h2 className="section-title mb-4">Конструктор торта</h2>
          <p className="section-subtitle mx-auto text-center">
            Соберите торт за 4 шага — укажем точную цену и свяжемся с вами
          </p>
        </div>

        {status === 'success' ? (
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
        ) : (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {/* Progress bar */}
            <div className="px-6 pt-6 pb-4 border-b border-mama-blush">
              <div className="flex items-center justify-between mb-3">
                {STEPS.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => i < step && setStep(i)}
                    className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                      i <= step ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        i < step
                          ? 'bg-mama-pink text-white'
                          : i === step
                          ? 'bg-mama-navy text-white'
                          : 'bg-mama-blush text-mama-navy/40'
                      }`}
                    >
                      {i < step ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
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

              {/* Step 0: Size */}
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

              {/* Step 1: Flavor */}
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

              {/* Step 2: Decor */}
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

              {/* Step 3: Contacts */}
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

            {/* Footer with price + nav */}
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
        )}
      </div>
    </section>
  )
}
