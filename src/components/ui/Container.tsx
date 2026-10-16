import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/cn'

/** Largura máxima do design (1280px) com as margens laterais de 64px no desktop. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-16', className)} {...props} />
}
