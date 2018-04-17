import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension'
import '../types';
import { reducers } from './reducers';
import { epics } from './epics';
import { AppNavigator, reactNavigationMiddleware } from './navigation/AppNavigator';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      createEpicMiddleware(epics as any),
      reactNavigationMiddleware,
    ),
  ),
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
