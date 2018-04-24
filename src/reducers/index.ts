import { combineReducers } from 'redux';
import { Store } from '../components';
import * as navigation from './navigation';
import * as demo from './demo';

export const reducers = combineReducers<Store>({
  navigation: navigation.reducer,
  main: combineReducers({
    demo: demo.reducer,
  }),
});
