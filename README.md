# React Router v7

A working react-router v7+ SSR (remix) example with internationalization (i18n) powered by i18next and react-i18next.

https://rr7-i18next.bitcurve.workers.dev/

The app implements a commonly-requested i18n requirement: 

- no pathname prefix for the default locale, e.g. `/`, `/about`
- locale prefix for all other supported locales, e.g. `/fr`, `/fr/about`

Styling is [tailwindcss](https://tailwindcss.com) v4 with a minimal configuration for easy customization or replacement with your favourite CSS framework.

A custom [Hono](https://hono.dev/) server replaces react-router's default [Express](https://expressjs.com/) back-end. A hono middleware adds the server-side i18next instance to the context.

## Details

### Internationalization

The path-based i18n strategy is implemented using pure react-router (remix) routes so the project is easily deployed to leading cloud hosting platforms without requiring specialized infrastructure for request rewriting, such as nginx serving as reverse proxy, or edge functions such as AWS CloudFront Functions or Edge Lambdas.

Translated URL segments ("slugs") are not in-scope for this example however they can be implemented by generating distinct routes or using more complex dynamic routes alongside supporting middleware.

In this codebase the locale is determined purely by request pathname.

Locale matching is intentionally strict in this example: you may wish for a more lenient locale matching strategy, such as matching `en` to `en-US` or `en-GB`. Take care to set canonical URLs in your app to avoid duplicate content issues.

Refer to comments regarding the option to support additional locale detection strategies such as with cookies or request headers.

The code also offers a rare working example of `react-i18next`'s `useSSR()` hook in `app/root.tsx` to preload translations so that i18next on the client side is immediately in a _ready_ state.

### Custom Hono Server

[hono](https://hono.dev/) back-end replaces react-router's default [express](https://expressjs.com).

Hono is integrated via react-router's `createRequestHandler()` in `app/server/index.ts`. 

A hono middleware for i18n initializes the server-side `i18next` instance and adds it to hono's context. This is in turn added to react-router's context so that route loaders and actions can easily access the request locale and translation features.

The simple integration is perfect for this example however note that it lacks a few extras implemented by packages like [react-router-hono-server](https://github.com/rphlmr/react-router-hono-server) such as react-router-friendly redirects.

## References

- https://github.com/sergiodxa/remix-i18next is great and supports additional features
- https://github.com/forge-42/base-stack uses remix-i18next and demonstrates setting cache headers
- https://github.com/rphlmr/react-router-hono-server covers additional cases for integrating hono with react-router
- https://github.com/yusukebe/hono-react-router-adapter is an adapter by the creator of hono

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
