import { Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

// import type { Route } from './+types/_layout'

import { cn } from '@/lib/style'
import { LayoutHeader } from '@/components/layout/header.layout'
import { LayoutFooter } from '@/components/layout/footer.layout'
import { isLocaleRootPathname } from '@/lib/i18n'
import { NAV_LINKS } from '@/constants'

// export async function loader({ request, context: _context }: Route.LoaderArgs) {}

/**
 * Layout that adds a `main` element with conditional classNames for root, non-root, and app paths.
 */
export default function Layout() {
  const { pathname } = useLocation()

  // @future could also add the detected locale to the loader data (populate from the server context)
  const {
    i18n: { language: currentLocale },
  } = useTranslation()

  const isRootPath = isLocaleRootPathname(currentLocale, pathname)
  // const isAppPath = stripLocalePrefixFromPathname(pathname).startsWith(PATHNAMES.app.home)

  return (
    <>
      <LayoutHeader navLinks={NAV_LINKS} />
      <main
        className={cn('flex flex-col flex-grow', {
          // 'cx-container max-w-6xl py-12': !isRootPath && !isAppPath,
          // 'cx-container max-w-6xl pt-7 pb-12': !isRootPath && isAppPath,
        })}
      >
        <Outlet />
      </main>
      <LayoutFooter />
    </>
  )
}
