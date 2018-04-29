import { DemoState, RequestAction, DemoPayload, actionTypes } from '../components';

const initialState: DemoState = {
  count: 0,
};

const defaultAmount = 1;

export function reducer(state = initialState, action: RequestAction<DemoPayload>): DemoState {
  const amount = action.payload == null ?
    defaultAmount :
    (action.payload.amount || defaultAmount);

  switch (action.type) {
    case actionTypes.demo.DemoIncrement:
      return {
        count: state.count + amount,
      };
    case actionTypes.demo.DemoDecrement:
      return {
        count: state.count - amount,
      };
    default:
      // fall through and return input state
      break;
  }

  return state;
}
