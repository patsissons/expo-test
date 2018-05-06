export function isString(value: any): value is string {
  return value != null && typeof value === 'string';
}

export function isObject<T = {}>(value: any): value is T {
  return value != null && typeof value === 'object';
}
