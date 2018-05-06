import { getRequestAction, actionTypes, actions } from '../../src/components/actions';

function testAction(action: Function, actionType: string, testPayload = true) {
  if (testPayload) {
    const payload = {};
    expect(action(payload)).toEqual(getRequestAction(actionType, payload));
  }

  expect(action()).toEqual(getRequestAction(actionType));
}

describe('components', () => {
  describe('actions', () => {
    describe('getRequestAction', () => {
      it('can create an action without a payload', () => {
        const type = 'test';

        const result = getRequestAction(type);

        expect(result).toEqual({ type });
      });

      it('can create an action with a payload', () => {
        const type = 'test';
        const payload = { test: 'test' };

        const result = getRequestAction(type, payload);

        expect(result).toEqual({ type, payload });
      });
    });

    describe('actionTypes', () => {
      it('maps to actions', () => {
        const actionTypeNames = Object.keys(actionTypes);

        expect(actionTypes).toBeTruthy();
        expect(actionTypeNames.every(x => x in actions)).toBeTruthy();
      });
    });

    describe('actions', () => {
      it('maps to actionTypes', () => {
        const actionNames = Object.keys(actions);

        expect(actions).toBeTruthy();
        expect(actionNames.every(x => x in actionTypes)).toBeTruthy();
      });

      it('creates request actions', () => {
        testAction(actions.context.loadEnv, actionTypes.context.LoadEnv, false);
        testAction(actions.context.loadLocale, actionTypes.context.LoadLocale, false);
        testAction(actions.navigation.goBack, actionTypes.navigation.NavigationBack);
        testAction(actions.navigation.toMain, actionTypes.navigation.NavigationToMain);
        testAction(actions.navigation.toLogin, actionTypes.navigation.NavigationToLogin);
        testAction(actions.demo.increment, actionTypes.demo.DemoIncrement);
        testAction(actions.demo.decrement, actionTypes.demo.DemoDecrement);
      });
    });
  });
});
