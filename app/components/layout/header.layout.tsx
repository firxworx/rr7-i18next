import type React from 'react'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PATHNAMES, type AppNavLink } from '@/constants'
import { ensureLocale, getLocalizedRouterTo } from '@/lib/i18n'

interface LayoutHeaderProps {
  navLinks: AppNavLink[]
}

export function LayoutHeader({ navLinks }: LayoutHeaderProps): React.JSX.Element {
  const { t, i18n } = useTranslation('common')
  const locale = ensureLocale(i18n.language)

  return (
    <header className="bg-slate-100">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <ul className="flex gap-2">
          <li>
            <NavLink
              to={getLocalizedRouterTo(locale, PATHNAMES.root)}
              className="px-2 py-1.5 text-sky-800 hover:text-sky-700 hover:underline hover:underline-offset-4"
            >
              {t('nav.home')}
            </NavLink>
          </li>
          {navLinks.map(({ to, key }) => (
            <li key={key}>
              <NavLink
                to={to}
                className="px-2 py-1.5 text-sky-800 hover:text-sky-700 hover:underline hover:underline-offset-4"
              >
                {t(key)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
