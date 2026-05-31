import Image from 'next/image'

interface Props {
  image: string
  eyebrow: string
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  align?: 'left' | 'center'
  overlay?: 'dark' | 'medium'
}

export default function PhotoFeature({
  image, eyebrow, title, subtitle, ctaLabel, ctaHref,
  align = 'left', overlay = 'dark',
}: Props) {
  const overlayClass = overlay === 'dark'
    ? 'from-black/75 via-black/40 to-transparent'
    : 'from-black/55 via-black/25 to-transparent'

  return (
    <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover md:scale-100 scale-105 md:blur-none blur-[1px]"
        sizes="100vw"
      />
      {/* Base gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${overlayClass}`} />
      {/* Extra darkening on mobile so text is always readable */}
      <div className="absolute inset-0 bg-black/30 md:hidden" />
      <div className={`absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-10 md:pb-20 ${align === 'center' ? 'items-center text-center' : 'items-start'}`}>
        <p className="text-mama-pink text-[11px] font-semibold uppercase tracking-[0.25em] mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-4 max-w-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/65 text-base md:text-lg font-light mb-8 max-w-md leading-relaxed">
            {subtitle}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <a href={ctaHref} className="btn-primary text-sm px-8 py-3.5">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
