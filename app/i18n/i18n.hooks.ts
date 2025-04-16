import { useMatches } from 'react-router'

import type { SupportedLocale } from '@/constants'
import { ensureValue } from '@/lib/type-guards'

/**
 * Default key of root loader's data object that contains the `SupportedLocale` string value.
 */
const DEFAULT_LOCALE_KEY = 'locale' as const

/**
 * Return the locale from root loader data assuming it's available under the key 'locale'.
 *
 * @see useLocaleKey for flexible version that accepts a custom key name.
 */
export function useLocale(): SupportedLocale {
  const matches = useMatches()

  // safe usage that shoulud never throw because there's always a match for the root route
  const rootMatch = ensureValue(matches[0])

  const { [DEFAULT_LOCALE_KEY]: locale } =
    (rootMatch.data as Record<string, unknown> & Record<typeof DEFAULT_LOCALE_KEY, SupportedLocale>) ?? {}

  if (!locale) {
    throw new Error('Root loader did not return a locale.')
  }

  if (typeof locale === 'string') {
    return locale
  }

  throw new Error('Invalid locale returned by the root loader.')
}

/**
 * Return the locale set by the root loader under the given `localeKey` (default 'locale')
 * as a typed `SupportedLocale`.
 *
 * Set the optional argument `localeKey` if the root loader data entry uses a different key name
 * for the locale in the data object that it returns.
 *
 * This hook does not validate the locale value as it assumes the back-end implementation guarantees
 * that the locale string is a valid `SupportedLocale`.
 *
 * @see https://github.com/sergiodxa/remix-i18next/blob/main/src/react.tsx
 */
export function useLocaleKey<K extends string = typeof DEFAULT_LOCALE_KEY>(
  localeKey: K = DEFAULT_LOCALE_KEY as K,
): SupportedLocale {
  const matches = useMatches()

  // safe usage that shoulud never throw because there's always a match for the root route
  const rootMatch = ensureValue(matches[0])

  const { [localeKey]: locale } = (rootMatch.data as Record<string, unknown> & Record<K, SupportedLocale>) ?? {}

  if (!locale) {
    throw new Error('Root loader did not return a locale.')
  }

  if (typeof locale === 'string') {
    return locale
  }

  throw new Error('Invalid locale returned by the root loader.')
}
