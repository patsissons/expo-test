import React from 'react';
import { shallow } from 'enzyme';
import { createStoreProps } from '../../storeUtils';
import { actionTypes } from '../../../src/framework';
import { Startup } from '../../../src/components/wait/Startup';

describe('components', () => {
  describe('Startup', () => {
    it('renders loading mode without crashing', () => {
      // Arrange
      const storeProps = createStoreProps({ context: {} });
      const component = (<Startup { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot('loading');
    });

    it('renders loaded mode without crashing', () => {
      // Arrange
      const loadedState = {
        context: {
          env: {},
          locale: 'test',
          localization: {},
        },
      };
      const storeProps = createStoreProps(loadedState);
      const component = (<Startup { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot('loading');
    });

    it('loads context on init', () => {
      // Arrange
      const storeProps = createStoreProps({});
      const component = (<Startup { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();
      const instance: any = result.instance();
      instance.init();

      // Assert
      expect(storeProps.store.getActions()).toContainEqual({ type: actionTypes.context.LoadEnv });
      expect(storeProps.store.getActions()).toContainEqual({ type: actionTypes.context.LoadLocale });
    });

    it('waits while context is not fully loaded', () => {
      // Arrange
      const storeProps = createStoreProps({});
      const store = storeProps.store.getState();
      const component = (<Startup { ...storeProps as any } />);

      // Act
      const result = shallow(component).dive();
      const instance: any = result.instance();
      store.context = {} as any;
      const unloaded = instance.isWaiting(store);
      store.context = {
        env: {},
        locale: 'test',
        localization: {},
      } as any;
      const loaded = instance.isWaiting(store);

      // Assert
      expect(unloaded).toBeTruthy();
      expect(loaded).toBeFalsy();
    });
  });
});
