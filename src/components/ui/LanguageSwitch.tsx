import { motion } from 'motion/react'
import { useI18n } from '../../i18n/context'
import type { Language } from '../../i18n/types'

const options: { value: Language; short: string; name: string }[] = [
  { value: 'pt', short: 'PT', name: 'Português' },
  { value: 'en', short: 'EN', name: 'English' },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

/**
 * Seletor de idioma. A partir de `sm`: PT | EN com a pílula azul deslizando.
 * No celular (pouco espaço no menu): um botão só, que alterna entre os dois.
 */
export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()
  const current = options.find((option) => option.value === lang) ?? options[0]
  const other = options.find((option) => option.value !== lang) ?? options[1]

  return (
    <>
      <button
        type="button"
        onClick={() => setLang(other.value)}
        aria-label={`${t.controls.language}: ${other.name}`}
        className={`flex size-10 items-center justify-center rounded-full bg-white/5 type-tag text-white sm:hidden ${focusRing}`}
      >
        {current.short}
      </button>

      <div
        role="group"
        aria-label={t.controls.language}
        className="hidden items-center rounded-full bg-white/5 p-1 sm:flex"
      >
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
              className={`relative rounded-full px-3 py-1.5 type-tag text-white ${focusRing}`}
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
    </>
  )
}
