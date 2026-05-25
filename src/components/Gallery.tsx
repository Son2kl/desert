'use client'
import Image from 'next/image'
import { useInView } from '@/hooks/useInView'

const GALLERY = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=80&fit=crop',
    alt: 'Атмосфера кофейни Мама',
    className: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80&fit=crop',
    alt: 'Кофе с латте-артом',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&fit=crop',
    alt: 'Свежие круассаны',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&fit=crop',
    alt: 'Уютный интерьер',
    className: 'col-span-1 row-span-2',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80&fit=crop',
    alt: 'Выпечка и десерты',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=600&q=80&fit=crop',
    alt: 'Капучино',
    className: 'col-span-1 row-span-1',
  },
]

export default function Gallery() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: gridRef, isVisible: gridVisible } = useInView(0.05)

  return (
    <section id="gallery" className="py-24 md:py-32 bg-mama-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Heading */}
        <div
          ref={headRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 transition-all duration-700 ${
            headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-mama-pink mb-4">
              Наша атмосфера
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Галерея
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed">
            Загляните к нам виртуально — интерьер, кофе, выпечка и живая атмосфера кондитерской
          </p>
        </div>

        {/* Mosaic grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-4 transition-all duration-700 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {GALLERY.map((img, i) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-2xl group ${img.className}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'none' : 'translateY(16px)',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-mama-navy/0 group-hover:bg-mama-navy/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social CTA */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm mb-4">Больше фото в наших соцсетях</p>
          <div className="flex items-center justify-center gap-4">
            {[
              { name: 'Instagram', href: '#', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              )},
              { name: 'ВКонтакте', href: '#', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.779.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                </svg>
              )},
              { name: 'Telegram', href: '#', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              )},
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-mama-pink hover:border-mama-pink/40 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
