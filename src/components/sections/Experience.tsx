import { experiences } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { TimelineGroup } from '../ui/TimelineGroup'

export function Experience() {
  const { t } = useI18n()

  return (
    <section id="experiencia" className="bg-page pt-20 pb-16 lg:pt-32 lg:pb-24">
      <Container className="flex flex-col items-center gap-16 lg:gap-24">
        <Reveal>
          <h2 className="text-center type-h1 text-heading">{t.experience.title}</h2>
        </Reveal>
        <ol className="flex w-full max-w-[1056px] flex-col gap-16">
          {experiences.map((group, index) => (
            <TimelineGroup
              key={group.key}
              company={group.company}
              period={t.experience.periods[group.key]}
              roles={group.roles.map((role) => t.experience.items[role])}
              isLast={index === experiences.length - 1}
            />
          ))}
        </ol>
      </Container>
    </section>
  )
}
