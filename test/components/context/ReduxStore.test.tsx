import React from 'react';
import { shallow } from 'enzyme';
import * as redux from 'redux';
import { ReduxProvider } from '../../../src/framework/context/ReduxStore';
import {  } from 'redux-devtools-extension';

const applyMiddleware = redux.applyMiddleware as jest.Mock;
const createStore = redux.createStore as jest.Mock;

jest.mock('redux', () => {
  const store = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
  };

  return {
    applyMiddleware: jest.fn(() => ({})),
    createStore: jest.fn(() => store),
  };
});

describe('components', () => {
  describe('context', () => {
    describe('ReduxProvider', () => {
      it('renders without crashing', () => {
        // Arrange
        const props = {
          reducers: {},
          epicMiddleware: {},
          reactNavigationMiddleware: {},
        };
        const component = (<ReduxProvider { ...props as any }><div /></ReduxProvider>);

        // Act
        const result = shallow(component);

        // Assert
        expect(result).toMatchSnapshot();
      });

      it('injects a redux store', () => {
        // Arrange
        const middleware = {};
        const store = createStore();
        const props = {
          reducers: {},
          epicMiddleware: {},
          reactNavigationMiddleware: {},
        };
        applyMiddleware.mockImplementation(() => middleware);
        createStore.mockImplementation(() => store);
        const component = (<ReduxProvider { ...props as any }><div /></ReduxProvider>);

        // Act
        const result = shallow(component);

        // Assert
        expect(applyMiddleware).toHaveBeenCalledWith(props.epicMiddleware, props.reactNavigationMiddleware);
        expect(createStore).toHaveBeenCalledWith(props.reducers, middleware);
        expect(result.prop('store')).toBe(store);
      });
    });
  });
});
