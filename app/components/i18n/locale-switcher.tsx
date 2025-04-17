import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  'block w-full py-2 px-2 text-sm leading-0 border outline-none rounded-lg',
  'bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600',
  'text-neutral-900 dark:text-white',
  'placeholder-neutral-500 dark:placeholder-neutral-400',
  'focus-visible:ring-2 focus-visible:ring-offset-0',
  'focus-visible:ring-sky-500/50 focus-visible:border-sky-500/50',
  'dark:focus-visible:ring-sky-500/50 dark:focus-visible:border-sky-500/50',
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

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames(SUPPORTED_LOCALES, {
      type: 'language',
    })
  }, [])

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
      className={cn(defaultSelectClassName, 'min-w-fit w-20', className)}
      disabled={!isReady || isRevalidating}
      onChange={handleLocaleChange}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <option key={locale} value={locale}>
          {languageNames.of(locale) ?? locale}
        </option>
      ))}
    </select>
  )
}
