import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Simple utility that concatenates multiple css classnames and omits any falsey values.
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Extended tailwind-merge.
 *
 * Add any custom classes and utilities to this configuration so they can be merged correctly.
 */
const twMerge = extendTailwindMerge({
  override: {},
  extend: {},
})

export function cn(...args: ClassValue[]): string {
  return twMerge(clsx(args))
}
