import { createContext, useContext } from 'react'
import { pt } from './pt'
import type { Dictionary, Language } from './types'

export type I18nValue = {
  lang: Language
  setLang: (lang: Language) => void
  /** Dicionário do idioma atual. */
  t: Dictionary
}

export const I18nContext = createContext<I18nValue>({ lang: 'pt', setLang: () => {}, t: pt })

export function useI18n() {
  return useContext(I18nContext)
}
