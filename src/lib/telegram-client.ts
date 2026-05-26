export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('[Telegram] NEXT_PUBLIC_TELEGRAM_BOT_TOKEN or NEXT_PUBLIC_TELEGRAM_CHAT_ID not set')
    return
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
}
