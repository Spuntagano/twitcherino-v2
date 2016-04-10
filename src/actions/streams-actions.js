import CONSTS from '../utils/consts';
import request from 'superagent';

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

function receiveStreams(json, numberStreamsFetched) {
  return {
    type: CONSTS.ACTIONS.RECEIVE_STREAMS,
    streamList: json.streams,
    receivedAt: Date.now(),
    numberStreamsFetched
  };
}

function fetchStreams(numberStreamsFetched) {
  return (dispatch) => {
    dispatch(requestStreams());
    return request
	  .get('https://api.twitch.tv/kraken/streams?limit='+ CONSTS.NUMBER_STREAM_FETCH +'&offset='+numberStreamsFetched)
	  .set('Accept', 'application/json')
	  .end((err, res) => {
	  	if (!err){
	    	dispatch(receiveStreams(res.body, numberStreamsFetched));
	  	}
	  });
  };
}

function fetchStreamsByGame(numberStreamsFetched, game) {
  return (dispatch) => {
    dispatch(requestStreams());
    return request
    .get('https://api.twitch.tv/kraken/streams?game='+ game +'&limit='+ CONSTS.NUMBER_STREAM_FETCH +'&offset='+numberStreamsFetched)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (!err){
        dispatch(receiveStreams(res.body, numberStreamsFetched));
      }
    });
  };
}

function shouldFetchStreams(state, subreddit) {
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