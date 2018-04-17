import React from 'react';
import { StackNavigator } from 'react-navigation';
import { MainScreen } from '../screens/MainScreen';

export namespace AppNavigator {
  export interface Props {
  }

  export interface State {
  }
}

export class AppNavigator extends React.Component<AppNavigator.Props, AppNavigator.State> {
  public static readonly Navigator = StackNavigator(
    {
      Main: {
        screen: MainScreen,
      },
    },
    {
      initialRouteName: 'Main',
    },
  );

  render() {
    return (
      <AppNavigator.Navigator />
    );
  }
}
