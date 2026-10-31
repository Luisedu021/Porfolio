import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { I18nContext } from './context'
import { en } from './en'
import { pt } from './pt'
import type { Language } from './types'

const dictionaries = { pt, en }
const STORAGE_KEY = 'lang'

/** Escolha salva > português (o padrão do site, qualquer que seja o idioma do navegador). */
function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // localStorage indisponível (modo privado etc.): fica no padrão.
  }
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage)
  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  const value = useMemo(
    () => ({
      lang,
      t,
      setLang: (next: Language) => {
        setLangState(next)
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          // Sem persistência; a troca vale só nesta visita.
        }
      },
    }),
    [lang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
