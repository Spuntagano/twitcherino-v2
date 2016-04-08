import CONSTS from '../utils/consts';
import request from 'superagent';

let initialState = {};

export function streams(state = initialState, action = '') {
  switch (action.type) {
	case CONSTS.ACTIONS.SELECT_STREAMS:
		return {
			...state,
		};
    case CONSTS.ACTIONS.REQUEST_STREAMS:
      return {
      	...state,
        isFetching: true,
        didInvalidate: false
      };
    case CONSTS.ACTIONS.RECEIVE_STREAMS:
      return {
      	...state,
        isFetching: false,
        didInvalidate: false,
        streams: action.streams,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}