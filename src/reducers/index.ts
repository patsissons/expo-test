import { combineReducers } from 'redux';
import * as navigation from './navigation';
import * as demo from './demo';

export const reducers = combineReducers({
  navigation: navigation.reducer,
  main: combineReducers({
    demo: demo.reducer,
  }),
});
