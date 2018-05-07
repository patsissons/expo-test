import { createTypeNameMap, getTypeNames } from '../../src/utils/types';

describe('utils', () => {
  describe('types', () => {
    describe('getMemberNameList', () => {
      it('creates member names for a object with members', () => {
        const test = {
          A: true,
          B: 'B',
          C: 1,
        };

        const result = getTypeNames(test);

        expect(result).toEqual([ 'A', 'B', 'C' ]);
      });

      it('creates an empty list for a object without members', () => {
        const test = {
        };

        const result = getTypeNames(test);

        expect(result).toEqual([]);
      });
    });

    describe('createTypeNameMap', () => {
      it('creates a member name map for a object with members', () => {
        const test = {
          A: true,
          B: 'B',
          C: 1,
        };

        const result = createTypeNameMap(test);

        expect(result).toEqual({ A: 'A', B: 'B', C: 'C' });
      });

      it('creates an empty object for a object without members', () => {
        const test = {
        };

        const result = createTypeNameMap(test);

        expect(result).toEqual({});
      });
    });
  });
});
