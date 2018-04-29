import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-native';
import configureStore, { MockStore } from 'redux-mock-store';
import { Store, DemoState, actionTypes } from '../../../src/components';
import { Demo } from '../../../src/components/demo/Demo';

const defaultState: DemoState = {
  count: 0,
};

function createStoreProps(state?: DemoState) {
  state = state || defaultState;

  const mockStore = configureStore<Partial<Store>>();

  return { store: mockStore({ main: { demo: state } }) };
}

function getStateFromStore(store: MockStore<Partial<Store>>): DemoState {
  const state = store.getState();

  return state == null || state.main == null || state.main.demo == null ?
    defaultState :
    state.main.demo;
}

describe('components', () => {
  describe('Demo', () => {
    it('renders without crashing', () => {
      // Arrange
      const storeProps = createStoreProps();
      const component = (<Demo { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot();
    });

    it('renders a custom header', () => {
      // Arrange
      const header = 'test';
      const storeProps = createStoreProps();
      const state = getStateFromStore(storeProps.store);
      const component = (<Demo { ...storeProps as any } header={ header } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result
        .find({ testID: 'state' })
        .children()
        .text(),
      ).toMatch(new RegExp(`^${ header }${ state.count }$`));
    });

    it('renders a custom count state', () => {
      // Arrange
      const storeProps = createStoreProps({ count: 123 });
      const state = getStateFromStore(storeProps.store);
      const component = (<Demo { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result
        .find({ testID: 'state' })
        .children()
        .text(),
      ).toMatch(new RegExp(`${ state.count }$`));
    });

    it('invokes the increment action after pushing the button', () => {
      // Arrange
      const storeProps = createStoreProps();
      const component = (<Demo { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();
      result.find(Button).simulate('press');

      // Assert
      expect(storeProps.store.getActions()).toEqual([{ type: actionTypes.demo.DemoIncrement }]);
    });
  });
});
