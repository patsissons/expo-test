import React from 'react';
import '../types';
import { DemoView } from './components/demo/DemoView';

export class App extends React.Component {
  render() {
    return (
      <DemoView initialCount={ 10 } />
    );
  }
}
