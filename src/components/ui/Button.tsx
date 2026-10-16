import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonProps = {
  children: ReactNode
  /** URL de um SVG de 16×16 exibido à direita do texto. */
  icon?: string
  href?: string
  type?: 'button' | 'submit'
  className?: string
}

/** Botão primário (Figma: Button). Vira <a> quando recebe `href`. */
export function Button({ children, icon, href, type = 'button', className }: ButtonProps) {
  const classes = cn(
    'inline-flex shrink-0 items-center gap-2 rounded-md bg-brand-strong px-6 py-4 type-button text-white transition-colors',
    'hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    className,
  )
  const content = (
    <>
      {children}
      {icon && <img src={icon} alt="" className="size-4" />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes}>
      {content}
    </button>
  )
}
