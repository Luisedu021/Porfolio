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

export type ProjectKey = 'garanhani' | 'wellnova' | 'ironCapi' | 'wellnovaApp' | 'megaAtas'

export type Project = {
  key: ProjectKey
  category: ProjectCategory
  title: string
  /** Ferramentas e tipo de entrega (iguais nos dois idiomas). */
  tags: string[]
  /**
   * Telas dos mockups do projeto aberto. Só aparecem os aparelhos com tela:
   * notebook + tablet + celular, tablet + celular ou só notebook.
   */
  screens: DeviceScreens
  /** Página inteira na largura do celular: rola dentro da coluna ao passar o mouse. */
  preview: string
  /** Imagem larga (tela de sistema): no hover ela desliza para o lado em vez de rolar para baixo. */
  previewWide?: boolean
  /** Link do projeto (site, Behance, Figma...). Sem link, o botão não aparece. */
  href?: string
}

/**
 * Projetos. Resumo, desafio e resultado vêm de `t.projects.items[key]`.
 * Para adicionar um projeto, basta colocá-lo aqui com a categoria: ele entra no carrossel dela.
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
  },
  {
    key: 'wellnova',
    category: 'landing',
    title: 'Wellnova',
    tags: ['Landing page', 'Front-end'],
    screens: { desktop: wellnovaDesktop, tablet: wellnovaTablet, mobile: wellnovaMobile },
    preview: wellnovaPreview,
    href: 'https://wellnova.ai/',
  },
  {
    key: 'ironCapi',
    category: 'uiux',
    title: 'Iron Capi',
    tags: ['UI/UX', 'App'],
    screens: { tablet: ironCapiTablet, mobile: ironCapiHome },
    preview: ironCapiHome,
    href: 'https://luisedu021.github.io/Iron-Capi/painel/',
  },
  {
    key: 'wellnovaApp',
    category: 'software',
    title: 'Wellnova',
    tags: ['Software', 'Dashboard'],
    screens: { desktop: wellnovaAppDesktop },
    preview: wellnovaAppDesktop,
    previewWide: true,
  },
  {
    key: 'megaAtas',
    category: 'software',
    title: 'Mega Jr. Atas',
    tags: ['JavaScript', 'API'],
    screens: { desktop: megaAtasDesktop, tablet: megaAtasTablet, mobile: megaAtasMobile },
    preview: megaAtasPreview,
    href: 'https://mega-jr-atas.vercel.app/',
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
