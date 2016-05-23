import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

function requestFollow() {
  return {
    type: CONSTS.ACTIONS.REQUEST_FOLLOW,
  };
}

export function clearFollow() {
  return {
    type: CONSTS.ACTIONS.CLEAR_FOLLOW,
  };
}

function receiveFollow(res) {
  const follow = _.has(res.body, 'follow') && typeof res.body.follow === 'boolean' ? res.body.follow : false;

  return {
    type: CONSTS.ACTIONS.RECEIVE_FOLLOW,
    follow,
    receivedAt: Date.now(),
  };
}

export function addFollow(target) {
  return (dispatch) => {
    dispatch(requestFollow());
    return request
    .put('/api/gateway/follow')
    .query({target})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (!err){
        dispatch(receiveFollow(res));
      }
    });
  };
}

export function removeFollow(target) {
  return (dispatch) => {
    dispatch(requestFollow());
    return request
    .delete('/api/gateway/follow')
    .query({target})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (!err){
        dispatch(receiveFollow(res));
      }
    });
  };
}

function fetchFollow(target) {
  return (dispatch) => {
    dispatch(requestFollow());
    return request
	  .get('/api/gateway/follow')
    .query({target})
	  .set('Accept', 'application/json')
	  .end((err, res) => {
	  	if (!err){
	    	dispatch(receiveFollow(res));
	  	}
	  });
  };
}

function shouldFetchFollow(state) {
  if (state.follow.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchFollowIfNeeded(target) {
  return (dispatch, getState) => {
      if (shouldFetchFollow(getState())) {
          return dispatch(fetchFollow(target));
      }
  };
}