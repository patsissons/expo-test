import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ActionProps, connectToActions } from './actions';
import { env } from '../utils';

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
  protected static readonly env = env;
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

  protected get env() {
    return ReduxComponent.env;
  }

  protected get defaultStyles() {
    return ReduxComponent.defaultStyles;
  }

  protected get actions() {
    return this.props.actions!;
  }
}
