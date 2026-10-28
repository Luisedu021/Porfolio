import { motion } from 'motion/react'
import arrowUpRight from '../../assets/icon-arrow-up-right.svg'
import type { Project } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { cn } from '../../lib/cn'
import { fadeUp, staggered } from '../../lib/motion'
import { CurlyArrow } from './CurlyArrow'
import { DeviceShowcase } from './DeviceMockups'
import { Tag } from './Tag'

type ProjectShowcaseProps = {
  project: Project
  number: string
  /**
   * side: texto à esquerda e mockups à direita (coluna aberta no desktop).
   * stacked: texto em cima e mockups embaixo (celular; número e categoria já aparecem na linha).
   */
  layout: 'side' | 'stacked'
  /** Espera a coluna/linha abrir antes de os itens entrarem. */
  delay?: number
}

/** Conteúdo de um projeto: resumo, desafio, resultado, tags, link e mockups. */
export function ProjectShowcase({ project, number, layout, delay = 0 }: ProjectShowcaseProps) {
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
      <div className="relative flex flex-col gap-5">
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          {isSide && <span className="font-display text-lg font-light text-white/60">{number}</span>}
          <span className="rounded-full border border-white/20 px-3 py-1 type-tag text-white/80">
            {t.projects.categories[project.category]}
          </span>
        </motion.div>
        <motion.h3 variants={fadeUp} className={cn('text-white', isSide ? 'type-h2' : 'type-h3')}>
          {project.title}
        </motion.h3>
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

      <div className={cn('relative', !isSide && 'pt-14')}>
        {/* Seta desenhada (a mesma do "Entre em contato") apontando para os aparelhos */}
        <CurlyArrow
          delay={delay + 0.5}
          className={cn(
            'pointer-events-none absolute h-[72px] w-12 text-tag-foreground',
            isSide ? '-top-14 left-0 rotate-[135deg]' : 'top-0 left-6 rotate-[165deg]',
          )}
        />
        <DeviceShowcase screens={project.screens} alt={t.projects.screen(project.title)} className="relative" />
      </div>
    </motion.div>
  )
}
