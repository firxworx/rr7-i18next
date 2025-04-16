import { InvariantAssertionError } from '@/lib/errors'

const DEFAULT_ERROR_MESSAGE: string = 'Invariant assertion failed'

/**
 * Throws custom `InvariantAssertionError` if the given condition is falsy.
 *
 * The `invariant()` function conceptually similar to Node's built-in `assert()`.
 * This version is intended for use across the stack.
 *
 * Based on `@epic-web/invariant` which in turn was inspired by and based on `tiny-invariant` which
 * helped to popularize the pattern in the TypeScript community.
 *
 * @see https://nodejs.org/api/assert.html
 * @see https://github.com/epicweb-dev/invariant
 * @see https://github.com/alexreardon/tiny-invariant
 *
 * @throws {InvariantAssertionError} if the given condition is falsy
 */
export function invariant(condition: unknown, message?: string | (() => string)): asserts condition {
  if (!condition) {
    throw new InvariantAssertionError(typeof message === 'function' ? message() : message || DEFAULT_ERROR_MESSAGE)
  }
}

/**
 * Throws a `Response` object with a default 400 status code if the given condition is falsy.
 *
 * Provide a final `ResponseInit` object to override the default status code.
 *
 * @example
 * invariantResponse(typeof value === 'string', 'value must be a string')
 * invariantResponse(foo === bar, 'error message', { status: 500 })
 *
 * @see https://nodejs.org/api/assert.html
 * @see https://github.com/epicweb-dev/invariant
 * @see https://github.com/alexreardon/tiny-invariant
 *
 * @throws {Response} status 400 if the given condition is falsy
 */
export function invariantResponse(
  condition: unknown,
  message: string | (() => string),
  responseInit?: ResponseInit,
): asserts condition {
  if (!condition) {
    throw new Response(typeof message === 'function' ? message() : message, {
      status: 400,
      ...responseInit,
    })
  }
}
