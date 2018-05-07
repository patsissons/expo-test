import configureStore from 'redux-mock-store';
import { Env, env } from '../src/utils';
import { defaultLocale, getLocalization } from '../src/locale/localization';
import { Store, ContextState } from '../src/framework';

const locale = defaultLocale;
const localization = getLocalization(defaultLocale);

export function createStoreProps(state: {}, envOverrides?: Partial<Env>) {
  const context: ContextState = {
    env: {
      ...env,
      ...envOverrides,
    },
    locale,
    localization,
  };

  const mockStore = configureStore<Partial<Store>>();

  return { store: mockStore({ context, ...state }) };
}
