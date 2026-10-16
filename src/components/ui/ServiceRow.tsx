import { AnimatePresence, motion } from 'motion/react'
import { useId } from 'react'
import arrowRight from '../../assets/icon-arrow-right.svg'
import arrowUpRight from '../../assets/icon-arrow-up-right.svg'
import { useI18n } from '../../i18n/context'
import type { Service } from '../../i18n/types'
import { cn } from '../../lib/cn'
import { EASE_OUT, fadeLeft, fadeUp, staggered } from '../../lib/motion'
import { AutomationFlow } from './AutomationFlow'
import { Button } from './Button'
import { Tag } from './Tag'

type ServiceRowProps = Service & {
  isOpen: boolean
  onToggle: () => void
}

/**
 * Figma: Service Row — número, título, tags, descrição e botão.
 * Clicar na linha (ou no botão) expande os detalhes do serviço.
 */
export function ServiceRow({ number, title, tags, description, details, cta, flow, isOpen, onToggle }: ServiceRowProps) {
  const { t } = useI18n()
  const panelId = useId()

  return (
    <motion.li variants={fadeUp}>
      {/* Clique em qualquer parte da linha (mouse). Teclado e leitores de tela usam o botão. */}
      <div onClick={onToggle} className="group flex cursor-pointer flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <div className="flex flex-1 items-center gap-4 md:gap-8">
          <span className="w-12 shrink-0 type-overline text-title">{number}</span>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h3
              className={cn(
                'type-service transition-colors duration-300',
                isOpen ? 'text-brand' : 'text-title group-hover:text-brand',
              )}
            >
              {title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </ul>
          </div>
        </div>
        <p className="type-body-lg text-ink max-md:pl-16 md:w-[360px] md:shrink-0">{description}</p>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={isOpen ? t.services.collapse(title) : t.services.expand(title)}
          onClick={(event) => {
            event.stopPropagation()
            onToggle()
          }}
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand max-md:ml-16',
            isOpen ? 'bg-brand' : 'bg-brand-strong group-hover:bg-brand',
          )}
        >
          <motion.img
            src={arrowUpRight}
            alt=""
            className="size-4"
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="pt-6 md:pl-20">
              <div className="flex flex-col gap-8 rounded-lg bg-surface/60 p-6 md:p-8">
                {flow && <AutomationFlow steps={flow} />}
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <motion.ul
                    variants={staggered(0.07, 0.15)}
                    initial="hidden"
                    animate="show"
                    className="grid gap-x-8 gap-y-4 sm:grid-cols-2"
                  >
                    {details.map((detail) => (
                      <motion.li key={detail} variants={fadeLeft} className="flex gap-3 type-body-lg text-ink">
                        <span className="mt-[9px] size-2 shrink-0 rounded-full bg-brand" />
                        {detail}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <Button href="#contato" icon={arrowRight}>
                    {cta}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
