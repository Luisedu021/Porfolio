import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { sectionIds } from '../../data/content'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useI18n } from '../../i18n/context'
import { cn } from '../../lib/cn'
import { EASE_OUT } from '../../lib/motion'
import { CurlyArrow } from '../ui/CurlyArrow'
import { LanguageSwitch } from '../ui/LanguageSwitch'
import { ThemeToggle } from '../ui/ThemeToggle'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
})

/** Barra do menu (Figma: Hero 104:1305 › barra superior): idioma e tema, menu e "Entre em contato". */
export function Header() {
  const { t } = useI18n()
  const active = useActiveSection(sectionIds)
  const listRef = useRef<HTMLUListElement>(null)
  const { scrollY } = useScroll()
  const arrowOpacity = useTransform(scrollY, [0, 120], [1, 0])

  // No celular o menu rola na horizontal: centraliza o item ativo.
  useEffect(() => {
    const list = listRef.current
    const link = list?.querySelector<HTMLElement>('[aria-current]')
    if (!list || !link || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])

  return (
    <header className="sticky top-0 z-50 bg-nav dark:border-b dark:border-white/10">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center gap-3 px-4 lg:h-[81px] lg:gap-6 lg:px-[22px] xl:gap-[41px]">
        {/* Idioma e tema, à esquerda */}
        <motion.div {...enter(0)} className="flex shrink-0 items-center gap-[11px]">
          <LanguageSwitch />
          <ThemeToggle />
        </motion.div>

        <motion.nav
          {...enter(0.08)}
          aria-label={t.nav.label}
          className="min-w-0 flex-1 rounded-full bg-nav p-2 xl:w-[808px] xl:flex-none"
        >
          <ul
            ref={listRef}
            className="relative flex items-center justify-between gap-1 overflow-x-auto [scrollbar-width:none]"
          >
            {sectionIds.map((id) => {
              const isActive = active === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-full px-4 py-3 whitespace-nowrap type-nav text-white transition-colors xl:px-6',
                      !isActive && 'hover:bg-white/10',
                    )}
                  >
                    {/* Pílula translúcida que desliza entre os itens */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-brand/20 ring-1 ring-white/15"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t.nav[id]}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </motion.nav>

        {/* "Entre em contato" + seta desenhada (só no desktop; no celular o menu já tem "Contato") */}
        <motion.div {...enter(0.16)} className="relative hidden shrink-0 lg:flex">
          <a
            href="#contato"
            className="flex h-11 items-center rounded-full bg-brand px-6 type-nav font-medium whitespace-nowrap text-white shadow-[0_8px_24px_rgb(0_62_166/0.35)] transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.nav.cta}
          </a>
          {/* A seta some quando a página rola, para não ficar flutuando sobre o conteúdo */}
          <motion.div
            className="pointer-events-none absolute top-full left-1/2 mt-3 -translate-x-1/2 text-title"
            style={{ opacity: arrowOpacity }}
          >
            <CurlyArrow className="h-[103px] w-[69px] rotate-12" />
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
