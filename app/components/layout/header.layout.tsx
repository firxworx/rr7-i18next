import type React from 'react'
import { href, NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

import type { AppNavLink } from '@/constants'
import { ensureLocale, getLocalizedRouterTo } from '@/lib/i18n'
import { LocaleSwitcher } from '@/components/i18n/locale-switcher'

interface LayoutHeaderProps {
  navLinks: AppNavLink[]
}

const navLinkClassName = clsx(
  'block px-2 py-1.5',
  'text-sky-800 dark:text-sky-500 hover:text-sky-700 dark:hover:text-sky-400',
  'hover:underline hover:underline-offset-4',
)

export function LayoutHeader({ navLinks }: LayoutHeaderProps): React.JSX.Element {
  const { t, i18n } = useTranslation('common')
  const locale = ensureLocale(i18n.language)

  return (
    <header className="bg-neutral-100 dark:bg-neutral-100/5">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <ul className="flex gap-2">
          <li>
            <NavLink to={getLocalizedRouterTo(locale, href('/'))} viewTransition className={navLinkClassName}>
              {t('nav.home')}
            </NavLink>
          </li>
          {navLinks.map(({ to, i18nPageKey }) => (
            <li key={i18nPageKey}>
              <NavLink to={getLocalizedRouterTo(locale, to)} viewTransition className={navLinkClassName}>
                {t(`page.${i18nPageKey}.title`)}
              </NavLink>
            </li>
          ))}
        </ul>
        <div>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  )
}
