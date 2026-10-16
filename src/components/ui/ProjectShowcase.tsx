import { motion } from 'motion/react'
import arrowUpRight from '../../assets/icon-arrow-up-right.svg'
import type { Project } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { cn } from '../../lib/cn'
import { fadeUp, staggered } from '../../lib/motion'
import { DeviceShowcase } from './DeviceMockups'
import { Tag } from './Tag'

type ProjectShowcaseProps = {
  project: Project
  number: string
  /**
   * side: texto à esquerda e mockups à direita (coluna aberta no desktop).
   * stacked: texto em cima e mockups embaixo (celular; número e título já aparecem na linha).
   */
  layout: 'side' | 'stacked'
  /** Espera a coluna/linha abrir antes de os itens entrarem. */
  delay?: number
  onClose?: () => void
}

/** Conteúdo do projeto aberto: resumo, desafio, resultado, tags, link e mockups. */
export function ProjectShowcase({ project, number, layout, delay = 0, onClose }: ProjectShowcaseProps) {
  const { t } = useI18n()
  const text = t.projects.items[project.key]
  const isSide = layout === 'side'

  return (
    <motion.div
      variants={staggered(0.08, delay)}
      initial="hidden"
      animate="show"
      className={cn(
        'relative grid gap-10 text-white',
        isSide ? 'h-full grid-cols-[minmax(0,300px)_minmax(0,1fr)] items-center p-10 xl:gap-14 xl:p-14' : 'px-5 pt-2 pb-8',
      )}
    >
      {/* Brilho azul atrás dos mockups */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_62%,color-mix(in_srgb,var(--color-brand)_45%,transparent),transparent_58%)]"
      />

      <div className="relative flex flex-col gap-5">
        {isSide && (
          <>
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="font-display text-lg font-light text-white/60">{number}</span>
              <span className="rounded-full border border-white/20 px-3 py-1 type-tag text-white/80">{text.category}</span>
            </motion.div>
            <motion.h3 variants={fadeUp} className="type-h2 text-white">
              {project.title}
            </motion.h3>
          </>
        )}
        <motion.p variants={fadeUp} className="type-body-md text-white/75">
          {text.summary}
        </motion.p>
        <motion.dl variants={fadeUp} className="grid gap-4 border-t border-white/15 pt-5">
          <div className="flex flex-col gap-1">
            <dt className="type-caption tracking-widest text-tag-foreground uppercase">{t.projects.challengeLabel}</dt>
            <dd className="type-body-md text-white/90">{text.challenge}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="type-caption tracking-widest text-tag-foreground uppercase">{t.projects.resultLabel}</dt>
            <dd className="type-body-md text-white/90">{text.result}</dd>
          </div>
        </motion.dl>
        <motion.ul variants={fadeUp} className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </motion.ul>
        {project.href && (
          <motion.a
            variants={fadeUp}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group/link flex w-fit items-center gap-2 rounded-md bg-brand px-6 py-4 type-button text-white transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.projects.viewCase}
            <img src={arrowUpRight} alt="" className="size-3.5 transition-transform group-hover/link:rotate-45" />
          </motion.a>
        )}
      </div>

      <DeviceShowcase screens={project.screens} alt={t.projects.screen(project.title)} className="relative" />

      {onClose && (
        // O botão da coluna fica inerte quando ela abre; o foco vem para cá para não se perder.
        <button
          type="button"
          onClick={onClose}
          aria-label={t.projects.close}
          autoFocus
          className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </motion.div>
  )
}
