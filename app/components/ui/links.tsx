import type React from 'react'
import { Link, type LinkProps } from 'react-router'
import clsx from 'clsx'

import type { SupportedLocale } from '@/constants'
import { cn } from '@/lib/style'

type AppLinkVariant = 'default' | 'link'

export interface AppLinkProps extends LinkProps {
  variant?: AppLinkVariant
  keepSearchParams?: boolean
  locale?: SupportedLocale
}

const linkVariants: Map<AppLinkVariant, string> = new Map([
  ['default', ''],
  [
    'link',
    clsx(
      'text-blue-500 dark:text-blue-400 no-underline hover:underline underline-offset-4',
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
