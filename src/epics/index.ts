import 'rxjs';
import { combineEpics } from 'redux-observable';
import { navigate } from './navigation';

export const epics = combineEpics(
  navigate,
);
