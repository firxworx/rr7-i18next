import type { I18nextResource } from '@/i18n/resource'

export type DefaultLocale = typeof DEFAULT_LOCALE
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export interface AppNavLink {
  to: string
  label: string
  i18nPageKey: keyof I18nextResource['common']['page']
}

export const SITE_URL = 'http://localhost:5173'

export const APP_BRAND_NAME = 'DemoApp'

export const DEFAULT_LOCALE = 'en' as const
export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export const ALTERNATE_LOCALES = SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE)

export const PREFIX_DEFAULT_LOCALE: boolean = false
export const REDIRECT_DEFAULT_LOCALE: boolean = true

export const I18NEXT_DEFAULT_NAMESPACE = 'common'
export const I18NEXT_NAMESPACES = ['common']

export const REQUIRE_TRAILING_SLASH = false

export const NAV_LINKS: AppNavLink[] = [
  { to: '/example', label: 'Example', i18nPageKey: 'example' },
  { to: '/about', label: 'About', i18nPageKey: 'about' },
]

export const PATHNAMES = {
  root: '/',
}
