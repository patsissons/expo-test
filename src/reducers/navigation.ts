import { NavigationAction, NavigationActions } from 'react-navigation';
import { Navigator } from '../navigation/AppNavigator';

const initialState = Navigator.router.getStateForAction(
  NavigationActions.init(),
);

export function reducer(state = initialState, action: NavigationAction) {
  return Navigator.router.getStateForAction(action, state) || state;
}
