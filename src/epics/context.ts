import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { DangerZone } from 'expo';
import { RequestAction, actionTypes, getRequestAction, LocalePayload } from '../framework';

export function loadLocale(actions: ActionsObservable<RequestAction>): Observable<RequestAction<LocalePayload>> {
  return actions
    .ofType(actionTypes.context.LoadLocale)
    .flatMap(() => Observable.from(DangerZone.Localization.getCurrentLocaleAsync()))
    .map(locale => getRequestAction(actionTypes.context.LoadLocalization, { locale }));
}
