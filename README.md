# Мама Кондитерская — Сайт

Современный продающий сайт для премиальной кофейни-пекарни «Мама Кондитерская».

## Стек

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS 3**
- **Оптимизация шрифтов** через `next/font/google` (Dela Gothic One + Montserrat)
- **Оптимизация изображений** через `next/image`

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx       # Корневой layout с метаданными и шрифтами
│   ├── page.tsx         # Главная страница
│   ├── globals.css      # Глобальные стили + Tailwind
│   ├── sitemap.ts       # Авто-генерация sitemap.xml
│   └── robots.ts        # Авто-генерация robots.txt
├── components/
│   ├── Header.tsx       # Фиксированная шапка с мобильным меню
│   ├── Hero.tsx         # Главный экран
│   ├── About.tsx        # О нас + история + статистика
│   ├── Bakery.tsx       # Выпечка — 4 категории
│   ├── Coffee.tsx       # Кофе — зерно, авторские, классика
│   ├── Menu.tsx         # Полное меню с табами (данные из JSON)
│   ├── Gallery.tsx      # Галерея — мозаичная сетка
│   ├── WhyUs.tsx        # Почему выбирают нас — 4 преимущества
│   ├── Reviews.tsx      # Отзывы гостей
│   ├── Contacts.tsx     # Контакты + карта Яндекс
│   └── Footer.tsx       # Подвал сайта
├── data/
│   └── menu.json        # Данные меню (легко обновлять)
├── hooks/
│   └── useInView.ts     # Хук для scroll-анимаций
└── types/
    └── index.ts         # TypeScript-типы
```

## Быстрый старт

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Обновление меню

Все данные меню хранятся в `src/data/menu.json`. Для обновления цен или добавления позиций отредактируйте этот файл — изменения применяются сразу без правки компонентов.

Структура позиции:
```json
{
  "id": "unique-id",
  "name": "Название",
  "description": "Описание",
  "price": 250,
  "volume": "300 мл",        // опционально
  "tag": "бестселлер",        // опционально: "бестселлер" | "новинка" | "авторский"
  "priceUnit": "₽/кг"         // опционально, заменяет стандартный ₽
}
```

## Деплой на Render

### Автоматический (рекомендуется)

В репозитории уже есть файл `render.yaml`. При подключении репозитория к Render сервис создастся автоматически.

### Ручной

1. Зайдите на [render.com](https://render.com) и создайте новый **Web Service**
2. Подключите этот репозиторий
3. Параметры:
   - **Environment:** Node
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm run start`
4. Добавьте переменную окружения:
   - `NEXT_PUBLIC_BASE_URL` = URL вашего сайта на Render (например, `https://mama-konditorskaya.onrender.com`)
5. Нажмите **Create Web Service**

### После деплоя

Обновите `NEXT_PUBLIC_BASE_URL` на реальный URL и задеплойте снова — это нужно для правильной генерации sitemap.xml и OpenGraph.

## Цветовая палитра (брендбук)

| Переменная Tailwind | HEX | Применение |
|---|---|---|
| `mama-blush` | `#fce8e5` | Фоны секций, карточки |
| `mama-navy` | `#424d61` | Основной текст, тёмные секции |
| `mama-pink` | `#f19496` | Акценты, кнопки, теги |
| `mama-cream` | `#faf8f7` | Основной фон страницы |

## Шрифты (брендбук)

- **Dela Gothic One** — логотип и декоративные элементы
- **Montserrat** — все заголовки и текст (кириллица + латиница)

## SEO

- `layout.tsx` — полные метатеги, OpenGraph, Twitter Cards
- `sitemap.ts` — автогенерация `/sitemap.xml`
- `robots.ts` — автогенерация `/robots.txt`
- Семантическая разметка (`<header>`, `<main>`, `<section>`, `<footer>`)
- `alt` тексты для всех изображений
- Адаптивность — mobile-first

## Замена изображений

Текущие изображения используют Unsplash CDN. Для продакшена замените URL в компонентах на собственные фото или добавьте их в папку `public/images/`.

## Контакты для обновления

- **Адрес:** `src/components/Contacts.tsx`
- **Телефон:** `src/components/Header.tsx`, `Contacts.tsx`, `Footer.tsx`
- **Часы работы:** `src/components/Contacts.tsx` (массив `HOURS`)
- **Соцсети:** замените `href: '#'` на реальные ссылки в `Footer.tsx`, `Gallery.tsx`, `Contacts.tsx`
