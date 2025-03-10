import { useTranslation } from 'react-i18next'
import type { Route } from './+types/home'
import { PATHNAMES } from '@/constants'
import { Link } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App (About)' }, { name: 'description', content: 'About Page' }]
}

export default function About() {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">{t('nav.about')}</h1>
      <p>
        <Link to={PATHNAMES.root} className="underline underline-offset-4">
          {t('action.goToHome')}
        </Link>
      </p>
    </div>
  )
}
