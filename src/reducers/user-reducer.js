import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';
import isBrowser from '../utils/is-browser';

let initialState = {
	isFetching: false,
	userInfo: {},
	userLoggedIn: isBrowser && _.has(window.__INITIAL_STATE__.user, 'userLoggedIn') ? window.__INITIAL_STATE__.user.userLoggedIn : false
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
				userLoggedIn: action.user.userLoggedIn,
				userInfo: action.user.userInfo,
				lastUpdated: action.receivedAt
			};
		case CONSTS.ACTIONS.UPDATING_USER:
			return {
				...state,
				isFetching: true
			};
		case CONSTS.ACTIONS.UPDATED_USER:
			return {
				...state,
				isFetching: true,
				userInfo: action.userInfo,
				lastUpdated: action.receivedAt
			};
		default:
			return state;
	}
}