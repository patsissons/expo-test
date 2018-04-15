import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-native';
import { DemoView } from '../../../src/components/demo/DemoView';

describe('DemoView', () => {
  it('renders without crashing', () => {
    // Arrange
    const component = (<DemoView />);

    // Act
    const result = shallow(component);

    // Assert
    expect(result).toMatchSnapshot();
    expect(result.state()).toEqual({ count: 0 });
  });

  it('supports injecting custom initial count', () => {
    // Arrange
    const initialCount = 123;
    const component = (<DemoView initialCount={ initialCount } />);

    // Act
    const result = shallow(component);

    // Assert
    expect(result.state()).toEqual({ count: initialCount });
  });

  it('renders the count state', () => {
    // Arrange
    const initialCount = 123;
    const component = (<DemoView initialCount={ initialCount } />);

    // Act
    const result = shallow(component);

    // Assert
    expect(result
      .find({ testID: 'state' })
      .children()
      .text(),
    ).toMatch(new RegExp(`${ initialCount }$`));
  });

  it('increments the count state after pushing the button', () => {
    // Arrange
    const component = (<DemoView />);

    // Act
    const result = shallow(component);
    result.find(Button).simulate('press');

    // Assert
    expect(result.state()).toEqual({ count: 1 });
  });

  it('renders the updated count state', () => {
    // Arrange
    const component = (<DemoView />);

    // Act
    const result = shallow(component);
    result.find(Button).simulate('press');

    // Assert
    expect(result
      .find({ testID: 'state' })
      .children()
      .text(),
    ).toMatch(/1$/);
  });
});
