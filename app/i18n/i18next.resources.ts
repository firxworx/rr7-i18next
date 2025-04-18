import type { I18NEXT_DEFAULT_NAMESPACE, I18NEXT_NAMESPACES, SupportedLocale } from '@/constants'

import commonEn from '../../public/locales/en/common.json'
import commonFr from '../../public/locales/fr/common.json'

export type I18nextDefaultNamespace = typeof I18NEXT_DEFAULT_NAMESPACE
export type I18nextNamespace = (typeof I18NEXT_NAMESPACES)[number]
export type I18nextResources = Record<SupportedLocale, I18nextResource>

/**
 * i18next resource bundle (translations data) for a given locale with entries for every namespace.
 * The default locale (EN) serves as the source of truth for the type definition.
 */
export type I18nextResource = {
  common: typeof commonEn
}

/**
 * Complete i18next translation resources (translations data) with entries for every locale
 * and namespace supported by this application.
 *
 * @see i18next.d.ts for custom type augumentation using this definition.
 */
export const resources: I18nextResources = {
  en: {
    common: commonEn,
  },
  fr: {
    common: commonFr,
  },
}
