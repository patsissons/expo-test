import { ActionsObservable } from 'redux-observable';
import { NavigationActions, NavigationParams } from 'react-navigation';
import { NavigationRequestAction, getMemberNameList, actionTypes } from '../navigation/actions';
import { RouteNames, routes } from '../navigation/routes';

function navigateTo(routeName: RouteNames, params?: NavigationParams) {
  return NavigationActions.navigate({ routeName, params })
}

function mapToAction(action: NavigationRequestAction) {
  switch (action.type) {
    case actionTypes.navigation.NavigateBack:
      return NavigationActions.back(action.params);
    case actionTypes.navigation.NavigateToMain:
      return navigateTo(routes.app.names.Main, action.params);
    case actionTypes.navigation.NavigateToLogin:
      return navigateTo(routes.app.names.Login, action.params);
  }

  throw new Error(`Invalid Navigation Action Type: ${ action.type }`);
}

export function navigate(actions: ActionsObservable<NavigationRequestAction>) {
  return actions
    .ofType(...getMemberNameList(actionTypes.navigation))
    .map(x => mapToAction(x));
}
