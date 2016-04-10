import { combineReducers } from 'redux';
import { streams } from './streams-reducer';
import { games } from './games-reducer';

let reducers = combineReducers({
  streams, games
});

export default reducers;