import { motion, type Variants } from 'motion/react'
import marker from '../../assets/timeline-marker-brand.svg'
import type { ExperienceText } from '../../i18n/types'
import { fadeLeft, fadeRight, inView, pop, staggered } from '../../lib/motion'

type TimelineGroupProps = {
  company: string
  period: string
  /** Cargos nesta empresa, na ordem em que aparecem */
  roles: readonly ExperienceText[]
  /** A última empresa não desenha a linha até o próximo marcador. */
  isLast: boolean
}

/** O trilho "se desenha" de cima para baixo depois que o marcador aparece. */
const drawDown: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.9, ease: 'easeInOut', delay: 0.35 } },
}

/**
 * Uma empresa na linha do tempo. No desktop: empresa e período | marcador | cargos empilhados.
 * No mobile o marcador vai para a esquerda e o texto empilha.
 */
export function TimelineGroup({ company, period, roles, isLast }: TimelineGroupProps) {
  return (
    <motion.li
      {...inView}
      viewport={{ once: true, amount: 0.3 }}
      variants={staggered(0.12)}
      className="grid grid-cols-[42px_1fr] gap-x-5 gap-y-6 md:grid-cols-[1fr_42px_1fr] md:gap-x-12"
    >
      <motion.div variants={fadeLeft} className="col-start-2 flex flex-col gap-3 pt-1 md:col-start-1 md:row-start-1">
        <h3 className="type-h3 text-heading">{company}</h3>
        <p className="type-body-lg text-faint">{period}</p>
      </motion.div>

      <div className="relative col-start-1 row-span-2 row-start-1 md:col-start-2 md:row-span-1">
        <motion.img
          variants={pop}
          src={marker}
          alt=""
          className="relative z-10 size-[42px]"
        />
        {!isLast && (
          // Trilho tracejado (traço 4px, espaço 6px) até o marcador da próxima empresa, 64px abaixo (gap-16 da lista).
          <motion.span
            aria-hidden="true"
            variants={drawDown}
            className="absolute top-[42px] -bottom-16 left-1/2 w-0.5 -translate-x-1/2 origin-top bg-[repeating-linear-gradient(to_bottom,var(--color-icon)_0_4px,transparent_4px_10px)]"
          />
        )}
      </div>

      <motion.ul
        variants={staggered(0.12)}
        className="col-start-2 flex flex-col gap-8 pt-1 md:col-start-3 md:row-start-1 md:items-end md:text-right"
      >
        {roles.map((item) => (
          <motion.li key={item.role} variants={fadeRight} className="flex flex-col gap-3 md:items-end">
            <p className="type-h3 text-heading">{item.role}</p>
            <p className="type-body-md text-faint md:max-w-[400px]">{item.description}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.li>
  )
}
