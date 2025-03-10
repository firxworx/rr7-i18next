import type { InitOptions } from 'i18next'
import { DEFAULT_LOCALE, I18NEXT_DEFAULT_NAMESPACE, I18NEXT_NAMESPACES, SUPPORTED_LOCALES } from '@/constants'

/**
 * i18next common configuration options shared by both client and server.
 *
 * Per the react-i18next docs:
 * - `interpolation.escapeValue` setting not required with React + i18next because React escapes by default
 *
 * It is recommended to run i18next in `debug` mode to inspect the output of both the client and server instances
 * as a key development and QA step prior to deployment.
 */
export const i18nextCommonInitOptions = {
  debug: false,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: SUPPORTED_LOCALES,
  ns: I18NEXT_NAMESPACES,
  defaultNS: I18NEXT_DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
} satisfies InitOptions
