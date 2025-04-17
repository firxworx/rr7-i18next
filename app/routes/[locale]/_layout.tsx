import { Outlet } from 'react-router'

import { cn } from '@/lib/style'
import { LayoutHeader } from '@/components/layout/header.layout'
import { LayoutFooter } from '@/components/layout/footer.layout'
import { NAV_LINKS } from '@/constants'

/**
 * Common layout shared by all routes under the `/:locale?` path.
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
