import React from 'react';
import { View, Button } from 'react-native';
import { MainState, AppComponent, withState } from '../components';
import { Demo } from '../components/demo/Demo';

class MainScreen extends AppComponent<Main.ScreenProps, MainState> {
  public static navigationOptions(params: AppComponent.ContextNavigationScreenProps) {
    return {
      title: params.screenProps.context.localization.MainScreen,
    };
  }

  render() {
    return (
      <View style={ this.S.common.container }>
        <Button title={ this.L.Login } onPress={ this.handleLogin.bind(this) }>{ this.L.Login }</Button>
        <Demo />
      </View>
    );
  }

  protected handleLogin() {
    this.props.actions.navigation.toLogin();
  }
}

export namespace Main {
  export interface Props {
  }

  export interface ScreenProps extends AppComponent.ScreenProps<MainState>, Props {
  }
}

export const Main = withState(
  MainScreen,
  x => x.main,
);
