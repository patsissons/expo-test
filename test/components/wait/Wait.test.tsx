import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import { createStoreProps } from '../../storeUtils';
import { Wait } from '../../../src/components/wait/Wait';

describe('components', () => {
  describe('Wait', () => {
    it('renders loading mode without crashing', () => {
      // Arrange
      const storeProps = createStoreProps({});
      const component = (<Wait { ...storeProps as any } isWaiting={ () => true } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot('loading');
    });

    it('renders loaded mode without crashing', () => {
      // Arrange
      const storeProps = createStoreProps({});
      const component = (
        <Wait { ...storeProps as any } isWaiting={ () => false }>
          <div>test</div>
        </Wait>
      );

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result).toMatchSnapshot('loading');
    });

    it('renders loading mode with custom content', () => {
      // Arrange
      const storeProps = createStoreProps({ context: {} });
      const content = (<Text testID='custom'>test</Text>);
      const component = (<Wait { ...storeProps as any } isWaiting={ () => true } activityIndicator={ content } />);

      // Act
      const result = shallow(component).dive();

      // Assert
      expect(result
        .find({ testID: 'custom' })
        .children()
        .text(),
      ).toBe('test');
    });

    it('renders loading mode with custom content', () => {
      const storeProps = createStoreProps({});
      const init = jest.fn();
      const component = (<Wait { ...storeProps as any } isWaiting={ () => true } init={ init } />);

      // Act
      shallow(component).dive();

      // Assert
      expect(init).toHaveBeenCalled();
    });
  });
});
