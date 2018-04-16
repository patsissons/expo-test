import React from 'react';
import { shallow } from 'enzyme';

describe('jest', () => {
  it('can assert', () => {
    // Arrange

    // Act

    // Assert
    expect(true).toBe(true);
  });

  it('can create mock functions', () => {
    // Arrange
    const arg = 'test';
    const mock = jest.fn();
    let mockCalled = false;
    const dynamicMock = jest.fn(() => { mockCalled = true; });

    // Act
    mock(arg);
    dynamicMock();

    // Assert
    expect(mock).toHaveBeenCalledWith(arg);
    expect(mockCalled).toBe(true);
  });

  it('can create spys', () => {
    // Arrange
    const arg = 'test';
    const item = {
      test: (x: string) => x,
    };
    const mock = jest.spyOn(item, 'test');

    // Act
    item.test(arg);

    // Assert
    expect(mock).toHaveBeenCalledWith(arg);
  });
});

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

  it('can spy on setState', () => {
    // Arrange
    const newState = { foo: 'bar' };
    class Test extends React.Component {
      state = {
        foo: 'foo',
      };

      render() {
        return (<div onClick={ this.handleClick.bind(this) } />);
      }

      handleClick() {
        this.setState(newState);
      }
    }
    const component = (<Test />);

    // Act
    const result = shallow(component);
    const mock = jest.spyOn(result.instance(), 'setState');
    result.simulate('click');

    // Assert
    expect(mock).toHaveBeenCalledWith(newState);
  });
});
