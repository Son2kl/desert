'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#about', label: 'О нас' },
  { href: '#menu', label: 'Меню' },
  { href: '#cakes', label: 'Торты' },

  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-mama-blush'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="#"
              className="flex items-center gap-2.5 group"
              onClick={handleNavClick}
            >
              <div className={`flex flex-col leading-none transition-colors duration-300 ${
                scrolled ? 'text-mama-navy' : 'text-white'
              }`}>
                <span className="font-extrabold text-xl md:text-2xl tracking-tight leading-tight">
                  Мама десертов
                </span>
                <span className={`text-[10px] font-medium tracking-[0.15em] ${
                  scrolled ? 'text-mama-navy/50' : 'text-white/60'
                }`}>
                  кондитерская
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-mama-pink ${
                    scrolled ? 'text-mama-navy/80' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Burger */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+79615078100"
                className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:text-mama-pink ${
                  scrolled ? 'text-mama-navy' : 'text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                8-961-507-81-00
              </a>

              {/* Mobile Burger */}
              <button
                className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 transition-colors duration-300 ${
                  scrolled ? 'text-mama-navy' : 'text-white'
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Меню"
              >
                <span
                  className={`block h-0.5 bg-current rounded transition-all duration-300 ${
                    menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current rounded transition-all duration-300 ${
                    menuOpen ? 'w-0 opacity-0' : 'w-5'
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current rounded transition-all duration-300 ${
                    menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-mama-navy/95 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 h-full w-72 bg-mama-navy flex flex-col pt-24 pb-10 px-8 transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-white/80 hover:text-mama-pink text-xl font-medium py-3 border-b border-white/10 transition-colors duration-200"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <a
              href="tel:+79615078100"
              className="flex items-center gap-3 text-white/80 hover:text-mama-pink transition-colors"
              onClick={handleNavClick}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              8-961-507-81-00
            </a>
            <p className="text-white/40 text-sm">ул. Российская 255/9</p>
          </div>
        </nav>
      </div>
    </>
  )
}
