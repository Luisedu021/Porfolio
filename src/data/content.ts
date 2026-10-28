/*
 * Dados que não mudam com o idioma (links, imagens, ícones).
 * Os textos ficam nos dicionários em src/i18n/pt.ts e src/i18n/en.ts.
 */
import iconGithubBrand from '../assets/icon-github-brand.svg'
import iconGithub from '../assets/icon-github.svg'
import iconInstagramBrand from '../assets/icon-instagram-brand.svg'
import iconInstagram from '../assets/icon-instagram.svg'
import iconLinkedinBrand from '../assets/icon-linkedin-brand.svg'
import iconLinkedin from '../assets/icon-linkedin.svg'
import garanhaniDesktop from '../assets/projects/garanhani-desktop.jpg'
import garanhaniMobile from '../assets/projects/garanhani-mobile.jpg'
import garanhaniPreview from '../assets/projects/garanhani-preview.jpg'
import garanhaniTablet from '../assets/projects/garanhani-tablet.jpg'
import ironCapiHome from '../assets/projects/ironcapi-home.jpg'
import ironCapiTablet from '../assets/projects/ironcapi-tablet.jpg'
import megaAtasDesktop from '../assets/projects/megaatas-desktop.jpg'
import megaAtasMobile from '../assets/projects/megaatas-mobile.jpg'
import megaAtasPreview from '../assets/projects/megaatas-preview.jpg'
import megaAtasTablet from '../assets/projects/megaatas-tablet.jpg'
import wellnovaAppDesktop from '../assets/projects/wellnova-app-desktop.jpg'
import wellnovaDesktop from '../assets/projects/wellnova-desktop.jpg'
import wellnovaMobile from '../assets/projects/wellnova-mobile.jpg'
import wellnovaPreview from '../assets/projects/wellnova-preview.jpg'
import wellnovaTablet from '../assets/projects/wellnova-tablet.jpg'
import type { DeviceScreens } from '../components/ui/DeviceMockups'
import type { Language } from '../i18n/types'

/** Ids das seções, na ordem do menu. Os rótulos vêm de `t.nav`. */
export const sectionIds = ['inicio', 'sobre', 'servicos', 'experiencia', 'projetos', 'contato'] as const
export type SectionId = (typeof sectionIds)[number]

/**
 * Linha do tempo, agrupada por empresa (um marcador por empresa, cargos empilhados).
 * Período vem de `t.experience.periods[key]`; cargo e descrição de `t.experience.items[role]`.
 */
export const experiences = [
  { key: 'megaJr', company: 'Mega Jr.', tone: 'brand', roles: ['megaDesigner', 'megaDirector', 'megaDev'] },
  { key: 'ouronova', company: 'Ouronova', tone: 'dark', roles: ['ouronova'] },
] as const
export type CompanyKey = (typeof experiences)[number]['key']
export type ExperienceKey = (typeof experiences)[number]['roles'][number]

/** Categorias, na ordem das colunas. Os nomes vêm de `t.projects.categories`. */
export const projectCategories = ['landing', 'uiux', 'software'] as const
export type ProjectCategory = (typeof projectCategories)[number]

/** Textos de um projeto num idioma. Desafio e resultado vazios não aparecem. */
export type ProjectText = { summary: string; challenge: string; result: string }

export type Project = {
  /** Identificador único (o "identificador" no painel). */
  key: string
  category: ProjectCategory
  title: string
  /** Ferramentas e tipo de entrega (iguais nos dois idiomas). */
  tags: string[]
  /**
   * Telas dos mockups do projeto aberto. Só aparecem os aparelhos com tela:
   * notebook + tablet + celular, tablet + celular ou só notebook.
   */
  screens: DeviceScreens
  /** Capa da coluna no hover (aparece o topo da imagem). */
  preview: string
  /** Link do projeto (site, Behance, Figma...). Sem link, o botão não aparece. */
  href?: string
  text: Record<Language, ProjectText>
}

const text = (summaryPt: string, summaryEn: string): Record<Language, ProjectText> => ({
  pt: { summary: summaryPt, challenge: '', result: '' },
  en: { summary: summaryEn, challenge: '', result: '' },
})

/**
 * Projetos usados enquanto a API (painel em backend/) não está configurada ou não responde.
 * Com VITE_API_URL definido, o site lê os projetos do painel (ver src/hooks/useProjects.ts).
 * O primeiro de cada categoria é a capa da coluna.
 */
export const projects: Project[] = [
  {
    key: 'garanhani',
    category: 'landing',
    title: 'Dr. Rafael Garanhani',
    tags: ['Landing page', 'Web'],
    screens: { desktop: garanhaniDesktop, tablet: garanhaniTablet, mobile: garanhaniMobile },
    preview: garanhaniPreview,
    href: 'https://drgaranhani.com.br/',
    text: text(
      'Landing page do consultório do Dr. Rafael Garanhani: acupuntura médica, neuromodulação, homeopatia e clínica geral.',
      "Landing page for Dr. Rafael Garanhani's practice: medical acupuncture, neuromodulation, homeopathy and general care.",
    ),
  },
  {
    key: 'wellnova',
    category: 'landing',
    title: 'Wellnova',
    tags: ['Landing page', 'Front-end'],
    screens: { desktop: wellnovaDesktop, tablet: wellnovaTablet, mobile: wellnovaMobile },
    preview: wellnovaPreview,
    href: 'https://wellnova.ai/',
    text: text(
      'Hotsite público da Wellnova, plataforma de IA para integridade de poços de óleo e gás. Atuei na refatoração do código.',
      "Wellnova's public website, an AI platform for oil and gas well integrity. I worked on refactoring the code.",
    ),
  },
  {
    key: 'ironCapi',
    category: 'uiux',
    title: 'Iron Capi',
    tags: ['UI/UX', 'App'],
    screens: { tablet: ironCapiTablet, mobile: ironCapiHome },
    preview: ironCapiHome,
    href: 'https://luisedu021.github.io/Iron-Capi/painel/',
    text: text(
      'App de treino Iron Capi: treino do dia, sequência semanal, ranking com amigos e calendário de treinos, além do painel do time.',
      'Iron Capi workout app: workout of the day, weekly streak, friends ranking and a training calendar, plus the team dashboard.',
    ),
  },
  {
    key: 'wellnovaApp',
    category: 'software',
    title: 'Wellnova',
    tags: ['Software', 'Dashboard'],
    screens: { desktop: wellnovaAppDesktop },
    preview: wellnovaAppDesktop,
    text: text(
      'Plataforma de IA da Wellnova para integridade de poços de óleo e gás. Atuei no redesign de um módulo específico do sistema.',
      "Wellnova's AI platform for oil and gas well integrity. I worked on the redesign of a specific module of the system.",
    ),
  },
  {
    key: 'megaAtas',
    category: 'software',
    title: 'Mega Jr. Atas',
    tags: ['JavaScript', 'API'],
    screens: { desktop: megaAtasDesktop, tablet: megaAtasTablet, mobile: megaAtasMobile },
    preview: megaAtasPreview,
    href: 'https://mega-jr-atas.vercel.app/',
    text: text(
      'Gerador de atas de reunião da Mega Jr.: recebe os detalhes, a data e os pontos importantes e gera o resumo. Meu primeiro projeto com JavaScript e APIs.',
      "Mega Jr.'s meeting minutes generator: it takes the details, the date and the key points and writes the summary. My first project with JavaScript and APIs.",
    ),
  },
]

export const contact = {
  email: 'dudulopesantos22@gmail.com',
  phone: '(18) 99159-7894',
  phoneHref: 'tel:+5518991597894',
}

// TODO: troque `href` pelos seus perfis reais.
export const socials = {
  linkedin: { label: 'LinkedIn', href: '#', icon: iconLinkedin, iconBrand: iconLinkedinBrand },
  instagram: { label: 'Instagram', href: '#', icon: iconInstagram, iconBrand: iconInstagramBrand },
  github: { label: 'GitHub', href: '#', icon: iconGithub, iconBrand: iconGithubBrand },
}
