import { cn } from '../../lib/cn'

type DividerProps = {
  /** SVG da linha exportado do Figma (esticado na largura do container). */
  src: string
  /** Espessura do traço, em px. */
  stroke: number
  className?: string
}

/** Linha horizontal desenhada pelo SVG do design. */
export function Divider({ src, stroke, className }: DividerProps) {
  return (
    <div className={cn('relative h-0 shrink-0', className)}>
      <div className="absolute inset-x-0 bottom-0" style={{ top: -stroke }}>
        <img src={src} alt="" className="block size-full max-w-none" />
      </div>
    </div>
  )
}
