import { NavigationState } from 'react-navigation';
import { LocalizationMap } from '../locale';
import { Env } from '../utils';

export interface LocalizationContext {
  locale: string;
  localization: LocalizationMap;
}

export interface EnvContext {
  env: Partial<Env>;
}

export interface ContextState extends LocalizationContext, EnvContext {
}

export interface DemoState {
  count: number;
}

export interface MainState {
  demo: DemoState;
}

export interface LoginState {
}

export interface Store {
  context: ContextState;
  navigation: NavigationState;
  main: MainState;
  login: LoginState;
}
