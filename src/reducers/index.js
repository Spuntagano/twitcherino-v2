import { combineReducers } from 'redux';
import { streams } from './streams-reducer';
import { games } from './games-reducer';
import { user } from './user-reducer';
import { follow } from './follow-reducer';
import { reducer as form } from 'redux-form';

let reducers = combineReducers({
  streams, games, user, form, follow
});

export default reducers;