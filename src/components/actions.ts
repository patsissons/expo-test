import { Dispatch, bindActionCreators, Action } from 'redux';
import { NavigationParams } from 'react-navigation';
import { connect, Connect } from 'react-redux';
import { getTypeNames, createTypeNameMap } from '../utils';
import { Store } from './state';

export type Actions = Readonly<typeof actions>;

export interface ActionProps {
  readonly actions?: Actions;
}

export interface RequestAction<T = {}> extends Action {
  payload?: T;
}

export interface DemoPayload {
  amount: number;
}

function getRequestAction<T>(type: string, payload?: T): RequestAction<T> {
  return {
    type,
    payload,
  };
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
  navigation: createTypeNameMap(Navigation),
  demo: createTypeNameMap(Demo),
};

const actions = {
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

function mapDispatchToActions(dispatch: Dispatch<Store>): ActionProps {
  return {
    actions: getTypeNames(actions)
      .reduce(
        (map, actionName) => {
          map[actionName] = bindActionCreators(actions[actionName], dispatch);

          return map;
        },
        {} as any,
      ),
  };
}

function connectToActionsHelper(...args: Array<any>) {
  args[1] = args[1] || mapDispatchToActions;

  return connect.apply(undefined, args);
}

export const connectToActions: Connect = connectToActionsHelper;
