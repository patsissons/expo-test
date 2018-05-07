import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import { createStoreProps } from '../../storeUtils';
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

    it('renders loading mode with custom content', () => {
      // Arrange
      const storeProps = createStoreProps({ context: {} });
      const content = (<Text testID='custom'>test</Text>);
      const component = (<Startup { ...storeProps as any } activityIndicator={ content } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result
        .find({ testID: 'custom' })
        .children()
        .text(),
      ).toBe('test');
    });
  });
});
