import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import { initI18nextClient } from '@/i18n/i18next.client'

async function hydrate() {
  await initI18nextClient()

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>,
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  window.setTimeout(hydrate, 1) // safari (no support for requestIdleCallback)
}
