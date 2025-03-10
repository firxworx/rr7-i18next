# React Router v7

A react-router v7+ SSR (remix) template that adds internationalization (i18n) powered by i18next and react-i18next.

The template uses a [hono](https://hono.dev/) back-end thanks to [react-router-hono-server](https://github.com/rphlmr/react-router-hono-server) and [https://tailwindcss.com](TailwindCSS) for styling.

A custom hono middleware for i18n adds server-side i18next object to the context of both hono and react-router so that route loaders and actions can access the request locale and the i18next instance for translations.

## Status

90% with all core functionality implemented.

TODO:

- [ ] Add a language switcher
- [ ] Add a language switch by path prefix for any direct navigation by react-router `Link` or `useNavigate()` to a different locale

## i18n Routing Convention

The default locale does not require a locale prefix in the pathname, e.g.:

- `/`
- `/about`

Alternative locales are prefixed with the locale code, e.g.:

- `/fr`
- `/fr/about`

This template is the only working example I know of that demonstrates how to use react-router/remix routes to implement the common i18n requirement where the default locale does _not_ have a locale prefix in the URL and all other locales _do_ have a locale prefix.

Translated URL segments ("slugs") are not supported by this example. This can be implemented by generating routes from a data source that includes translations, or by using dynamic routes alongside more complex i18n middleware.

## Features

template features:

- 🌐 i18n powered by i18next and react-i18next
- 🚀 hono in place of react-router/remix's default express

react-router v7+ features:

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm typecheck
pnpm build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
