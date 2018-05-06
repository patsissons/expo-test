import * as React from 'react';
import { View, Text } from 'react-native';
import { coerceToText } from '../../src/components/renderHelpers';

describe('components', () => {
  describe('renderHelpers', () => {
    describe('coerceToText', () => {
      it('can coerce a string', () => {
        const content = 'test';

        const result: any = coerceToText(content);

        expect(result).toBeTruthy();
        expect(result.type).toBe(Text);
      });

      it('can coerce Text props', () => {
        const content = { children: 'test' };

        const result: any = coerceToText(content);

        expect(result).toBeTruthy();
        expect(result.type).toBe(Text);
      });

      it('can coerce a Text component', () => {
        const content = (<Text>test</Text>);

        const result = coerceToText(content);

        expect(result).toBeTruthy();
        expect(result).toBe(content);
      });

      it('returns false for invalid input', () => {
        expect(coerceToText(undefined)).toBeFalsy();
        expect(coerceToText(null)).toBeFalsy();
        expect(coerceToText(false)).toBeFalsy();
        expect(coerceToText(123)).toBeFalsy();
        expect(coerceToText(<View />)).toBeFalsy();
      });
    });
  });
});
