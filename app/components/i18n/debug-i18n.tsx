import type React from 'react'
import { useTranslation } from 'react-i18next'

import { useLocale } from '@/i18n/i18n.hooks'
import { cn } from '@/lib/style'
import { Box } from '@/components/ui/box'

export function DebugI18n({ className }: { className?: string }): React.JSX.Element {
  const { i18n } = useTranslation()
  const rootLoaderLocale = useLocale()

  return (
    <Box className={cn('flex flex-col gap-2 max-w-xs', className)}>
      <div>
        <strong>i18n Debug</strong>
      </div>
      <div>I18next Client Locale: {i18n.language}</div>
      <div>Root Loader Locale: {rootLoaderLocale}</div>
    </Box>
  )
}
