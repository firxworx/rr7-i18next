import type React from 'react'

import logoDark from '@/components/assets/logo-dark.svg'
import logoLight from '@/components/assets/logo-light.svg'
import { cn } from '@/lib/style'

export function Welcome({ className }: { className?: string }): React.JSX.Element {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-8', className)}>
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img src={logoLight} alt="React Router" className="block w-full dark:hidden" />
            <img src={logoDark} alt="React Router" className="hidden w-full dark:block" />
          </div>
        </header>
      </div>
    </div>
  )
}
