import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ReduxComponent, connectToActions } from '../ReduxComponent';

class DemoComponent extends ReduxComponent<Demo.ComponentProps, Demo.ReduxState> {
  public static readonly styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  static defaultProps = {
    header: 'Current State is ',
  };

  render() {
    return (
      <View style={ DemoComponent.styles.container }>
        <Text testID='state'>{ `${ this.props.header! }${ this.props.state.count || 0 }` }</Text>
        <Button title='increment' onPress={ this.handleIncrement.bind(this) }>
          Increment Count
        </Button>
      </View>
    );
  }

  protected handleIncrement() {
    this.props.actions.demo.increment();
  }
}

export namespace Demo {
  export interface ReduxStore {
    main: {
      demo: ReduxState,
    };
  }

  export interface ReduxState {
    count: number;
  }

  export interface Props {
    header?: string;
  }

  export interface ComponentProps extends ReduxComponent.Props<ReduxState>, Props {
  }
}

export const Demo = connectToActions(
  (store: Demo.ReduxStore) => ({ state: store.main.demo }),
)(DemoComponent);
