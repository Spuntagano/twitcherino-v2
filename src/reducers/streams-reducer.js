import CONSTS from '../utils/consts';
import request from 'superagent';
import _ from 'underscore';

let initialState = {
  numberStreamsFetched: 0,
  isFetching: false
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
      let streamList = [];
      if (!_.isUndefined(state.streamList)){
        streamList = state.streamList;
      }
  
      action.streamList.map((newStream) =>{
        let found = false;
        streamList.map((oldStream) => {
          if (newStream.channel._id === oldStream.channel._id){
            found = true;
          }
        });
        if (!found){
          streamList.push(newStream);
        }
      });

      return {
      	...state,
        isFetching: false,
        streamList: streamList,
        lastUpdated: action.receivedAt,
        numberStreamsFetched: state.numberStreamsFetched + CONSTS.NUMBER_STREAM_FETCH
      };
    default:
      return state;
  }
}