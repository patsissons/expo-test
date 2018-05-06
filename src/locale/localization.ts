import { LocalizationMap } from './LocalizationMap';
import { getTypeNames, debug } from '../utils';
import en from './en';
import en_CA from './en_CA';

type Locales = { [ name: string ]: LocalizationMap };

const locales: Locales = {
  en,
  en_CA,
};

export const localeNames = getTypeNames(locales);

export const defaultLocale = localeNames[0];

export function getLocalization(locale?: string) {
  // no locale provided, so return the default
  if (locale == null) {
    return locales[defaultLocale];
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

  debug(`${ locale } is not a valid locale, known locales are: ${ localeNames.join(', ') }`);

  // fall back onto default locale
  return locales[defaultLocale];
}
