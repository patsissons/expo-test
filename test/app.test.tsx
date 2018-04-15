import React from 'react';
import { create } from 'react-test-renderer';
import { App } from '../src/App';

describe('App', () => {
  it('renders without crashing', () => {
    // Arrange
    const component = (<App />);

    // Act
    const result = create(component).toJSON();

    // Assert
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
  });
});
