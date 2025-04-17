import type React from 'react'
import { href, Link, type LinkProps } from 'react-router'
import clsx from 'clsx'

import type { SupportedLocale } from '@/constants'
import { cn } from '@/lib/style'
import { useTranslation } from 'react-i18next'
import { ensureLocale, getLocalizedRouterTo } from '@/lib/i18n'

type AppLinkVariant = 'default' | 'link'

export interface AppLinkProps extends LinkProps {
  variant?: AppLinkVariant
  locale?: SupportedLocale
}

export interface I18nLinkProps extends AppLinkProps {
  forceLocale?: SupportedLocale
}

const linkVariants: Map<AppLinkVariant, string> = new Map([
  ['default', ''],
  [
    'link',
    clsx(
      'text-sky-800 dark:text-sky-500 hover:text-sky-700 dark:hover:text-sky-400',
      'no-underline hover:underline underline-offset-4',
      'transition-all duration-300 ease-in-out',
    ),
  ],
])

/**
 * AppLink extends the default react-router Link with some defaults.
 *
 * In part inspired by https://github.com/forge-42/base-stack/blob/main/app/library/link/link.tsxs
 */
export function AppLink({
  to,
  variant = 'default',
  prefetch = 'intent',
  viewTransition = true,
  className,
  children,
  ...restProps
}: AppLinkProps): React.JSX.Element {
  // const isExternal = typeof to === 'string' && /^https?:\/\//.test(to)

  return (
    <Link
      to={to}
      prefetch={prefetch}
      viewTransition={viewTransition}
      className={cn(linkVariants.get(variant), className)}
      {...restProps}
    >
      {children}
    </Link>
  )
}

/**
 * A localized link that uses the locale from i18next's `i18n.language`.
 */
export function I18nLink({
  to,
  rel,
  target,
  forceLocale,
  variant = 'default',
  className,
  children,
  ...restProps
}: I18nLinkProps): React.JSX.Element {
  const {
    i18n: { language: currentLocale },
  } = useTranslation()

  return (
    <AppLink
      to={getLocalizedRouterTo(forceLocale ?? ensureLocale(currentLocale), to)}
      rel={target === '_blank' ? rel || 'noreferrer' : rel}
      className={cn(linkVariants.get(variant), className)}
      {...restProps}
    >
      {children}
    </AppLink>
  )
}

/**
 * A localized I18nLink to the root home/landing page of the app in the current locale.
 */
export function HomeI18nLink({ className }: { className?: string }): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <I18nLink to={href('/')} variant="link" className={className}>
      {t('action.goToHome')}
    </I18nLink>
  )
}
