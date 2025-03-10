import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

/**
 * Routes configuration.
 *
 * Refer to `locale.index.tsx` route for key i18n business logic.
 */
export default [
  route(':locale?', 'routes/locale.index.tsx', [
    layout('routes/_layout.tsx', [index('routes/root/home.tsx'), route('about', 'routes/root/about.tsx')]),
  ]),
] satisfies RouteConfig
