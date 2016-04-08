import CONSTS from '../utils/consts';
import request from 'superagent';

export function selectStream() {
  return {
    type: CONSTS.ACTIONS.SELECT_STREAMS
  };
};

function requestStreams() {
  return {
    type: CONSTS.ACTIONS.REQUEST_STREAMS,
  };
}

function receiveStreams(json) {
  return {
    type: CONSTS.ACTIONS.RECEIVE_STREAMS,
    streams: json.streams,
    receivedAt: Date.now()
  };
}

function fetchStreams() {
  return (dispatch) => {
    dispatch(requestStreams());
    return request
	  .get('https://api.twitch.tv/kraken/streams')
	  .set('Accept', 'application/json')
	  .end((err, res) => {
	  	if (!err){
	    	dispatch(receiveStreams(res.body));
	  	}
	  });
  };
}

export function fetchStreamsIfNeeded() {
  return (dispatch) => {
      return dispatch(fetchStreams(dispatch));
  };
}