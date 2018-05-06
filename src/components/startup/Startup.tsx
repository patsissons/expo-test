import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Store, AppComponent, withStore } from '..';

export namespace Startup {
  export interface Props {
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

class StartupComponent extends AppComponent<Startup.ComponentProps, Store> {
  static defaultProps: Partial<Startup.ComponentProps> = {
    size: 'large',
  };

  componentDidMount() {
    this.props.actions.context.loadEnv();
    this.props.actions.context.loadLocale();
  }

  render() {
    if (this.isLoading) {
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

  protected get isLoading() {
    return [
      this.props.context == null,
      this.props.context.env == null,
      this.props.context.locale == null,
      this.props.context.localization == null,
    ].some(x => x);
  }
}

export const Startup = withStore(
  StartupComponent,
);
