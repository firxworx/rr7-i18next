import type React from 'react'
import { useEffect } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import { useSSR, useTranslation } from 'react-i18next'

import './app.css'

import type { Route } from './+types/root'
import type { NestedDictionary } from '@/types/record.types'

const createI18nextStore = (locale: string, ns: string, resources: NestedDictionary) => {
  return { [locale]: { [ns]: resources } }
}

export async function loader({ context: { i18next, locale } }: Route.LoaderArgs) {
  // i18n namespace resource bundle is a dictionary object that mirrors ts/json namespace source data
  const initialResources = i18next.getResourceBundle(locale, 'common')
  const initialI18nStore = createI18nextStore(locale, 'common', initialResources)

  return { locale, initialI18nStore }
}

// uncomment the following to define document head `<link>` tags for preloading resources such as fonts via CDN
// export const links: Route.LinksFunction = () => []

export function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const data = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()

  // note: due to an upstream issue this can cause a hydration client/server mismatch error with rr7 on first load
  useSSR(data.initialI18nStore, data.locale)

  return (
    <html lang={data.locale} dir={i18n.dir(data.locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-dvh">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App({ loaderData: { locale } }: Route.ComponentProps): React.JSX.Element {
  const { i18n } = useTranslation()

  // handle case where server locale differs from the client i18n state as a result of client-side navigation
  // this functionality is similar to `useChangeLanguage()` hook exported by remix-i18next
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
