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

  // it('binds to the redux store', () => {
  //   // Arrange
  //   const component = (<App />);

  //   // Act
  //   const result = shallow(component);
  //   const store = result.prop('store');

  //   // Assert
  //   expect(store).toBeTruthy();
  // });
});
