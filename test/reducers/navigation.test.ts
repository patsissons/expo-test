import { NavigationAction, NavigationActions, NavigationState } from 'react-navigation';
import { router } from '../../src/navigation';
import { reducer } from '../../src/reducers/navigation';

jest.mock('../../src/navigation', () => ({
  router: {
    getStateForAction: jest.fn(),
  },
}));

const getStateForAction = router.getStateForAction as jest.Mock;
const state: NavigationState = { index: 0, routes: [] };
const action: NavigationAction = { type: NavigationActions.NAVIGATE, routeName: 'test' };
const expectedResult: NavigationState = { index: 1, routes: [] };

describe('reducers', () => {
  describe('navigation', () => {
    it('uses router.getStateForAction to reduce', () => {
      // Arrange
      getStateForAction.mockImplementation(() => expectedResult);

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).toBe(expectedResult);
      expect(router.getStateForAction).toHaveBeenCalledWith(action, state);
    });

    it('returns input state if there is no state for the provided action', () => {
      // Arrange
      getStateForAction.mockImplementation(() => undefined);

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).toBe(state);
    });

    it('defaults to a valid initial state', () => {
      // Arrange
      getStateForAction.mockImplementation(() => undefined);

      // Act
      const result = reducer(undefined, action);

      // Assert
      expect(router.getStateForAction).toHaveBeenCalledWith(action, result);
    });
  });
});
