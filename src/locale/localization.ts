import { LocalizationMap } from './LocalizationMap';
import { getTypeNames } from '../utils';

type Locales = { [ name: string ]: LocalizationMap };

const locales: Locales = {
  en: require('./en'),
  en_CA: require('./en_CA'),
};

const localeNames = getTypeNames(locales);
const defaultLocale = localeNames[0];

export function getLocalization(locale?: string) {
  // no locale provided, so return the default
  if (locale == null) {
    return locales[defaultLocale];
  }

  // check for exact match
  if (locale in locales) {
    return locales[locale];
  }

  // find all matches
  const match = localeNames
    .filter(x => locale.startsWith(x))
    .sort((a, b) => a.localeCompare(b));

  if (match.length > 0) {
    // join matched locales together to form a localization map
    return match
      .reduce(
        (l, x) => Object.assign(l, locales[x]),
        {} as LocalizationMap,
      );
  }

  if (__DEV__) {
    console.warn(`${ locale || 'undefined' } is not a valid locale, known locales are: ${ localeNames.join(', ') }`);
  }

  // fall back onto default locale
  return locales[defaultLocale];
}
