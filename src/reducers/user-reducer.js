import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

let initialState = {
  isFetching: false,
  userInfo: {},
};

if (typeof window === 'object'){
  let initialState = {
    isFetching: false,
    userInfo: {},
    userLoggedIn: window.initialState.user.userLoggedIn
  };
}

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
        userLoggedIn: action.user.userLoggedIn,
        userInfo: action.user.userInfo,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}