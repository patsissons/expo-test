import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';
import { ReduxComponent, connectToActions } from '../components/ReduxComponent';
import { Demo } from '../components/demo/Demo';

class MainScreen extends ReduxComponent<Main.ScreenProps, Main.ReduxState> {
  public static readonly styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  public static readonly navigationOptions: NavigationScreenOptions = {
    title: 'Main Screen',
  };

  render() {
    return (
      <View style={ MainScreen.styles.container }>
        <Button title='Login' onPress={ this.handleLogin.bind(this) }>Login</Button>
        <Demo />
      </View>
    );
  }

  protected handleLogin() {
    this.props.actions.navigation.toLogin();
  }
}

export namespace Main {
  export interface ReduxStore {
    main: ReduxState;
  }

  export interface ReduxState {
    demo: Demo.ReduxState;
  }

  export interface Props {
  }

  export interface ScreenProps extends ReduxComponent.ScreenProps<ReduxState>, Props {
  }
}

export const Main = connectToActions(
  (store: Main.ReduxStore) => ({ state: store.main }),
)(MainScreen);
