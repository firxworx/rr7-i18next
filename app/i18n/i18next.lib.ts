import type { i18n } from 'i18next'

import type { SupportedLocale } from '@/constants'
import type { I18nextNamespace, I18nextResource } from '@/i18n/i18next.resources'
import { invariant } from '@/lib/invariant'

/**
 * Create a i18next client-side store for a given locale and namespace(s).
 *
 * Use with react-i18next's `useSSR()` to preload data into i18next's client store so it can be
 * initialized into a _ready_ state.
 *
 * The `Partial<I18nextResource>` data structure is used internally by i18next to cache translations
 * it downloads from the back-end.
 *
 * Note that current versions of i18next use `any` everywhere under the hood for store-related
 * type definitions so there is no type safety or IDE suggestions other than our own type definitions.
 *
 * Refer to i18next's source code for implementation details.
 */
export function createI18nextStore(
  i18next: Pick<i18n, 'getResourceBundle' | 'hasResourceBundle'>,
  locale: SupportedLocale,
  ns: I18nextNamespace | I18nextNamespace[],
): Partial<I18nextResource> {
  const namespaces = Array.isArray(ns) ? ns : [ns]

  const selectedResources = namespaces.reduce<Partial<I18nextResource>>((acc, currNs) => {
    invariant(
      i18next.hasResourceBundle(locale, currNs),
      `i18next resource bundle missing for namespace '${currNs}' and locale '${locale}'.`,
    )

    acc[currNs] = i18next.getResourceBundle(locale, currNs)
    return acc
  }, {})

  return { [locale]: selectedResources }
}
