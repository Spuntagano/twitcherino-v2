import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

let initialState = {
  numberGamesFetched: 0,
  isFetching: false
};

export function games(state = initialState, action = '') {
  switch (action.type) {
    case CONSTS.ACTIONS.REQUEST_GAMES:
      return {
      	...state,
        isFetching: true
      };
    case CONSTS.ACTIONS.CLEAR_GAME_LIST:
       return {
         ...state,
         gameList: [],
         numberGamesFetched: 0
       };
    case CONSTS.ACTIONS.RECEIVE_GAMES:
      let gameList = [];
      if (!_.isUndefined(state.gameList)){
        gameList = state.gameList;
      }

      action.gameList.map((newGame) =>{
        let found = false;
        gameList.map((oldGame) => {
          if (newGame.game._id === oldGame.game._id){
            found = true;
          }
        });
        if (!found){
          gameList.push(newGame);
        }
      });

      return {
      	...state,
        isFetching: false,
        gameList: gameList,
        lastUpdated: action.receivedAt,
        numberGamesFetched: state.numberGamesFetched + CONSTS.NUMBER_STREAM_FETCH
      };
    default:
      return state;
  }
}