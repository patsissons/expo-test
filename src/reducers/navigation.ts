import { NavigationAction, NavigationActions, NavigationState } from 'react-navigation';
import { router } from '../navigation';

const initialState: NavigationState = router.getStateForAction(
  NavigationActions.init(),
);

export function reducer(state = initialState, action: NavigationAction): NavigationState {
  return router.getStateForAction(action, state) || state;
}
