import React from 'react';
import { create } from 'react-test-renderer';
import { DemoView } from '../../../src/components/demo/DemoView';

describe('DemoView', () => {
  it('renders without crashing', () => {
    // Arrange
    const component = (<DemoView />);

    // Act
    const result = create(component).toJSON();

    // Assert
    expect(result).toMatchSnapshot();
  });

  it('supports injecting custom initial count', () => {
    // Arrange
    const initialCount = 123;
    const app = (<DemoView initialCount={ initialCount } />);

    // Act
    const result = create(app).root;
    const state = result.findByProps({ testID: 'state' }).props.children;

    // Assert
    expect(result.props).toEqual({ initialCount });
    expect(state).toMatch(`${ initialCount }`);
  });
});
