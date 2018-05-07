import React from 'react';
import { View, Text } from 'react-native';
import { LoginState, AppComponent, withState } from '../framework';

export namespace Login {
  export interface Props {
  }

  export interface ScreenProps extends AppComponent.ScreenProps<LoginState>, Props {
  }
}

class LoginScreen extends AppComponent<Login.ScreenProps, LoginState> {
  // istanbul ignore next navigation options
  public static navigationOptions(params: AppComponent.ContextNavigationScreenProps) {
    return {
      title: params.screenProps.context.localization.LoginScreen,
    };
  }

  render() {
    return (
      <View style={ this.S.common.container }>
        <Text>{ this.L.LoginScreen }</Text>
      </View>
    );
  }
}

export const Login = withState(
  LoginScreen,
  x => x.login,
);
