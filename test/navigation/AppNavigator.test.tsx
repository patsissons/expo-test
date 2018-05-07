import React from 'react';
import { shallow } from 'enzyme';
import configureStore, { MockStore } from 'redux-mock-store';
import { NavigationState, NavigationActions, NavigationScreenProp } from 'react-navigation';
import { Store } from '../../src/framework';
import { router, AppNavigator } from '../../src/navigation';

const defaultState: NavigationState = router.getStateForAction(
  NavigationActions.init(),
);

function createStoreProps(navigation?: NavigationState) {
  navigation = navigation || defaultState;

  const mockStore = configureStore<Partial<Store>>();

  return { store: mockStore({ navigation }) };
}

function getStateFromStore(store: MockStore<Partial<Store>>): NavigationState {
  const state = store.getState();

  return state == null || state.navigation == null ?
    defaultState :
    state.navigation;
}

function purgeRouteKeys(state: NavigationState) {
  state.routes.forEach(x => { delete x.key; });
}

describe('navigation', () => {
  describe('AppNavigator', () => {
    describe('router', () => {
      it('is a navigation router', () => {
        expect(router).toBeTruthy();
        expect(router.getStateForAction).toBeTruthy();
        expect(typeof router.getStateForAction).toBe('function');
      });
    });

    describe('AppNavigator', () => {
      it('renders without crashing', () => {
        // Arrange
        const storeProps = createStoreProps();
        const state = getStateFromStore(storeProps.store);
        const component = (<AppNavigator { ...storeProps as any } />);
        purgeRouteKeys(state);

        // Act
        const result = shallow(component).dive();

        // Assert
        expect(result).toMatchSnapshot();
      });

      it('supports redux navigation', () => {
        // Arrange
        const storeProps = createStoreProps();
        const state = getStateFromStore(storeProps.store);
        const component = (<AppNavigator { ...storeProps as any } />);

        // Act
        const result = shallow(component).dive();
        const navigation = result.prop<NavigationScreenProp<NavigationState>>('navigation');

        // Assert
        expect(navigation).toBeTruthy();
        expect(navigation.state).toBe(state);
        expect(navigation.dispatch).toBe(storeProps.store.dispatch);
      });
    });
  });
});
