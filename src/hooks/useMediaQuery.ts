import { useSyncExternalStore } from 'react'

/** `true` enquanto a media query casar (ex.: '(min-width: 1024px)'). Atualiza ao redimensionar. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => matchMedia(query).matches,
  )
}
