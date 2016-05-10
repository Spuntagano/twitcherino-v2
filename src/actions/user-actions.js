import CONSTS from '../utils/consts';
import request from 'superagent';

function requestUser() {
	return {
		type: CONSTS.ACTIONS.REQUEST_USER,
	};
}

function receiveUser(json) {
	return {
		type: CONSTS.ACTIONS.RECEIVE_USER,
		user: json,
		receivedAt: Date.now(),
	};
}

function fetchUser() {
	return (dispatch) => {
		dispatch(requestUser());
		return request
		.get('/api/user')
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (!err){
				dispatch(receiveUser(res.body));
			}
		});
	};
}

function shouldFetchUser(state) {
	if (state.user.isFetching) {
		return false;
	} else {
		return true;
	}
}

export function fetchUserIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchUser(getState())) {
			return dispatch(fetchUser());
		}
	};
}

export function updateUser(user, oldUser) {
	return (dispatch) => {
		dispatch(updatingUser());
		return request
		.put('/api/user')
		.send({user, oldUser})
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (!err){
				dispatch(updatedUser(user));
			}
		});
	};
}

function updatingUser() {
	return {
		type: CONSTS.ACTIONS.UPDATING_USER,
	};
}

function updatedUser(json) {
	return {
		type: CONSTS.ACTIONS.UPDATED_USER,
		userInfo: json,
		receivedAt: Date.now(),
	};
}