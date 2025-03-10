/**
 * Recursive utility type for a nested key-value record with string keys, i.e. a nested "dictionary" object.
 */
export interface NestedDictionary {
  [key: string]: string | NestedDictionary
}
