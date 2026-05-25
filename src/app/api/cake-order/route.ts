import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, date, wishes, size, base, cream, filling, decor, total } = body

    if (!name || !phone || !date || !size) {
      return NextResponse.json({ error: 'Заполните все обязательные поля' }, { status: 400 })
    }

    const text = [
      '🎂 <b>Новый заказ торта!</b>',
      '',
      `👤 <b>Имя:</b> ${name}`,
      `📞 <b>Телефон:</b> ${phone}`,
      `📅 <b>Дата получения:</b> ${date}`,
      '',
      '🎂 <b>Параметры торта:</b>',
      `  • Размер: ${size}`,
      `  • Бисквит: ${base}`,
      `  • Крем: ${cream}`,
      `  • Начинка: ${filling}`,
      `  • Декор: ${decor}`,
      '',
      `💰 <b>Стоимость:</b> от ${total.toLocaleString('ru-RU')}₽`,
      wishes ? `\n💬 <b>Пожелания:</b> ${wishes}` : '',
    ]
      .filter((l) => l !== undefined)
      .join('\n')

    await sendTelegramMessage(text)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[/api/cake-order]', e)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
