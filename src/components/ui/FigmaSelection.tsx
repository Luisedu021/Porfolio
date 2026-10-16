import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

const corners = ['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1']

/**
 * Ao passar o mouse, mostra uma caixa de seleção do Figma em volta do conteúdo:
 * borda azul, alças nos cantos e a etiqueta com o tamanho real (ex.: 440 × 162).
 */
export function FigmaSelection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0]
      setSize({ width: Math.round(box.inlineSize), height: Math.round(box.blockSize) })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('group/select relative w-fit', className)}>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 scale-[0.98] border border-figma opacity-0 transition duration-300 ease-out group-hover/select:scale-100 group-hover/select:opacity-100"
      >
        {corners.map((position) => (
          <span key={position} className={cn('absolute size-2 border border-figma bg-white', position)} />
        ))}
        <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-[3px] bg-figma px-1.5 py-0.5 font-sans text-[11px] leading-4 font-medium whitespace-nowrap text-white tabular-nums">
          {size.width} × {size.height}
        </span>
      </div>
    </div>
  )
}
