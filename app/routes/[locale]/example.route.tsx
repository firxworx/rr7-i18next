import type React from 'react'
import { useTranslation } from 'react-i18next'

import { HeadMeta } from '@/components/routes/head-meta'
import { I18nDebug } from '@/components/i18n/i18n-debug'
import { PageLayout } from '@/components/layout/page.layout'
import { HomeI18nLink } from '@/components/ui/links'

export default function ExampleRoute(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <>
      <HeadMeta title={t('page.example.title')} description={t('page.example.description')} />
      <PageLayout>
        <h1 className="text-4xl font-bold">{t('nav.example')}</h1>
        <I18nDebug />
        <HomeI18nLink />
      </PageLayout>
    </>
  )
}
