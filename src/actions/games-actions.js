import CONSTS from '../utils/consts';
import request from 'superagent';

function requestGames() {
  return {
    type: CONSTS.ACTIONS.REQUEST_GAMES,
  };
}

export function clearGameList() {
  return {
    type: CONSTS.ACTIONS.CLEAR_GAME_LIST,
  };
}

function receiveGames(json, numberGamesFetched) {
  return {
    type: CONSTS.ACTIONS.RECEIVE_GAMES,
    gameList: json.games,
    receivedAt: Date.now(),
    numberGamesFetched
  };
}

function fetchGames(numberGamesFetched) {
  return (dispatch) => {
    dispatch(requestGames());
    return request
	  .get('/api/gateway/games')
    .query({
      limit: CONSTS.NUMBER_STREAM_FETCH,
      offset: numberGamesFetched
    })
	  .set('Accept', 'application/json')
	  .end((err, res) => {
	  	if (!err){
	    	dispatch(receiveGames(res.body, numberGamesFetched));
	  	}
	  });
  };
}

function shouldFetchGames(state) {
  if (state.games.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchGamesIfNeeded(numberGamesFetched) {
  return (dispatch, getState) => {
      if (shouldFetchGames(getState())) {
          return dispatch(fetchGames(numberGamesFetched));
      }
  };
}