import { useEffect, useState } from 'react'
import { type Project, projects as fallbackProjects } from '../data/content'
import { API_URL, apiGet } from '../lib/api'

/** Projeto como a API devolve (imagens ausentes vêm como null). */
type ApiProject = Omit<Project, 'screens' | 'href'> & {
  href: string | null
  screens: { desktop: string | null; tablet: string | null; mobile: string | null }
}

const fromApi = ({ screens, href, ...project }: ApiProject): Project => ({
  ...project,
  href: href ?? undefined,
  screens: {
    desktop: screens.desktop ?? undefined,
    tablet: screens.tablet ?? undefined,
    mobile: screens.mobile ?? undefined,
  },
})

/**
 * Projetos do painel (GET /api/projects/). Começa com os de src/data/content.ts e troca pelos da API
 * quando ela responde; se a API falhar ou não estiver configurada, os locais continuam.
 */
export function useProjects() {
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    if (!API_URL) return
    let active = true
    apiGet<ApiProject[]>('/api/projects/')
      .then((data) => active && data.length > 0 && setProjects(data.map(fromApi)))
      .catch((error) => console.warn('Projetos: usando os locais.', error))
    return () => {
      active = false
    }
  }, [])

  return projects
}
