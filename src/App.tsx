import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import '../types';
import { reducers } from './reducers';
import { epics } from './epics';
import { AppNavigator, reactNavigationMiddleware } from './navigation';

function createMiddleware() {
  const middleware = applyMiddleware(
    createEpicMiddleware(epics),
    reactNavigationMiddleware,
  );

  // istanbul ignore else impossible code path when testing
  if (__DEV__) {
    return composeWithDevTools(middleware);
  }

  // istanbul ignore next impossible code path when testing
  return middleware;
}

const store = createStore(
  reducers,
  createMiddleware(),
);

export class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppNavigator />
      </Provider>
    );
  }
}
