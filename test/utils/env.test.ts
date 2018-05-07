import { env } from '../../src/utils/env';

describe('utils', () => {
  describe('env', () => {
    it('can use environment variables', () => {
      expect(env.RELEASE).toBeTruthy();
    });
  });
});
