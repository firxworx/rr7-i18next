import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useRevalidator } from 'react-router'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

import { SUPPORTED_LOCALES, type SupportedLocale } from '@/constants'
import { ensureLocale, getLocalizedPathname } from '@/lib/i18n'
import { cn } from '@/lib/style'
import { useLocale } from '@/i18n/i18n.hooks'

interface LocaleSwitcherProps {
  className?: string
}

const defaultSelectClassName = clsx(
  'block w-full p-2.5 text-base border rounded-lg',
  'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white',
  'placeholder-gray-500 dark:placeholder-gray-400',
  'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500',
  'disabled:opacity-50',
)

/**
 * There should only be one of these rendered per layout (page) due to the effects.
 */
export function LocaleSwitcher({ className }: LocaleSwitcherProps): React.JSX.Element {
  const rootLoaderServerLocale = useLocale()
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(rootLoaderServerLocale)

  const revalidator = useRevalidator()
  const navigate = useNavigate()
  const { pathname, search, hash } = useLocation()

  const { i18n, ready: isI18nReady } = useTranslation('common')

  const isReady = i18n.isInitialized && isI18nReady
  const isRevalidating = revalidator.state !== 'idle'

  // handle case where i18next and root loader locale are out of sync (force revalidation)
  useEffect(() => {
    if (i18n.language !== rootLoaderServerLocale) {
      revalidator.revalidate()
    }
  }, [i18n, revalidator, rootLoaderServerLocale])

  // handle case where this component is out of sync with i18next locale (e.g. user navigates to url with different locale prefix)
  useEffect(() => {
    if (currentLocale !== i18n.language) {
      setCurrentLocale(ensureLocale(i18n.language))
    }
  }, [i18n.language, currentLocale])

  const handleLocaleChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    async (event) => {
      if (!isReady) {
        console.warn('i18n not ready, cannot change language')
        return
      }

      const nextLocale = ensureLocale(event.target.value)
      const nextPathname = getLocalizedPathname(nextLocale, pathname)

      setCurrentLocale(nextLocale)
      await i18n.changeLanguage(nextLocale)

      if (nextPathname !== pathname) {
        await navigate(`${nextPathname}${search}${hash}`, {
          replace: true,
          viewTransition: true,
          preventScrollReset: true,
          flushSync: true,
        })
      }

      await revalidator.revalidate()
    },
    [i18n.changeLanguage, revalidator.revalidate, navigate, isReady, pathname, search, hash],
  )

  return (
    <select
      value={currentLocale}
      className={cn(defaultSelectClassName, 'max-w-[4rem]', className)}
      disabled={!isReady || isRevalidating}
      onChange={handleLocaleChange}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  )
}
