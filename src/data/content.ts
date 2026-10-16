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
import projectFoodApp from '../assets/project-food-app.png'
import projectSmartHome from '../assets/project-smart-home.png'

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

export type ProjectKey = 'cop15' | 'acupuncture' | 'wellnova'

export type Project = {
  key: ProjectKey
  title: string
  /** Imagem que aparece na coluna ao passar o mouse. */
  cover: string
  /** Ferramentas e tipo de entrega (iguais nos dois idiomas). */
  tags: string[]
  /** Telas mostradas nos mockups. Sem imagem, o mockup mostra um esqueleto de interface. */
  screens: { desktop?: string; mobile?: string[] }
  /** Link do estudo de caso (Behance, Figma, site...). Sem link, o botão não aparece. */
  href?: string
}

/**
 * Projetos. Categoria, resumo, desafio e resultado vêm de `t.projects.items[key]`.
 * TODO: troque as capas (as atuais são imagens de referência, não são seus projetos),
 * adicione as telas reais em `screens` e o link de cada estudo de caso em `href`.
 */
export const projects: Project[] = [
  { key: 'cop15', title: 'Cop-15', cover: projectSmartHome, tags: ['UI/UX', 'Figma'], screens: {} },
  {
    key: 'acupuncture',
    title: 'Acupuncture Landing Page',
    cover: projectFoodApp,
    tags: ['Landing page', 'Figma', 'Web'],
    screens: {},
  },
  {
    key: 'wellnova',
    title: 'Wellnova Software',
    cover: projectSmartHome,
    tags: ['Product Design', 'Dashboard'],
    screens: {},
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
