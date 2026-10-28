import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useMemo, useState } from 'react'
import { type Project, type ProjectCategory, projectCategories } from '../../data/content'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useProjects } from '../../hooks/useProjects'
import { useI18n } from '../../i18n/context'
import { cn } from '../../lib/cn'
import { EASE_OUT, fadeUp, inView, staggered } from '../../lib/motion'
import { Container } from '../ui/Container'
import { ProjectCarousel } from '../ui/ProjectCarousel'
import { Reveal } from '../ui/Reveal'

/** Largura (px) das colunas fechadas enquanto outra categoria está aberta. */
const COLLAPSED_WIDTH = 88

const numberOf = (index: number) => String(index + 1).padStart(2, '0')

type Group = { category: ProjectCategory; items: Project[] }

/** Uma coluna (desktop) ou linha (celular) por categoria, com os projetos dela. Categoria vazia some. */
const groupByCategory = (projects: Project[]): Group[] =>
  projectCategories
    .map((category) => ({ category, items: projects.filter((project) => project.category === category) }))
    .filter((group) => group.items.length > 0)

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M2.24 24L0 21.76L18.56 3.2H8V0H24V16H20.8V5.44L2.24 24Z" fill="currentColor" />
    </svg>
  )
}

type ListProps = {
  groups: Group[]
  openIndex: number | null
  onToggle: (index: number) => void
  onClose: () => void
}

/**
 * Desktop: uma coluna por categoria com o número grande. No hover aparece a capa do primeiro projeto;
 * no clique a coluna cresce e mostra os projetos, e as outras viram faixas.
 */
function ProjectColumns({ groups, openIndex, onToggle, onClose }: ListProps) {
  const { t } = useI18n()
  const baseId = useId()
  // Largura final da coluna aberta: o conteúdo já nasce nesse tamanho e não se reorganiza enquanto a coluna cresce.
  const panelWidth = `calc(100cqw - ${(groups.length - 1) * COLLAPSED_WIDTH}px)`

  return (
    <motion.ul
      {...inView}
      variants={staggered(0.12)}
      className="@container flex h-[620px] w-full overflow-hidden rounded-lg bg-surface shadow-[0_12px_32px_rgba(5,26,64,0.08)] dark:ring-1 dark:ring-white/5"
    >
      {groups.map(({ category, items }, index) => {
        const isOpen = openIndex === index
        const isCollapsed = openIndex !== null && !isOpen
        const panelId = `${baseId}-${category}`
        const label = t.projects.categories[category]

        return (
          <motion.li
            key={category}
            variants={fadeUp}
            className="relative min-w-0 overflow-hidden border-line transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] not-first:border-l"
            style={{ flexGrow: isCollapsed ? 0 : 1, flexBasis: isCollapsed ? COLLAPSED_WIDTH : 0 }}
          >
            <button
              type="button"
              onClick={() => onToggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={t.projects.open(label)}
              inert={isOpen}
              className="group absolute inset-0 flex flex-col text-left text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
            >
              {/* Capa: o topo do site do primeiro projeto, que aparece com um leve zoom de afastamento */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-inverse opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {!isCollapsed && (
                  <img
                    src={items[0].preview}
                    alt=""
                    loading="lazy"
                    className="size-full scale-110 object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-100"
                  />
                )}
                {/* Escurece em cima e embaixo para os textos continuarem legíveis */}
                <span className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(5_26_63/0.85),transparent_22%,transparent_70%,rgb(5_26_63/0.92))]" />
              </span>

              {/* Coluna larga: quantidade, número no centro, categoria e seta embaixo */}
              <span
                className={cn(
                  'relative flex flex-1 flex-col p-8 transition-opacity duration-300',
                  isCollapsed ? 'opacity-0' : 'opacity-100 delay-300',
                )}
              >
                <span className="relative type-caption tracking-widest text-body uppercase transition-colors duration-500 group-hover:text-white/70">
                  {t.projects.count(items.length)}
                </span>
                {/* Centralizado na coluna inteira, para não subir quando o título quebra em duas linhas */}
                <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(96px,10vw,160px)] leading-none font-light tracking-[-0.04em] transition duration-500 group-hover:opacity-0 group-focus-visible:opacity-0">
                  {numberOf(index)}
                </span>
                <span className="relative mt-auto flex items-end justify-between gap-4">
                  <span className="type-h4 transition-colors duration-500 group-hover:text-white">{label}</span>
                  <ArrowUpRight className="mb-1.5 size-4 shrink-0 transition duration-500 group-hover:rotate-45 group-hover:text-white" />
                </span>
              </span>

              {/* Faixa estreita (outra categoria aberta): número em cima e categoria na vertical */}
              <span
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-between py-8 transition-opacity duration-300',
                  isCollapsed ? 'opacity-100 delay-300' : 'opacity-0',
                )}
              >
                <span className="relative font-display text-2xl font-light transition-colors group-hover:text-white">
                  {numberOf(index)}
                </span>
                <span className="relative rotate-180 type-nav whitespace-nowrap transition-colors [writing-mode:vertical-rl] group-hover:text-white">
                  {label}
                </span>
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-label={label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  className="absolute inset-y-0 left-0 z-10 overflow-hidden bg-inverse"
                  style={{ width: panelWidth }}
                >
                  <ProjectCarousel projects={items} number={numberOf(index)} layout="side" delay={0.35} onClose={onClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

/** Celular e tablet: acordeão por categoria; a linha tocada abre com os projetos dela. */
function ProjectList({ groups, openIndex, onToggle }: Omit<ListProps, 'onClose'>) {
  const { t } = useI18n()
  const baseId = useId()

  return (
    <motion.ul
      {...inView}
      variants={staggered(0.1)}
      className="flex w-full flex-col overflow-hidden rounded-lg bg-surface shadow-[0_12px_32px_rgba(5,26,64,0.08)] dark:ring-1 dark:ring-white/5"
    >
      {groups.map(({ category, items }, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-${category}`

        return (
          <motion.li key={category} variants={fadeUp} className="border-line not-first:border-t">
            <button
              type="button"
              onClick={() => onToggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={cn(
                'flex w-full items-center gap-5 px-5 py-6 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand',
                isOpen ? 'bg-inverse text-white' : 'text-ink',
              )}
            >
              <span className="font-display text-5xl leading-none font-light tracking-[-0.04em]">{numberOf(index)}</span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className={cn('type-caption tracking-widest uppercase', isOpen ? 'text-white/60' : 'text-body')}>
                  {t.projects.count(items.length)}
                </span>
                <span className="type-h4">{t.projects.categories[category]}</span>
              </span>
              <ArrowUpRight className={cn('size-4 shrink-0 transition-transform duration-300', isOpen && 'rotate-90')} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="overflow-hidden bg-inverse"
                >
                  <ProjectCarousel projects={items} number={numberOf(index)} layout="stacked" delay={0.15} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

export function Projects() {
  const { t } = useI18n()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const projects = useProjects()
  const groups = useMemo(() => groupByCategory(projects), [projects])
  // No celular a primeira categoria já começa aberta, para as telas aparecerem sem precisar tocar.
  const [openIndex, setOpenIndex] = useState<number | null>(() => (isDesktop ? null : 0))
  const toggle = (index: number) => setOpenIndex((current) => (current === index ? null : index))

  // Esc fecha a categoria aberta (escuta na janela: o foco pode estar fora da lista).
  useEffect(() => {
    if (openIndex === null) return
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpenIndex(null)
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openIndex])

  return (
    <section id="projetos" className="bg-page pt-16 pb-20 lg:pt-24 lg:pb-32">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <h2 className="type-h2 text-ink">
              {t.projects.titleStart}
              <span className="text-title">{t.projects.titleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-[480px]">
            <p className="type-body-lg text-body">{t.projects.body}</p>
          </Reveal>
        </div>

        {isDesktop ? (
          <ProjectColumns groups={groups} openIndex={openIndex} onToggle={toggle} onClose={() => setOpenIndex(null)} />
        ) : (
          <ProjectList groups={groups} openIndex={openIndex} onToggle={toggle} />
        )}
      </Container>
    </section>
  )
}
