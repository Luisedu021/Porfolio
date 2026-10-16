import { motion } from 'motion/react'
import type { ComponentProps, FormEvent } from 'react'
import iconMail from '../../assets/icon-mail.svg'
import iconPhone from '../../assets/icon-phone.svg'
import iconSend from '../../assets/icon-send.svg'
import { contact, socials } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { EASE_OUT, fadeUp, inView, staggered } from '../../lib/motion'
import { Button } from '../ui/Button'
import { ContactInfo } from '../ui/ContactInfo'
import { Container } from '../ui/Container'
import { FormField } from '../ui/FormField'

export function Contact() {
  const { t } = useI18n()
  const labels = t.contact.fields

  const formFields: ComponentProps<typeof FormField>[] = [
    { label: labels.name, name: 'nome', required: true, autoComplete: 'name' },
    { label: labels.email, name: 'email', type: 'email', required: true, autoComplete: 'email' },
    { label: labels.location, name: 'localizacao', autoComplete: 'address-level2' },
    { label: labels.project, name: 'projeto', required: true },
    { label: labels.message, name: 'mensagem', required: true, multiline: true },
  ]

  /** Sem backend: abre o app de email do visitante com a mensagem já preenchida. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '').trim()

    const subject = t.contact.mailSubject(field('projeto'))
    const body = [
      `${labels.name}: ${field('nome')}`,
      `${labels.email}: ${field('email')}`,
      `${labels.location}: ${field('localizacao') || '-'}`,
      '',
      field('mensagem'),
    ].join('\n')

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contato" className="bg-page pt-16">
      <Container className="flex justify-center">
        {/* Cartão sobreposto ao rodapé (margem negativa de 120px, como no Figma). */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="relative z-10 -mb-[120px] flex w-full max-w-[1056px] flex-col gap-10 rounded-lg bg-surface p-8 shadow-[0_24px_64px_rgba(5,26,64,0.1)] md:flex-row md:gap-16 md:p-16 dark:ring-1 dark:ring-white/5"
        >
          <motion.div {...inView} variants={staggered(0.1, 0.3)} className="flex min-w-0 flex-1 flex-col gap-8">
            <motion.h2 variants={fadeUp} className="type-h2 text-title">
              {t.contact.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="type-body-lg text-body">
              {t.contact.body}
            </motion.p>
            <motion.ul variants={fadeUp} className="flex flex-col gap-4">
              <li>
                <ContactInfo
                  icon={iconMail}
                  label={t.contact.emailLabel}
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
              </li>
              <li>
                <ContactInfo
                  icon={iconPhone}
                  label={t.contact.phoneLabel}
                  value={contact.phone}
                  href={contact.phoneHref}
                />
              </li>
            </motion.ul>
            <motion.ul variants={fadeUp} className="flex items-center gap-4">
              {[socials.instagram, socials.linkedin, socials.github].map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="block transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                  >
                    {/* Ícones azuis: no escuro, invert + hue-rotate clareia mantendo o tom de azul. */}
                    <img src={social.iconBrand} alt="" className="size-6 dark:invert dark:hue-rotate-180" />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.form
            {...inView}
            variants={staggered(0.08, 0.45)}
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-1 flex-col items-start gap-6 pt-2"
          >
            {formFields.map((field) => (
              <motion.div key={field.name} variants={fadeUp} className="w-full">
                <FormField {...field} />
              </motion.div>
            ))}
            <motion.div variants={fadeUp}>
              <Button type="submit" icon={iconSend}>
                {t.contact.submit}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  )
}
