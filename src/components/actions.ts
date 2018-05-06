import { Action } from 'redux';
import { NavigationParams } from 'react-navigation';
import { createTypeNameMap, isString } from '../utils';

export type Actions = Readonly<typeof actions>;

export interface RequestAction<T = {}> extends Action {
  payload?: T;
}

export interface LocalePayload {
  locale: string;
}

export interface DemoPayload {
  amount: number;
}

export function isLocalePayload(payload: any): payload is LocalePayload {
  const localePayload: LocalePayload = payload;

  return (
    localePayload != null &&
    isString(localePayload.locale)
  );
}

export function getRequestAction(type: string): RequestAction;
export function getRequestAction<T>(type: string, payload: T): RequestAction<T>;
export function getRequestAction<T>(type: string, payload?: T): RequestAction<T> {
  return {
    type,
    payload,
  };
}

enum Context {
  LoadEnv,
  LoadLocale,
  LoadLocalization,
}

enum Navigation {
  NavigationBack,
  NavigationToMain,
  NavigationToLogin,
}

enum Demo {
  DemoIncrement,
  DemoDecrement,
}

export const actionTypes = {
  context: createTypeNameMap(Context),
  navigation: createTypeNameMap(Navigation),
  demo: createTypeNameMap(Demo),
};

export const actions = {
  context: {
    loadEnv: () => getRequestAction(actionTypes.context.LoadEnv),
    loadLocale: () => getRequestAction(actionTypes.context.LoadLocale),
  },
  navigation: {
    goBack: (params?: NavigationParams) => getRequestAction(actionTypes.navigation.NavigationBack, params),
    toMain: (params?: NavigationParams) => getRequestAction(actionTypes.navigation.NavigationToMain, params),
    toLogin: (params?: NavigationParams) => getRequestAction(actionTypes.navigation.NavigationToLogin, params),
  },
  demo: {
    increment: (payload?: DemoPayload) => getRequestAction(actionTypes.demo.DemoIncrement, payload),
    decrement: (payload?: DemoPayload) => getRequestAction(actionTypes.demo.DemoDecrement, payload),
  },
};
