import { motion, useScroll, useSpring } from 'motion/react'

/** Barra azul no topo que mostra quanto da página já foi rolado. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-brand"
      style={{ scaleX }}
    />
  )
}
