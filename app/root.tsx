import { useEffect } from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import { useSSR, useTranslation } from 'react-i18next'

import './app.css'

import type { Route } from './+types/root'
import type { NestedDictionary } from '@/types/record.types'
import { getLocaleFromUrl } from '@/lib/i18n'
import { initI18nextInstance } from '@/i18n/i18next.server'

const createI18nextStore = (locale: string, ns: string, resources: NestedDictionary) => {
  return { [locale]: { [ns]: resources } }
}

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromUrl(request.url)
  const i18n = await initI18nextInstance(request)

  // i18n namespace's resource bundle is essentially a dictionary object that mirrors its ts/json source file
  const initialResources = i18n.getResourceBundle(locale, 'common')
  const initialI18nStore = createI18nextStore(locale, 'common', initialResources)

  return { locale, initialI18nStore }
}

// uncomment and populate to set header `<link>` tags for preloading resources such as font cdn's
// export const links: Route.LinksFunction = () => []

/**
 * Layout to wrap key providers (such as ThemeProvider).
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return <CoreLayout>{children}</CoreLayout>
}

/**
 * Inner CoreLayout enables access to React context providers of parent Layout.
 */
function CoreLayout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()

  const { i18n } = useTranslation()
  useSSR(data.initialI18nStore, data.locale)

  // handle case where server locale differs from the client i18n state as a result of client-side navigation
  useEffect(() => {
    if (i18n.language !== data.locale) {
      i18n.changeLanguage(data.locale)
    }
  }, [data.locale, i18n])

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

export default function App() {
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
