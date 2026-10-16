import { motion } from 'motion/react'
import photo from '../../assets/luis-photo.png'
import { socials } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { EASE_OUT, inView, pop, staggered } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'

export function About() {
  const { t } = useI18n()

  return (
    <section id="sobre" className="bg-subtle py-20 lg:py-32">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 px-6 md:px-10 lg:flex-row lg:gap-16 lg:pr-16 lg:pl-12">
        {/* Retrato no círculo azul-marinho (Figma: Portrait 552×552): o círculo cresce e a foto sobe por dentro. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="relative aspect-square w-full max-w-[552px] shrink-0 overflow-hidden rounded-full bg-inverse"
        >
          <motion.div
            initial={{ opacity: 0, y: '25%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 1.1, ease: EASE_OUT }}
            className="absolute top-[13.41%] left-[25.36%] h-[99.82%] w-[49.28%] overflow-hidden"
          >
            <img
              src={photo}
              alt={t.hero.photoAlt}
              loading="lazy"
              className="absolute top-[-82.31%] left-[-146.15%] h-[226.76%] w-[366.3%] max-w-none"
            />
          </motion.div>
        </motion.div>

        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-end lg:text-right">
          <Reveal x={40} y={0}>
            <h2 className="type-h2 text-heading">{t.about.title}</h2>
          </Reveal>
          <Reveal x={40} y={0} delay={0.15}>
            <p className="type-body-lg text-body">{t.about.body}</p>
          </Reveal>
          <motion.ul {...inView} variants={staggered(0.1, 0.3)} className="flex items-center gap-6 pt-2">
            {[socials.linkedin, socials.instagram, socials.github].map((social) => (
              <motion.li key={social.label} variants={pop}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="block transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                >
                  <img src={social.icon} alt="" className="size-7 dark:invert" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
