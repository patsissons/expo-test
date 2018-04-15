import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export namespace DemoView {
  export interface Props {
    initialCount?: number;
  }

  export interface State {
    count: number;
  }
}

export class DemoView extends React.Component<DemoView.Props, DemoView.State> {
  public static readonly styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  state = {
    count: this.props.initialCount || 0,
  };

  render() {
    return (
      <View style={ DemoView.styles.container }>
        <Text>Open up App.ts to start working on your app!!!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Push the button to change the component state.</Text>
        <Text testID='state'>{ `Current State is ${ this.state.count }` }</Text>
        <Button title='increment' onPress={ this.handleIncrement.bind(this) }>
          Increment Count
        </Button>
      </View>
    );
  }

  protected handleIncrement() {
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1,
      };
    });
  }
}
