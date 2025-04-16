import { createMiddleware } from 'hono/factory'

import { isSupportedLocale } from '@/lib/i18n'
import type { ApiContext } from '@/server/types'
import { initI18nextInstance } from '@/i18n/i18next.server'
import { invariant } from '@/lib/invariant'

/**
 * Be sure to run any middleware that enforces trailing slash URL rules before this one.
 *
 * Reminder:
 *
 * - rr7/remix reserves `_*` paths for internal functionality
 * - `*.data` suffixes are reserved for loaders
 *
 * @consider adding support for ACCEPT header especially for API/data routes.
 * @see https://hono.dev/docs/middleware/builtin/language hono now supports built-in language middleware
 */
export const i18nMiddleware = createMiddleware<ApiContext>(async (c, next) => {
  const i18n = await initI18nextInstance(c.req.raw)

  invariant(isSupportedLocale(i18n.language), 'i18next language is not a supported locale')

  c.set('locale', i18n.language)
  c.set('i18next', i18n)

  return next()
})
