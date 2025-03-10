import type { Path, To } from 'react-router'
import { SITE_URL } from '@/constants'

/*
Note hardcore URL checks can involve handling cases that include:

- local development (IP's and localhost; plus other local domains)
- potential subdomains
- deploy domain / site URL / origin
*/

/**
 * Return `true` if input is a string that does not start with a URL protocol that incorporates `//`.
 *
 * Does perform any other checks. Returns `false` for falsey input values.
 */
export function isHrefPathname(url: string | undefined): boolean {
  return typeof url === 'string' && !/^(\w+:)?\/\//.test(url)
}

/**
 * Type guard that returns `true` if an input is a React Router `To` in object form defined as `Partial<Path>`
 * with the added restriction that one of the possible properties `pathname`, `hash`, or `search` is defined.
 *
 * This guard enforces that `pathname` starts with '/', `search` starts with '?', and `hash` starts with '#' when
 * they are defined per the current definition of `Path` in the `react-router` package.
 */
export function isRouterToObject(input: unknown): input is Partial<Path> {
  return (
    !!input &&
    typeof input === 'object' &&
    ('pathname' in input || 'hash' in input || 'search' in input) &&
    ('pathname' in input ? typeof input.pathname === 'string' && input.pathname.startsWith('/') : true) &&
    ('search' in input ? typeof input.search === 'string' && input.search.startsWith('?') : true) &&
    ('hash' in input ? typeof input.hash === 'string' && input.hash.startsWith('#') : true)
  )
}

/**
 * Return `true` if the input `To` is a pathname of the current site or a React Router `To` object
 * defined as `Partial<Path>.
 *
 * Does not consider if the input is a full URL for the SITE_URL or a full development URL.
 */
export function isLocalRouterTo(to: To): boolean {
  return typeof to === 'string' ? isHrefPathname(to) : isRouterToObject(to)
}

/**
 * Return `true` if input is a URL instance or string for the current site.
 *
 * Assumes the `SITE_URL` constant is correctly defined for the current development/test/production environment.
 */
export function isLocalUrl(stringOrUrl: string | URL): boolean {
  if (stringOrUrl instanceof URL) {
    return stringOrUrl.origin === SITE_URL
  }

  return isHrefPathname(stringOrUrl)
}
