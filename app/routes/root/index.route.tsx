import { useTranslation } from 'react-i18next'

import { HeadMeta } from '@/components/routes/head-meta'
import { Welcome } from '@/components/features/welcome'
import { DebugI18n } from '@/components/i18n/debug-i18n'
import { AppLink } from '@/components/ui/links'
import { cn } from '@/lib/style'
import { Box } from '@/components/ui/box'
import { PageLayout } from '@/components/layout/page.layout'

// import type { Route } from './+types/index.route'

export default function IndexRoute(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <>
      <HeadMeta title={t('page.home.title')} description={t('page.home.description')} />
      <PageLayout>
        <Welcome />
        <section className="flex flex-col gap-8 max-w-sm w-full mx-auto">
          <Box className="max-w-sm mx-auto">{t('helloWorld')}</Box>
          <Box className="flex flex-col justify-center gap-4 max-w-sm p-4 mx-auto">
            <p className="italic">{t('page.home.demoBlurb')}</p>
            <ul className="flex flex-col gap-1.5 list-disc list-inside">
              <li>
                <AppLink to="/about" variant="link">
                  About (English)
                </AppLink>
              </li>
              <li>
                <AppLink to="/fr/about" variant="link">
                  /fr/about (Français)
                </AppLink>
              </li>
            </ul>
          </Box>
          <DebugI18n className="mx-auto" />
        </section>
      </PageLayout>
    </>
  )
}
