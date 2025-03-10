import { withoutTrailingSlash, withTrailingSlash } from 'ufo'
import { REQUIRE_TRAILING_SLASH } from '@/constants'

/**
 * Return the input string normalized to have exactly one leading slash.
 */
export function ensureLeadingSlash(input: string): string {
  return `/${input.replace(/^\/+/g, '')}`
}

/**
 * Return the input string normalized to have exactly one trailing slash.
 */
export function ensureTrailingSlash(input: string): string {
  return `${input.replace(/\/+$/g, '')}/`
}

/**
 * Return the input string normalized to exactly one leading slash and one trailing slash.
 *
 * Returns '/' if given any of '', '/', and '//', for consistency when used to process pathnames and URLs.
 */
export function ensureSlashes(input: string): string {
  return input === '' || input === '/' || input === '//' ? '/' : `/${input.replace(/(^\/+|\/+$)/g, '')}/`
}

/**
 * Remove all leading slashes from the input string if any are present.
 *
 * Returns an empty string for input '/'.
 */
export function stripLeadingSlashes(input: string): string {
  return input.replace(/^\/+/, '')
}

/**
 * Remove all trailing slashes from the input string if any are present.
 *
 * Returns an empty string for input '/'.
 */
export function stripTrailingSlashes(input: string): string {
  return input.replace(/\/+$/, '')
}

/**
 * Apply the _trailing slash rule_ that enforces the `trailingSlash` config option.
 *
 * This function does not attempt to detect if the input path or URL is to a file vs. directory and behaves
 * the same regardless if there is a file extension or not.
 *
 * Note that using `ufo` npm package internally can have different behaviours vs. clean
 * implementation using only the `URL` constructor. It is crucial to use the `true` second argument with
 * `ufo`'s `with*Slash()` functions to enable `respectQueryAndFragment` for consistent behaviour that
 * meets our requirements.
 *
 * Edge Case:
 * - the URL constructor internally adds a leading slash if constructing a URL with a pathname that does not have one
 * - `ufo`'s `withTrailingSlash()` does not add a leading slash if the input is a relative path without a leading slash
 */
export function applySlashRule(input: string): string
export function applySlashRule(input: URL): URL
export function applySlashRule(input: URL | string): URL | string {
  if (input instanceof URL) {
    const newUrl = new URL(input)
    newUrl.pathname = REQUIRE_TRAILING_SLASH
      ? withTrailingSlash(newUrl.pathname, true)
      : withoutTrailingSlash(newUrl.pathname, true)
    return newUrl
  }

  // no-op if input is a hash-only "jump link"
  if (input.startsWith('#')) {
    return input
  }

  return REQUIRE_TRAILING_SLASH ? withTrailingSlash(input, true) : withoutTrailingSlash(input, true)
}
