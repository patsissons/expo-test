import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationContainer, NavigationState } from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { Store } from '../components';
import { routes } from './routes';

const key = 'root';

const Navigator: NavigationContainer = StackNavigator(
  routes.app.routeMap,
  {
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
    dispatch: Dispatch<Store>;
  }
}

export const AppNavigator = connect(
  (store: Store) => ({ navigation: store.navigation }),
)((props: AppNavigator.Props) => (
  <Navigator navigation={
    addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.navigation,
      addListener,
    })
  } />
));
