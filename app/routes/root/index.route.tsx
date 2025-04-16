import { useTranslation } from 'react-i18next'

import { HeadMeta } from '@/components/routes/head-meta'
import { Welcome } from '@/components/features/welcome'
import { DebugI18n } from '@/components/i18n/debug-i18n'

// import type { Route } from './+types/index.route'

export default function IndexRoute(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <>
      <HeadMeta title={t('page.home.title')} description={t('page.home.description')} />
      <section className="flex flex-col gap-8 px-8">
        <Welcome />
        <DebugI18n />
      </section>
    </>
  )
}
