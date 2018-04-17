import { Action } from 'redux';
import { actionTypes } from '../navigation/actions';

const initialState = {
  count: 0,
}

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.demo.Increment:
      return {
        count: state.count + 1,
      };
  }

  return state;
}
