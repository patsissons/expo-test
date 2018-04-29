import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-native';
import configureStore from 'redux-mock-store';
import { Store, MainState, actionTypes } from '../../src/components';
import { Main } from '../../src/screens/Main';

const defaultState: MainState = {
  demo: {
    count: 0,
  },
};

function createStoreProps(state?: MainState) {
  state = state || defaultState;

  const mockStore = configureStore<Partial<Store>>();

  return { store: mockStore({ main: state }) };
}

describe('screens', () => {
  describe('Main', () => {
    it('renders without crashing', () => {
      // Arrange
      const storeProps = createStoreProps();
      const component = (<Main { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot();
    });

    it('navigates to login after pressing the button', () => {
      // Arrange
      const storeProps = createStoreProps();
      const component = (<Main { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();
      result.find(Button).simulate('press');

      // Assert
      expect(storeProps.store.getActions()).toEqual([{ type: actionTypes.navigation.NavigationToLogin }]);
    });
  });
});
