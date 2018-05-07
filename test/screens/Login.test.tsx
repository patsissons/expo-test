import React from 'react';
import { shallow } from 'enzyme';
import { createStoreProps } from '../storeUtils';
import { Login } from '../../src/screens/Login';
import { Store } from '../../src/framework';

const defaultState: Partial<Store> = {
  login: {},
};

describe('screens', () => {
  describe('Main', () => {
    it.only('renders without crashing', () => {
      // Arrange
      const props = createStoreProps(defaultState);
      const component = (<Login { ...props as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot();
    });
  });
});
