import { createMiddleware } from 'hono/factory'

import { getLocaleFromPathname } from '@/lib/i18n'
import type { ApiContext } from '@/server/types'
import { initI18nextInstance } from '@/i18n/i18next.server'

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
  const locale = getLocaleFromPathname(c.req.path) // sergio uses c.req.raw to work on raw Request object
  const i18next = await initI18nextInstance(c.req.raw)

  c.set('locale', locale)
  c.set('i18next', i18next)

  return next()
})
