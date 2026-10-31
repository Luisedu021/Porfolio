import { motion } from 'motion/react'
import { type ComponentProps, type FormEvent, useState } from 'react'
import iconMail from '../../assets/icon-mail.svg'
import iconSend from '../../assets/icon-send.svg'
import iconWhatsapp from '../../assets/icon-whatsapp.svg'
import { contact, socialLinks } from '../../data/content'
import { useI18n } from '../../i18n/context'
import { API_URL, apiPost } from '../../lib/api'
import { cn } from '../../lib/cn'
import { EASE_OUT, fadeUp, inView, staggered } from '../../lib/motion'
import { Button } from '../ui/Button'
import { ContactInfo } from '../ui/ContactInfo'
import { Container } from '../ui/Container'
import { FormField } from '../ui/FormField'

type Status = 'idle' | 'sending' | 'sent' | 'failed'

export function Contact() {
  const { t, lang } = useI18n()
  const labels = t.contact.fields
  const [status, setStatus] = useState<Status>('idle')

  const formFields: ComponentProps<typeof FormField>[] = [
    { label: labels.name, name: 'nome', required: true, autoComplete: 'name' },
    { label: labels.email, name: 'email', type: 'email', required: true, autoComplete: 'email' },
    { label: labels.phone, name: 'whatsapp', type: 'tel', autoComplete: 'tel' },
    { label: labels.location, name: 'localizacao', autoComplete: 'address-level2' },
    { label: labels.project, name: 'projeto', required: true },
    { label: labels.message, name: 'mensagem', required: true, multiline: true },
  ]

  /**
   * Com o back-end (VITE_API_URL): salva no banco, avisa por email e confirma no WhatsApp.
   * Sem ele: abre o app de email do visitante com a mensagem já preenchida.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const field = (name: string) => String(data.get(name) ?? '').trim()

    if (!API_URL) {
      const subject = t.contact.mailSubject(field('projeto'))
      const body = [
        `${labels.name}: ${field('nome')}`,
        `${labels.email}: ${field('email')}`,
        `${labels.phone}: ${field('whatsapp') || '-'}`,
        `${labels.location}: ${field('localizacao') || '-'}`,
        '',
        field('mensagem'),
      ].join('\n')
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      await apiPost('/api/contact/', {
        name: field('nome'),
        email: field('email'),
        phone: field('whatsapp'),
        location: field('localizacao'),
        project: field('projeto'),
        message: field('mensagem'),
        website: field('website'),
        language: lang,
      })
      form.reset()
      setStatus('sent')
    } catch (error) {
      console.error(error)
      setStatus('failed')
    }
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
                  icon={iconWhatsapp}
                  label={t.contact.whatsappLabel}
                  value={contact.phone}
                  href={contact.whatsappHref(t.contact.whatsappMessage)}
                />
              </li>
            </motion.ul>
            <motion.ul variants={fadeUp} className="flex items-center gap-4">
              {socialLinks(t.contact.whatsappMessage).map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="block transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                  >
                    {/* Ícones azuis: no escuro, invert + hue-rotate clareia mantendo o tom de azul. */}
                    <img src={social.icon} alt="" className="size-6 dark:invert dark:hue-rotate-180" />
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
            {/* Armadilha para robôs: escondido de pessoas, mas bots preenchem e a mensagem é descartada. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <motion.div variants={fadeUp} className="flex flex-col items-start gap-3">
              <Button type="submit" icon={iconSend} disabled={status === 'sending'}>
                {status === 'sending' ? t.contact.sending : t.contact.submit}
              </Button>
              <p role="status" className={cn('type-body-md', status === 'failed' ? 'text-red-600' : 'text-brand')}>
                {status === 'sent' && t.contact.sent}
                {status === 'failed' && t.contact.failed}
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  )
}
