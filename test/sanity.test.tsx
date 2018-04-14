import React from 'react';
import { create } from 'react-test-renderer';

describe('react-test-renderer', () => {
  it('can create render output', () => {
    // Arrange
    const component = (<div />);

    // Act
    const result = create(component);

    // Assert
    expect(result).toBeTruthy();
  });

  it('can create a json representation', () => {
    // Arrange
    const component = (<div />);

    // Act
    const result = create(component).toJSON();

    // Assert
    expect(result).toBeTruthy();
    expect(result).toEqual({ type: 'div', props: {}, children: null });
  });

  it('can create a test instance', () => {
    // Arrange
    const component = (<div />);

    // Act
    const result = create(component).root;

    // Assert
    expect(result).toBeTruthy();
    expect(result.type).toBe('div');
    expect(result.props).toEqual({});
    expect(result.children).toEqual([]);
  });

  it('can match a snapshot', () => {
    // Arrange
    const component = (<div />);

    // Act
    const result = create(component).toJSON();

    // Assert
    expect(result).toMatchSnapshot();
  });
});
