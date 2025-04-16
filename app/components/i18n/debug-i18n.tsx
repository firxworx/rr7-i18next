import type React from 'react'
import { useTranslation } from 'react-i18next'

import { useLocale } from '@/i18n/i18n.hooks'
import { cn } from '@/lib/style'

export function DebugI18n({ className }: { className?: string }): React.JSX.Element {
  const { i18n } = useTranslation()
  const rootLoaderLocale = useLocale()

  return (
    <div
      className={cn(
        'flex flex-col gap-8 border p-4 rounded-md border-neutral-500/25 bg-neutral-100/5 max-w-xs',
        className,
      )}
    >
      <div>
        <div>
          <strong>i18n Debug</strong>
        </div>
        <div>I18next Client Locale: {i18n.language}</div>
        <div>Root Loader Locale: {rootLoaderLocale}</div>
      </div>
    </div>
  )
}
