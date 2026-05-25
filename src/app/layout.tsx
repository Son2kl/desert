import type { Metadata } from 'next'
import { Dela_Gothic_One, Montserrat } from 'next/font/google'
import './globals.css'

const delaGothic = Dela_Gothic_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dela-gothic',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mama-konditorskaya.ru'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Мама Кондитерская — выпечка, десерты и кофе',
    template: '%s | Мама Кондитерская',
  },
  description:
    'Премиальная кондитерская с авторскими десертами, свежей выпечкой и отборным кофе. Торты на заказ, корпоративные подарки. ул. Российская 255/9.',
  keywords: [
    'кондитерская',
    'выпечка',
    'кофе',
    'торты на заказ',
    'десерты',
    'круассаны',
    'хлеб на закваске',
    'мама кондитерская',
  ],
  authors: [{ name: 'Мама Кондитерская' }],
  openGraph: {
    title: 'Мама Кондитерская',
    description: 'Авторские десерты, свежая выпечка и отборный кофе',
    url: BASE_URL,
    siteName: 'Мама Кондитерская',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Мама Кондитерская',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Мама Кондитерская',
    description: 'Авторские десерты, свежая выпечка и кофе',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${delaGothic.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
