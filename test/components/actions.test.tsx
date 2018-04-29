import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore, { MockStore } from 'redux-mock-store';
import { Actions, actionTypes, connectToActions } from '../../src/components';

function createConnectedComponent(store: MockStore<any>) {
  const Component = connectToActions((state: any) => ({ state }))(() => null);
  return (<Component { ...{ store } } />);
}

describe('components', () => {
  describe('actions', () => {
    // describe('mapDispatchToActions', () => {
    //   it('binds dispatch to action set', () => {
    //     const dispatch = jest.fn();
    //     const bindActionCreators = jest.spyOn(redux, 'bindActionCreators');

    //     const result = actions.mapDispatchToActions(dispatch);
    //     result.actions!.navigation.goBack();

    //     expect(result.actions).toBeTruthy();
    //     expect(bindActionCreators).toHaveBeenCalled();
    //     expect(dispatch).toHaveBeenCalled();
    //   });
    // });
    describe('connectToActions', () => {
      it('connects a component to actions via props', () => {
        // Arrange
        const store = configureStore()({});
        const component = createConnectedComponent(store);

        // Act
        const result = shallow(component);
        const props = result.props();
        const actions: Actions = props.actions;

        // Assert
        expect(props).toBeTruthy();
        expect(actions).toBeTruthy();
      });
    });

    describe('actionTypes', () => {
      it('contains names of actions available', () => {
        // Assert
        expect(actionTypes).toBeTruthy();
        expect(Object.keys(actionTypes).length).toBeGreaterThan(0);
      });
    });

    it('can create valid request actions', () => {
      // Arrange
      const payload: any = { payload: 'test' };
      const store = configureStore()({});
      const component = createConnectedComponent(store);
      const result = shallow(component);
      const actions: Actions = result.prop('actions');

      // Act
      actions.navigation.goBack(payload);
      actions.navigation.toMain(payload);
      actions.navigation.toLogin(payload);
      actions.demo.increment(payload);
      actions.demo.decrement(payload);

      // Assert
      expect(store.getActions()).toEqual([
        { type: actionTypes.navigation.NavigationBack, payload },
        { type: actionTypes.navigation.NavigationToMain, payload },
        { type: actionTypes.navigation.NavigationToLogin, payload },
        { type: actionTypes.demo.DemoIncrement, payload },
        { type: actionTypes.demo.DemoDecrement, payload },
      ]);
    });
  });
});
