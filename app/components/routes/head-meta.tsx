import { APP_BRAND_NAME } from '@/constants'
import { useTranslation } from 'react-i18next'

interface HeadMetaProps {
  title?: string
  description?: string
}

// key prefix in the default namespace for default translations
const keyPrefix = 'meta'

/**
 * Route component that renders document head meta tags: `<title>` and `<meta name="description">`.
 *
 * Supports React 19+ which introduced support for metadata tags.
 *
 * - `title` has the app's name and tagline appended to it
 * - `description` is optional and falls back to app description
 *
 * Both the `title` and optional `description` values should be post-translation values.
 *
 * @see https://react.dev/blog/2024/12/05/react-19#support-for-metadata-tags
 * @see https://react.dev/reference/react-dom/components/title
 * @see https://react.dev/reference/react-dom/components/link
 * @see https://react.dev/reference/react-dom/components/meta
 */
export function HeadMeta({ title, description }: HeadMetaProps): React.JSX.Element {
  const { t } = useTranslation('common', { keyPrefix })

  return (
    <>
      {title ? (
        <title>{`${title} | ${APP_BRAND_NAME} | ${t('meta.title')}`}</title>
      ) : (
        <title>{`${APP_BRAND_NAME} | ${t('meta.title')}`}</title>
      )}
      <meta name="description" content={description || t('meta.description')} />
    </>
  )
}
