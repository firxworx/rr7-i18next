/**
 * Recursive utility type for a nested key-value dictionary-like Record with
 * string keys; i.e. a "nested dictionary" object.
 */
export interface NestedDictionary {
  [key: string]: string | NestedDictionary
}
