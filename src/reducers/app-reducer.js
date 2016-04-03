import CONSTS from '../utils/consts';

let initialState = {};

export function app(state = initialState, action = '') {
  switch (action.type) {

    case CONSTS.ACTIONS.CHANGE_WHOLE_LIST:
      return [...action.list];

    default:
      return state;
  }
}