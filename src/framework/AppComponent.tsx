import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ReduxProvider } from './context';
import * as styles from './styles';
import * as renderHelpers from './renderHelpers';
import { ContextState } from './state';

export namespace AppComponent {
  export interface Props<TState> extends ReduxProvider.ComponentProps<TState> {
  }

  export interface ContextProps {
    context: ContextState;
  }

  export interface ContextNavigationScreenProps<P = {}, O = {}> extends NavigationScreenProps<P, O> {
    screenProps: ContextProps;
  }
}

export abstract class AppComponent<P extends AppComponent.Props<TState>, TState, S = {}, SS = any> extends React.Component<P, S, SS> {
  constructor(props: P) {
    super(props);

    this.state = {} as S;
  }

  protected get L() {
    return this.props.context.localization;
  }

  protected get R() {
    return renderHelpers;
  }

  protected get S() {
    return styles;
  }
}
