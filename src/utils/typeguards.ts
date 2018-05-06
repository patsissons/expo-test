export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isObject<T = {}>(value: any): value is T {
  return typeof value === 'object';
}
