import * as React from 'react';
import { Reducer, Middleware, StoreEnhancer, createStore, applyMiddleware, Dispatch, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Store, ContextState } from '../state';
import { Actions, actions } from '../actions';
import { getTypeNames, isDebugEnvironment } from '../../utils';

export namespace ReduxProvider {
  export interface StateProps<T> {
    state: T;
  }

  export interface ActionProps {
    actions: Actions;
  }

  export interface ContextProps {
    context: ContextState;
  }

  export interface Props {
    reducers: Reducer<any>;
    epicMiddleware: Middleware;
    reactNavigationMiddleware: Middleware;
  }

  export interface ComponentProps<T> extends StateProps<T>, ActionProps, ContextProps {
  }
}

export class ReduxProvider extends React.Component<ReduxProvider.Props> {
  render() {
    const middleware = applyMiddleware(
      this.props.epicMiddleware,
      this.props.reactNavigationMiddleware,
    );

    let storeEnhancer: StoreEnhancer<any> = middleware;

    // istanbul ignore next impossible code path when testing
    if (isDebugEnvironment()) {
      storeEnhancer = composeWithDevTools(middleware);
    }

    const store = createStore(
      this.props.reducers,
      storeEnhancer,
    );

    return (
      <Provider store={ store }>
        { this.props.children }
      </Provider>
    );
  }
}

function mapDispatchToActions(dispatch: Dispatch<Store>): ReduxProvider.ActionProps {
  return {
    actions: getTypeNames(actions)
      .reduce(
        (map, actionName) => {
          map[actionName] = bindActionCreators(actions[actionName], dispatch);

          return map;
        },
        {} as any,
      ),
  };
}

function mapStateToProps<TState>(
  store: Store,
  stateSelector: (store: Store) => TState,
) {
  return {
    state: stateSelector(store),
    context: store.context,
  };
}

export function withState<T extends ReduxProvider.ComponentProps<TState>, TState>(
  Component: React.ComponentType<T>,
  stateSelector: (store: Store) => TState,
) {
  const connector = connect(
    (store: Store) => mapStateToProps(store, stateSelector),
    mapDispatchToActions,
  );

  return connector(Component);
}

export function withStore<T extends ReduxProvider.ComponentProps<Store>>(
  Component: React.ComponentType<T>,
) {
  return withState(Component, x => x);
}
