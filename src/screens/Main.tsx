import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';
import { Store, MainState, ReduxComponent } from '../components';
import { Demo } from '../components/demo/Demo';

class MainScreen extends ReduxComponent<Main.ScreenProps, MainState> {
  public static readonly styles = StyleSheet.create({
    container: {
    },
  });

  public static readonly navigationOptions: NavigationScreenOptions = {
    title: 'Main Screen',
  };

  public get styles() {
    return MainScreen.styles;
  }

  render() {
    return (
      <View style={ [ this.defaultStyles.element, this.defaultStyles.container, this.styles.container ] }>
        <Button title='Login' onPress={ this.handleLogin.bind(this) }>Login</Button>
        <Demo />
      </View>
    );
  }

  protected handleLogin() {
    this.actions.navigation.toLogin();
  }
}

export namespace Main {
  export interface Props {
  }

  export interface ScreenProps extends ReduxComponent.ScreenProps<MainState>, Props {
  }
}

export const Main = ReduxComponent.connect(
  (store: Store) => ({ state: store.main }),
)(MainScreen);
