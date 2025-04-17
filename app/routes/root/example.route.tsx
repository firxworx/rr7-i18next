import type React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PATHNAMES } from '@/constants'
import { HeadMeta } from '@/components/routes/head-meta'
import { DebugI18n } from '@/components/i18n/debug-i18n'
import { PageLayout } from '@/components/layout/page.layout'

// import type { Route } from './+types/example.route'

export default function ExampleRoute(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <>
      <HeadMeta title={t('page.example.title')} description={t('page.example.description')} />
      <PageLayout>
        <h1 className="text-4xl font-bold">{t('nav.example')}</h1>
        <DebugI18n />
        <p>
          <Link to={PATHNAMES.root} className="underline underline-offset-4">
            {t('action.goToHome')}
          </Link>
        </p>
      </PageLayout>
    </>
  )
}
