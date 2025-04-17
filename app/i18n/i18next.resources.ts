import type { I18NEXT_DEFAULT_NAMESPACE, I18NEXT_NAMESPACES, SupportedLocale } from '@/constants'

import english from '../../public/locales/en/common.json'
import french from '../../public/locales/fr/common.json'

export type I18nextDefaultNamespace = typeof I18NEXT_DEFAULT_NAMESPACE
export type I18nextNamespace = (typeof I18NEXT_NAMESPACES)[number]

export type I18nextResource = {
  common: typeof english
}

/**
 * I18next translation resources (translation data) for this application.
 *
 * @see i18next.d.ts for custom types based on this definition.
 */
export const resources: Record<SupportedLocale, I18nextResource> = {
  en: {
    common: english,
  },
  fr: {
    common: french,
  },
}
