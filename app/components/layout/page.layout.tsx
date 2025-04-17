import { cn } from '@/lib/style'
import type React from 'react'

interface PageLayoutProps extends React.ComponentProps<'div'> {}

export function PageLayout({ className, ...restProps }: PageLayoutProps): React.JSX.Element {
  return (
    <div
      className={cn('container flex flex-col gap-8 mx-auto px-8 py-8 sm:py-12 md:py-16', className)}
      {...restProps}
    />
  )
}
