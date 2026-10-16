import { stagger, type Variants } from 'motion/react'

/** Curva "ease-out" suave usada em todas as entradas. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Props para animar quando o elemento entra na tela (uma vez só). */
export const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.25 },
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
}

/** Container que faz os filhos (com as variantes acima) entrarem um após o outro. */
export function staggered(interval = 0.12, startDelay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { delayChildren: stagger(interval, { startDelay }) } },
  }
}
