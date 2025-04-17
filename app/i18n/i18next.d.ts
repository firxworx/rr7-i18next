import 'i18next'

/**
 * Custom types for i18next.
 *
 * @see i18next.resources.ts
 * @see https://github.com/locize/i18next-typescript-examples/tree/main
 */
declare module 'i18next' {
  export interface CustomTypeOptions {
    defaultNS: import('./i18next.resources').I18nextNamespace

    // this project doesn't make use of fallbackNS
    // fallbackNS: import('./i18next.resources').I18nextNamespace

    resources: import('./i18next.resources').I18nextResource
  }
}
