import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Store, DemoState, ReduxComponent } from '..';

class DemoComponent extends ReduxComponent<Demo.ComponentProps, DemoState> {
  public static readonly styles = StyleSheet.create({
    container: {
    },
  });

  static defaultProps = {
    header: 'Current State is ',
  };

  public get styles() {
    return DemoComponent.styles;
  }

  render() {
    return (
      <View style={ [ this.defaultStyles.element, this.defaultStyles.container, this.styles.container ] }>
        <Text testID='state'>{ `${ this.props.header! }${ this.props.state.count || 0 }` }</Text>
        <Button title='increment' onPress={ this.handleIncrement.bind(this) }>
          Increment Count
        </Button>
      </View>
    );
  }

  protected handleIncrement() {
    this.actions.demo.increment();
  }
}

export namespace Demo {
  export interface Props {
    header?: string;
  }

  export interface ComponentProps extends ReduxComponent.Props<DemoState>, Props {
  }
}

export const Demo = ReduxComponent.connect(
  (store: Store) => ({ state: store.main.demo }),
)(DemoComponent);
