import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

/**
 * Routes configuration.
 *
 * Refer to `locale.index.tsx` route for key i18n business logic.
 */
export default [
  route(':locale?', 'routes/[locale].index.route.tsx', [
    layout('routes/_layout.tsx', [
      index('routes/root/index.route.tsx'),
      route('example', 'routes/root/example.route.tsx'),
      route('about', 'routes/root/about.route.tsx'),
    ]),
  ]),
  route('*', 'routes/404.route.tsx'),
] satisfies RouteConfig
