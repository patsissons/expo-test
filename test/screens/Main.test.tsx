import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-native';
import { createStoreProps } from '../storeUtils';
import { Store, actionTypes } from '../../src/components';
import { Main } from '../../src/screens/Main';

const defaultState: Partial<Store> = {
  main: {
    demo: {
      count: 0,
    },
  },
};

describe('screens', () => {
  describe('Main', () => {
    it('renders without crashing', () => {
      // Arrange
      const storeProps = createStoreProps(defaultState);
      const component = (<Main { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot();
    });

    it('navigates to login after pressing the button', () => {
      // Arrange
      const storeProps = createStoreProps(defaultState);
      const component = (<Main { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();
      result.find(Button).simulate('press');

      // Assert
      expect(storeProps.store.getActions()).toEqual([{ type: actionTypes.navigation.NavigationToLogin }]);
    });
  });
});
