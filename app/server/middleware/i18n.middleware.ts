import { createMiddleware } from 'hono/factory'

import { isSupportedLocale } from '@/lib/i18n'
import type { ApiContext } from '@/server/types'
import { initI18nextInstance } from '@/i18n/i18next.server'
import { invariant } from '@/lib/invariant'

/**
 * Be sure to run any middleware that enforces trailing slash URL rules before this one.
 *
 * Reminders about react-router (remix):
 *
 * - `_*` paths are reserved for internal functionality
 * - `*.data` suffixes are reserved for route loaders
 *
 * Logic for determining the locale is delegated to the `initI18nextInstance()` function and
 * is currently based on the request URL pathname prefix.
 *
 * In future consider a more elaborate locale detection strategy that may also involve cookies
 * or request headers such as the `Accept-Language` header.
 *
 * Additional strategies can help improve UX and feedback especially with respect to API
 * or data/resource routes that do not export a default component.
 *
 * @see https://hono.dev/docs/middleware/builtin/language note hono has now added built-in language middleware
 */
export const i18nMiddleware = createMiddleware<ApiContext>(async (c, next) => {
  const i18n = await initI18nextInstance(c.req.raw)

  invariant(isSupportedLocale(i18n.language), 'i18next language is not a supported locale')

  c.set('locale', i18n.language)
  c.set('i18next', i18n)

  return next()
})
