import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

let initialState = {
  isFetching: false,
  follow: false
};

export function follow(state = initialState, action = '') {
  switch (action.type) {
    case CONSTS.ACTIONS.REQUEST_FOLLOW:
      return {
      	...state,
        isFetching: true
      };
    case CONSTS.ACTIONS.CLEAR_FOLLOW:
       return {
         ...state,
         follow: false
       };
    case CONSTS.ACTIONS.RECEIVE_FOLLOW:
      return {
      	...state,
        isFetching: false,
        follow: action.follow,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
}