import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

let initialState = {
  isFetching: false
};

export function user(state = initialState, action = '') {
  switch (action.type) {
    case CONSTS.ACTIONS.REQUEST_USER:
      return {
      	...state,
        isFetching: true
      };
    case CONSTS.ACTIONS.RECEIVE_USER:
      return {
      	...state,
        isFetching: false,
        user: action.user,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}