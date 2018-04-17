import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation';
import { DemoView } from '../components/demo/DemoView';

export namespace MainScreen {
  export interface Props {
  }

  export interface ScreenProps extends NavigationScreenProps<MainScreen.Props> {
  }
}

export class MainScreen extends React.Component<MainScreen.ScreenProps> {
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
        <DemoView />
      </View>
    );
  }
}
