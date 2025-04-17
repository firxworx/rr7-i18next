# React Router v7

A working react-router v7+ SSR (remix) example with internationalization (i18n) powered by i18next and react-i18next.

https://rr7-i18next.bitcurve.workers.dev/

The app implements a commonly-requested i18n requirement: 

- no pathname prefix for the default locale, e.g. `/`, `/about`
- locale prefix for all other supported locales, e.g. `/fr`, `/fr/about`

Styling is [tailwindcss](https://tailwindcss.com) v4 with a minimal configuration for easy customization or replacement with your favourite CSS framework.

A custom [Hono](https://hono.dev/) server replaces react-router's default [Express](https://expressjs.com/) back-end.

A hono middleware adds the server-side `i18next` instance and `locale` to the hono context and this is in turn added to the react-router context.

This project uses the stable react-router context type based on `AppLoadContext` vs. the new unstable context type that comes into play if `future.unstable_middleware` is enabled in `react-router.config.ts`.

## Details

### Internationalization

The path-based i18n strategy is implemented using pure react-router (remix) routes.

This makes the project easy to deploy to popular cloud hosting platforms without requiring specialized infrastructure for request rewriting such as nginx serving as reverse proxy, or edge functions such as AWS CloudFront Functions or Edge Lambdas.

Translated URL segments (aka translated "slugs") are not in-scope for this project however they can be implemented by generating distinct routes or using more complex dynamic routes alongside supporting middleware.

#### Naming Conventions

This project's code uses _locale_ when naming constants and variables.

i18next is a longstanding library that unfortuntately and for historical reasons uses the word _language_ where _locale_ would now be considered more appropriate. 

Refer to standardized ISO / BCP-47 convention: https://en.wikipedia.org/wiki/IETF_language_tag

In BCP-47 a _language_ is the first _primary language subtag_ of a full locale code or _language tag_ e.g. `en`, `fr`, etc.

Additional subtags are _extended language subtag_, _script subtag_, _region subtag_, etc. per the specification.

e.g. `en-CA`, `en-US`, `fr-CA`, `fr-FR`, `pt-PT`, `pt-BR`, `km-Khmr-KH`

#### Locale Matching Strategy

In this project the locale matching is intentionally strict and the locale of a request is purely determined from the pathname.

Refer to comments regarding the option to support additional locale detection strategies such as with cookies or request headers such as the [Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language) header.

The community package [remix-i18next](https://github.com/sergiodxa/remix-i18next) provides a good reference for resolving locale using a mix of cookies, query params, and/or headers.

You may also opt for a more lenient locale matching strategy, such as matching `en` to `en-US` or `en-GB`, or to tolerate differences in casing.

> Remember that URL's are case sensitive with the exception of the domain/hostname and that the popular practice of treating them as case insensitive is non-standard behaviour.

Take care to set canonical URLs in your app to avoid duplicate content issues when adopting more lenient strategies that can result in cases where multiple URL's will return the identical response.

#### Constants

Refer to `app/constants.ts` for key constant definitions including: `DEFAULT_LOCALE`, `SUPPORTED_LOCALES`, etc.

These constants are the source of truth for type definitions and they are used in the i18next configuration as well as by various helper functions.

#### Preloading

The code offers a rare working example of `react-i18next`'s `useSSR()` hook in `app/root.tsx`. 

This hook preloads translations from the server so that the client side i18next instance is immediately in a _ready_ state on first render.

You may need to revise the approach in `app/root.tsx` if you add namespaces.

#### Server-Side Translations

Actions and Loaders can access the `locale` and `i18next` instance that are added to the react-router context.

The `locale` is simply a convenience that equals `i18next.language` except with stronger typing as `SupportedLocale` vs. `string`.

To get a "fixed" translation `t()` function locked to a given locale (language) and a given namespace (e.g. 'common'):

```ts
export async function loader({ context: { locale, i18next } }: Route.LoaderArgs) {
  const t = i18next.getFixedT(locale, 'common')
  const message = t('helloWorld')

  console.info(`example translation in a loader: ${message}`)
}
```

#### Client-Side Translations

Refer to the routes and components for examples of the `useTranslation()` hook from `react-i18next`.

### Custom Hono Server

[hono](https://hono.dev/) back-end replaces react-router's default [express](https://expressjs.com).

Hono is integrated via react-router's `createRequestHandler()` in `app/server/index.ts`. 

A hono middleware for i18n initializes the server-side `i18next` instance and adds it to hono's context. This is then added to react-router's context so that route loaders and actions can easily access the request locale and translation features.

The simple integration is perfect for this example however note that it lacks a few extras implemented by packages like [react-router-hono-server](https://github.com/rphlmr/react-router-hono-server) such as react-router-friendly redirects.

## References

- https://github.com/sergiodxa/remix-i18next is great and supports additional features
- https://github.com/forge-42/base-stack uses remix-i18next and demonstrates setting cache headers
- https://github.com/rphlmr/react-router-hono-server covers additional cases for integrating hono with react-router
- https://github.com/yusukebe/hono-react-router-adapter is an adapter by the creator of hono
- https://github.com/DTS-STN/canadian-dental-care-plan in-the-wild react-router v7 example of translated route slugs

## Features

template features:

- 🌐 i18n powered by i18next and react-i18next
- 🚀 hono replaces react-router/remix's express
- 🎨 tailwindcss v4 with minimal configuration

react-router v7+ features:

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

The demo is deployed to Cloudflare.

If you are using node `entry.server.node.tsx` can replace `entry.server.tsx`.

Refer to comments related to `ApiContext` that describe how to revise the types to remove Cloudflare-specific service bindings.

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application is available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm typecheck
pnpm build
```

## Docker

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

---

Built with ❤️ using React Router.
