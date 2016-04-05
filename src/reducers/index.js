import { combineReducers } from 'redux';
import { streams } from './streams-reducer';

let reducers = combineReducers({
  streams
});

export default reducers;