import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';
import { Store, LoginState, ReduxComponent } from '../components';

class LoginScreen extends ReduxComponent<Login.ScreenProps, LoginState> {
  public static readonly styles = StyleSheet.create({
    container: {
    },
  });

  public static readonly navigationOptions: NavigationScreenOptions = {
    title: 'Login Screen',
  };

  public get styles() {
    return LoginScreen.styles;
  }

  render() {
    return (
      <View style={ [ this.defaultStyles.element, this.defaultStyles.container, this.styles.container ] }>
        <Text>Login Screen</Text>
      </View>
    );
  }
}

export namespace Login {
  export interface Props {
  }

  export interface ScreenProps extends ReduxComponent.ScreenProps<LoginState>, Props {
  }
}

export const Login = ReduxComponent.connect(
  (store: Store) => ({ state: store.login }),
)(LoginScreen);
