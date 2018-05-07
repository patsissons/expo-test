import 'rxjs';
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { Store } from '../framework';
import { loadLocale } from './context';
import { navigate } from './navigation';

export const epics: Epic<Action, Store> = combineEpics(
  loadLocale,
  navigate,
);
