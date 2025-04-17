import type { SupportedLocale } from '@/constants'

/**
 * Cloudflare service bindings.
 *
 * If using node instead of Cloudflare this can be replaced with `interface Bindings extends Record<string, never> {}`.
 */
export type Bindings = {
  ASSETS: Fetcher

  // DB: D1Database
  // MEDIA: R2Bucket
} & Env

export interface Variables {
  // meta
  appVersion: string

  // i18n
  locale: SupportedLocale
  i18next: import('i18next').i18n
}

/**
 * Hono context type.
 */
export type ApiContext = {
  Bindings: Bindings
  Variables: Variables
}

/**
 * Declare types for react-router context available to actions and loaders.
 *
 * We are not adopting the new react-router v7 unstable middleware for now as the API is still in flux.
 */
declare module 'react-router' {
  interface Future {
    unstable_middleware: false
  }

  export interface AppLoadContext extends Variables {
    cloudflare: {
      env: Env
      ctx: ExecutionContext
    }
  }
}
