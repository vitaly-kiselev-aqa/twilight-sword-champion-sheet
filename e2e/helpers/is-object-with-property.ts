export function isObjectWithProperty<K extends string>(
  obj: unknown,
  propertyName: K,
): obj is { [P in K]: unknown } {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  return propertyName in obj;
}
