import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

function requestStreams() {
  return {
    type: CONSTS.ACTIONS.REQUEST_STREAMS,
  };
}

export function clearStreamList() {
  return {
    type: CONSTS.ACTIONS.CLEAR_STREAM_LIST,
  };
}

function receiveStreams(res, numberStreamsFetched) {
  const streams = _.has(res.body, 'streams') && res.body.streams instanceof Array ? res.body.streams : [];

  return {
    type: CONSTS.ACTIONS.RECEIVE_STREAMS,
    streamList: streams,
    receivedAt: Date.now(),
    numberStreamsFetched
  };
}

function fetchStreams(numberStreamsFetched) {
  return (dispatch) => {
    dispatch(requestStreams());
    return request
	  .get('/api/gateway/streams')
    .query({
      limit: CONSTS.NUMBER_STREAM_FETCH,
      offset: numberStreamsFetched
    })
	  .set('Accept', 'application/json')
	  .end((err, res) => {
	  	if (!err){
	    	dispatch(receiveStreams(res, numberStreamsFetched));
	  	}
	  });
  };
}

function fetchStreamsByGame(numberStreamsFetched, game) {
  return (dispatch) => {
    dispatch(requestStreams());
    return request
    .get('/api/gateway/streams')
    .query({
      game: game,
      limit: CONSTS.NUMBER_STREAM_FETCH,
      offset: numberStreamsFetched
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (!err){
        dispatch(receiveStreams(res, numberStreamsFetched));
      }
    });
  };
}

function fetchFollowedStreams(numberStreamsFetched) {
  return (dispatch) => {
    dispatch(requestStreams());
    return request
    .get('/api/gateway/follows')
    .query({
      limit: CONSTS.NUMBER_STREAM_FETCH,
      offset: numberStreamsFetched
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (!err){
        dispatch(receiveStreams(res, numberStreamsFetched));
      }
    });
  };
}

function shouldFetchStreams(state) {
  if (state.streams.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchStreamsIfNeeded(numberStreamsFetched) {
  return (dispatch, getState) => {
      if (shouldFetchStreams(getState())) {
          return dispatch(fetchStreams(numberStreamsFetched));
      }
  };
}

export function fetchStreamsByGameIfNeeded(numberStreamsFetched, game) {
  return (dispatch, getState) => {
      if (shouldFetchStreams(getState())) {
          return dispatch(fetchStreamsByGame(numberStreamsFetched, game));
      }
  };
}

export function fetchFollowedStreamsIfNeeded(numberStreamsFetched) {
  return (dispatch, getState) => {
      if (shouldFetchStreams(getState())) {
          return dispatch(fetchFollowedStreams(numberStreamsFetched));
      }
  };
}