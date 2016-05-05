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