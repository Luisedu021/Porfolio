import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { fadeUp } from '../../lib/motion'

/*
 * Mockups de navegador e celular. Sem imagem, cada tela mostra um esqueleto de interface
 * (medidas em cqw: tudo escala junto com o tamanho do aparelho).
 */

function DesktopSkeleton() {
  return (
    <div className="flex size-full flex-col gap-[4cqw] bg-surface p-[4cqw]">
      <div className="flex items-center gap-[2.5cqw]">
        <span className="size-[3.2cqw] rounded-full bg-brand" />
        <span className="h-[1.2cqw] w-[7cqw] rounded-full bg-line" />
        <span className="h-[1.2cqw] w-[7cqw] rounded-full bg-line" />
        <span className="h-[1.2cqw] w-[7cqw] rounded-full bg-line" />
        <span className="ml-auto h-[3.2cqw] w-[12cqw] rounded-full bg-brand" />
      </div>
      <div className="flex flex-1 items-center gap-[5cqw]">
        <div className="flex flex-1 flex-col gap-[1.8cqw]">
          <span className="h-[3.4cqw] w-[90%] rounded-full bg-heading/80" />
          <span className="h-[3.4cqw] w-[70%] rounded-full bg-heading/80" />
          <span className="mt-[1cqw] h-[1.2cqw] w-[85%] rounded-full bg-line" />
          <span className="h-[1.2cqw] w-[60%] rounded-full bg-line" />
          <span className="mt-[1.5cqw] h-[4cqw] w-[14cqw] rounded-full bg-brand" />
        </div>
        <span className="aspect-[4/3] w-[40%] rounded-[1.5cqw] bg-brand-subtle" />
      </div>
      <div className="grid grid-cols-3 gap-[2.5cqw]">
        <span className="h-[9cqw] rounded-[1.5cqw] bg-page" />
        <span className="h-[9cqw] rounded-[1.5cqw] bg-page" />
        <span className="h-[9cqw] rounded-[1.5cqw] bg-page" />
      </div>
    </div>
  )
}

/** Dois layouts de celular diferentes, para os aparelhos não ficarem iguais. */
function MobileSkeleton({ variant }: { variant: number }) {
  return (
    <div className="flex size-full flex-col gap-[6cqw] bg-surface px-[7cqw] pt-[20cqw] pb-[8cqw]">
      <span className="h-[6cqw] w-[60%] rounded-full bg-heading/80" />
      {variant % 2 === 0 ? (
        <>
          <span className="aspect-[4/3] w-full rounded-[5cqw] bg-brand-subtle" />
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-[4cqw]">
              <span className="size-[12cqw] shrink-0 rounded-full bg-brand-subtle" />
              <div className="flex flex-1 flex-col gap-[2.5cqw]">
                <span className="h-[3cqw] w-[80%] rounded-full bg-heading/60" />
                <span className="h-[3cqw] w-[50%] rounded-full bg-line" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-[4cqw]">
            {[0, 1, 2, 3].map((card) => (
              <span
                key={card}
                className={cn('aspect-square rounded-[5cqw]', card === 0 ? 'bg-brand' : 'bg-brand-subtle')}
              />
            ))}
          </div>
          <span className="h-[3cqw] w-[70%] rounded-full bg-heading/60" />
          <span className="h-[22cqw] w-full rounded-[5cqw] bg-page" />
        </>
      )}
      <span className="mt-auto h-[12cqw] w-full rounded-full bg-brand" />
    </div>
  )
}

type ScreenProps = { src?: string; alt: string }

function Screen({ src, alt, fallback }: ScreenProps & { fallback: ReactNode }) {
  if (!src) return fallback
  return <img src={src} alt={alt} loading="lazy" className="size-full object-cover object-top" />
}

function BrowserFrame({ src, alt, className }: ScreenProps & { className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-md bg-surface shadow-[0_30px_60px_rgb(0_0_0/0.35)]', className)}>
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-page px-3">
        <span className="size-2 rounded-full bg-faint/50" />
        <span className="size-2 rounded-full bg-faint/50" />
        <span className="size-2 rounded-full bg-faint/50" />
        <span className="mx-auto h-3 w-2/5 rounded-full bg-line" />
      </div>
      <div className="@container aspect-[16/10]">
        <Screen src={src} alt={alt} fallback={<DesktopSkeleton />} />
      </div>
    </div>
  )
}

function PhoneFrame({ src, alt, variant = 0, className }: ScreenProps & { variant?: number; className?: string }) {
  return (
    <div
      className={cn(
        '@container relative aspect-[9/19] overflow-hidden rounded-[1.6rem] border-[5px] border-nav bg-surface shadow-[0_24px_48px_rgb(0_0_0/0.4)] ring-1 ring-white/10',
        className,
      )}
    >
      <span className="absolute top-[3cqw] left-1/2 z-10 h-[7cqw] w-[32%] -translate-x-1/2 rounded-full bg-nav" />
      <Screen src={src} alt={alt} fallback={<MobileSkeleton variant={variant} />} />
    </div>
  )
}

type DeviceShowcaseProps = {
  screens: { desktop?: string; mobile?: string[] }
  alt: string
  className?: string
}

/**
 * Composição: navegador ao fundo e dois celulares sobrepostos no canto inferior direito.
 * Os aparelhos entram um de cada vez (variantes `fadeUp` do container pai).
 */
export function DeviceShowcase({ screens, alt, className }: DeviceShowcaseProps) {
  const phones = screens.mobile?.length ? screens.mobile.slice(0, 2) : [undefined, undefined]

  return (
    <div className={cn('relative pr-[14%] pb-[12%]', className)}>
      <motion.div variants={fadeUp}>
        <BrowserFrame src={screens.desktop} alt={alt} />
      </motion.div>
      <div className="absolute right-0 bottom-0 flex w-[44%] items-end gap-[6%]">
        {phones.map((src, index) => (
          <motion.div key={index} variants={fadeUp} className={cn('flex-1', index === 0 && 'mb-[12%]')}>
            <PhoneFrame src={src} alt={alt} variant={index} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
