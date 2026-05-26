export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
  const chatIds = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_IDS

  if (!token || !chatIds) {
    console.warn('[Telegram] NEXT_PUBLIC_TELEGRAM_BOT_TOKEN or NEXT_PUBLIC_TELEGRAM_CHAT_IDS not set')
    return
  }

  const ids = chatIds.split(',').map((id) => id.trim()).filter(Boolean)

  await Promise.all(
    ids.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      })
    )
  )
}
