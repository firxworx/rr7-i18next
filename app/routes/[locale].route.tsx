import { isRouteErrorResponse, Outlet, useRouteError, redirect } from 'react-router'
import { useTranslation } from 'react-i18next'

import type { Route } from './+types/[locale].route'

import { DEFAULT_LOCALE, PREFIX_DEFAULT_LOCALE, REDIRECT_DEFAULT_LOCALE } from '@/constants'
import { isAlternateSupportedLocale, isSupportedLocale, stripLocalePrefixFromPathname } from '@/lib/i18n'
import { NotFoundScreen } from '@/components/layout/error.screens'

export async function loader({ request, params }: Route.LoaderArgs) {
  // allow request to proceed if there is no locale path prefix (assume default locale)
  if (!params.locale) {
    return null
  }

  if (PREFIX_DEFAULT_LOCALE && isSupportedLocale(params.locale)) {
    throw new Error('Smokecheck fail: locale loader debug warn: SHOULD NOT BE HERE!')
  }

  if (!PREFIX_DEFAULT_LOCALE) {
    // redirect to prefix-free URL if request has path prefix with default locale
    if (REDIRECT_DEFAULT_LOCALE && params.locale === DEFAULT_LOCALE) {
      return redirect(stripLocalePrefixFromPathname(new URL(request.url).pathname))
    }

    // allow request to proceed if the non-default locale is supported
    if (isAlternateSupportedLocale(params.locale)) {
      return null
    }
  }

  // console.warn(`rejecting request with locale param ${params.locale} -- ${request.url}`)
  throw new Response(null, { status: 404 })
}

export default function LocaleRouteIndex() {
  // const data = useOutletContext<RootOutletData>()
  // return (<Outlet context={data satisfies RootOutletData} />)

  return <Outlet />
}

export function ErrorBoundary() {
  const { t } = useTranslation('common')
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundScreen />
    }
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    )
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>{t('error.error')}</h1>
        <p>{error.message}</p>
        <h2>{t('error.stackTrace')}</h2>
        <pre>{error.stack}</pre>
      </div>
    )
  }

  return <h1>{t('error.unknownError')}</h1>
}
