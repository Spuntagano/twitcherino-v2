import { combineReducers } from 'redux';
import { streams } from './streams-reducer';
import { games } from './games-reducer';
import { user } from './user-reducer';

let reducers = combineReducers({
  streams, games, user
});

export default reducers;