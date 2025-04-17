import { useTranslation } from 'react-i18next'

import type { Route } from './+types/index.route'

import { HeadMeta } from '@/components/routes/head-meta'
import { Welcome } from '@/components/features/welcome'
import { I18nDebug } from '@/components/i18n/i18n-debug'
import { AppLink, I18nLink } from '@/components/ui/links'
import { Box } from '@/components/ui/box'
import { PageLayout } from '@/components/layout/page.layout'
import { NAV_LINKS } from '@/constants'
import { IS_DEVELOPMENT } from '@/env.config'

/**
 * Example of accessing locale and i18next instance on the server-side from react-router context.
 */
export async function loader({ context: { locale, i18next } }: Route.LoaderArgs) {
  if (IS_DEVELOPMENT) {
    const t = i18next.getFixedT(locale, 'common')
    const message = t('helloWorld')

    console.info(`DEV: example translation (${locale}) in a loader: ${message}`)
  }
}

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
            <p className="italic">{t('page.home.navBlurb')}</p>
            <ul className="flex flex-col gap-1.5 list-disc list-inside">
              {NAV_LINKS.map(({ to, i18nPageKey }) => (
                <li key={i18nPageKey}>
                  <I18nLink to={to} variant="link">
                    {t(`page.${i18nPageKey}.title`)}
                  </I18nLink>
                </li>
              ))}
            </ul>
          </Box>
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
          <I18nDebug className="mx-auto" />
        </section>
      </PageLayout>
    </>
  )
}
