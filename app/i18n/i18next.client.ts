import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { i18nextCommonInitOptions } from '@/i18n/i18next.config'

/**
 * Initialize client-side instance of i18next using the http backend and `react-i18next` plugin.
 *
 * Language detection is configured to be based primarily on the `htmlTag` with `queryString`
 * as override for special cases such as rendering generic error routes (404, 500, etc.).
 *
 * The `html` document element `lang` and `dir` attributes must be set via server-side rendering.
 *
 * Refer to i18next docs for other detection options including 'querystring', 'cooke', 'header', and 'localStorage'.
 */
export async function initI18nextClient() {
  if (!i18next.isInitialized) {
    await i18next
      .use(HttpBackend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        ...i18nextCommonInitOptions,
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
          lookupQuerystring: 'locale',
          order: ['queryString', 'htmlTag'],
          caches: [],
        },
      })
  }
}
