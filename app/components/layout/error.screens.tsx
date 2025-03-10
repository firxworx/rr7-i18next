import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PATHNAMES } from '@/constants'
import { cn } from '@/lib/style'

export function NotFoundScreen(): React.JSX.Element {
  const { t } = useTranslation('common')

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen text-white',
        'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-4 items-center mb-4">
          <h1 className="text-center text-white">404</h1>
          <div className="pl-4 border-l border-border font-bold text-xl">{t('error.error')}</div>
        </div>
        <p className="text-2xl mb-8">{t('error.notFoundMessage')}</p>
        <Link to={PATHNAMES.root}>{t('action.goToHome')}</Link>
      </div>
    </div>
  )
}
