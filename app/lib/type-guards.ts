/**
 * Generic type guard that confirms if the input value **is not** `null` and is not `undefined`.
 */
export function isNonNullish<T>(input: T | null | undefined): input is NonNullable<T> {
  return input !== null && input !== undefined
}

/**
 * Generic type guard that confirms if the input value is either `null` or `undefined`.
 */
export function isNullish<T>(input: T | null | undefined): input is null | undefined {
  return input === null || input === undefined
}

/**
 * Type narrowing helper that asserts an input is value is not `null` and not `undefined`.
 *
 * Returns the input value if it is `NonNullable<T>` or throws a `TypeError` if it is `null` or `undefined`.
 *
 * @throws {TypeError} if the input is `null` or `undefined`.
 */
export function ensureValue<T>(
  input: T | undefined | null,
  error?: string | Error | (new (...args: unknown[]) => Error),
): NonNullable<T> {
  if (input === null || input === undefined) {
    if (error) {
      if (typeof error === 'string') {
        throw new Error(error)
      }

      throw typeof error === 'function' ? new error('Expected value to be truthy') : error
    }

    throw new TypeError('Input value cannot be null or undefined')
  }

  return input
}
