import { KeepAwake, registerRootComponent } from 'expo';
import { App } from './src/App';

if (typeof __DEV__ === 'undefined') {
  __DEV__ = false;
}

if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(App);
