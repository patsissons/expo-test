export type TypeNameMap<T> = { readonly [ TypeName in keyof T ]: TypeName };

export function getTypeNames<T>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function createTypeNameMap<T>(types: T): TypeNameMap<T> {
  return getTypeNames(types)
    .filter(x => isNaN(parseInt(x)))
    .reduce(
      (m, x) => { m[x] = x; return m; },
      {} as any,
    );
}
