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
			const userLoggedIn = _.has(action.user, 'userLoggedIn') && typeof action.user.userLoggedIn === 'boolean' ? action.user.userLoggedIn : false;
			const userId = _.has(action.user.userInfo, 'userId') && typeof action.user.userInfo.userId === 'string' ? action.user.userInfo.userId : '';
			const twitchUsername = _.has(action.user.userInfo, 'twitchUsername') && typeof action.user.userInfo.twitchUsername === 'string' ? action.user.userInfo.twitchUsername : '';
			const accessToken = _.has(action.user.userInfo, 'accessToken') && typeof action.user.userInfo.accessToken === 'string' ? action.user.userInfo.accessToken : '';

			return {
				...state,
				isFetching: false,
				userLoggedIn,
				userInfo: {
					userId,
					twitchUsername,
					accessToken
				},
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