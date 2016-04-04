import CONSTS from '../utils/consts';
import request from 'superagent';

let initialState = {};

export function app(state = initialState, action = '') {
  switch (action.type) {
    case CONSTS.ACTIONS.SHOW_STREAMS:
		return {
			...state,
			streamId: '1111111111'
		};


    default:
      return state;
  }
}