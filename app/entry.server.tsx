import { PassThrough } from 'node:stream'

import type { AppLoadContext, EntryContext } from 'react-router'
import { createReadableStreamFromReadable } from '@react-router/node'
import { ServerRouter } from 'react-router'
import type { RenderToPipeableStreamOptions } from 'react-dom/server'
import { renderToPipeableStream } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import { isbot } from 'isbot'

// refer to hono i18n.middleware.ts for initialization of i18next instance
// import { initI18nextInstance } from '@/i18n/i18next.server'

// https://reactrouter.com/explanation/special-files#entryservertsx
// https://github.com/sergiodxa/remix-i18next?tab=readme-ov-file#server-side-configuration

export const streamTimeout = 5_000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const i18nextInstance = loadContext.i18next // lets see if hono context works first before adding fallback // || (await initI18nextInstance(request, routerContext))

  return new Promise((resolve, reject) => {
    // flag to track if an error occurred and conditionally return response status 500
    let didError = false

    let shellRendered = false
    const userAgent = request.headers.get('user-agent')

    // ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode ? 'onAllReady' : 'onShellReady'

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nextInstance}>
        <ServerRouter context={routerContext} url={request.url} />
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true

          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          didError = true

          // biome-ignore lint/style/noParameterAssign: syntax from react-router v7 core
          responseStatusCode = 500
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    setTimeout(abort, streamTimeout + 1000)
  })
}
