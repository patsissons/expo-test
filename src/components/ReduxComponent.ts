import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ActionProps, connectToActions } from './actions';

export namespace ReduxComponent {
  export interface StateProps<T> {
    state: T;
  }

  export interface Props<T> extends StateProps<T>, ActionProps {
  }

  export interface ScreenProps<T> extends Props<T>, NavigationScreenProps {
  }
}

export abstract class ReduxComponent<P extends ReduxComponent.Props<RS>, RS, S = {}, SS = any> extends React.Component<P, S, SS> {
  public static readonly connect = connectToActions;

  public static readonly defaultStyles = StyleSheet.create({
    element: {
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  public get defaultStyles() {
    return ReduxComponent.defaultStyles;
  }

  public get actions() {
    return this.props.actions!;
  }
}
