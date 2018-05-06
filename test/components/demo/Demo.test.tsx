import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-native';
import { createStoreProps } from '../../storeUtils';
import { Store, actionTypes } from '../../../src/components';
import { Demo } from '../../../src/components/demo/Demo';

const defaultState: Partial<Store> = {
  main: {
    demo: {
      count: 0,
    },
  },
};

describe('components', () => {
  describe('Demo', () => {
    it('renders without crashing', () => {
      // Arrange
      const storeProps = createStoreProps(defaultState);
      const component = (<Demo { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot();
    });

    it('renders a custom header', () => {
      // Arrange
      const header = 'test';
      const storeProps = createStoreProps(defaultState);
      const state = storeProps.store.getState();
      const component = (<Demo { ...storeProps as any } header={ header } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result
        .find({ testID: 'state' })
        .children()
        .text(),
      ).toMatch(new RegExp(`^${ header } ${ state.main!.demo.count }$`));
    });

    it('renders a custom count state', () => {
      // Arrange
      const initialState = {
        main: {
          demo: {
            count: 123,
          },
        },
      };
      const storeProps = createStoreProps(initialState);
      const state = storeProps.store.getState();
      const component = (<Demo { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result
        .find({ testID: 'state' })
        .children()
        .text(),
      ).toMatch(new RegExp(`${ state.main!.demo.count }$`));
    });

    it('invokes the increment action after pushing the button', () => {
      // Arrange
      const storeProps = createStoreProps(defaultState);
      const component = (<Demo { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();
      result.find(Button).simulate('press');

      // Assert
      expect(storeProps.store.getActions()).toEqual([{ type: actionTypes.demo.DemoIncrement }]);
    });
  });
});
