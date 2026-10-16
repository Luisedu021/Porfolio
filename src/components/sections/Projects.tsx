import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { projects } from '../../data/content'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useI18n } from '../../i18n/context'
import { cn } from '../../lib/cn'
import { EASE_OUT, fadeUp, inView, staggered } from '../../lib/motion'
import { Container } from '../ui/Container'
import { ProjectShowcase } from '../ui/ProjectShowcase'
import { Reveal } from '../ui/Reveal'

/** Largura (px) das colunas fechadas enquanto outro projeto está aberto. */
const COLLAPSED_WIDTH = 88

const numberOf = (index: number) => String(index + 1).padStart(2, '0')

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M2.24 24L0 21.76L18.56 3.2H8V0H24V16H20.8V5.44L2.24 24Z" fill="currentColor" />
    </svg>
  )
}

type ListProps = {
  openIndex: number | null
  onToggle: (index: number) => void
  onClose: () => void
}

/**
 * Desktop: colunas lado a lado com o número grande. No hover a capa aparece;
 * no clique a coluna cresce e mostra o projeto, e as outras viram faixas estreitas.
 */
function ProjectColumns({ openIndex, onToggle, onClose }: ListProps) {
  const { t } = useI18n()
  const baseId = useId()
  // Largura final da coluna aberta: o conteúdo já nasce nesse tamanho e não se reorganiza enquanto a coluna cresce.
  const panelWidth = `calc(100cqw - ${(projects.length - 1) * COLLAPSED_WIDTH}px)`

  return (
    <motion.ul
      {...inView}
      variants={staggered(0.12)}
      className="@container flex h-[620px] w-full overflow-hidden rounded-lg bg-surface shadow-[0_12px_32px_rgba(5,26,64,0.08)] dark:ring-1 dark:ring-white/5"
    >
      {projects.map((project, index) => {
        const isOpen = openIndex === index
        const isCollapsed = openIndex !== null && !isOpen
        const panelId = `${baseId}-${project.key}`
        const text = t.projects.items[project.key]

        return (
          <motion.li
            key={project.key}
            variants={fadeUp}
            className="relative min-w-0 overflow-hidden border-line transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] not-first:border-l"
            style={{ flexGrow: isCollapsed ? 0 : 1, flexBasis: isCollapsed ? COLLAPSED_WIDTH : 0 }}
          >
            <button
              type="button"
              onClick={() => onToggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-label={t.projects.open(project.title)}
              inert={isOpen}
              className="group absolute inset-0 flex flex-col text-left text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
            >
              {/* Capa + véu escuro que aparecem no hover */}
              <img
                src={project.cover}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span className="absolute inset-0 bg-inverse/60 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />

              {/* Coluna larga: categoria, número no centro, título e seta embaixo */}
              <span
                className={cn(
                  'relative flex flex-1 flex-col p-8 transition-opacity duration-300',
                  isCollapsed ? 'opacity-0' : 'opacity-100 delay-300',
                )}
              >
                <span className="relative type-caption tracking-widest text-body uppercase transition-colors duration-500 group-hover:text-white/70">
                  {text.category}
                </span>
                {/* Centralizado na coluna inteira, para não subir quando o título quebra em duas linhas */}
                <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(96px,10vw,160px)] leading-none font-light tracking-[-0.04em] transition-colors duration-500 group-hover:text-white">
                  {numberOf(index)}
                </span>
                <span className="relative mt-auto flex items-end justify-between gap-4">
                  <span className="type-h4 transition-colors duration-500 group-hover:text-white">{project.title}</span>
                  <ArrowUpRight className="mb-1.5 size-4 shrink-0 transition duration-500 group-hover:rotate-45 group-hover:text-white" />
                </span>
              </span>

              {/* Faixa estreita (outro projeto aberto): número em cima e título na vertical */}
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
                  {project.title}
                </span>
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-label={project.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  className="absolute inset-y-0 left-0 z-10 overflow-hidden bg-inverse"
                  style={{ width: panelWidth }}
                >
                  <ProjectShowcase
                    project={project}
                    number={numberOf(index)}
                    layout="side"
                    delay={0.35}
                    onClose={onClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

/** Celular e tablet: lista em acordeão; a linha tocada abre com o projeto e os mockups. */
function ProjectList({ openIndex, onToggle }: Omit<ListProps, 'onClose'>) {
  const { t } = useI18n()
  const baseId = useId()

  return (
    <motion.ul
      {...inView}
      variants={staggered(0.1)}
      className="flex w-full flex-col overflow-hidden rounded-lg bg-surface shadow-[0_12px_32px_rgba(5,26,64,0.08)] dark:ring-1 dark:ring-white/5"
    >
      {projects.map((project, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-${project.key}`
        const text = t.projects.items[project.key]

        return (
          <motion.li key={project.key} variants={fadeUp} className="border-line not-first:border-t">
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
                  {text.category}
                </span>
                <span className="type-h4">{project.title}</span>
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
                  <ProjectShowcase project={project} number={numberOf(index)} layout="stacked" delay={0.15} />
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
  // No celular o primeiro projeto já começa aberto, para as telas aparecerem sem precisar tocar.
  const [openIndex, setOpenIndex] = useState<number | null>(() => (isDesktop ? null : 0))
  const toggle = (index: number) => setOpenIndex((current) => (current === index ? null : index))

  // Esc fecha o projeto aberto (escuta na janela: o foco pode estar fora da lista).
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
          <ProjectColumns openIndex={openIndex} onToggle={toggle} onClose={() => setOpenIndex(null)} />
        ) : (
          <ProjectList openIndex={openIndex} onToggle={toggle} />
        )}
      </Container>
    </section>
  )
}
