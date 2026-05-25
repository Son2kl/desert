import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, date, time, comment, items } = body

    if (!name || !phone || !date || !time || !items?.length) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    const itemLines = items
      .map((i: { name: string; qty: number; price: number }) =>
        `  • ${i.name} × ${i.qty} = ${(i.price * i.qty).toLocaleString('ru-RU')}₽`
      )
      .join('\n')

    const total = items.reduce(
      (sum: number, i: { price: number; qty: number }) => sum + i.price * i.qty,
      0
    )

    const text = [
      '🧁 <b>Новый предзаказ!</b>',
      '',
      `📅 <b>Дата:</b> ${date}`,
      `🕐 <b>Время:</b> ${time}`,
      `👤 <b>Имя:</b> ${name}`,
      `📞 <b>Телефон:</b> ${phone}`,
      '',
      '📦 <b>Состав заказа:</b>',
      itemLines,
      '',
      `💰 <b>Итого:</b> ${total.toLocaleString('ru-RU')}₽`,
      comment ? `\n💬 <b>Комментарий:</b> ${comment}` : '',
    ]
      .filter((l) => l !== undefined)
      .join('\n')

    await sendTelegramMessage(text)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[/api/preorder]', e)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
