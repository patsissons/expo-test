import { NavigationState } from 'react-navigation';

export interface DemoState {
  count: number;
}

export interface MainState {
  demo: DemoState;
}

export interface LoginState {
}

export interface Store {
  navigation: NavigationState;
  main: MainState;
  login: LoginState;
}
