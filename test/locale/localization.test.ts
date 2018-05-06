import { localeNames, defaultLocale, getLocalization } from '../../src/locale/localization';

const defaultLocalization = getLocalization(defaultLocale);

describe('locale', () => {
  describe('localization', () => {
    describe('getLocalization', () => {
      it('returns the default localization if no locale is provided', () => {
        const result = getLocalization();

        expect(result).toBeTruthy();
        expect(result).toEqual(defaultLocalization);
      });

      it('returns the default localization if an invalid locale is provided', () => {
        const result = getLocalization('test');

        expect(result).toBeTruthy();
        expect(result).toEqual(defaultLocalization);
      });

      it('returns a single localization for a single locale match', () => {
        const enCA = getLocalization('en_CA');

        const result = getLocalization('en');

        expect(result).toBeTruthy();
        expect(result.LoginScreen).not.toBe(enCA.LoginScreen);
      });

      it('returns a merged localization for a multi locale match', () => {
        const en = getLocalization('en');

        const result = getLocalization('en_CA');

        expect(result).toBeTruthy();
        expect(result.LoginScreen).not.toBe(en.LoginScreen);
      });
    });

    it('defines a set of locales', () => {
      expect(localeNames).toBeTruthy();
      expect(localeNames.length).toBeGreaterThan(0);
    });

    it('has a default locale', () => {
      expect(defaultLocale).toBe(localeNames[0]);
    });
  });
});
