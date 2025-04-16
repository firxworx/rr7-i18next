import type { SupportedLocale } from '@/constants'

import english from '../../public/locales/en/common.json'
import french from '../../public/locales/fr/common.json'

export type I18nextResource = {
  common: typeof english
}

export type Namespace = keyof I18nextResource

export const resources: Record<SupportedLocale, I18nextResource> = {
  en: {
    common: english,
  },
  fr: {
    common: french,
  },
}

declare module 'i18next' {
  export interface CustomTypeOptions {
    defaultNS: 'common'
    fallbackNS: 'common'

    // custom resources type
    resources: I18nextResource
  }
}
