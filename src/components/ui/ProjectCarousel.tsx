import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import arrowRight from '../../assets/icon-arrow-right.svg'
import type { Project } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { cn } from '../../lib/cn'
import { EASE_OUT } from '../../lib/motion'
import { ProjectShowcase } from './ProjectShowcase'

type ProjectCarouselProps = {
  projects: Project[]
  /** Número da categoria (01, 02...). */
  number: string
  layout: 'side' | 'stacked'
  delay?: number
  onClose?: () => void
}

/** Distância (px) que o dedo precisa arrastar para trocar de projeto. */
const SWIPE = 60

const slide = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: (direction: number) => ({ opacity: 0, x: direction * -48, transition: { duration: 0.2 } }),
}

const navButton =
  'flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white'

/**
 * Projetos de uma categoria, um por vez. Setas (e ← → no teclado, ou arrastar no celular)
 * trocam o projeto; com um projeto só, a navegação some.
 */
export function ProjectCarousel({ projects, number, layout, delay = 0, onClose }: ProjectCarouselProps) {
  const { t } = useI18n()
  const [[index, direction], setPage] = useState<[number, number]>([0, 0])
  const total = projects.length
  const hasNav = total > 1
  const isSide = layout === 'side'
  const closeRef = useRef<HTMLButtonElement>(null)

  // O botão da coluna fica inerte quando ela abre; o foco vem para o "fechar" para não se perder.
  // Sem rolar: com autoFocus o navegador rolava a lista (overflow-hidden) enquanto a coluna crescia.
  useEffect(() => closeRef.current?.focus({ preventScroll: true }), [])

  // Dá a volta: depois do último vem o primeiro (assim o botão focado nunca fica desativado).
  const go = (step: number) => setPage(([current]) => [(current + step + total) % total, step])

  useEffect(() => {
    if (!hasNav) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE && Math.abs(info.offset.x) > Math.abs(info.offset.y)) go(info.offset.x < 0 ? 1 : -1)
  }

  const project = projects[index]

  return (
    <div className={cn('relative overflow-hidden', isSide && 'h-full')}>
      {/* Brilho azul atrás dos mockups */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_62%,color-mix(in_srgb,var(--color-brand)_45%,transparent),transparent_58%)]"
      />

      {/* Celular: ao abrir, o projeto "espia" para o lado uma vez, mostrando que dá para arrastar. */}
      <motion.div
        animate={hasNav && !isSide ? { x: [0, -18, 0] } : undefined}
        transition={{ delay: delay + 1, duration: 0.9, ease: 'easeInOut' }}
        className={cn(isSide && 'h-full')}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={project.key}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            onPanEnd={hasNav && !isSide ? handlePanEnd : undefined}
            style={{ touchAction: 'pan-y' }}
            className={cn(isSide && 'h-full')}
            aria-live="polite"
          >
            <ProjectShowcase project={project} number={number} layout={layout} delay={delay} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {hasNav && (
        <div
          className={cn(
            'flex items-center gap-3',
            isSide ? 'absolute right-6 bottom-6' : 'justify-between border-t border-white/10 px-5 py-4',
          )}
        >
          <button type="button" onClick={() => go(-1)} aria-label={t.projects.previous} className={navButton}>
            <img src={arrowRight} alt="" className="size-3.5 rotate-180" />
          </button>
          {isSide ? (
            <span className="min-w-12 text-center font-display text-sm text-white/70 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          ) : (
            // Celular: pontinhos (o atual alongado) deixam claro que há mais projetos para os lados.
            <span className="flex items-center gap-2">
              <span className="sr-only">
                {index + 1} / {total}
              </span>
              {projects.map((item, i) => (
                <span
                  key={item.key}
                  aria-hidden="true"
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/30',
                  )}
                />
              ))}
            </span>
          )}
          <button type="button" onClick={() => go(1)} aria-label={t.projects.next} className={navButton}>
            <img src={arrowRight} alt="" className="size-3.5" />
          </button>
        </div>
      )}

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={t.projects.close}
          ref={closeRef}
          className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
