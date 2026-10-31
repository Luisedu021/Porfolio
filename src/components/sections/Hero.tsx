import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import bottomFade from '../../assets/hero-bottom-fade.svg'
import heroGlow from '../../assets/hero-glow-v2.svg'
import photo from '../../assets/luis-photo.webp'
import figmaIcon from '../../assets/tech-figma.png'
import { useI18n } from '../../i18n/context'
import { cn } from '../../lib/cn'
import { EASE_OUT, fadeUp, staggered } from '../../lib/motion'
import { AnchorGrid } from '../ui/AnchorGrid'
import { Container } from '../ui/Container'
import { FigmaSelection } from '../ui/FigmaSelection'

type PortraitProps = {
  className?: string
  alt: string
  /** Posição do mouse na seção, de -0.5 a 0.5 (suavizada). */
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  /** Deslocamento vertical conforme a página rola (efeito de profundidade). */
  scrollY: MotionValue<number>
}

/**
 * Foto (Figma: Glow + Figma Icon + Photo + Vector 1). A caixa mostra só a parte
 * visível da foto (460×745 no design); o resto é cortado pela borda da seção.
 */
function Portrait({ className, alt, pointerX, pointerY, scrollY }: PortraitProps) {
  // Foto, brilho e ícone se movem em ritmos diferentes com o mouse: sensação de camadas.
  const photoX = useTransform(pointerX, (value) => value * -18)
  const photoY = useTransform(pointerY, (value) => value * -12)
  const glowX = useTransform(pointerX, (value) => value * 48)
  const glowY = useTransform(pointerY, (value) => value * 28)
  const figmaX = useTransform(pointerX, (value) => value * 34)
  const figmaY = useTransform(pointerY, (value) => value * 22)

  return (
    <motion.div className={cn('relative aspect-[460/745] w-full', className)} style={{ y: scrollY }}>
      <motion.div
        className="pointer-events-none absolute top-[5.64%] left-[5.87%] h-[91.5%] w-[96.7%]"
        style={{ x: glowX, y: glowY }}
      >
        <motion.div
          className="absolute inset-[-6.68%_-10.23%_-6.68%_-10.25%]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.4, ease: EASE_OUT }}
        >
          <motion.img
            src={heroGlow}
            alt=""
            className="block size-full max-w-none"
            animate={{ scale: [1, 1.05, 1], opacity: [1, 0.75, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
          />
        </motion.div>
      </motion.div>

      {/* Ícone do Figma desfocado atrás da foto */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[23.5%] left-[58%] w-[30.7%]"
        style={{ x: figmaX, y: figmaY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE_OUT }}
        >
          <motion.div
            className="relative aspect-square overflow-hidden rounded-[22%] shadow-[0_29px_59px_rgb(0_0_0/0.35)] blur-[3.9px]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            {/* A imagem tem margem transparente: ampliamos para mostrar só o quadrado preto */}
            <img src={figmaIcon} alt="" className="absolute top-1/2 left-1/2 w-[167%] max-w-none -translate-1/2" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Entrada: a foto sobe de trás da borda da seção (sem desfoque: blur animado numa imagem grande trava) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[122.68%]"
        initial={{ opacity: 0, y: '18%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 1.3, ease: EASE_OUT }}
      >
        <motion.div className="absolute inset-0 overflow-hidden will-change-transform" style={{ x: photoX, y: photoY }}>
          {/* A foto já vem recortada no trecho exibido (luis-photo.webp), então ocupa a caixa inteira. */}
          <img src={photo} alt={alt} fetchPriority="high" decoding="async" className="absolute inset-0 size-full" />
        </motion.div>
      </motion.div>

      {/* Esmaecimento azul na base da foto (no escuro, escurecido para combinar com o fundo) */}
      <div className="pointer-events-none absolute top-[76.6%] left-[-0.87%] h-[36.8%] w-[122.2%]">
        <div className="absolute inset-[-19.2%_-9.36%]">
          <img src={bottomFade} alt="" className="block size-full max-w-none dark:brightness-[0.22]" />
        </div>
      </div>
    </motion.div>
  )
}

const textEntrance = {
  initial: { opacity: 0, y: 48, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function Hero() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // Mouse: posição relativa (-0.5 a 0.5) para o parallax
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 18, mass: 0.6 })
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 18, mass: 0.6 })
  const headlineX = useTransform(smoothX, (value) => value * 12)

  // Rolagem: a foto desce mais devagar e o texto sobe um pouco.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140])
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60])

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function handlePointerLeave() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Degradê do topo (cores em index.css: --hero-*) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero" />

      {/* Grade de âncoras em Three.js: acende perto do cursor e desenha um caminho vetorial */}
      <AnchorGrid />

      {/*
        Mobile: título, botões e foto empilhados.
        lg: texto à esquerda e foto à direita.
        xl (1280px): composição exata do Figma (Hero 104:1305, sem a barra do menu).
      */}
      <Container className="relative grid gap-8 pt-8 lg:grid-cols-[1fr_400px] lg:gap-x-12 lg:pt-16 xl:block xl:h-[787px] xl:pt-0">
        <motion.div
          className="relative z-10 flex flex-col items-start gap-6 lg:self-center xl:absolute xl:top-[150px] xl:left-[78px]"
          style={{ x: headlineX, y: textScrollY }}
        >
          {/* Selo de vidro com nome e cargo */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.8, ease: EASE_OUT }}
            className="glass flex items-center rounded-full px-5 pt-2 pb-1.5 text-[13px] leading-5 sm:px-4"
          >
            {/* Celular: nome em cima e cargo embaixo. A partir de sm: tudo numa linha, separado por um ponto. */}
            <span className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
              <span className="font-semibold text-ink uppercase">{t.hero.badgeName}</span>
              <span aria-hidden="true" className="hidden size-1 rounded-full bg-faint sm:block" />
              <span className="font-medium text-body">{t.hero.badgeRole}</span>
            </span>
          </motion.p>

          {/* Frase de impacto: o trecho final em degradê azul */}
          <FigmaSelection>
            <motion.h1
              {...textEntrance}
              transition={{ delay: 0.15, duration: 1, ease: EASE_OUT }}
              className="max-w-[600px] type-hero text-ink"
            >
              {t.hero.titleStart}
              <span className="bg-[linear-gradient(100deg,var(--color-brand)_10%,color-mix(in_srgb,var(--color-brand)_45%,#8ec2ff)_100%)] bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </motion.h1>
          </FigmaSelection>

          <motion.p
            {...textEntrance}
            transition={{ delay: 0.35, duration: 1, ease: EASE_OUT }}
            className="max-w-[440px] type-body-lg text-body"
          >
            {t.hero.support}
          </motion.p>

          <motion.div
            variants={staggered(0.1, 0.6)}
            initial="hidden"
            animate="show"
            className="mt-3 flex flex-wrap items-center gap-[18px]"
          >
            {/* Principal: pílula azul com o "chip" da seta, que gira no hover */}
            <motion.a
              variants={fadeUp}
              href="#contato"
              className="group flex h-[52px] items-center gap-3 rounded-full bg-[linear-gradient(135deg,var(--color-brand),color-mix(in_srgb,var(--color-brand)_70%,white))] py-2 pr-2 pl-6 font-display text-[15px] font-semibold text-white shadow-[0_10px_30px_rgb(0_62_166/0.35)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgb(0_62_166/0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t.hero.primaryCta}
              <span className="flex size-9 items-center justify-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:rotate-45">
                <svg width="14" height="14" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
                  <path d="M1.4 15L0 13.6L11.6 2H5V0H15V10H13V3.4L1.4 15Z" />
                </svg>
              </span>
            </motion.a>
            {/* Secundário: vidro, com seta que desliza no hover */}
            <motion.a
              variants={fadeUp}
              href="#projetos"
              className="glass group flex h-[52px] items-center gap-2 rounded-full px-6 font-sans text-[15px] font-semibold text-ink transition-colors hover:bg-white/60 focus-visible:outline-2 dark:hover:bg-white/12 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t.hero.secondaryCta}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        <Portrait
          alt={t.hero.photoAlt}
          pointerX={smoothX}
          pointerY={smoothY}
          scrollY={portraitScrollY}
          // Celular: foto menor, para aparecer mais dela na primeira tela.
          className="mx-auto max-w-[280px] sm:max-w-[400px] lg:col-start-2 lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-end xl:absolute xl:top-[42px] xl:left-[694px] xl:w-[460px]"
        />
      </Container>
    </section>
  )
}
