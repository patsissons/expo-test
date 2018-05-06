import React from 'react';
import { createEpicMiddleware } from 'redux-observable';
import '../types';
import { reducers } from './reducers';
import { epics } from './epics';
import { AppNavigator, reactNavigationMiddleware } from './navigation';
import { ReduxProvider, Startup } from './components';

export class App extends React.Component {
  render() {
    return (
      <ReduxProvider
        reducers={ reducers }
        epicMiddleware={ createEpicMiddleware(epics) }
        reactNavigationMiddleware={ reactNavigationMiddleware }
      >
        <Startup>
          <AppNavigator />
        </Startup>
      </ReduxProvider>
    );
  }
}
