import type { To } from 'react-router'
import { ALTERNATE_LOCALES, DEFAULT_LOCALE, PREFIX_DEFAULT_LOCALE, SITE_URL, SUPPORTED_LOCALES } from '@/constants'
import { IS_PRODUCTION } from '@/env.config'
import { applySlashRule, ensureLeadingSlash } from '@/lib/slashes'
import { isRouterToObject } from '@/lib/urls'
import type { SupportedLocale } from '@/constants'

export type LocaleTextDirection = 'ltr' | 'rtl'
export type RightToLeftLanguageCode = (typeof RTL_LANGUAGES)[number]

/**
 * Array of RTL (right-to-left) BCP-47 (ISO) standard 2-character language codes.
 *
 * Note the i18next package also exports a list of RTL languages.
 */
export const RTL_LANGUAGES = ['ar', 'fa', 'he', 'ur', 'yi', 'ps', 'sd', 'dv'] as const

// @see Regexp.escape() limited availability https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Helper that returns the `SUPPORTED_LOCALES` constant as a mutable string array for use-cases that require `string[]`.
 */
export function getSupportedLocales(): string[] {
  return [...SUPPORTED_LOCALES] satisfies string[]
}

/**
 * Helper that returns the `ALTERNATE_LOCALES` constant as a mutable string array for use-cases that require `string[]`.
 */
export function getAlternateSupportedLocales(): string[] {
  return [...ALTERNATE_LOCALES] satisfies string[]
}

export function isDefaultLocale(input: unknown): input is SupportedLocale {
  return typeof input === 'string' && input === String(DEFAULT_LOCALE)
}

export function isAlternateSupportedLocale(input: unknown): input is SupportedLocale {
  return typeof input === 'string' && getAlternateSupportedLocales().includes(input)
}

export function isSupportedLocale(input: unknown): input is SupportedLocale {
  return typeof input === 'string' && getSupportedLocales().includes(input)
}

/**
 * Ensures an unknown input resolves to a `SupportedLocale` with fallback to `DEFAULT_LOCALE`.
 */
export function ensureLocale(input: unknown): SupportedLocale {
  return isSupportedLocale(input) ? input : DEFAULT_LOCALE
}

/**
 * Returns `true` if the given `locale` and `pathname` correspond to the localized home/root pathname.
 * This function always returns `true` if given the pathname `/` regardless of the given locale.
 *
 * @see getLocalizedRouterTo for related function that accepts react-router Link `To` values as input
 */
export function isLocaleRootPathname(locale: string, pathname: string): boolean {
  return pathname === '/' || pathname === getLocalizedPathname(locale, '/')
}

/**
 * Return the text direction of the given locale in ISO / BCP-47 format.
 * The lowercase return value is valid for the `dir` attribute of an `<html>` element.
 *
 * Returns `ltr` as fallback if the locale/language is not recognized or is invalid.
 *
 * @see i18next function `i18n.dir(locale)` which performs a similar check.
 */
export function getLocaleTextDirection(locale: string): LocaleTextDirection {
  const language = getLocaleLanguageCode(locale)

  // safe cast as array is not mutated
  return (RTL_LANGUAGES as unknown as string[]).includes(language ?? '') ? 'rtl' : 'ltr'
}

/**
 * Extract and return the two-character language portion of a locale string in ISO / BCP-47 format.
 * e.g. `en-US` -> `en`, `zh-Hant-TW` -> `zh`, `fr` -> `fr`.
 *
 * The output is lowercased and an error is thrown if a two-character alphabetical string could not be parsed.
 * Input with a non-ISO separator (non-dash) is rejected. No other validation is performed.
 *
 * Returns `undefined` if the input is not a string or does not match the expected format.
 */
export function getLocaleLanguageCode(locale: string): string | undefined {
  const result = String(locale).toLowerCase().split('-')[0]

  if (typeof result !== 'string' || !/^[a-z]{2}$/.exec(result)) {
    return undefined
  }

  return result
}

/**
 * Generate values for alternate langauge meta tags `hrefLang` and `href` attributes for a given pathname.
 */
export function getLocaleHrefLangs(pathname: string): { locale: string; href: string }[] {
  return SUPPORTED_LOCALES.map((locale) => {
    const virginPathname = stripLocalePrefixFromPathname(pathname)

    const localizedPathname = applySlashRule(
      isDefaultLocale(locale) && !PREFIX_DEFAULT_LOCALE ? virginPathname : `/${locale}${virginPathname}`,
    )

    const url = new URL(localizedPathname, SITE_URL)
    return { locale, href: url.toString() }
  })
}

/**
 * Strip the locale pathname prefix (first segment) from the given pathname only if it is
 * recognized as a supported locale; returns the remaining "virgin" pathname.
 *
 * Returns '/' for inputs '/' and ''. This function is agnostic to `prefixDefaultLocale`.
 *
 * Does not implement support for `code` alternatives or language ('fr') vs. locale ('fr-CA', 'fr-FR', etc.).
 */
export function stripLocalePrefixFromPathname(pathname: string): string {
  if (pathname === '' || pathname === '/') {
    return '/'
  }

  if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
    throw new Error('Invalid input: URL provided to pathname function')
  }

  const prefixedLocale = SUPPORTED_LOCALES.find((locale) => pathname.startsWith(`/${locale}`))
  return ensureLeadingSlash(prefixedLocale ? `/${pathname.replace(`/${prefixedLocale}`, '')}` : pathname)
}

/**
 * Return the locale from first segment of a pathname only if it is recognized as a supported locale
 * using a strict case-sensitive match, otherwise return the default locale.
 *
 * Returns the default locale if the pathname is root '/', empty string '', or if the value at the first
 * pathname segment is not a supported locale.
 *
 * This case-sensitive strict match is more rigorous than Astro's internal `i18n` logic.
 */
export function getLocaleFromPathname(pathname: string): SupportedLocale {
  if (pathname === '' || pathname === '/') {
    return DEFAULT_LOCALE
  }

  const firstSegment = pathname.split('/')?.[1] ?? ''
  return !!firstSegment && isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE
}

/**
 * Get the locale from a URL object or string.
 */
export function getLocaleFromUrl(url: URL | string): string {
  if (url instanceof URL) {
    return getLocaleFromPathname(url.pathname)
  }

  try {
    return getLocaleFromPathname(new URL(url).pathname)
  } catch (error) {
    console.error(`Error parsing URL string: ${url}`, error)

    if (!IS_PRODUCTION && error instanceof TypeError) {
      throw new Error(`Invalid URL string: ${url}`)
    }

    return DEFAULT_LOCALE
  }
}

/**
 * Resolve the current locale from a request object.
 *
 * This helper is convenient for use in loaders, actions, and other server-side functions.
 */
export function resolveLocale(request: Request): string {
  return getLocaleFromUrl(request.url)
}

/**
 * Return the locale obtained from the first pathname segment (locale prefix) only if it is recognized
 * as a supported locale; otherwise return `undefined`.
 */
export function findLocalePathPrefix(pathname: string): string | undefined {
  const firstSegment = pathname.split('/')?.[1] ?? ''
  return !!firstSegment && isSupportedLocale(firstSegment) ? `/${firstSegment}` : undefined
}

/**
 * Localize a React Router `To` input type for an i18n strategy that uses the first pathname segment as the locale.
 *
 * Only the `pathname` property is localized by this function; any search params and hash fragments are preserved.
 *
 * @throws {TypeError} in non-production if target locale not supported (via `getLocalizedPathname()`)
 */
export function getLocalizedRouterTo(targetLocale: string | undefined, to: To): To {
  if (typeof to === 'string') {
    return getLocalizedPathname(targetLocale, to)
  }

  if (isRouterToObject(to)) {
    return Object.assign({}, to, {
      pathname: typeof to?.pathname === 'string' ? getLocalizedPathname(targetLocale, to.pathname) : to.pathname,
    })
  }

  if (!IS_PRODUCTION) {
    throw new TypeError('Invalid router `To` object')
  }

  return to
}

/**
 * Return the input pathname including locale path prefix for the given locale.
 * Respects the `prefixDefaultLocale` configuration and applies `trailingSlash` rule.
 *
 * Any search params and hash fragments are preserved.
 *
 * @throws {TypeError} in non-production if target locale is not supported.
 */
export function getLocalizedPathname(targetLocale: string | undefined, pathname: string): string {
  const locale = targetLocale ?? DEFAULT_LOCALE

  if (!IS_PRODUCTION && !isSupportedLocale(targetLocale)) {
    throw new TypeError(`Unsupported locale: ${locale}`)
  }

  // leverage URL logic for safe handling of complex edge cases using a dummy domain
  const url = new URL(pathname, 'https://example.com')

  const virginPathname = stripLocalePrefixFromPathname(url.pathname)
  const localizedPathname =
    isDefaultLocale(locale) && !PREFIX_DEFAULT_LOCALE ? virginPathname : `/${locale}${virginPathname}`

  return applySlashRule(new URL(`${localizedPathname}${url.search}${url.hash}`, 'https://example.com').pathname)
}
