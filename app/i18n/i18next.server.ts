import type { EntryContext } from 'react-router'
import i18next, { type i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

import { SUPPORTED_LOCALES } from '@/constants'
import { getLocaleFromUrl } from '@/lib/i18n'
import { i18nextCommonInitOptions } from '@/i18n/i18next.config'
import { resources } from '@/i18n/i18next.resources'

/**
 * Initialize server-side i18next instance using filesystem backend with locale set via request URL.
 *
 * This function resolves the locale from the request and sets the i18next language as part of initialization.
 *
 * You may want to consider a more elaborate locale resolution strategy such as one that considers cookies,
 * query parameters, and/or `Accept-Language` request headers.
 *
 * Note we avoid using a backend like `i18next-fs-backend` because on cloud environments there typically
 * isn't a filesystem; instead we load the translation resources from the bundle.
 */
export const initI18nextInstance = async (request: Request, _routerContext?: EntryContext): Promise<i18n> => {
  const instance = i18next.createInstance()

  // remove .data suffix from url to resolve locale correctly on root loader e.g. http://localhost:5173/fr.data -> fr
  const resolvedLocale = getLocaleFromUrl(request.url.replace(/\.data$/, ''))

  if (!instance.isInitialized) {
    await instance.use(initReactI18next).init({
      ...i18nextCommonInitOptions,
      lng: resolvedLocale,
      initAsync: false,
      preload: SUPPORTED_LOCALES,
      resources,
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
