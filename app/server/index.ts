import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { contextStorage } from 'hono/context-storage'
import { createRequestHandler } from 'react-router'

import type { ApiContext } from '@/server/types'
import { i18nMiddleware } from '@/server/middleware/i18n.middleware'

// references --
// https://developers.cloudflare.com/workers/runtime-apis/context/ -- cloudflare ExecutionContext
// https://github.com/cloudflare/templates/blob/staging/react-postgres-fullstack-template/api/index.js - hono integration
// https://github.com/cloudflare/templates/blob/staging/react-router-postgres-ssr-template/api/index.js - hono/rr integration
// https://github.com/cloudflare/templates/blob/staging/react-router-starter-template/workers/app.ts - defines rr as middleware

// https://sergiodxa.com/tutorials/customize-remix-app-load-context-type
// react-router-hono-server project (also see for the defaultLogger option)

const build = await import('virtual:react-router/server-build')
const requestHandler = createRequestHandler(build, import.meta.env.MODE)

const app = new Hono<ApiContext>()
  // chain middleware
  .use(contextStorage())
  .use('*', prettyJSON())
  .use(i18nMiddleware)
  // react-router
  .get('*', async (ctx) => {
    return await requestHandler(ctx.req.raw, {
      appVersion: import.meta.env.PROD ? build.assets.version : 'dev',
      locale: ctx.get('locale'),
      i18next: ctx.get('i18next'),
      cloudflare: {
        env: ctx.env,
        ctx: Object.assign(ctx.executionCtx, { props: undefined }),
      },
    })
  })
  // catch-all route for static assets
  .all('*', async (c) => {
    return c.env.ASSETS.fetch(c.req.raw)
  })

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>
