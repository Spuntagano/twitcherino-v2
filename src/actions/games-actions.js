import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

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

function receiveGames(res, numberGamesFetched) {
  const games = _.has(res.body, 'games') && res.body.games instanceof Array ? res.body.games : [];

  return {
    type: CONSTS.ACTIONS.RECEIVE_GAMES,
    gameList: games,
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
	    	dispatch(receiveGames(res, numberGamesFetched));
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