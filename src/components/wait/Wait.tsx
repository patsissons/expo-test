import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Store, AppComponent, withStore } from '../../framework';

export namespace Wait {
  export interface Props {
    isWaiting: (store: Store) => boolean;
    init?: Function;
    header?: any;
    activityIndicator?: any;
  }

  export interface ActivityIndicatorComponentProps {
    animating?: boolean;
    color?: string;
    hidesWhenStopped?: boolean;
    size?: number | 'small' | 'large';
  }

  export interface ComponentProps extends AppComponent.Props<Store>, ActivityIndicatorComponentProps, Props {
  }
}

class WaitComponent extends AppComponent<Wait.ComponentProps, Store> {
  static defaultProps: Partial<Wait.ComponentProps> = {
    size: 'large',
  };

  componentDidMount() {
    if (this.props.init) {
      this.props.init();
    }
  }

  render() {
    if (this.props.isWaiting(this.props.state)) {
      return (
        <View style={ this.S.common.container }>
          { this.R.coerceToText(this.props.header) }
          { this.renderActivityIndicator() }
        </View>
      );
    }

    return this.props.children;
  }

  protected renderActivityIndicator() {
    if (this.props.activityIndicator) {
      return this.props.activityIndicator;
    }

    const { animating, color, hidesWhenStopped, size } = this.props;

    return (
      <ActivityIndicator { ...{ animating, color, hidesWhenStopped, size } } />
    );
  }
}

export const Wait = withStore(
  WaitComponent,
);
