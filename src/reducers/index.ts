import { combineReducers } from 'redux';
import { Store } from '../components';
import * as context from './context';
import * as navigation from './navigation';
import * as demo from './demo';

export const reducers = combineReducers<Store>({
  context: context.reducer,
  navigation: navigation.reducer,
  main: combineReducers({
    demo: demo.reducer,
  }),
});
