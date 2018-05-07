// always at least export something
export {};

declare global {
  const __TEST__: boolean;

  interface Function {
    // this allows bind functions to return strongly typed results
    bind<T extends Function>(this: T, thisArg: any, ...argArray: any[]): T;
  }
}

import 'expo';
declare module 'expo' {
  export namespace DangerZone {
    export namespace Localization {
      export function getCurrentDeviceCountryAsync(): Promise<string>;
      export function getCurrentLocaleAsync(): Promise<string>;
      export function getCurrentTimeZoneAsync(): Promise<string>;
      export function getISOCurrencyCodesAsync(): Promise<string>;
      export function getPreferredLocalesAsync(): Promise<Array<string>>;
    }
  }
}
