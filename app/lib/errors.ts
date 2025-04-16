/**
 * CustomError is intended to serve as a base class for all custom errors.
 *
 * This class handles details regarding the prototype chain and stack trace involved with
 * extending the Error class in TypeScript.
 */
export class CustomError extends Error {
  // biome-ignore lint/suspicious/noExplicitAny: allow `any` args for base CustomError class
  constructor(...args: any[]) {
    super(...args)

    // alternatively new.target.name is available in ES6+ (no IE11) however it may not be the best option
    // for a base error class intended to be extended by other custom error classes
    Object.defineProperty(this, 'name', {
      value: this.constructor.name,
      enumerable: false,
      configurable: true,
    })

    // ensure Object.prototype.toString.call(new CustomError) returns '[object Error]' vs. '[object Object]'
    // `instanceof`, lodash _.isError(), and other popular libraries may use this check
    Object.defineProperty(CustomError.prototype, Symbol.toStringTag, {
      value: 'Error',
      writable: false,
      configurable: false,
      enumerable: false,
    })

    // fix the extended error prototype chain because TypeScript `__extends` does not fully support built-ins
    // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
    if (typeof Object?.setPrototypeOf === 'function') {
      Object.setPrototypeOf(this, new.target.prototype) // vs. (this, CustomError.prototype)
    } else {
      // biome-ignore lint/suspicious/noExplicitAny: valid use of any for legacy __proto__ assignment
      ;(this as any).__proto__ = this.constructor.prototype // vs. new.target.prototype
    }

    // conditional captureStackTrace because it exists in node v8 runtime only
    // @see https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt
    Error?.captureStackTrace(this, this.constructor)
  }
}

export class InvariantAssertionError extends CustomError {}
