// always at least export something
export {};

declare global {
  interface Function {
    // this allows bind functions to return strongly typed results
    bind<T extends Function>(this: T, thisArg: any, ...argArray: any[]): T;
  }
}
