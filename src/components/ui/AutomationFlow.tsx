import { motion } from 'motion/react'
import { Fragment } from 'react'
import { useI18n } from '../../i18n/context'
import type { FlowStep } from '../../i18n/types'
import { EASE_OUT } from '../../lib/motion'

/** Conexão tracejada com um ponto que "leva o dado" de uma etapa para a próxima. */
function Connector({ index }: { index: number }) {
  return (
    <li aria-hidden="true" className="relative h-8 w-full md:h-auto md:w-14 md:shrink-0">
      <span className="absolute inset-y-1 left-1/2 w-0.5 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--color-brand)_0_4px,transparent_4px_9px)] opacity-40 md:inset-x-1 md:top-1/2 md:bottom-auto md:h-0.5 md:w-auto md:translate-x-0 md:-translate-y-1/2 md:bg-[repeating-linear-gradient(to_right,var(--color-brand)_0_4px,transparent_4px_9px)]" />
      <span
        className="absolute left-1/2 size-2.5 -translate-x-1/2 animate-flow-y rounded-full bg-brand shadow-[0_0_0_4px_rgb(0_62_166/0.15)] motion-reduce:animate-none md:top-1/2 md:left-0 md:translate-x-0 md:-translate-y-1/2 md:animate-flow-x"
        style={{ animationDelay: `${index * 0.9}s` }}
      />
    </li>
  )
}

/** Diagrama "gatilho → agente de IA → ação" da área expandida de IA & automações. */
export function AutomationFlow({ steps }: { steps: FlowStep[] }) {
  const { t } = useI18n()

  return (
    <ol aria-label={t.services.flowLabel} className="flex flex-col md:flex-row md:items-stretch">
      {steps.map((step, index) => (
        <Fragment key={step.label}>
          <motion.li
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.2, duration: 0.5, ease: EASE_OUT }}
            className="flex flex-1 flex-col gap-1 rounded-md border border-brand/20 bg-surface px-5 py-4"
          >
            <span className="type-tag text-brand">{String(index + 1).padStart(2, '0')}</span>
            <span className="font-display text-lg font-semibold text-title">{step.label}</span>
            <span className="type-caption text-body">{step.detail}</span>
          </motion.li>
          {index < steps.length - 1 && <Connector index={index} />}
        </Fragment>
      ))}
    </ol>
  )
}
