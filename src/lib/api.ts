/**
 * Endereço do back-end (Django, pasta backend/), ex.: VITE_API_URL=http://localhost:8000 no .env.local.
 * Sem ele, o site usa os projetos de src/data/content.ts e o formulário abre o app de email.
 */
export const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || ''

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`)
  if (!response.ok) throw new Error(`GET ${path}: ${response.status}`)
  return response.json() as Promise<T>
}

export async function apiPost(path: string, body: unknown): Promise<void> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`POST ${path}: ${response.status}`)
}
