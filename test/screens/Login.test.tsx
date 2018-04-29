import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Store, LoginState } from '../../src/components';
import { Login } from '../../src/screens/Login';

const defaultState: LoginState = {
};

function createStoreProps(state?: LoginState) {
  state = state || defaultState;

  const mockStore = configureStore<Partial<Store>>();

  return { store: mockStore({ login: state }) };
}

describe('screens', () => {
  describe('Main', () => {
    it('renders without crashing', () => {
      // Arrange
      const storeProps = createStoreProps();
      const component = (<Login { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot();
    });
  });
});
