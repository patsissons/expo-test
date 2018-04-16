import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../src/App';

describe('App', () => {
  it('renders without crashing', () => {
    // Arrange
    const component = (<App />);

    // Act
    const result = shallow(component);

    // Assert
    expect(result).toMatchSnapshot();
  });
});
