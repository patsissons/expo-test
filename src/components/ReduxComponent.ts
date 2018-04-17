import React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { ActionProps, mapDispatchToActions } from '../navigation/actions';

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
}

export { mapDispatchToActions };

export function connectToActions<Store, State>(
  mapStateToProps: (store: Store) => ReduxComponent.StateProps<State>,
) {
  return connect(mapStateToProps, mapDispatchToActions);
}
