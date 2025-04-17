import { cn } from '@/lib/style'
import type React from 'react'

interface BoxProps extends React.ComponentProps<'div'> {}

export function Box({ className, children, ...restProps }: BoxProps): React.JSX.Element {
  return (
    <div className={cn('border p-4 rounded-md border-neutral-500/25 bg-neutral-100/5', className)} {...restProps}>
      {children}
    </div>
  )
}
