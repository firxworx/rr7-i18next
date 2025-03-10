import type { SupportedLocale } from '@/constants'

// define bindings for cloudflare or similar deployment environments
export interface Bindings extends Record<string, never> {}

export interface Variables {
  // meta
  appVersion: string

  // i18n
  locale: SupportedLocale
  i18next: import('i18next').i18n
}

export type ApiContext = {
  Bindings: Bindings
  Variables: Variables
}
