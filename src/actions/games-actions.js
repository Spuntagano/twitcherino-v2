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
    gameList: json.top,
    receivedAt: Date.now(),
    numberGamesFetched
  };
}

function fetchGames(numberGamesFetched) {
  return (dispatch) => {
    dispatch(requestGames());
    return request
	  .get('https://api.twitch.tv/kraken/games/top?limit='+ CONSTS.NUMBER_STREAM_FETCH +'&offset='+numberGamesFetched)
	  .set('Accept', 'application/json')
	  .end((err, res) => {
	  	if (!err){
	    	dispatch(receiveGames(res.body, numberGamesFetched));
	  	}
	  });
  };
}

function shouldFetchGames(state, subreddit) {
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