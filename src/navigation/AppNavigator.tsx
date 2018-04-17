import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationContainer, NavigationState } from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { routes } from './routes';

const key = 'root';

export const Navigator: NavigationContainer = StackNavigator(
  routes.app.routeMap,
  { 
    initialRouteName: routes.app.names.Main,
    mode: 'modal',
  },
);

export const reactNavigationMiddleware = createReactNavigationReduxMiddleware<AppNavigator.State>(
  key,
  state => state.navigation,
);

const addListener = createReduxBoundAddListener(key);

export namespace AppNavigator {
  export interface State {
    navigation: NavigationState;
  }

  export interface Props extends State {
    dispatch: Dispatch<any>;
  }
}

export const AppNavigator = connect(
  (state: AppNavigator.State) => ({ navigation: state.navigation }),
)((props: AppNavigator.Props) => (
  <Navigator navigation={
    addNavigationHelpers({
      dispatch: props.dispatch,
      state: props.navigation,
      addListener,
    })
  } />
));
