/*
 * This module defines constants that depend on vite-specific `import.meta.*` properties.
 *
 * Any code that depends on this file must be bundled by vite, run via `vite-node`,
 * or bundled using another bundler specifically configured to handle these properties.
 */

export const IS_DEVELOPMENT = import.meta.env.DEV
export const IS_PRODUCTION = import.meta.env.PROD

export const IS_SERVER = import.meta.env.SSR
export const IS_CLIENT = typeof globalThis?.window !== 'undefined'
