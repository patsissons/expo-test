import React from 'react';
import '../types';
import { AppNavigator } from './navigators/AppNavigator';

export class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
