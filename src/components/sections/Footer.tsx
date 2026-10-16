import logoMark from '../../assets/logo-mark.svg'
import { useI18n } from '../../i18n/context'
import { Container } from '../ui/Container'

const currentYear = new Date().getFullYear()

export function Footer() {
  const { t } = useI18n()

  return (
    // pt-[184px] = 120px escondidos sob o cartão de contato + 64px de respiro.
    <footer className="bg-inverse pt-[184px] pb-16">
      <Container className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <a href="#inicio" className="flex items-center gap-3" aria-label={t.footer.backToTop}>
          <img src={logoMark} alt="" className="h-[34px] w-[25px]" />
          <span className="type-caption text-white uppercase">
            UI/UX Designer
            <br />
            Web Dev.
          </span>
        </a>
        <p className="type-caption text-white/70">
          © {currentYear} Luís Eduardo. {t.footer.rights}
        </p>
      </Container>
    </footer>
  )
}
