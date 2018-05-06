import { ContextState, RequestAction, LocalePayload, isLocalePayload, actionTypes } from '../components';
import { getLocalization } from '../locale';
import { env } from '../utils';

const initialState: Partial<ContextState> = {
};

export function reducer(state = initialState, action: RequestAction<LocalePayload>): Partial<ContextState> {
  switch (action.type) {
    case actionTypes.context.LoadEnv:
      return {
        ...state,
        env,
      };
    case actionTypes.context.LoadLocalization:
      if (isLocalePayload(action.payload)) {
        return {
          ...state,
          locale: action.payload.locale,
          localization: getLocalization(action.payload.locale),
        };
      }
      break;
    default:
      // fall through and return input state
      break;
  }

  return state;
}
