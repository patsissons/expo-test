import 'rxjs';
import { NavigationActions } from 'react-navigation';
import { ActionsObservable } from 'redux-observable';
import { getRequestAction, actionTypes } from '../../src/framework';
import { routes } from '../../src/navigation';
import { navigate } from '../../src/epics/navigation';

function testNavigationAction(actionType: string, expected: any, payload?: any) {
  const payloadName = payload ?
    JSON.stringify(payload, undefined, 2).replace(/[\r\n]/g, ' ').replace(/ {2,}/g, ' ') :
    'no payload';
  it(`handles ${ actionType } action with ${ payloadName }`, async () => {
    const action = getRequestAction(actionType, payload);

    const result = await navigate(ActionsObservable.of(action)).toPromise();

    expect(result).toBeTruthy();
    expect(result).toEqual(expected);
  });
}

describe('epics', () => {
  describe('navigation', () => {
    testNavigationAction(actionTypes.navigation.NavigationBack, { type: NavigationActions.BACK });
    testNavigationAction(actionTypes.navigation.NavigationBack, { type: NavigationActions.BACK, key: 'foo' }, { key: 'foo' });
    testNavigationAction(actionTypes.navigation.NavigationToMain, { type: NavigationActions.NAVIGATE, routeName: routes.app.names.Main });
    testNavigationAction(actionTypes.navigation.NavigationToMain, { type: NavigationActions.NAVIGATE, routeName: routes.app.names.Main, params: { test: 'foo' } }, { test: 'foo' });
    testNavigationAction(actionTypes.navigation.NavigationToLogin, { type: NavigationActions.NAVIGATE, routeName: routes.app.names.Login });
    testNavigationAction(actionTypes.navigation.NavigationToLogin, { type: NavigationActions.NAVIGATE, routeName: routes.app.names.Login, params: { test: 'foo' } }, { test: 'foo' });
  });
});
