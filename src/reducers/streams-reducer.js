import CONSTS from '../utils/consts';
import request from 'superagent';
import mergeArraysOfUniqueObjects from '../utils/merge-arrays-of-unique-objects';
import _ from 'underscore';

let initialState = {
  numberStreamsFetched: 0,
  isFetching: false,
  streamList: []
};

export function streams(state = initialState, action = '') {
  switch (action.type) {
    case CONSTS.ACTIONS.REQUEST_STREAMS:
      return {
      	...state,
        isFetching: true
      };
    case CONSTS.ACTIONS.CLEAR_STREAM_LIST:
      return {
        ...state,
        streamList: [],
        numberStreamsFetched: 0
      };
    case CONSTS.ACTIONS.RECEIVE_STREAMS:
      return {
      	...state,
        isFetching: false,
        streamList: mergeArraysOfUniqueObjects(action.streamList, state.streamList, 'id'),
        lastUpdated: action.receivedAt,
        numberStreamsFetched: state.numberStreamsFetched + CONSTS.NUMBER_STREAM_FETCH
      };
    default:
      return state;
  }
}