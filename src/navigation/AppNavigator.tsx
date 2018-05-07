import React from 'react';
import { Dispatch, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationContainer, NavigationState } from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { Store, ContextState } from '../framework';
import { routes } from './routes';

const key = 'root';

const Navigator: NavigationContainer = StackNavigator(
  routes.app.routeMap,
  {
    navigationOptions: {
      ...routes.app.options,
    },
    initialRouteName: routes.app.names.Main,
    mode: 'modal',
  },
);

export const router = Navigator.router;

export const reactNavigationMiddleware = createReactNavigationReduxMiddleware(
  key,
  // istanbul ignore next very hard to test this
  (store: Store) => store.navigation,
);

const addListener = createReduxBoundAddListener(key);

export namespace AppNavigator {
  export interface Props {
    navigation: NavigationState;
    context: ContextState;
    dispatch: Dispatch<Store>;
  }
}

export const AppNavigator = connect(
  (store: Store) => ({ navigation: store.navigation, context: store.context }),
)((props: AppNavigator.Props) => (
  <Navigator
    screenProps={ ({ context: props.context }) }
    navigation={
      addNavigationHelpers({
        dispatch: props.dispatch,
        state: props.navigation,
        addListener,
      })
    }
  />
));
