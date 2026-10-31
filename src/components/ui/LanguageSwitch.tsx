import { motion } from 'motion/react'
import { useI18n } from '../../i18n/context'
import type { Language } from '../../i18n/types'

const options: { value: Language; short: string; name: string }[] = [
  { value: 'pt', short: 'PT', name: 'Português' },
  { value: 'en', short: 'EN', name: 'English' },
]

/** Seletor de idioma: PT | EN com a pílula azul deslizando. */
export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()

  return (
    <div role="group" aria-label={t.controls.language} className="flex items-center rounded-full bg-white/5 p-1">
      {options.map((option) => {
        const isActive = option.value === lang
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value === 'pt' ? 'pt-BR' : 'en'}
            aria-label={option.name}
            aria-pressed={isActive}
            onClick={() => setLang(option.value)}
            // before: estende a área de toque para 44px de altura sem mudar o desenho da pílula.
            className="relative rounded-full px-3 py-1.5 type-tag text-white before:absolute before:inset-x-0 before:-inset-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{option.short}</span>
          </button>
        )
      })}
    </div>
  )
}
