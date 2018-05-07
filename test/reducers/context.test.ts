import { ContextState, RequestAction, LocalePayload, actionTypes } from '../../src/framework';
import { reducer } from '../../src/reducers/context';
import { getLocalization } from '../../src/locale';

const state: Partial<ContextState> = {};

jest.mock('../../src/locale', () => {
  return {
    getLocalization: jest.fn(() => ({})),
  };
});

describe('reducers', () => {
  describe('demo', () => {
    it('ignores unknown action types', () => {
      // Arrange
      const action: RequestAction<LocalePayload> = { type: 'invalid' };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).toBe(state);
    });

    it('can load env', () => {
      // Arrange
      const action: RequestAction<LocalePayload> = { type: actionTypes.context.LoadEnv };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).not.toBe(state);
      expect(result).toBeTruthy();
      expect(result.env).toBeTruthy();
    });

    it('can load localization', () => {
      // Arrange
      const action: RequestAction<LocalePayload> = { type: actionTypes.context.LoadLocalization, payload: { locale: 'test' } };

      // Act
      const result = reducer(state, action);

      // Assert
      expect(result).not.toBe(state);
      expect(result.locale).toBe('test');
      expect(result.localization).toBeTruthy();
      expect(getLocalization).toHaveBeenCalledWith('test');
    });

    // it('uses a default amount of 1 when payload is absent', () => {
    //   // Arrange
    //   const action: RequestAction<LocalePayload> = { type: actionTypes.demo.DemoIncrement };

    //   // Act
    //   const result = reducer(state, action);

    //   // Assert
    //   expect(result).not.toBe(state);
    //   expect(result).toEqual({ count: state.count + 1 });
    // });

    // it('uses a default amount of 1 when payload is invalid', () => {
    //   // Arrange
    //   const action: RequestAction<any> = { type: actionTypes.demo.DemoIncrement, payload: {} };

    //   // Act
    //   const result = reducer(state, action);

    //   // Assert
    //   expect(result).not.toBe(state);
    //   expect(result).toEqual({ count: state.count + 1 });
    // });
  });
});
