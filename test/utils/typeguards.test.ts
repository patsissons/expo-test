import { isString, isObject } from '../../src/utils/typeguards';

describe('utils', () => {
  describe('typeguards', () => {
    describe('isString', () => {
      it('can detect strings', () => {
        expect(isString('test')).toBeTruthy();
        expect(isString('')).toBeTruthy();
        expect(isString(String('test'))).toBeTruthy();
        expect(isString(123)).toBeFalsy();
        expect(isString({})).toBeFalsy();
        expect(isString(new RegExp(''))).toBeFalsy();
        expect(isString(undefined)).toBeFalsy();
        expect(isString(null)).toBeFalsy();
      });
    });

    describe('isObject', () => {
      it('can detect objects', () => {
        expect(isObject('test')).toBeFalsy();
        expect(isObject('')).toBeFalsy();
        expect(isObject(String('test'))).toBeFalsy();
        expect(isObject(123)).toBeFalsy();
        expect(isObject({})).toBeTruthy();
        expect(isObject(new RegExp(''))).toBeTruthy();
        expect(isObject(undefined)).toBeFalsy();
        expect(isObject(null)).toBeFalsy();
      });
    });
  });
});
