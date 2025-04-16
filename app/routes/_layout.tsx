import { Outlet } from 'react-router'

// import type { Route } from './+types/_layout'

import { cn } from '@/lib/style'
import { LayoutHeader } from '@/components/layout/header.layout'
import { LayoutFooter } from '@/components/layout/footer.layout'
import { NAV_LINKS } from '@/constants'

/**
 * Layout that adds a `main` element with conditional classNames for root, non-root, and app paths.
 */
export default function Layout(): React.JSX.Element {
  return (
    <>
      <LayoutHeader navLinks={NAV_LINKS} />
      <main className={cn('flex flex-col flex-grow')}>
        <Outlet />
      </main>
      <LayoutFooter />
    </>
  )
}
