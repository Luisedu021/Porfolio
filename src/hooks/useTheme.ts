import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

/** Aplica o tema na tag <html> (as cores trocam via variáveis CSS em index.css). */
export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/**
 * Tema atual. O script em index.html já aplica a classe antes do React carregar
 * (sem "piscar"); aqui lemos o estado, salvamos a escolha e seguimos o sistema
 * enquanto o visitante não escolher um tema.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const followSystem = (event: MediaQueryListEvent) => {
      if (getSavedTheme()) return
      const next = event.matches ? 'dark' : 'light'
      applyTheme(next)
      setThemeState(next)
    }
    media.addEventListener('change', followSystem)
    return () => media.removeEventListener('change', followSystem)
  }, [])

  function setTheme(next: Theme) {
    applyTheme(next)
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem persistência; vale só nesta visita.
    }
  }

  return { theme, setTheme }
}
