import { motion } from 'motion/react'
import { EASE_OUT } from '../../lib/motion'

/** Seta "desenhada à mão" com um laço, apontando para cima. Se desenha sozinha ao aparecer. */
export function CurlyArrow({ className, delay = 1.2 }: { className?: string; delay?: number }) {
  return (
    <svg
      viewBox="0 0 48 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d="M14 70C4 58 6 42 20 40C32 38 34 52 24 54C14 56 12 42 18 32C22 24 26 16 28 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 1.1, ease: EASE_OUT }}
      />
      <motion.path
        d="M20 12L28 4L35 13"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: delay + 0.9, duration: 0.4, ease: EASE_OUT }}
      />
    </svg>
  )
}
