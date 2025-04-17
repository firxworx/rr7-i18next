import { useTranslation } from 'react-i18next'

import { HeadMeta } from '@/components/routes/head-meta'
import { I18nDebug } from '@/components/i18n/i18n-debug'
import { PageLayout } from '@/components/layout/page.layout'
import { HomeI18nLink } from '@/components/ui/links'

export default function AboutRoute(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <>
      <HeadMeta title={t('page.about.title')} description={t('page.about.description')} />
      <PageLayout>
        <h1 className="text-4xl font-bold">{t('nav.about')}</h1>
        <I18nDebug />
        <HomeI18nLink />
      </PageLayout>
    </>
  )
}
