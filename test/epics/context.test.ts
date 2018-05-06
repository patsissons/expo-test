import 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { getRequestAction, actionTypes } from '../../src/components';
import { loadLocale } from '../../src/epics/context';

jest.mock('expo', () => {
  return {
    DangerZone: {
      Localization: {
        getCurrentLocaleAsync: jest.fn(() => Promise.resolve('test')),
      },
    },
  };
});

describe('epics', () => {
  describe('context', () => {
    it('can load locale from expo', async () => {
      const action = getRequestAction(actionTypes.context.LoadLocale);

      const result = await loadLocale(ActionsObservable.of(action)).toPromise();

      expect(result).toBeTruthy();
      expect(result).toEqual(getRequestAction(actionTypes.context.LoadLocalization, { locale: 'test' }));
    });
  });
});
