import type React from 'react'
import { useEffect } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import { useSSR as useI18nextSSR, useTranslation } from 'react-i18next'

import type { Route } from './+types/root'
import './app.css'

import type { NestedDictionary } from '@/types/record.types'
import { I18NEXT_DEFAULT_NAMESPACE } from '@/constants'

const createI18nextStore = (locale: string, ns: string, resources: NestedDictionary) => {
  return { [locale]: { [ns]: resources } }
}

export async function loader({ context: { i18next, locale } }: Route.LoaderArgs) {
  // the i18n namespace resource bundle is an object with shape matching the ts/json namespace source data
  const initialResources = i18next.getResourceBundle(locale, I18NEXT_DEFAULT_NAMESPACE)
  const initialI18nStore = createI18nextStore(locale, I18NEXT_DEFAULT_NAMESPACE, initialResources)

  return { locale, initialI18nStore }
}

// uncomment the following to define document head `<link>` tags for preloading resources such as fonts via CDN
// export const links: Route.LinksFunction = () => []

export function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const data = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()

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

export default function App({ loaderData: { locale, initialI18nStore } }: Route.ComponentProps): React.JSX.Element {
  const { i18n } = useTranslation()

  // preload i18next resources so that the client i18next instance is immediately in ready state
  useI18nextSSR(initialI18nStore, locale)

  // handle case where server locale differs from the client i18n state as a result of client-side navigation
  // the following effect is similar to `useChangeLanguage()` hook from @sergiodxa's `remix-i18next`
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
