import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { NavigationActions, NavigationParams, NavigationBackAction, NavigationNavigateAction } from 'react-navigation';
import { getTypeNames } from '../utils';
import { RequestAction, actionTypes } from '../framework';
import { RouteNames, routes } from '../navigation';

function navigateTo(routeName: RouteNames, params?: NavigationParams) {
  return NavigationActions.navigate({ routeName, params });
}

function mapActionToRouteName(action: RequestAction<NavigationParams>) {
  switch (action.type) {
    case actionTypes.navigation.NavigationToMain:
      return routes.app.names.Main;
    case actionTypes.navigation.NavigationToLogin:
      return routes.app.names.Login;

    // istanbul ignore next impossible code path
    default:
      // it should not be possible to reach this point unless you have
      // forgotten to add a mapping case for a newly created action type
      throw new Error(`Invalid Navigation Action Type: ${ action.type }`);
  }
}

function mapToAction(action: RequestAction<NavigationParams>) {
  switch (action.type) {
    case actionTypes.navigation.NavigationBack:
      return NavigationActions.back(action.payload);
    default:
      return navigateTo(mapActionToRouteName(action), action.payload);
  }
}

export function navigate(actions: ActionsObservable<RequestAction>): Observable<NavigationBackAction | NavigationNavigateAction> {
  return actions
    .ofType(...getTypeNames(actionTypes.navigation))
    .map(x => mapToAction(x));
}
