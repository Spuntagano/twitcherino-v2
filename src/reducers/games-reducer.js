import CONSTS from '../utils/consts';
import request from 'superagent';
import mergeArraysOfUniqueObjects from '../utils/merge-arrays-of-unique-objects';
import _ from 'underscore';

let initialState = {
  numberGamesFetched: 0,
  isFetching: false,
  gameList: []
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
      return {
      	...state,
        isFetching: false,
        gameList: mergeArraysOfUniqueObjects(action.gameList, state.gameList, 'game', '_id'),
        lastUpdated: action.receivedAt,
        numberGamesFetched: state.numberGamesFetched + CONSTS.NUMBER_STREAM_FETCH
      };
    default:
      return state;
  }
}