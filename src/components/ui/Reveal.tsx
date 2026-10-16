import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Deslocamento inicial em px (positivo = vem da direita / de baixo). */
  x?: number
  y?: number
}

/** Faz o conteúdo surgir (fade + deslize) quando entra na tela. */
export function Reveal({ children, className, delay = 0, x = 0, y = 32 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
