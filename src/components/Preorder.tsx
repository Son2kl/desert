'use client'
import { useState, useEffect } from 'react'

const PREORDER_ITEMS = [
  { id: 'croissant-plain', name: 'Круассан классический', price: 180, cat: 'Выпечка' },
  { id: 'croissant-chocolate', name: 'Круассан с шоколадом', price: 220, cat: 'Выпечка' },
  { id: 'croissant-almond', name: 'Круассан миндальный', price: 250, cat: 'Выпечка' },
  { id: 'bread-wheat', name: 'Пшеничный хлеб', price: 280, cat: 'Хлеб' },
  { id: 'bread-rye', name: 'Ржаной хлеб', price: 260, cat: 'Хлеб' },
  { id: 'focaccia', name: 'Фокачча', price: 240, cat: 'Хлеб' },
  { id: 'eclair-vanilla', name: 'Эклер ванильный', price: 220, cat: 'Десерты' },
  { id: 'eclair-caramel', name: 'Эклер карамельный', price: 240, cat: 'Десерты' },
  { id: 'tart-lemon', name: 'Лимонный тарт', price: 270, cat: 'Десерты' },
  { id: 'brownie', name: 'Брауни', price: 200, cat: 'Десерты' },
  { id: 'cheesecake', name: 'Чизкейк', price: 320, cat: 'Десерты' },
  { id: 'macarons', name: 'Набор макаронс (12 шт)', price: 850, cat: 'Десерты' },
]

function getPickupDates() {
  const dates: { value: string; label: string }[] = []
  const now = new Date()
  for (let i = 1; i <= 7; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() + i)
    const value = d.toISOString().split('T')[0]
    const label = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }).format(d)
    dates.push({ value, label })
  }
  return dates
}

function getPickupTimes() {
  const times: string[] = []
  for (let h = 7; h <= 20; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`)
    if (h < 20) times.push(`${String(h).padStart(2, '0')}:30`)
  }
  return times
}

interface CartItem { id: string; name: string; price: number; qty: number }

export default function Preorder() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<'items' | 'details'>('items')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const dates = getPickupDates()
  const times = getPickupTimes()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const setQty = (id: string, name: string, price: number, qty: number) => {
    setCart((prev) => {
      if (qty === 0) return prev.filter((i) => i.id !== id)
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => i.id === id ? { ...i, qty } : i)
      return [...prev, { id, name, price, qty }]
    })
  }

  const getQty = (id: string) => cart.find((i) => i.id === id)?.qty ?? 0
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const grouped = Array.from(new Set(PREORDER_ITEMS.map((i) => i.cat))).map((cat) => ({
    cat,
    items: PREORDER_ITEMS.filter((i) => i.cat === cat),
  }))

  const handleSubmit = async () => {
    if (!name || !phone || !date || !time) return
    setStatus('loading')
    try {
      const res = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, date, time, comment, items: cart }),
      })
      if (res.ok) {
        setStatus('success')
        setCart([])
        setStep('items')
        setTimeout(() => {
          setOpen(false)
          setStatus('idle')
          setName(''); setPhone(''); setDate(''); setTime(''); setComment('')
        }, 3000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-mama-pink text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl shadow-mama-pink/40 hover:bg-mama-pink-dark hover:shadow-mama-pink/50 hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm"
      >
        <span className="text-lg">🧁</span>
        Предзаказ
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-mama-navy text-white text-[10px] font-bold flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-400 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

        {/* Drawer */}
        <div
          className={`absolute bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-6 md:w-[460px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl transition-transform duration-500 flex flex-col max-h-[90dvh] ${
            open ? 'translate-y-0' : 'translate-y-full md:translate-y-[120%]'
          }`}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1 md:hidden">
            <div className="w-10 h-1 rounded-full bg-mama-navy/15" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-mama-blush">
            <div>
              <h3 className="font-bold text-mama-navy text-lg">
                {step === 'items' ? 'Предзаказ выпечки' : 'Ваши данные'}
              </h3>
              <p className="text-mama-navy/50 text-xs mt-0.5">Заберите в удобное время</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-mama-blush flex items-center justify-center text-mama-navy/60 hover:text-mama-navy transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-mama-navy mb-2">Заказ принят!</h4>
                <p className="text-mama-navy/60 text-sm">Мы свяжемся с вами для подтверждения</p>
              </div>
            ) : step === 'items' ? (
              <div className="space-y-5">
                {grouped.map(({ cat, items }) => (
                  <div key={cat}>
                    <p className="text-xs font-semibold tracking-widest uppercase text-mama-navy/40 mb-2">{cat}</p>
                    <div className="space-y-1">
                      {items.map((item) => {
                        const qty = getQty(item.id)
                        return (
                          <div key={item.id} className="flex items-center justify-between py-2.5 border-b border-mama-blush/50 last:border-0">
                            <div className="flex-1 min-w-0">
                              <p className="text-mama-navy text-sm font-medium truncate">{item.name}</p>
                              <p className="text-mama-pink text-sm font-bold">{item.price}₽</p>
                            </div>
                            <div className="flex items-center gap-2 ml-3 shrink-0">
                              <button
                                onClick={() => setQty(item.id, item.name, item.price, Math.max(0, qty - 1))}
                                className="w-7 h-7 rounded-full border border-mama-blush flex items-center justify-center text-mama-navy/60 hover:border-mama-pink hover:text-mama-pink transition-colors disabled:opacity-30"
                                disabled={qty === 0}
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4"/></svg>
                              </button>
                              <span className="w-5 text-center text-sm font-bold text-mama-navy">{qty}</span>
                              <button
                                onClick={() => setQty(item.id, item.name, item.price, qty + 1)}
                                className="w-7 h-7 rounded-full bg-mama-pink text-white flex items-center justify-center hover:bg-mama-pink-dark transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Дата *</label>
                    <select
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink bg-white"
                    >
                      <option value="">Выберите</option>
                      {dates.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Время *</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink bg-white"
                    >
                      <option value="">Выберите</option>
                      {times.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Имя *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink placeholder:text-mama-navy/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Телефон *</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink placeholder:text-mama-navy/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-mama-navy/60 uppercase tracking-wide block mb-1.5">Комментарий</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Пожелания к заказу..."
                    rows={2}
                    className="w-full border border-mama-blush rounded-xl px-3 py-2.5 text-sm text-mama-navy focus:outline-none focus:border-mama-pink placeholder:text-mama-navy/30 resize-none"
                  />
                </div>

                {/* Cart summary */}
                <div className="bg-mama-blush rounded-xl p-3 space-y-1">
                  {cart.map((i) => (
                    <div key={i.id} className="flex justify-between text-xs text-mama-navy/70">
                      <span>{i.name} × {i.qty}</span>
                      <span className="font-semibold">{(i.price * i.qty).toLocaleString('ru-RU')}₽</span>
                    </div>
                  ))}
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">Ошибка. Попробуйте ещё раз или позвоните нам.</p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {status !== 'success' && (
            <div className="px-6 py-4 border-t border-mama-blush">
              {step === 'items' ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    {total > 0 && (
                      <p className="text-mama-navy font-bold text-lg">{total.toLocaleString('ru-RU')}₽</p>
                    )}
                  </div>
                  <button
                    onClick={() => setStep('details')}
                    disabled={cart.length === 0}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    Оформить
                    {cartCount > 0 && <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{cartCount}</span>}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep('items')}
                    className="w-10 h-10 rounded-xl border border-mama-blush flex items-center justify-center text-mama-navy/60 hover:border-mama-pink hover:text-mama-pink transition-colors shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!name || !phone || !date || !time || status === 'loading'}
                    className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? 'Отправляем...' : `Подтвердить · ${total.toLocaleString('ru-RU')}₽`}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
