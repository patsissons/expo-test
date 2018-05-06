import { isDebugEnvironment, debug } from '../../src/utils/debug';

describe('utils', () => {
  describe('debug', () => {
    describe('isDebugEnvironment', () => {
      it('returns false for a test environment', () => {
        expect(isDebugEnvironment()).toBeFalsy();
      });
    });

    it('does not console debug in a test environment', () => {
      const fn = jest.spyOn(global.console, 'debug');

      debug('test', 1);

      expect(fn).not.toHaveBeenCalled();
    });
  });
});
