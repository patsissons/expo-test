import { DemoState, RequestAction, DemoPayload, actionTypes } from '../../src/framework';
import { reducer } from '../../src/reducers/demo';

const state: DemoState = { count: 0 };

describe('reducers', () => {
  describe('demo', () => {
    it('ignores unknown action types', () => {
      // Arrange
      const action: RequestAction<DemoPayload> = { type: 'invalid' };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).toBe(state);
    });

    it('can increment the count', () => {
      // Arrange
      const action: RequestAction<DemoPayload> = { type: actionTypes.demo.DemoIncrement, payload: { amount: 2 } };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).not.toBe(state);
      expect(result).toEqual({ count: state.count + action.payload!.amount });
    });

    it('can decrement the count', () => {
      // Arrange
      const action: RequestAction<DemoPayload> = { type: actionTypes.demo.DemoDecrement, payload: { amount: 2 } };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).not.toBe(state);
      expect(result).toEqual({ count: state.count - action.payload!.amount });
    });

    it('uses a default amount of 1 when payload is absent', () => {
      // Arrange
      const action: RequestAction<DemoPayload> = { type: actionTypes.demo.DemoIncrement };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).not.toBe(state);
      expect(result).toEqual({ count: state.count + 1 });
    });

    it('uses a default amount of 1 when payload is invalid', () => {
      // Arrange
      const action: RequestAction<any> = { type: actionTypes.demo.DemoIncrement, payload: {} };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).not.toBe(state);
      expect(result).toEqual({ count: state.count + 1 });
    });
  });
});
