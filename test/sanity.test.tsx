import React from 'react';
import { shallow } from 'enzyme';

describe('enzyme', () => {
  it('can create rendered output', () => {
    // Arrange
    const component = (<div />);

    // Act
    const result = shallow(component);

    // Assert
    expect(result).toBeTruthy();
  });

  it('can query rendered output', () => {
    // Arrange
    const text = 'foo';
    const component = (<div>{ text }</div>);

    // Act
    const result = shallow(component);

    // Assert
    expect(result
      .children()
      .text(),
    ).toEqual(text);
  });

  it('can match a snapshot', () => {
    // Arrange
    const component = (<div />);

    // Act
    const result = shallow(component);

    // Assert
    expect(result).toMatchSnapshot();
  });
});
