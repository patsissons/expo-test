import { PlatformOSType, Platform } from 'react-native';

export interface LocalizationMap {
  CurrentStateIs: string;
  Increment: string;
  IncrementCount: string;
  Login: string;
  LoginScreen: string;
  MainScreen: string;
}

export function create(
  map: LocalizationMap,
  specifics?: { [platform in PlatformOSType | 'default']?: Partial<LocalizationMap> },
) {
  return {
    ...map,
    ...Platform.select(specifics || {}),
  };
}

export function createFrom(
  base: LocalizationMap,
  map: Partial<LocalizationMap>,
  specifics?: { [platform in PlatformOSType | 'default']?: Partial<LocalizationMap> },
) {
  return create(
    {
      ...base,
      ...map,
    },
    specifics,
  );
}
