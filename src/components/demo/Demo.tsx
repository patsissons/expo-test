import React from 'react';
import { Text, View, Button } from 'react-native';
import { DemoState, AppComponent, withState } from '../../framework';

export namespace Demo {
  export interface Props {
    header?: string;
  }

  export interface ComponentProps extends AppComponent.Props<DemoState>, Props {
  }
}

class DemoComponent extends AppComponent<Demo.ComponentProps, DemoState> {
  render() {
    return (
      <View style={ this.S.common.container }>
        <Text testID='state'>{ `${ this.props.header || this.L.CurrentStateIs } ${ this.props.state.count || 0 }` }</Text>
        <Button title={ this.L.Increment } onPress={ this.handleIncrement.bind(this) }>
          { this.L.IncrementCount }
        </Button>
      </View>
    );
  }

  protected handleIncrement() {
    this.props.actions.demo.increment();
  }
}

export const Demo = withState(
  DemoComponent,
  x => x.main.demo,
);
