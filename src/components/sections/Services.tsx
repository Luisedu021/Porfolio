import { motion } from 'motion/react'
import { useState } from 'react'
import arrowRight from '../../assets/icon-arrow-right.svg'
import { useI18n } from '../../i18n/context'
import { inView, staggered } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { ServiceRow } from '../ui/ServiceRow'

export function Services() {
  const { t } = useI18n()
  // IA & automações (índice 0) começa expandido.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="servicos" className="bg-muted pt-20 pb-16 lg:pt-32 lg:pb-24">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <h2 className="type-section text-title">
              {t.services.titleLines[0]}
              <br />
              {t.services.titleLines[1]}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Button href="#contato" icon={arrowRight}>
              {t.services.cta}
            </Button>
          </Reveal>
        </div>

        <motion.ul {...inView} variants={staggered(0.12)} className="flex flex-col gap-12">
          {t.services.items.map((service, index) => (
            <ServiceRow
              key={service.number}
              {...service}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
