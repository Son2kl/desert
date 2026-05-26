const DAILY_ITEMS = [
  { name: 'Торт «Три шоколада»', description: 'Муссовый, с зеркальной глазурью', price: '450', emoji: '🍫', tag: 'Десерт дня' },
  { name: 'Ржаной хлеб с семенами', description: 'Только что из печи', price: '260', emoji: '🍞', tag: 'Хлеб дня' },
  { name: 'Флан с карамелью', description: 'Сезонная позиция, ограниченно', price: '320', emoji: '🍮', tag: 'Новинка' },
]

export default function DailyMenu() {
  const today = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date())

  return (
    <section className="bg-mama-navy py-5 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div className="shrink-0 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-mama-pink animate-pulse" />
            <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
              Сегодня, {today}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6">
            {DAILY_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="text-lg">{item.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/85 text-sm font-medium">{item.name}</span>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-mama-pink">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-mama-pink text-sm font-bold">{item.price}₽</span>
                </div>
                {i < DAILY_ITEMS.length - 1 && (
                  <span className="hidden md:block text-white/15 ml-4">·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
