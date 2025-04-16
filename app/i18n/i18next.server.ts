import type { EntryContext } from 'react-router'
import i18next, { type i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import FileSystemBackend from 'i18next-fs-backend'

import { SUPPORTED_LOCALES } from '@/constants'
import { getLocaleFromUrl } from '@/lib/i18n'
import { i18nextCommonInitOptions } from '@/i18n/i18next.config'

/**
 * Initialize server-side i18next instance using filesystem backend with locale set via request URL.
 *
 * This function resolves the locale from the request and sets the i18next language as part of initialization.
 *
 * You may want to consider a more elaborate locale resolution strategy such as one that considers cookies,
 * query parameters, and/or `Accept-Language` request headers.
 */
export const initI18nextInstance = async (request: Request, _routerContext?: EntryContext): Promise<i18n> => {
  const instance = i18next.createInstance()

  // remove .data suffix from url to resolve locale correctly for root loader e.g. http://localhost:5173/fr.data -> fr
  const strippedUrl = request.url.replace(/\.data$/, '')
  const resolvedLocale = getLocaleFromUrl(strippedUrl)

  if (!instance.isInitialized) {
    await instance
      .use(FileSystemBackend)
      .use(initReactI18next)
      .init({
        ...i18nextCommonInitOptions,
        backend: {
          loadPath: './public/locales/{{lng}}/{{ns}}.json',
        },
        lng: resolvedLocale,
        initAsync: false,
        preload: SUPPORTED_LOCALES,
      })
  }

  return instance
}

// /**
//  * Helper for server-side code including actions and loaders to get a fixed translation function
//  * for the locale determined from the request and the specified namespace(s).
//  */
// export const getI18nextInstanceFixedT = async (request: Request, ns: string | string[] = 'common') => {
//   const instance = await initI18nextInstance(request)
//   return instance.getFixedT(getLocaleFromUrl(request.url), ns)
// }
