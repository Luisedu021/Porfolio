import type { ReactNode } from 'react'

/** Figma: Tag */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-brand bg-tag px-3 py-1 type-tag text-tag-foreground">{children}</li>
  )
}
