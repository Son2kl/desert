import type { ReactNode } from 'react'

interface DailyItem {
  name: string
  description: string
  price: string
  category: string
  emoji: string
}

async function fetchDailyMenu(): Promise<DailyItem[] | null> {
  const url = process.env.GOOGLE_SHEET_URL
  if (!url) return null

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const csv = await res.text()

    const lines = csv.split('\n').slice(1)
    return lines
      .map((line) => {
        const parts = line.split(',')
        return {
          name: parts[0]?.trim() ?? '',
          description: parts[1]?.trim() ?? '',
          price: parts[2]?.trim() ?? '',
          category: parts[3]?.trim() ?? '',
          emoji: parts[4]?.trim() ?? '✨',
        }
      })
      .filter((item) => item.name)
  } catch {
    return null
  }
}

const DEMO_ITEMS: DailyItem[] = [
  { name: 'Торт «Три шоколада»', description: 'Муссовый, с зеркальной глазурью — порция', price: '450', category: 'Десерт дня', emoji: '🍫' },
  { name: 'Ржаной хлеб с семенами', description: 'Только что из печи, свежий', price: '260', category: 'Хлеб дня', emoji: '🍞' },
  { name: 'Флан с карамелью', description: 'Сезонная позиция, ограниченное количество', price: '320', category: 'Новинка', emoji: '🍮' },
]

function DayTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-mama-pink">
      {children}
    </span>
  )
}

export default async function DailyMenu() {
  const items = (await fetchDailyMenu()) ?? DEMO_ITEMS
  const today = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(new Date())

  return (
    <section className="bg-mama-navy py-5 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          {/* Label */}
          <div className="shrink-0 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-mama-pink animate-pulse" />
            <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
              Сегодня, {today}
            </span>
          </div>

          {/* Items */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 group">
                <span className="text-lg">{item.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/85 text-sm font-medium">{item.name}</span>
                    <DayTag>{item.category}</DayTag>
                  </div>
                  <span className="text-mama-pink text-sm font-bold">{item.price}₽</span>
                </div>
                {i < items.length - 1 && (
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
