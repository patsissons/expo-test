import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';
import { ReduxComponent, connectToActions } from '../components/ReduxComponent';

class LoginScreen extends ReduxComponent<Login.ScreenProps, Login.ReduxState> {
  public static readonly styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  public static readonly navigationOptions: NavigationScreenOptions = {
    title: 'Login Screen',
  };

  render() {
    return (
      <View style={ LoginScreen.styles.container }>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

export namespace Login {
  export interface ReduxStore {
    login: ReduxState;
  }

  export interface ReduxState {
  }

  export interface Props {
  }

  export interface ScreenProps extends ReduxComponent.ScreenProps<ReduxState>, Props {
  }
}

export const Login = connectToActions(
  (store: Login.ReduxStore) => ({ state: store.login }),
)(LoginScreen);
