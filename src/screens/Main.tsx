import React from 'react';
import { View, Button } from 'react-native';
import { MainState, AppComponent, withState } from '../framework';
import { Demo } from '../components';

class MainScreen extends AppComponent<Main.ScreenProps, MainState> {
  // istanbul ignore next navigation options
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

  export interface ScreenProps extends AppComponent.Props<MainState>, Props {
  }
}

export const Main = withState(
  MainScreen,
  x => x.main,
);
