import { createHonoServer } from 'react-router-hono-server/node'

import type { ApiContext, Variables } from '@/server/types'
import { i18nMiddleware } from '@/server/middleware/i18n.middleware'

/**
 * Declare types for react-router context available to actions and loaders.
 */
declare module 'react-router' {
  interface AppLoadContext extends Variables {}
}

/**
 * @see https://sergiodxa.com/tutorials/customize-remix-app-load-context-type
 */
export default await createHonoServer<ApiContext>({
  /**
   * Middleware to run before any other middleware.
   *
   * Add any auth middlware first, then i18n middleware.
   */
  beforeAll(app) {
    app.use(i18nMiddleware)
  },

  // /**
  //  * Middleware to run after any middleware potentially injected by `react-router-hono-server`.
  //  */
  // configure(app) {
  //   app.use(...)
  // },

  /**
   * Callback to populate react-router v7+ (remix) context.
   */
  getLoadContext(ctx, { mode, build }) {
    const isProductionMode = mode === 'production'

    return {
      // metadata
      appVersion: isProductionMode ? build.assets.version : 'dev',

      // locale and i18next instance set by i18n middleware
      locale: ctx.get('locale'),
      i18next: ctx.get('i18next'),
    }
  },

  /**
   * Control hono's default logger.
   */
  defaultLogger: true,
})
