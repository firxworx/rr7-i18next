import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

/**
 * Routes configuration.
 *
 * Note the individual filenames carry no meaning when routes are defined the declarative routes
 * configuration where a `RouteConfig` array is the default export from this module.
 *
 * Refer to `[locale].route.tsx` for important i18n business logic to support the convention
 * where the default locale is not prefixed in the URL and alternate locales are prefixed.
 *
 * @see https://reactrouter.com/start/framework/routing
 */
export default [
  route(':locale?', 'routes/[locale].route.tsx', [
    layout('routes/[locale]/_layout.tsx', [
      index('routes/[locale]/index.route.tsx'),
      route('example', 'routes/[locale]/example.route.tsx'),
      route('about', 'routes/[locale]/about.route.tsx'),
    ]),
  ]),
  route('*', 'routes/404.route.tsx'),
] satisfies RouteConfig
