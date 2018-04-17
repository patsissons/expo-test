import { Dispatch, bindActionCreators } from 'redux';
import { NavigationParams } from 'react-navigation';

type ActionTypeName<T> = { readonly [ Type in keyof T ]: Type };

export type Actions = Readonly<typeof actions>;

export interface ActionProps {
  readonly actions: Actions;
}

export interface NavigationRequestAction {
  type: string;
  params?: NavigationParams;
}

function createTypeNames<T>(types: T): ActionTypeName<T> {
  return getMemberNameList(types)
    .filter(x => isNaN(parseInt(x)))
    .reduce((m, x) => { m[x] = x; return m; }, {} as any);
}

function getRequestAction(type: string, params?: NavigationParams): NavigationRequestAction {
  return {
    type,
    params,
  };
}

export function getMemberNameList<T>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function mapDispatchToActions(dispatch: Dispatch<any>): ActionProps {
  return {
    actions: getMemberNameList(actions)
      .reduce(
        (map: any, actionName) => {
          map[actionName] = bindActionCreators(actions[actionName], dispatch); 
          
          return map; 
        },
        {},
      ),
  };
}

enum Navigation {
  NavigateBack,
  NavigateToMain,
  NavigateToLogin,
}

enum Demo {
  Increment,
}

export const actionTypes = {
  navigation: createTypeNames(Navigation),
  demo: createTypeNames(Demo),
}

const actions = {
  navigation: {
    goBack: (params?: NavigationParams) => getRequestAction(actionTypes.navigation.NavigateBack, params),
    toMain: (params?: NavigationParams) => getRequestAction(actionTypes.navigation.NavigateToMain, params),
    toLogin: (params?: NavigationParams) => getRequestAction(actionTypes.navigation.NavigateToLogin, params),
  },
  demo: {
    increment: (params?: NavigationParams) => getRequestAction(actionTypes.demo.Increment, params),
  },
};
